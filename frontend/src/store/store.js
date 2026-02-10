// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import contractsReducer from "./contracts/contractsSlice";

export const store = configureStore({
  reducer: {
    contracts: contractsReducer,
  },
});
 