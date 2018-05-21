import passportLocal from 'passport-local';
import passwordHash from 'password-hash';

import passport from './common-passport';
import dbConnection from '../db/connection';
import logger from '../init/bunyan-logger';

const LocalStrategy = passportLocal.Strategy;

passport.use('user-local',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function(username, password, done) {
        const userData = await dbConnection.query({    
            text: 'SELECT * FROM users WHERE email = $1', 
            values: [username]
        });

        if (!userData.rowCount) {
            logger.warn(`AUTH. User ${username} doesn't exist.`);
            return done(null, false, { error: 'Такого сотрудника не существует.' });
        }

        const user = userData.rows[0];

        logger.info(`AUTH. User ${user.email} was found.`);

        if (!passwordHash.verify(password, user.password)) {
            logger.warn(`AUTH. User ${user.email} entered invalid password.`);
            return done(null, false, { error: 'Неверная комбинация email/пароль.' });
        }

        logger.info(`AUTH. User ${user.email} entered valid password.`);

        await dbConnection.query({    
            text: 'UPDATE users SET last_login_at = NOW() WHERE email = $1', 
            values: [username]
        });

        return done(null, user);

    }
));

export default passport;
