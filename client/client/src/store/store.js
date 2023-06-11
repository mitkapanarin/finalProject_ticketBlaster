import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// redux-persist setup
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// importing reducers from slice folder
import { counterSlice } from "./Slice/counter";

const persistConfig = {
  key: "counter",
  storage,
};

const persistedCounter = persistReducer(persistConfig, counterSlice.reducer);

export const store = configureStore({
  reducer: {
    counter: persistedCounter,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export const persistedStore = persistStore(store);

setupListeners(store.dispatch);