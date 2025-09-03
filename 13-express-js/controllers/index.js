import path from "path";
import { __dirname } from "../utils/index.js";

export function homePage(req, res) {
  // how to server a static html file
  // get the absolute path of the html file
  // path is core module of nodejs which we imported above
  // path module helps to create path in a cross platform way (mac - /pages/index.html, windows - \pages\index.html)
  const htmlPath = path.join(__dirname, "pages", "index.html");
  // respond with the html file using sendFile method of res object
  res.sendFile(htmlPath);
}

export function contactPage(req, res) {
  const htmlPath = path.join(__dirname, "pages", "contact.html");
  res.sendFile(htmlPath);
}

export function skillPage(req, res) {
  const htmlPath = path.join(__dirname, "pages", "skill.html");
  res.sendFile(htmlPath);
}

export function educationPage(req, res) {
  const htmlPath = path.join(__dirname, "pages", "education.html");
  res.sendFile(htmlPath);
}

export function aboutPage(req, res) {
  const htmlPath = path.join(__dirname, "pages", "about.html");
  res.sendFile(htmlPath);
}

export function userProfilePage(req, res) {
  const username = req.params.profile;
  // capitalize the first letter of the username and handle mulitple words
  const capitalizedUsername = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  res.send(`Hello ${capitalizedUsername}, welcome to your profile`);
}
