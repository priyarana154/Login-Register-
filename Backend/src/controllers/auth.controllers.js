const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

const client = new OAuth2Client(process.env.client_id);

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      username: name,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function googleLogin(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.client, 
    });

    const { name, email } = ticket.getPayload();

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        username: name,
        email: email,
        password: Math.random().toString(36).slice(-8), 
        
        
      });
    }

    const customToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", customToken);

    return res.status(200).json({
      message: "Google Login Successful",
      user: { id: user._id, username: user.username, email: user.email },
      token: customToken,
    });
  } catch (error) {
    console.error("Google Verification Error:", error);
    return res.status(400).json({ message: "Invalid Google Token" });
  }
}

module.exports = { registerUser, loginUser, googleLogin };
