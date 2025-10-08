-- ========================================
-- BASIC SQL CRUD OPERATIONS FOR BEGINNERS
-- ========================================
-- CRUD stands for: Create, Read, Update, Delete
-- This file demonstrates basic SQL operations on a 'users' table

-- ========================================
-- 1. CREATE - Creating Database Structure
-- ========================================

-- Create a users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,           -- Auto-incrementing ID
    username VARCHAR(50) NOT NULL,   -- Username (required)
    email VARCHAR(100) NOT NULL UNIQUE, -- Email (required and unique)
    age INTEGER,                     -- Age (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp with default value
);

-- View table structure (PostgreSQL specific)
-- \d users


-- ========================================
-- 2. CREATE - Inserting Data (C in CRUD)
-- ========================================

-- Insert a single user
INSERT INTO users (username, email, age) 
VALUES ('john_doe', 'john@example.com', 25);

-- Insert another user
INSERT INTO users (username, email, age) 
VALUES ('jane_smith', 'jane@example.com', 30);

-- Insert multiple users at once
INSERT INTO users (username, email, age) 
VALUES 
    ('bob_jones', 'bob@example.com', 22),
    ('alice_williams', 'alice@example.com', 28),
    ('charlie_brown', 'charlie@example.com', 35);

-- Insert user without age (age is optional)
INSERT INTO users (username, email) 
VALUES ('david_miller', 'david@example.com');

-- Insert and return the created record
INSERT INTO users (username, email, age) 
VALUES ('emma_davis', 'emma@example.com', 27)
RETURNING *;


-- ========================================
-- 3. READ - Querying Data (R in CRUD)
-- ========================================

-- Select all users
SELECT * FROM users;

-- Select specific columns
SELECT username, email FROM users;

-- Select with WHERE clause (filter by condition)
SELECT * FROM users WHERE age > 25;

-- Select user by email
SELECT * FROM users WHERE email = 'john@example.com';

-- Select users with age between 25 and 30
SELECT * FROM users WHERE age BETWEEN 25 AND 30;

-- Select users with age 25 OR 30
SELECT * FROM users WHERE age = 25 OR age = 30;

-- Select users with age 25 AND name starting with 'j'
SELECT * FROM users WHERE age = 25 AND username LIKE 'j%';

-- Select users where age is NULL
SELECT * FROM users WHERE age IS NULL;

-- Select users where age is NOT NULL
SELECT * FROM users WHERE age IS NOT NULL;

-- Select with pattern matching (LIKE)
SELECT * FROM users WHERE username LIKE '%smith%';  -- Contains 'smith'
SELECT * FROM users WHERE email LIKE 'j%';          -- Starts with 'j'
SELECT * FROM users WHERE username LIKE '%n';       -- Ends with 'n'

-- Select with sorting (ORDER BY)
SELECT * FROM users ORDER BY age ASC;               -- Ascending order
SELECT * FROM users ORDER BY age DESC;              -- Descending order
SELECT * FROM users ORDER BY username ASC;

-- Select with limit
SELECT * FROM users LIMIT 3;                        -- Get first 3 users

-- Select with offset and limit (pagination)
SELECT * FROM users LIMIT 3 OFFSET 3;               -- Skip 3, get next 3

-- Count all users
SELECT COUNT(*) FROM users;

-- Count users older than 25
SELECT COUNT(*) FROM users WHERE age > 25;

-- Get average age
SELECT AVG(age) FROM users;

-- Get minimum and maximum age
SELECT MIN(age) AS youngest, MAX(age) AS oldest FROM users;

-- Group by example
SELECT age, COUNT(*) as user_count 
FROM users 
WHERE age IS NOT NULL
GROUP BY age 
ORDER BY age;


-- ========================================
-- 4. UPDATE - Modifying Data (U in CRUD)
-- ========================================

-- Update a user's age by ID
UPDATE users 
SET age = 26 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET username = 'johnny_doe', age = 27 
WHERE email = 'john@example.com';

-- Update multiple users at once
UPDATE users 
SET age = age + 1 
WHERE age < 30;

-- Update with RETURNING clause (see what was updated)
UPDATE users 
SET age = 31 
WHERE username = 'jane_smith'
RETURNING *;


-- ========================================
-- 5. DELETE - Removing Data (D in CRUD)
-- ========================================

-- Delete a specific user by ID
DELETE FROM users WHERE id = 1;

-- Delete users by condition
DELETE FROM users WHERE age > 50;

-- Delete user by email
DELETE FROM users WHERE email = 'bob@example.com';

-- Delete with RETURNING clause (see what was deleted)
DELETE FROM users 
WHERE username = 'charlie_brown'
RETURNING *;

-- CAREFUL: This deletes ALL users (no WHERE clause)
-- DELETE FROM users;


-- ========================================
-- 6. ADDITIONAL USEFUL QUERIES
-- ========================================

-- Select distinct ages (no duplicates)
SELECT DISTINCT age FROM users WHERE age IS NOT NULL;

-- Combine conditions with IN
SELECT * FROM users WHERE username IN ('john_doe', 'jane_smith', 'alice_williams');

-- NOT IN example
SELECT * FROM users WHERE age NOT IN (25, 30);

-- Update or Insert (UPSERT) - PostgreSQL specific
INSERT INTO users (username, email, age) 
VALUES ('john_doe', 'john_new@example.com', 26)
ON CONFLICT (email) 
DO UPDATE SET age = EXCLUDED.age;


-- ========================================
-- 7. CLEANUP (Optional)
-- ========================================

-- Drop the table (removes table and all data)
-- DROP TABLE users;


-- ========================================
-- PRACTICE EXERCISES FOR STUDENTS
-- ========================================

-- Exercise 1: Insert a new user with your name and email
-- YOUR CODE HERE:


-- Exercise 2: Select all users whose username starts with 'a'
-- YOUR CODE HERE:


-- Exercise 3: Update the age of a user by their email
-- YOUR CODE HERE:


-- Exercise 4: Delete all users older than 40
-- YOUR CODE HERE:


-- Exercise 5: Count how many users are under 30
-- YOUR CODE HERE:


-- Exercise 6: Select the 3 oldest users
-- YOUR CODE HERE:


-- ========================================
-- TIPS FOR BEGINNERS
-- ========================================
/*
1. Always use WHERE clause with UPDATE and DELETE to avoid changing/deleting all rows
2. Use RETURNING * to see what was inserted/updated/deleted
3. Start with SELECT before UPDATE/DELETE to verify which rows will be affected
4. Use transactions (BEGIN; ... COMMIT;) when making multiple related changes
5. SQL keywords are case-insensitive, but convention is to write them in UPPERCASE
6. Table and column names are usually lowercase with underscores
7. Always end SQL statements with a semicolon (;)
8. Use comments (-- or /* */) to document your queries
*/
