import mongoose from "mongoose";
import validator from "validator";

// partially done

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Please enter the event name"],
    trim: true,
    maxLength: [100, "Event name cannot exceed 100 characters"],
    default: "",
  },
  eventDescription: {
    type: String,
    required: [true, "Please enter the event description"],
    trim: true,
    maxLength: [500, "Event description cannot exceed 500 characters"],
    default: "",
  },
  eventDate: {
    type: Date,
    required: [true, "Please enter the event date"],
    default: Date.now(),
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter the event price"],
    default: 0.0,
  },
  // eventImage: {},
  eventLocation: {
    type: String,
    required: [true, "Please enter the event location"],
    trim: true,
    default: "",
  },
  eventType: {
    type: String,
    required: [true, "Please enter the event type"],
    enum: ["concert", "comedy"],
  },
});

export const EventModel = mongoose.model("Event", EventSchema);
