import { EventModel } from "../../../pkg/Model/eventModel.js";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multers3 from "multer-s3";
import dotenv from "dotenv"

dotenv.config()

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION, credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  }
});

const upload = multer({
  storage: multers3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = `${Date.now().toString()}_${file.originalname}`
      cb(null, fileName)
    },
    contentType: multers3.AUTO_CONTENT_TYPE,
  })
})

// create
export const createEvent = async (req, res) => {
  try {
    const {
      role,
      eventName,
      eventDescription,
      eventDate,
      price,
      eventLocation,
      eventType,
      relatedEvents,
    } = req.body;

    const { location } = req?.file || "";


    if (role !== "admin") {
      return res
        .status(400)
        .json({ message: "You are not authorized to create an event" });
    }

    const newEvent = await EventModel.create({
      eventName,
      eventDescription,
      eventDate,
      price,
      eventLocation,
      eventType,
      relatedEvents,
      image: location,
    });

    if (relatedEvents && relatedEvents.length > 0) {
      // Update related events for the newly created event
      await EventModel.updateMany(
        { _id: { $in: relatedEvents } },
        { $push: { relatedEvents: newEvent._id } }
      );
    }

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
  try {
    const { eventID } = req.params;
    const event = await EventModel.findById(eventID);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event found", data: event });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// get multiple events
export const getMultipleEvents = async (req, res) => {
  try {
    // Retrieve the event IDs from the request body or query parameters
    const { eventIDs } = req.body; // Assuming eventIDs is an array of event IDs

    // Use the retrieved event IDs to fetch the corresponding events
    const events = await EventModel.find({ _id: { $in: eventIDs } });

    // Return the found events
    res.status(200).json({ message: "Multiple Events found", data: events });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// update
export const updateEvent = async (req, res) => {
  try {
    const { eventID } = req.params;
    const { location } = req?.file || "";

    const {
      eventName,
      eventDescription,
      eventDate,
      price,
      eventLocation,
      eventType,
    } = req.body;

    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventID,
      {
        eventName,
        eventDescription,
        eventDate,
        price,
        eventLocation,
        eventType,
        image: location,
      },
      { new: true }
    );

    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json({ message: "Successfully updated Event" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// delete

export const deleteEvent = async (req, res) => {
  try {
    const { eventID } = req.params;
    const findEvent = await EventModel.findById(eventID);

    if (!findEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const deletedEvent = await EventModel.findByIdAndDelete(eventID);

    res.status(201).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// search events against the query provided

export const searchEvents = async (req, res) => {
  try {
    const { search } = req.query;

    // Perform event search based on the search query
    const events = await EventModel.find({
      eventName: { $regex: search, $options: "i" },
    });

    res.status(200).json({ message: "Search Termsssssss", events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
