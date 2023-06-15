const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const api = express();

api.use(cors());

// proxy middelware for auth
const authProxy = proxy("http://localhost:7000", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});

// proxy middelware for post
const eventsProxy = proxy("http://localhost:7001", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/events${req.url}`;
  },
});

// implementacija na ovie middelwari
api.use("/api/v1/auth", authProxy);
api.use("/api/v1/events", eventsProxy);

api.listen(7002, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("proxy service started on port 7002");
});
