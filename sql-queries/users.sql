-- 3. Users

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    account_name TEXT NOT NULL,
    password TEXT NOT NULL,
    user_role TEXT NOT NULL,
    created_be UUID NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP WITHOUT TIME ZONE,

    PRIMARY KEY (id)
);