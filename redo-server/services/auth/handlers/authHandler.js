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
    res.status(200).json({ message: "user logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};
