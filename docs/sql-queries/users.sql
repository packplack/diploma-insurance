-- 3. Users

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    password TEXT NOT NULL,
    user_role TEXT NOT NULL,
    created_by UUID,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP WITHOUT TIME ZONE,

    PRIMARY KEY (id)
);

-- 3.1 Create director (admin) user

INSERT INTO users (
    id, 
    first_name, 
    last_name, 
    email, 
    phone_number, 
    password
) 
VALUES (
    '57c8dbfb-2fc0-4b65-b32e-cdb7289d97b2',
    'e',
    'z',
    'ez@gm.com',
    '+375251232323',
    'psqd'
); 

SELECT
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
) as c on u.created_by = c.id;