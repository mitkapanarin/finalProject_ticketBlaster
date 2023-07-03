import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "SearchTerm",
  initialState,
  reducers: {
    changeSearchTerm: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetSearchTerm: () => initialState,
  },
});

export const { resetSearchTerm, changeSearchTerm } = searchSlice.actions;
