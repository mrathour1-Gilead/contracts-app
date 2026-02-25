// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import contractsReducer from "./contracts/contractsSlice";

export const store = configureStore({
  reducer: {
    contracts: contractsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;