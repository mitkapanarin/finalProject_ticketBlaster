import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./API/userApi";
import { userSlice } from "./Slices/userSlice";
import { searchSlice } from "./Slices/Search";
import {
  eventApi,
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useGetAllEventsQuery,
} from "./API/eventApi";

// Configures the Redux store with the reducers and middleware

const persistedUserData = persistReducer(
  {
    key: "User Data",
    storage,
  },
  userSlice.reducer
);

const persistedSearchTerm = persistReducer(
  {
    key: "Search Term",
    storage,
  },
  searchSlice.reducer
);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // Configures the reducer for the userApi slice
    [eventApi.reducerPath]: eventApi.reducer, // Configures the reducer for the eventApi slice
    User: persistedUserData, // Configures the reducer for the userSlice
    SearchTerm: persistedSearchTerm,
  },

  // Combines the middleware used by Redux Toolkit Query with the default middleware for Redux
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, eventApi.middleware),
});

export const persistedStore = persistStore(store);

// Sets up the listeners for the store, allowing RTK Query to automatically handle cache updates and error handling
setupListeners(store.dispatch);

export {
  // event API actions
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useGetAllEventsQuery,
};
