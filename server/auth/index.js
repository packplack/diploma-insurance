import passport from 'passport';
import passportLocal from 'passport-local';
import passwordHash from 'password-hash';

import dbConnection from '../db/connection';
import logger from '../init/bunyan-logger';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function(username, password, done) {
        const customerData = await dbConnection.query({    
            text: 'SELECT * FROM customers WHERE email = $1', 
            values: [username]
        });

        if (!customerData.rowCount) {
            logger.warn(`AUTH. Customer ${username} doesn't exist.`);
            return done(null, false, { error: 'Такого пользователя не существует.' });
        }

        const customer = customerData.rows[0];

        logger.info(`AUTH. Customer ${customer.email} was found.`);

        if (!passwordHash.verify(password, customer.password)) {
            logger.warn(`AUTH. Customer ${customer.email} entered invalid password.`);
            return done(null, false, { error: 'Неверная комбинация email/пароль.' });
        }

        logger.info(`AUTH. Customer ${customer.email} entered valid password.`);

        await dbConnection.query({    
            text: 'UPDATE customers SET last_login_at = NOW() WHERE email = $1', 
            values: [username]
        });

        return done(null, customer);

    }
));

passport.serializeUser(function(customer, done) {
    console.log('serialize');
    done(null, customer.id);
});
  
passport.deserializeUser(async function(id, done) {
    console.log('deserialize');
    const customerData = await dbConnection.query({    
        text: 'SELECT * FROM customers WHERE id = $1', 
        values: [id]
    });

    if (customerData.rowCount) {
        done(null, customerData.rows[0]);
    }
});

export default passport;
