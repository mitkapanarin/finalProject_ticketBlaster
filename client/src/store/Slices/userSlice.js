import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  token: "",
  _id: "",
};
// Defining the initial state object with properties retrieved from "readData"
// If any property is missing or undefined, it falls back to an empty string

export const userSlice = createSlice({ // Creating a Redux slice named "userSlice" with initial state and reducer functions
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state, ...action.payload
      }
    },
    updateUserStateData: (state, action) => {
      return {
        ...state, ...action.payload
      }
    },

    logout: (state) => initialState
  },
});

export const { login, logout, updateUserStateData } = userSlice.actions;
// Exporting the generated action creators for the login, logout, and updateUserStateData reducers