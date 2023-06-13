import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// redux-persist setup
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// importing reducers from slice folder
import { counterSlice } from "./Slice/counter";
import { userDataSlice } from "./Slice/UserData";

const persistConfig = {
  key: "counter",
  storage,
};

const persistedCounter = persistReducer(persistConfig, counterSlice.reducer);

const persistedUserData = persistReducer(
  {
    key: "User Data",
    storage,
  },
  userDataSlice.reducer
);

export const store = configureStore({
  reducer: {
    counter: persistedCounter,
    userData: persistedUserData,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export const persistedStore = persistStore(store);

setupListeners(store.dispatch);
