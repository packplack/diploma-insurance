import express from 'express';
import uuid4 from 'uuid4';
import passwordHash from 'password-hash';

import dbConnection from '../db/connection';
import passport from '../auth/customer-passport';
import logger from '../init/bunyan-logger';

const router = express.Router();

const getRandomInsurancePrice = () => Math.floor(Math.random() * (80 - 20) + 20, 2);

router.post('/register', async (req, res, next) => {
    const payload = req.body;

    const usersWithSimilarEmail = await dbConnection.query({    
        text: 'SELECT id FROM customers WHERE email = $1', 
        values: [payload.email]
    });

    if (usersWithSimilarEmail.rowCount) {
        return res.status(409).json({ error: 'Пользователь с таким email уже существует.'})
    }
    
    const hashedPassword = passwordHash.generate(payload.password);
    const uuid = uuid4();

    await dbConnection.query({    
        text: `INSERT INTO customers (
            id, 
            first_name, 
            last_name, 
            email, 
            phone_number, 
            password,
            last_login_at
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, NOW());`, 
        values: [
            uuid, 
            payload.firstName, 
            payload.lastName, 
            payload.email, 
            payload.phoneNumber, 
            hashedPassword
        ]
    });

    passport.authenticate('customer-local', (err, customer, info) => {
        customer.type = 'customer';

        req.logIn(customer, (error) => {
            if (error) logger.error(error);
    
            res.json({ 
                result: 'Пользователь успешно добавлен.',
                customer: {
                    id: uuid,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    phoneNumber: payload.phoneNumber
                }
            });

        });

    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('customer-local', (err, customer, info) => {

        if (info) {
            res.status(401).json(info);
        } else {
            customer.type = 'customer';

            req.logIn(customer, (error) => {
                if (error) logger.error(error);

                res.json({
                    result: 'Успешный вход в систему.',
                    customer: {
                        id: customer.id,
                        firstName: customer.first_name,
                        lastName: customer.last_name,
                        email: customer.email,
                        phoneNumber: customer.phone_number
                    }
                });

            });

        }

    })(req, res, next);
});

router.use((req, res, next) => {
    if (!req.user) {
        res.status(401).json({ error: 'Необходима авторизация пользователя.' });
        return;
    }

    next();
});

router.get('/logout', (req, res, next) => {
    logger.info(`AUTH. Customer ${req.user.email} performing LOGOUT.`);
    req.logout();
    res.json({ result: 'Пользователь успешно вышел.' });
});

router.get('/get-my-insurances', async (req, res, next) => {
    const insurances = await dbConnection.query({
        text: `
        SELECT
            id,
            type,
            status,
            is_paid,
            price,
            data,
            created_at,
            reviewed_at,
            paid_at
        FROM insurances
        WHERE customer_id = $1;`,
        values: [req.user.id]
    });

    res.json(insurances.rows);
});

router.post('/create-insurance', async (req, res, next) => {
    await dbConnection.query({
        text: `
        INSERT INTO insurances (
            id, 
            customer_id, 
            type,
            price,
            data,
            created_at
        ) 
        VALUES ($1, $2, $3, $4, $5, NOW());`,
        values: [
            uuid4(),
            req.user.id,
            req.body.type,
            getRandomInsurancePrice(),
            req.body.data
        ]
    });

    res.json({ result: 'Страховка успешно добавлена на рассмотрение.' });
});

export default router;
