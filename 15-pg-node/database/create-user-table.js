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

async function createUserTable() {
  try {
    const result = await database.query(queryText);
    console.log("TABLE CREATION RESULT:", result);
  } catch (error) {
    console.error("Error creating table:", error);
    process.exit(1);
  }
}

export default createUserTable;
