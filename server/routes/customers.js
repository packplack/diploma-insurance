import express from 'express';
import passport from '../auth';
import uuid4 from 'uuid4';
import passwordHash from 'password-hash';

import dbConnection from '../db/connection';

const router = express.Router();

router.post('/register', async (req, res) => {
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

    return res.json({ 
        result: 'Пользователь успешно добавлен.',
        customer: {
            id: uuid,
            firstName: payload.first_name,
            lastName: payload.last_name,
            email: payload.email,
            phoneNumber: payload.phone_number
        }
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, customer, info) {
        if (info) {
            res.status(401).json(info);
        } else {
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
        }
    })(req, res, next);
});

export default router;