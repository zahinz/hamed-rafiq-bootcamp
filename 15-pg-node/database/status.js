import database from "./index.js";

async function getDatabaseStatus() {
  // connect to the database
  await database.connect();

  // execute a simple query
  const result = await database.query("SELECT NOW()");
  console.log("DATABASE RESULT:", result);

  // close the database connection
  await database.end();
}

export default getDatabaseStatus;
