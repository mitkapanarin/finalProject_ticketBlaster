import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Routes
import { UserRoute } from "./Routes/UserRoute.js";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Unsuccessful connection to MongoDB"));

const app = express();

app.use(cors());
app.use(express.json());

// Proxy middleware for users
const usersProxy = proxy("http://localhost:5001", {
  proxyReqPathResolver: (req) => {
    return `/api/users${req.url}`;
  },
});

// Proxy middleware for events
const eventsProxy = proxy("http://localhost:5002", {
  proxyReqPathResolver: (req) => {
    return `/api/events${req.url}`;
  },
});

// Implement proxy middleware
app.use("/api/users", usersProxy);
app.use("/api/events", eventsProxy);

// Use the UserRoute for specific routes
app.use("/api/users", UserRoute);

const PORTPROXY = process.env.PORTPROXY || 5000;

app.listen(PORTPROXY, () => console.log(`Proxy service started on port ${PORTPROXY}`));
