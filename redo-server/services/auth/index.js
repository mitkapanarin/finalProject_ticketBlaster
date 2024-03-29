import express from "express";
import {
  login,
  signup,
  updateUser,
  getOneUser,
  getAllUsers,
  deleteUser,
} from "./handlers/authHandler.js";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from "./handlers/authHandler.js"; // Import the forgotPassword and resetPassword functions
import { upload } from "./handlers/authHandler.js";
const app = express();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes
app.post("/api/v1/auth/create-user", upload.single("image"), signup);
app.post("/api/v1/auth/login", login);
app.put("/api/v1/auth/update-user/:_id", upload.single("image"), updateUser);
app.get("/api/v1/auth/get-one-user/:_id", getOneUser);
app.get("/api/v1/auth/get-all-users", getAllUsers);
app.delete("/api/v1/auth/delete-user/:_id", deleteUser);
app.post("/api/v1/auth/forgot-password", forgotPassword);
app.post("/api/v1/auth/reset-password", resetPassword);
app.post("/api/v1/auth/change-password", changePassword);

// app.post("/api/v1/auth/forgot-password", forgotPassword);
// app.post("/api/v1/auth/reset-password", resetPassword);

app.listen(process.env.PORT_AUTH, () =>
  console.log(`Auth server listening on port ${process.env.PORT_AUTH}`)
);
