import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItems: [],
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return {
        basketItems: [...state.basketItems, action.payload],
      };
    },
    removeOneItemFromCart: (state, action) => {
      console.log(action.payload);
      return {
        basketItems: state.basketItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeOneItemFromCart, resetCart } =
  basketSlice.actions;
