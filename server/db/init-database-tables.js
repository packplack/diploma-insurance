import dbConnection from './connection';

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
};

export default initDatabaseTables;