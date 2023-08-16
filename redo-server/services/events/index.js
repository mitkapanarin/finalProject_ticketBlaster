// partially complete

import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  searchEvents,
  getMultipleEvents,
} from "./handlers/eventsHandler.js";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";
import {upload} from "./handlers/eventsHandler.js"

const app = express();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes
app.get("/api/v1/events/get-all-events", getAllEvents);
app.get("/api/v1/events/get-one/:eventID", getOneEvent);
app.post("/api/v1/events/create-event",  upload.single("image"), createEvent);
app.put("/api/v1/events/update-event/:eventID",  upload.single("image"), updateEvent);
app.delete("/api/v1/events/delete-event/:eventID", deleteEvent);
app.get("/api/v1/events/search-events", searchEvents);
app.post("/api/v1/events/multiple-events", getMultipleEvents);

app.listen(process.env.PORT_EVENT, () =>
  console.log(`events server listening on port ${process.env.PORT_EVENT}`)
);
