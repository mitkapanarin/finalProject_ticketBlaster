import { UserModel } from "../../../pkg/Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendResetPasswordEmail } from "./nodemailer.js";

import crypto from "crypto";

function generateResetToken(length = 32) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {  // Извршува генерирање на случајни бинарна низа со должина `length`
      if (err) {    // ако се случи грешка, промисот ќе се отфрли (reject) со грешката како аргумент
        reject(err);
      } else {
        const token = buffer.toString("hex");    // Ако генерирањето е успешно, тогаш ја конвертира бинарната низа во хексадецимална нотација
        resolve(token);     // и ја враќа како резултат на промисот (resolve)
      }
    });
  });
}

export const signup = async (req, res) => {
  const { fullName, email, password, retypePassword } = req.body;

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression to validate full name format
  const fullNameRegex = /^[A-Za-z]+(\s[A-Za-z]+)+$/;

  // Regular expression to validate password format (at least 6 characters, at least one uppercase letter, one lowercase letter, and one digit)
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Verify if the provided email follows a valid format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Verify if the provided full name follows a valid format
    if (!fullNameRegex.test(fullName)) {
      return res.status(400).json({ message: "Invalid full name format" });
    }

    // Verify if the provided password follows a valid format
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit" });
    }

    // Verify if the retype password matches the original password
    if (password !== retypePassword) {
      return res.status(400).json({ message: "Retyped password does not match the original password" });
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
      .json({ message: "User created successfully", token });
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
      fullName: findUser.fullName,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { fullName, email, role } = req.body;

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
        role
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully updated user", updateUser });
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
    const { _id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(_id);

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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by their email
    const user = await UserModel.findOne({ email });

    if (!user) {
      // User with the given email does not exist
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token (e.g., using uuid or random string generator)
    const resetToken = await generateResetToken();

    // Save the reset token and its expiration in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send an email to the user with the reset password instructions
    sendResetPasswordEmail(user.email, resetToken);

    return res
      .status(200)
      .json({ message: "Password reset instructions sent" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", log: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  // Validation: Check if resetToken and newPassword are provided
  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: "Reset token and new password are required" });
  }

  try {
    // Find the user with the given reset token and token expiration
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      // Invalid or expired token
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Validation: Check if newPassword meets minimum criteria using regex
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    // Update the user's password with the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", log: error.message });
  }
};

//

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, email } = req.body;

  try {
    // Find the user by their Email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches the one stored in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    // Update the user's password with the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    // Get the updated user object
    const updatedUser = await UserModel.findOne({ email });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", log: error.message });
  }
};
