import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.js";
import {
  registerController,
  loginController,
  myAccountController,
} from "../controllers/auth.js";
const apiRoutes = Router();

// Health check routes
apiRoutes.get("/", function (req, res) {
  return res.json({ message: "Welcome to the API" });
});

apiRoutes.post("/", function (req, res) {
  return res.json({ message: "POST request received" });
});

// User CRUD routes
apiRoutes.get("/users", getAllUsersController);
apiRoutes.get("/users/:id", getUserByIdController);
apiRoutes.post("/users", createUserController);
apiRoutes.put("/users/:id", updateUserController);
apiRoutes.delete("/users/:id", deleteUserController);

// auth routes
apiRoutes.post("/auth/register", registerController);
apiRoutes.post("/auth/login", loginController);
apiRoutes.post("/auth/my-account", myAccountController);

export default apiRoutes;
