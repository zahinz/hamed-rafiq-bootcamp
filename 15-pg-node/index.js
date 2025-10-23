import express from "express";
import apiRoutes from "./routes/index.js";
import getDatabaseStatus from "./database/status.js";

// check the database status on server start
getDatabaseStatus();

const app = express();
const PORT = 8888;

// declaring the routes from routes/index.js
// nested routes is also possible like: app.use('/api', apiRoutes);
app.use("/api", apiRoutes);

// 404 handler as the fallback route
app.use(function (req, res, next) {
  return res.status(404).json({ message: "Route Not Found" });
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
