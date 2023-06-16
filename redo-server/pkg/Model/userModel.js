import mongoose from "mongoose";
import validator from "validator";

// complete

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
    trim: true,
    maxLength: [100, "Full name cannot exceed 100 characters"],
    validator: [
      validator.isAlpha,
      "Full name cannot contain numbers or special characters",
    ],
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    default: "",
    // validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    maxLength: [100, "Password cannot exceed 100 characters"],
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    trim: true,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
