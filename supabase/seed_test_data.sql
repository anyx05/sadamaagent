-- Seed Test Data for AI Chatbot QA
-- IMPORTANT: This will delete ALL existing bookings, berths, and ports.
-- Only run this on your test/staging database!

BEGIN;

-- 1. Clear existing data (cascades where applicable, but we do it manually to be safe)
DELETE FROM public.bookings;
DELETE FROM public.berths;
DELETE FROM public.ports;

-- 2. Define the target user email
DO $$
DECLARE
    target_user_id UUID;
    new_port_id UUID;
BEGIN
    -- Find the test user ID
    SELECT id INTO target_user_id FROM auth.users WHERE email = 'test@sadama.com' LIMIT 1;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User test@sadama.com not found. Please create the user first.';
    END IF;

    -- 3. Insert the Test Port
    INSERT INTO public.ports (id, owner_id, name, location, coordinates, description, contact_email, created_at, updated_at)
    VALUES (
        extensions.uuid_generate_v4(),
        target_user_id,
        'Sadama Testing Port',
        'Tallinn, Estonia',
        '59.4370, 24.7536', -- Tallinn coordinates
        'A dedicated testing port for the AI Chatbot with various berth statuses.',
        'test@sadama.com',
        NOW(),
        NOW()
    ) RETURNING id INTO new_port_id;

    -- 4. Insert Test Berths with every possible status
    
    -- Berth A1: Available
    INSERT INTO public.berths (port_id, name, max_length_m, max_draft_m, price_per_night, length, draft, price, status, created_at, updated_at)
    VALUES (
        new_port_id,
        'Berth A1',
        12.0,
        2.5,
        50.00,
        12.0,
        2.5,
        50.00,
        'available',
        NOW(),
        NOW()
    );

    -- Berth B2: Occupied
    INSERT INTO public.berths (port_id, name, max_length_m, max_draft_m, price_per_night, length, draft, price, status, created_at, updated_at)
    VALUES (
        new_port_id,
        'Berth B2',
        15.0,
        3.0,
        80.00,
        15.0,
        3.0,
        80.00,
        'occupied',
        NOW(),
        NOW()
    );

    -- Berth C3: Maintenance
    INSERT INTO public.berths (port_id, name, max_length_m, max_draft_m, price_per_night, length, draft, price, status, created_at, updated_at)
    VALUES (
        new_port_id,
        'Berth C3',
        10.0,
        2.0,
        40.00,
        10.0,
        2.0,
        40.00,
        'maintenance',
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Test data seeded successfully for user %', target_user_id;
END $$;

COMMIT;
