import express from 'express';
import uuid4 from 'uuid4';
import passwordHash from 'password-hash';

import dbConnection from '../db/connection';
import passport from '../auth/user-passport';
import logger from '../init/bunyan-logger';
import permissions from '../auth/permissions';
import userRoles from '../auth/user-roles';

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('user-local', (err, user, info) => {
        console.log(info);
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
                        phoneNumber: user.phone_number,
                        userRole: user.user_role,
                        permissions: user.permissions
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


router.get('/new-user-options', async (req, res, next) => {
    res.json({ permissions, userRoles });
});


router.get('/all-users', async (req, res, next) => {
    if (!req.user.permissions.includes('пользователи-все')) {
        return res.status(403).json({ error: 'У Вас нет прав на данную операцию.' });
    }

    const users = await dbConnection.query({    
        text: `SELECT
            u.first_name || ' ' || u.last_name as full_name, 
            u.email, 
            u.phone_number, 
            u.user_role,
            u.permissions,
            c.created_by_full_name,
            u.created_at
        FROM users as u LEFT JOIN (
            SELECT
                id,
                first_name || ' ' || last_name as created_by_full_name
            FROM users
        ) as c on u.created_by = c.id;`
    });

    res.json(users.rows);
});


router.post('/create-user', async (req, res, next) => {
    if (!req.user.permissions.includes('пользователи-создать')) {
        return res.status(403).json({ error: 'У Вас нет прав на данную операцию.' });
    }

    const payload = req.body;

    const usersWithSimilarEmail = await dbConnection.query({    
        text: 'SELECT id FROM users WHERE email = $1', 
        values: [payload.email]
    });

    if (usersWithSimilarEmail.rowCount) {
        return res.status(409).json({ error: 'Сотрудник с таким email уже существует.'});
    }
    
    const hashedPassword = passwordHash.generate(payload.password);
    const uuid = uuid4();

    await dbConnection.query({    
        text: `INSERT INTO users (
            id, 
            first_name, 
            last_name, 
            email, 
            phone_number, 
            password,
            user_role,
            permissions,
            created_by,
            last_login_at
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW());`, 
        values: [
            uuid, 
            payload.firstName, 
            payload.lastName, 
            payload.email, 
            payload.phoneNumber, 
            hashedPassword,
            payload.userRole,
            JSON.stringify(payload.permissions),
            req.user.id
        ]
    });

    res.json({ result: 'Сотрудник успешно добавлен.' });

});


router.get('/all-insurances', async (req, res, next) => {
    if (!req.user.permissions.includes('страховки-все')) {
        return res.status(403).json({ error: 'У Вас нет прав на данную операцию.' });
    }

    const insurances = await dbConnection.query({
        text: `
        SELECT
            *
        FROM insurances;`
    });

    res.json(insurances.rows);
});

router.post('/perform-review', async (req, res, next) => {
    if (!req.user.permissions.includes('страховки-все')) {
        return res.status(403).json({ error: 'У Вас нет прав на данную операцию.' });
    }
    
    await dbConnection.query({
        text: `
        UPDATE insurances
        SET 
            reviewer_id = $1, 
            status = 'reviewed',
            reviewed_at = NOW()
        WHERE id = $2;`,
        values: [
            req.user.id,
            req.body.id
        ]
    });

    res.json({ result: 'Страховка успешно рассмотрена (одобрена).' });
});

router.get('/get-stats', async (req, res, next) => {
    if (!req.user.permissions.includes('страховки-статистика')) {
        return res.status(403).json({ error: 'У Вас нет прав на данную операцию.' });
    }

    const data = await dbConnection.query({
        text: `
        SELECT 
            date(created_at) as date, 
            sum(price) as money, 
            count(price) as amount
        FROM insurances 
        GROUP BY date(created_at) 
        ORDER BY date(created_at) ASC
        LIMIT 20;`
    });

    if (!data.rowCount) {
        return res.status(404).json({ error: 'Нет данных, чтобы собрать статистику.'});
    }

    const labels = data.rows.map(row => new Date(row.date).toLocaleDateString('br'));

    res.json({
        amountChart: {
            labels,
            datasets: [
                {
                    label: 'Кол-во созданных страховок',
                    data: data.rows.map(row => row.amount),
                    borderColor: '#3066BE',
                    backgroundColor: '#688FCF'
                },
            ]
        },
        moneyChart: {
            labels,
            datasets: [
                {
                    label: 'Выручка (руб)',
                    data: data.rows.map(row => row.money),
                    borderColor: '#4CB5AE',
                    backgroundColor: '#BDE4E1'
                },
            ]
        }
    });
})


export default router;
