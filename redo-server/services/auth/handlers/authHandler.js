import { UserModel } from "../../../pkg/Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email,
        fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res
      .status(201)
      .json({ message: "user created successfully", token });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", log: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({
      message: "User logged in successfully",
      token,
      role: findUser.role,
      _id: findUser._id,
      email: findUser.email,
      fullName: findUser.fullName
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { fullName, email, password } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);
    const findUser = await UserModel.findOne({ _id });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      {
        fullName,
        email,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Successfully updated user", updateUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};





export const getOneUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await UserModel.findById(userID);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(userID);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};







