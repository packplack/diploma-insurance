import express from 'express';
import passport from '../auth';
import uuid from 'uuid4';
import passwordHash from 'password-hash';

import dbConnection from '../db/connection';

const router = express.Router();

router.post('/register', async (req, res) => {
    const usersWithSimilarEmail = await dbConnection.query({    
        text: 'SELECT id FROM customers WHERE email = $1', 
        values: [req.body.email]
    });

    if (usersWithSimilarEmail.rowCount) {
        return res.status(409).json({ error: 'Пользователь с таким email уже существует.'})
    }

    const hashedPassword = passwordHash.generate(req.body.password);

    await dbConnection.query({    
        text: `INSERT INTO customers (
            id, 
            first_name, 
            last_name, 
            email, 
            phone_number, 
            password
        ) 
        VALUES ($1, $2, $3, $4, $5, $6);`, 
        values: [uuid(), req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, hashedPassword]
    });

    return res.json({ result: 'Пользователь успешно добавлен.' });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, customer, info) {
        if (info) {
            res.status(401).json(info);
        } else {
            res.json({
                message: 'Успешный вход в систему.',
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