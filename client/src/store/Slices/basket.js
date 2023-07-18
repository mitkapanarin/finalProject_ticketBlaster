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
      const updatedBasketItems = state.basketItems.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        basketItems: updatedBasketItems,
      };
    },

    resetCart: () => initialState,
  },
});

export const { addToCart, removeOneItemFromCart, resetCart } =
  basketSlice.actions;
