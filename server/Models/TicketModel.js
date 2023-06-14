import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    required: false,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: "Open",
    enum: ["Open", "Closed"],
    required: true,
    trim: true,
  },
  location: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  event: {
    type: String,
    default: "Concert",
    enum: ["Concert", "Comedy"],
    required: true,
    trim: true,
  },
});

export const TicketModel = mongoose.model("Tickets", TicketSchema);