import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

export const SalesModel = mongoose.model("Sales", SalesSchema);
