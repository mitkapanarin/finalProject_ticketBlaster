import express from "express";
import { login, signup } from "./handlers/authHandler.js";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";

const app = express();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes
app.post("/api/v1/auth/create-user", signup);
app.post("/api/v1/auth/login", login);

app.listen(process.env.PORT_AUTH, () =>
  console.log(`Auth server listening on port ${process.env.PORT_AUTH}`)
);
