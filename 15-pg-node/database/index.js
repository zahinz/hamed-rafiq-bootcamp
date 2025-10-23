import { Client } from "pg";

// initialize the client for postgres database
const database = new Client({
  user: "zahin",
  password: "",
  host: "localhost",
  port: 5432,
  database: "todo-cic-app",
});

export default database;
