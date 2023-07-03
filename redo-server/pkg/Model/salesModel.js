import mongoose from "mongoose";
import validator from "validator";

// complete, maybe required some testing

const SalesSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventModel",
  },
});

export const SalesModel = mongoose.model("Sales", SalesSchema);
