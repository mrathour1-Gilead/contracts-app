// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import contractsSlice from "./contracts/contractsSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    contracts: contractsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;