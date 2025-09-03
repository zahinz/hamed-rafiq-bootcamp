import express from "express";
import {
  aboutPage,
  contactPage,
  educationPage,
  homePage,
  skillPage,
  userProfilePage,
} from "./controllers/index.js";

const server = express();
const PORT = 8080;

// ROUTES

// / for home
server.get("/", homePage);
server.get("/contact", contactPage);
server.get("/education", educationPage);
server.get("/skills", skillPage);
server.get("/about", aboutPage);
server.get("/user/:profile", userProfilePage);

// 404 route
server.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

server.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ASSIGNMENT CREATE A PERSONAL WEBSITE BY USING EXPRESS JS

// 5 pages with 5 routes
// / for home
// /about for about me
// /contact for contact me
// /education for education
// /skills for skills

// 5 static html files for each route
// include css in your html files

// use middleware to handle 404 error
