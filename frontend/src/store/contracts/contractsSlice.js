// store/contracts/contractsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContracts,
  createContract,
  updateContract,
} from "./contractsThunks";

const initialState = {
  list: [],
  selectedContract: null,

  loading: {
    list: false,
    create: false,
    update: false,
  },

  error: null,
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setSelectedContract(state, action) {
      state.selectedContract = action.payload;
    },
    clearSelectedContract(state) {
      state.selectedContract = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchContracts.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createContract.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.loading.create = false;
        state.list.push(action.payload);
        state.selectedContract = action.payload;
      })
      .addCase(createContract.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateContract.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.loading.update = false;

        const { id, data } = action.payload;
        const index = state.list.findIndex((c) => c.id === id);

        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...data,
          };
        }

        if (state.selectedContract?.id === id) {
          state.selectedContract = {
            ...state.selectedContract,
            ...data,
          };
        }
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedContract,
  clearSelectedContract,
} = contractsSlice.actions;

export default contractsSlice.reducer;
 