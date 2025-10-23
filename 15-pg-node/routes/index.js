import { Router } from "express";

const apiRoutes = Router();

apiRoutes.get("/", function (req, res) {
  return res.json({ message: "Welcome to the API" });
});

apiRoutes.post("/", function (req, res) {
  return res.json({ message: "POST request received" });
});

export default apiRoutes;
