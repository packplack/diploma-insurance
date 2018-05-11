-- 2. Customers

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
);

-- 2.1 Check if customer with email doesn't exist

SELECT id FROM customers
WHERE email = 'ez@gm.com'; 

-- 2.2 Create customer

INSERT INTO customers (
    id, 
    first_name, 
    last_name, 
    email, 
    phone_number, 
    password
) 
VALUES (
    '57c8dbfb-2fc0-4b65-b32e-cdb7289d97b2',
    'egor',
    'zekov',
    'ez@gm.com',
    '+375251232323',
    'psqd'
); 