import database from "./index.js";

const queryText = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,           
    username VARCHAR(50) NOT NULL,   
    email VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER,                    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
`;

// alter user table to add a new column if it doesn't exist called "password", set it to not null and default to an empty string
const alterUserTableQueryText = `
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(100) NOT NULL DEFAULT '';
`;

async function createUserTable() {
  try {
    // create the user table
    const result = await database.query(queryText);
    // console.log("TABLE CREATION RESULT:", result);
    // alter the table
    const result2 = await database.query(alterUserTableQueryText);
    // console.log("ALTER TABLE RESULT:", result2);
  } catch (error) {
    console.error("Error creating table:", error);
    process.exit(1);
  }
}

export default createUserTable;
