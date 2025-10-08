-- ========================================
-- SEED DATA FOR USERS TABLE
-- ========================================
-- This file inserts 10 sample users into the users table
-- Run this after creating the users table from notes.sql

-- Insert 10 sample users
INSERT INTO users (username, email, age) VALUES
    ('john_doe', 'john.doe@example.com', 25),
    ('jane_smith', 'jane.smith@example.com', 30),
    ('bob_jones', 'bob.jones@example.com', 22),
    ('alice_williams', 'alice.williams@example.com', 28),
    ('charlie_brown', 'charlie.brown@example.com', 35),
    ('david_miller', 'david.miller@example.com', 31),
    ('emma_davis', 'emma.davis@example.com', 27),
    ('frank_wilson', 'frank.wilson@example.com', 24),
    ('grace_taylor', 'grace.taylor@example.com', 29),
    ('henry_anderson', 'henry.anderson@example.com', 33);

-- Verify the inserted data
SELECT * FROM users;

-- Show count of inserted users
SELECT COUNT(*) as total_users FROM users;

