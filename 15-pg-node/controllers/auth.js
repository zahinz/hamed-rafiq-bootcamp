import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUser, getUserByEmail } from "../database/auth.js";

export async function registerController(req, res) {
  try {
    //   username, email, age, password
    const { username, email, age, password } = req.body;

    // Validate required fields
    if (!username || !email || !age || !password) {
      return res.status(400).json({
        error:
          "Missing required fields: username, email, age, and password are required",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //   create the user in the database
    const newUser = await registerUser(username, email, age, hashedPassword);

    // return the user
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("ERROR REGISTERING USER:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    //   check if the email is in the database
    //   check if the user is a registered user or not
    const user = await getUserByEmail(email);
    if (!user) {
      // need to return a generic error message
      // NEVER RETURN THE ACTUAL ERROR MESSAGE
      // THIS IS A SECURITY RISK
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //   check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      // need to return a generic error message
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // generate a token
    const token = jwt.sign(
      // the elements that are going to be stored in the token
      { id: user.id, email: user.email, timestamp: Date.now() },
      "mak-kau-hijau",
      {
        expiresIn: "1h",
      }
    );
    console.log("TOKEN:", token);
    console.log("===============================================");

    return res.status(200).json({ token });
  } catch (error) {
    console.error("ERROR LOGINING USER:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function myAccountController(req, res) {
  try {
    // handle bearer token
    // this can be done using middleware
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, "mak-kau-hijau");
    return res.status(200).json({ decoded });
  } catch (error) {
    console.error("ERROR GETTING MY ACCOUNT:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
