import database from "./index.js";
import createUserTable from "./create-user-table.js";

async function getDatabaseStatus() {
  try {
    // RESOLVED PROMISE
    // connect to the database
    await database.connect();
    // execute a simple query
    const result = await database.query("SELECT NOW()");
    console.log("DATABASE RESULT:", result.rows[0]);
    // CREATION OF TABLES
    // create the user table
    await createUserTable();
    // creation of more tables can be added here
  } catch (error) {
    // REJECTED PROMISE
    // log the error and exit the process
    console.error("DATABASE ERROR:", error);
    process.exit(1); // exit the process with failure
  }
}

export default getDatabaseStatus;
