import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  token: "",
  _id: "",
};


export const userSlice = createSlice({ 
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