import { EventModel } from "../../../pkg/Model/eventModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// create
export const createEvent = async (req, res) => {
  const {
    role,
    // eventName,
    // eventDescription,
    // eventDate,
    // price,
    // eventLocation,
    // eventType,
  } = req.body;
  try {
    if (role !== "admin") {
      return res
        .status(400)
        .json({ message: "You are not authorized to create an event" });
    }
    await EventModel.create(req.body);

    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// GET ALL Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json({ message: "All Events", data: events });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// GET One Event
export const getOneEvent = async (req, res) => {
  // sjdbchjsbdchsvdc?id=""
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event found", data: event });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// update
export const updateEvent = async (req, res) => {};

// delete

export const deleteEvent = async (req, res) => {};
