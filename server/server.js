import path from 'path';

import express from 'express';
import expressSession from 'express-session';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import passport from 'passport';

import serverHeadersMiddleware from './middlewares/server-headers';
import logger from './init/bunyan-logger';
import initDatabaseTables from './db/init-database-tables';

import customersRoutes from './routes/customers';

const app = express();
initDatabaseTables();

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const VIEWS_PATH = path.resolve(__dirname, '../client-dist');
const STATIC_PATH = path.resolve(__dirname, '../client-dist/static');

app.use(bodyParser.json());
app.use(serverHeadersMiddleware);

app.engine('html', ejs.renderFile);
app.set('views', VIEWS_PATH);
app.set('view engine', 'html');

app.use(expressSession({ 
    secret: 'somesecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(STATIC_PATH));

app.use('/api/customers', customersRoutes);

app.get('/', (req, res) => res.render('index'));

// app.post();

app.get('*', (req, res) => res.render('index'));

app
    .listen(PORT, HOST, () => logger.info(`Aplication server is listening on port ${PORT}.`))
    .on('error', err => logger.error(`Failed to start application server, check if ${PORT} port is empty \n`, err));
