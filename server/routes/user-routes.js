import express from 'express';
import uuid4 from 'uuid4';
import passwordHash from 'password-hash';

import dbConnection from '../db/connection';
import passport from '../auth/user-passport';
import logger from '../init/bunyan-logger';

const router = express.Router();

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

    passport.authenticate('user-local', (err, cususertomer, info) => {
        user.type = 'user';

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
    passport.authenticate('user-local', (err, user, info) => {

        if (info) {
            res.status(401).json(info);
        } else {
            user.type = 'user';

            req.logIn(user, (error) => {
                if (error) logger.error(error);

                res.json({
                    result: 'Успешный вход в систему.',
                    user: {
                        id: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        phoneNumber: user.phone_number
                    }
                });

            });

        }

    })(req, res, next);
});

router.use((req, res, next) => {
    if (!req.user) {
        res.status(401).json({ error: 'Необходима авторизация сотрудника.' });
        return;
    }

    next();
});

router.get('/logout', (req, res, next) => {
    logger.info(`AUTH. User ${req.user.email} performing LOGOUT.`);
    req.logout();
    res.json({ result: 'Сотрудник успешно вышел.' });
});

export default router;
