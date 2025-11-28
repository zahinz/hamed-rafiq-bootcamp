import database from "./index.js";

const registerQueryText = `
  INSERT INTO users (username, email, age, password)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

export async function registerUser(username, email, age, password) {
  const values = [username, email, age, password];
  const result = await database.query(registerQueryText, values);
  return result.rows[0];
}

const getUserByEmailQueryText = `
  SELECT * FROM users WHERE email = $1;
`;

export async function getUserByEmail(email) {
  const values = [email];
  const result = await database.query(getUserByEmailQueryText, values);
  return result.rows[0];
}
