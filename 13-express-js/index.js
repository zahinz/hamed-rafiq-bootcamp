import express from "express";

const server = express();
const PORT = 8080;

// ROUTES

// / for home
server.get("/", function (req, res) {
  res.send("Hello World from Express.js");
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
