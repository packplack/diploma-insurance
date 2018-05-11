import express from 'express';
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

// router.post();

export default router;