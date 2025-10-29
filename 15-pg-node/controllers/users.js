import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../database/users-crud.js";

async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error("ERROR GETTING USERS:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getAllUsersController };
