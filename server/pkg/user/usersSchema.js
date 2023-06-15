const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    default: "",
    required: true,
    trim: true,
    minlength: [4, "Password must be at least 4 characters"]
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

usersSchema.pre("save", async function (next) {   //pre-middelware
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const UsersModel = mongoose.model("Users", usersSchema);

module.exports = UsersModel;

// so next() kazuvame da se premine na sledniot middelware,
// ako vo slucajot nema next() a nema ni respond od serverot aplikacijata kje se blokira
