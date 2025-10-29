import { Router } from "express";
import { getAllUsersController } from "../controllers/users.js";

const apiRoutes = Router();

apiRoutes.get("/", function (req, res) {
  return res.json({ message: "Welcome to the API" });
});

apiRoutes.post("/", function (req, res) {
  return res.json({ message: "POST request received" });
});

apiRoutes.get("/users", getAllUsersController);

// add more routes for users controllers
// e.g., apiRoutes.post("/users", createUserController);
// e.g., apiRoutes.get("/users/:id", getUserByIdController);
// e.g., apiRoutes.put("/users/:id", updateUserController);
// e.g., apiRoutes.delete("/users/:id", deleteUserController);

export default apiRoutes;
