import database from "./index.js";

const createQueryText = `
  INSERT INTO users (username, email, age)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

const readAllQueryText = `
  SELECT * FROM users;
`;

const readByIdQueryText = `
  SELECT * FROM users WHERE id = $1;
`;

const updateQueryText = `
  UPDATE users SET username = $1, email = $2, age = $3
  WHERE id = $4 RETURNING *;
`;

const deleteQueryText = `
  DELETE FROM users WHERE id = $1 RETURNING *;
`;

export async function createUser(username, email, age) {
  const values = [username, email, age];
  const result = await database.query(createQueryText, values);
  return result.rows[0];
}

export async function getAllUsers() {
  const result = await database.query(readAllQueryText);
  return result.rows;
}

export async function getUserById(id) {
  const values = [id];
  const result = await database.query(readByIdQueryText, values);
  return result.rows[0];
}

export async function updateUser(id, username, email, age) {
  const values = [username, email, age, id];
  const result = await database.query(updateQueryText, values);
  return result.rows[0];
}

export async function deleteUser(id) {
  const values = [id];
  const result = await database.query(deleteQueryText, values);
  return result.rows[0];
}
