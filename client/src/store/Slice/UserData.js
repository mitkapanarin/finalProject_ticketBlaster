import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: "",
  role: "",
  token: "",
};

export const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState,
  reducers: {
    registerUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUserData: () => initialState,
  },
});

export const { registerUser, resetUserData } = userDataSlice.actions;
