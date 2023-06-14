import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "User",
    enum: ["User", "Admin"],
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
    default: "",
    trim: true,
    required: false,
  },
});

export const UserModel = mongoose.model("User", UserSchema);