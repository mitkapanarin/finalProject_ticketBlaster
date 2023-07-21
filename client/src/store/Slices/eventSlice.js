import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventName: "",
    image: "",
    eventDate: "",
    eventLocation: "",
  };

export const eventSlice = createSlice({
  name: 'Events',
  initialState,
  reducers: {
    deleteEventSuccess: (state, action) => {
      const eventID = action.payload;
      return state.filter((event) => event._id !== eventID); //Keep only those events whose _id property is not equal to the eventID we want to delete.
    },
  },
});

export const { deleteEventSuccess } = eventSlice.actions;
