import { SalesModel } from "../../../pkg/Model/salesModel.js";

// Get cart items
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await SalesModel.find().populate('event');
    res.status(200).json({ data: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', log: error.message });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    await SalesModel.findByIdAndRemove(itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', log: error.message });
  }
};
// Add item to cart
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

    res.status(201).json({ message: 'Item added to cart successfully', data: savedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', log: error.message });
  }
};
