import express from "express";
import proxy from "express-http-proxy";
// cross origin resource sharing
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// proxy middleware for authentication
const authUser = proxy(`http://localhost:${process.env.PORT_AUTH}`, {
  proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`,
});

// proxy middleware for Events
const authEvents = proxy(`http://localhost:${process.env.PORT_EVENT}`, {
  proxyReqPathResolver: (req) => `/api/v1/events${req.url}`,
});

// proxy middleware for Sales
const authSales = proxy(`http://localhost:${process.env.PORT_SALES}`, {
  proxyReqPathResolver: (req) => `/api/v1/sales${req.url}`,
});

// implementation of the proxy middleware
app.use("/api/v1/auth", authUser);
app.use("/api/v1/events", authEvents);
app.use("/api/v1/sales", authSales);


app.listen(process.env.PORT_PROXY, () => {
  console.log(`Proxy server listening on port ${process.env.PORT_PROXY}`);
});
