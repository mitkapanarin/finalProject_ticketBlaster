// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";

// // redux-persist setup
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // importing reducers from slice folder
// import { counterSlice } from "./Slice/counter";
// import { userDataSlice } from "./Slice/UserData";

// const persistConfig = {
//   key: "counter",
//   storage,
// };

// const persistedCounter = persistReducer(persistConfig, counterSlice.reducer);

// const persistedUserData = persistReducer(
//   {
//     key: "User Data",
//     storage,
//   },
//   userDataSlice.reducer
// );

// export const store = configureStore({
//   reducer: {
//     counter: persistedCounter,
//     userData: persistedUserData,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
// });

// export const persistedStore = persistStore(store);

// setupListeners(store.dispatch);

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './API/userApi'
import { userSlice } from './Slices/userSlice'
import { eventApi } from './API/eventApi'

// Configures the Redux store with the reducers and middleware
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,  // Configures the reducer for the userApi slice
    [eventApi.reducerPath]: eventApi.reducer,  // Configures the reducer for the eventApi slice
    User: userSlice.reducer, // Configures the reducer for the userSlice
  },

  // Combines the middleware used by Redux Toolkit Query with the default middleware for Redux
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, eventApi.middleware),
})

// Sets up the listeners for the store, allowing RTK Query to automatically handle cache updates and error handling
setupListeners(store.dispatch)