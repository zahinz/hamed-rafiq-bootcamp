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

async function getUserByIdController(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("ERROR GETTING USER BY ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUserController(req, res) {
  try {
    const { username, email, age } = req.body;

    // Validate required fields
    if (!username || !email || !age) {
      return res.status(400).json({
        error: "Missing required fields: username, email, and age are required",
      });
    }

    const newUser = await createUser(username, email, age);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("ERROR CREATING USER:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const { username, email, age } = req.body;

    // Validate required fields
    if (!username || !email || !age) {
      return res.status(400).json({
        error: "Missing required fields: username, email, and age are required",
      });
    }

    const updatedUser = await updateUser(id, username, email, age);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error("ERROR UPDATING USER:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUserController(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("ERROR DELETING USER:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
};
