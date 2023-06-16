// partially complete

import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
} from "./handlers/eventsHandler.js";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";

const app = express();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes
app.get("/api/v1/events/get-all", getAllEvents);
app.get("/api/v1/events/get-one/:id", getOneEvent);
app.post("/api/v1/events/create-event", createEvent);

// app.delete()
// app.put()

app.listen(process.env.PORT_EVENT, () =>
  console.log(`events server listening on port ${process.env.PORT_EVENT}`)
);
