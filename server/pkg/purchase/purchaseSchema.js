const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ticket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

const PurchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = PurchaseModel;
