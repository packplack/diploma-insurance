-- 1. Insurances

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
);

-- 1.1 Get customer insurances

SELECT
    id,
    type,
    status,
    is_paid,
    price,
    data,
    created_at,
    reviewed_at,
    paid_at,
FROM insurances
WHERE customer_id = '57c8dbfb-2fc0-4b65-b32e-c2b7289d1234';

-- 1.2 Create insurance

INSERT INTO insurances (
    id, 
    customer_id, 
    type,
    price,
    data
) 
VALUES (
    '57c8dbfb-2fc0-4b65-b32e-c2b7289d1234',
    '27c8dbfb-2fc0-4b65-b32e-cdb7289d97b2',
    'health',
    20.50,
    '{"name":"ez"}' -- TBD
);

-- 1.3 Perform a review

UPDATE insurances
SET 
    reviewer_id = '1234dbfb-2fc0-4b65-b32e-cdb7289d1234', 
    status = 'reviewed',
    reviewed_at = NOW()
WHERE id = '57c8dbfb-2fc0-4b65-b32e-cdb7289d1234';

-- 1.4 Pay for insurance

UPDATE insurances
SET 
    is_paid = true, 
    status = 'paid',
    paid_at = NOW()
WHERE id = '57c8dbfb-2fc0-4b65-b32e-cdb7289d1234';