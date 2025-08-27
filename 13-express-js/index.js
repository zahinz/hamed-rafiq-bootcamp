import express from "express";
import path from "path";
import { __dirname } from "./utils/index.js";

const server = express();
const PORT = 8080;

// ROUTES

// / for home
server.get("/", function (req, res) {
  // how to server a static html file
  // get the absolute path of the html file
  // path is core module of nodejs which we imported above
  // path module helps to create path in a cross platform way (mac - /pages/index.html, windows - \pages\index.html)
  const htmlPath = path.join(__dirname, "pages", "index.html");
  // respond with the html file using sendFile method of res object
  res.sendFile(htmlPath);
});

// /contact for contact
server.get("/contact", function (req, res) {
  res.send("Contact me at my Whatsapp");
});

//  dynamic routes by using parameters
// /user/:name for user profile
server.get("/user/:profile", function (req, res) {
  const username = req.params.profile;
  // capitalize the first letter of the username and handle mulitple words
  const capitalizedUsername = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  res.send(`Hello ${capitalizedUsername}, welcome to your profile`);
});

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
// /eduction for education
// /skills for skills

// 5 static html files for each route
// include css in your html files

// use middleware to handle 404 error
