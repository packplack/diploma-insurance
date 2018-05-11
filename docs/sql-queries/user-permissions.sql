-- 4. User-permissions

CREATE TABLE IF NOT EXISTS user_permissions (
    id UUID NOT NULL,
    user_role TEXT NOT NULL,
    permission TEXT NOT NULL,

    PRIMARY KEY (id)
);