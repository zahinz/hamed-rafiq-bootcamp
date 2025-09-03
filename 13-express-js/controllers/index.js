import path from "path";
import { __dirname } from "../utils/index.js";
import fs from "fs";

// store the number of visitors using a variable
// variable is stored in the memory (RAM) of the server
// it will reset when the server restarts
// let visitorCount = 0;
let visitorCountPath = path.join(__dirname, "visitor_count.txt");
console.log(visitorCountPath);
// read the visitor count from the file and parse it to integer
let visitorCount = parseInt(fs.readFileSync(visitorCountPath, "utf-8"));

export function homePage(req, res) {
  // increment the visitor count
  visitorCount++;
  // write the visitor count to the file
  fs.writeFileSync(visitorCountPath, visitorCount.toString());
  console.log("Home page visited", visitorCount);

  // how to server a static html file
  // get the absolute path of the html file
  // path is core module of nodejs which we imported above
  // path module helps to create path in a cross platform way (mac - /pages/index.html, windows - \pages\index.html)
  const htmlPath = path.join(__dirname, "pages", "index.html");
  // respond with the html file using sendFile method of res object
  // get the content of the html file
  let htmlContent = fs.readFileSync(htmlPath, "utf-8");
  // replace the placeholder with the visitor count
  htmlContent = htmlContent.replace("[[COUNT]]", visitorCount);
  // send the modified html content
  res.send(htmlContent);
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
