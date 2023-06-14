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
UserRoute.put("/update-user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const { fullName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        fullName,
        email,
        password: hashedPassword
      },
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "Successfully updated user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete User
UserRoute.delete("/delete-users/:id", async (req, res) => {
  try {
    const { userID } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(userID);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



UserRoute.get("/get-all-users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

