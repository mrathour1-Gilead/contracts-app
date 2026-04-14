import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContracts,
  createContract,
  updateContract,
  fetchContractAuditLogs,
  bulkUploadContracts,
} from "./contractsThunks";
import type { AuditLog, Contract } from "./contracts.types";

interface ContractsState {
  contractLists: Contract[];
  auditLogs: AuditLog[];
  selectedContract: Contract | null | undefined;
  lastKey: null | string;
  totalCount: number;
  page: number;
  loading: {
    list: boolean;
    createUpdateLoader: boolean;
    auditLogs: boolean;
  };
  error: string | null;
}

const initialState: ContractsState = {
  contractLists: [],
  auditLogs: [],
  lastKey: null,
  selectedContract: null,
  totalCount: 0,
  page: 1,
  loading: {
    list: false,
    createUpdateLoader: false,
    auditLogs: true,
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
    clearAuditLogs(state) {
      state.auditLogs = [];
      state.loading.auditLogs = true;
      state.selectedContract = null;
    },
    resetPagination(state) {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchContracts.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        const { data, totalCount, page } = action.payload;
        state.loading.list = false;
        state.contractLists = data
        state.totalCount = totalCount;
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
      })
      .addCase(fetchContractAuditLogs.pending, (state) => {
        state.loading.auditLogs = true;
      })
      .addCase(fetchContractAuditLogs.fulfilled, (state, action) => {
        state.loading.auditLogs = false;

        state.auditLogs = action.payload.data;
      })
      .addCase(fetchContractAuditLogs.rejected, (state, action) => {
        state.loading.auditLogs = false;
        state.error = action.payload as string;
      })
      .addCase(bulkUploadContracts.pending, (state) => {
        state.loading.createUpdateLoader = true;
      })
      .addCase(bulkUploadContracts.fulfilled, (state) => {
        state.loading.createUpdateLoader = false;
      })
      .addCase(bulkUploadContracts.rejected, (state, action) => {
        state.loading.createUpdateLoader = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedContract,
  clearSelectedContract,
  resetPagination,
  clearAuditLogs,
} = contractsSlice.actions;

export default contractsSlice.reducer;
