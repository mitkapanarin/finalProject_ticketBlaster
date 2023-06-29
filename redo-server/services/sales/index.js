import express from "express";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";
import { getCartItems, removeCartItem, addItemToCart } from './handlers/salesHandler.js';

const app = express();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes
app.get('/api/v1/sales/items', getCartItems);
app.delete('/api/v1/sales/items/:itemId', removeCartItem);
app.post('/api/v1/sales/items/:userID', addItemToCart);


app.listen(process.env.PORT_SALES, () =>
  console.log(`events server listening on port ${process.env.PORT_SALES}`)
);
