import { SalesModel } from "../../../pkg/Model/salesModel.js";

export const makeSales = async (req, res) => {
  const { customerID, eventID } = req.body;
  try {
    const newSale = new SalesModel({
      customerID,
      eventID,
      quantity,
    });
    const savedSale = await newSale.save();
    res
      .status(201)
      .json({ message: "Sale made successfully", data: savedSale });
  } catch (error) {
    res.status(500).json({ message: "Server Error", log: error.message });
  }
};

export const refund = async (req, res) => {
  try {
    res.status(200).json({ message: "Refund successful" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};

// Get cart items ❌
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await SalesModel.find().populate("event");
    res.status(200).json({ data: cartItems });
  } catch (error) {
    res.status(500).json({ message: "Server Error", log: error.message });
  }
};

// Remove item from cart ❌
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    await SalesModel.findByIdAndRemove(itemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", log: error.message });
  }
};
// Add item to cart ❌
export const addItemToCart = async (req, res) => {
  try {
    const { eventID } = req.body;
    const { email } = req.params;
    const customerEmail = email;

    // Create a new SalesModel instance
    const newItem = new SalesModel({
      eventID,
      customerEmail,
    });

    // Save the new item to the database
    const savedItem = await newItem.save();

    res
      .status(201)
      .json({ message: "Item added to cart successfully", data: savedItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", log: error.message });
  }
};
