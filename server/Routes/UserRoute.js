import express from "express";
import dotenv from "dotenv";
import { UserModel } from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export const UserRoute = express.Router();

// register users
UserRoute.post("/register", async (req, res) => {
  const { fullName, role, email, password } = req.body;
  try {
    const findEmail = await UserModel.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      fullName,
      role,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userData: {
        fullName,
        role,
        email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error, please try again", error: err });
  }
});

// Route for user Authentication/ login

UserRoute.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userID: findUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      userData: {
        fullName: findUser.fullName,
        role: findUser.role,
        email: findUser.email,
        token,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error, please try again", error: err });
  }
});

// Edit User
UserRoute.post("/edit", async (req, res) => {});

// Delete User
UserRoute.post("/delete", async (req, res) => {});