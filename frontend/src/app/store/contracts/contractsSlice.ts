import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContracts,
  createContract,
  updateContract,
} from "./contractsThunks";
import type { Contract } from "./contracts.types";

interface ContractsState {
  contractLists: Contract[];
  selectedContract: Contract | null | undefined;
  lastKey: null | string;
  totalCount: number;
  page: number;
  lastKeyMap: Record<number, string | null>;
  loading: {
    list: boolean;
    createUpdateLoader: boolean;
  };
  error: string | null;
}

const initialState: ContractsState = {
  contractLists: [],
  lastKey: null,
  selectedContract: null,
  totalCount: 0,
  page: 1,
  lastKeyMap: { 1: null },
  loading: {
    list: false,
    createUpdateLoader: false,
  },
  error: null,
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setSelectedContract(state, action: PayloadAction<Contract | null>) {
      state.selectedContract = action?.payload;
    },
    clearSelectedContract(state) {
      state.selectedContract = null;
    },
    resetPagination(state) {
      state.page = 1;
      state.lastKeyMap = { 1: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchContracts.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        const { data, nextKey, totalCount, page } = action.payload;
        state.loading.list = false;
        state.contractLists = data.sort(
          (a: Contract, b: Contract) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        state.totalCount = totalCount;
        state.lastKeyMap[page + 1] = nextKey;
        state.page = page;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createContract.pending, (state) => {
        state.loading.createUpdateLoader = true;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.loading.createUpdateLoader = false;
        const id = action.payload;

        const updatedContract = state.contractLists.find(
          (contract) => contract.id === id,
        );

        if (updatedContract) {
          state.selectedContract = updatedContract;
        }
      })
      .addCase(createContract.rejected, (state, action) => {
        state.loading.createUpdateLoader = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateContract.pending, (state) => {
        state.loading.createUpdateLoader = true;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.loading.createUpdateLoader = false;
        const id = action.payload;

        const updatedContract = state.contractLists.find(
          (contract) => contract.id === id,
        );

        if (updatedContract) {
          state.selectedContract = updatedContract;
        }
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.loading.createUpdateLoader = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedContract, clearSelectedContract, resetPagination } =
  contractsSlice.actions;

export default contractsSlice.reducer;
