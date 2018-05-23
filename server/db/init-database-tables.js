import uuid4 from 'uuid4';
import passwordHash from 'password-hash';

import dbConnection from './connection';
import permissions from '../auth/permissions';

const initDatabaseTables = async () => {
    await dbConnection.query({ text: `
    CREATE TABLE IF NOT EXISTS customers (
        id UUID NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
        last_login_at TIMESTAMP WITHOUT TIME ZONE,
    
        PRIMARY KEY (id)
    );` });

    await dbConnection.query({ text: `
    CREATE TABLE IF NOT EXISTS users (
        id UUID NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        password TEXT NOT NULL,
        user_role TEXT NOT NULL,
        permissions JSON NOT NULL,
        created_by UUID,
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
        last_login_at TIMESTAMP WITHOUT TIME ZONE,
    
        PRIMARY KEY (id)
    );` });

    const director = await dbConnection.query({    
        text: 'SELECT id FROM users WHERE user_role = $1',
        values: ['директор']
    });

    if (!director.rowCount) {
        await dbConnection.query({    
            text: `INSERT INTO users (
                id, 
                first_name, 
                last_name, 
                email, 
                phone_number, 
                password,
                user_role,
                permissions
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, 
            values: [
                uuid4(), 
                'Евгений', 
                'Бельский', 
                'yabelski@gmail.com', 
                '375291234567', 
                passwordHash.generate('password'),
                'директор',
                JSON.stringify(permissions)
            ]
        });
    }

    await dbConnection.query({ text: `
    CREATE TABLE IF NOT EXISTS insurances (
        id UUID NOT NULL,
        customer_id UUID NOT NULL,
        reviewer_id UUID,
        type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        is_paid BOOLEAN NOT NULL DEFAULT false,
        price DOUBLE PRECISION NOT NULL,
        data JSON NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
        reviewed_at TIMESTAMP WITHOUT TIME ZONE,
        paid_at TIMESTAMP WITHOUT TIME ZONE,
    
        PRIMARY KEY (id)
    );` });

};

export default initDatabaseTables;