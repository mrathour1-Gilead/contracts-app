import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import type { Contract } from "./contracts.types";
// import {
//   generateContractSearchFields,
//   generateInitialPayload,
// } from "./contracts.mapper";
import type { RootState } from "../store";


export const fetchContracts = createAsyncThunk<
  {
    data: Contract[];
    nextKey: string | null;
    page: number;
    totalCount: number;
  },
  { page: number; search?: string },
  { state: RootState; rejectValue: string }
>("contracts/fetchList", async ({ page, search }, { getState, rejectWithValue }) => {
  try {
    const { contracts } = getState();

    const lastKey = contracts.lastKeyMap[page] ?? null;

    const res = await apiClient.get("/contracts/fetchList", {
      params: {
        lastKey,
        search,
      },
    });

    return {
      data: res.data.data,
      nextKey: res.data.nextKey ?? null,
      totalCount: res.data.totalCount,
      page,
    };
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message || "Failed to fetch contracts");
  }
});

const saveContractAndRefresh = async (
  request: Promise<any>,
  dispatch: any,
  getState: () => RootState
) => {
  try {
    const res = await request;

    const id = res.data.id;

    const { page } = getState().contracts;

    await dispatch(fetchContracts({ page }));

    return id;
  } catch (err: any) {
    throw err;
  }
};



export const createContract = createAsyncThunk<
  string,
  Partial<Contract>,
  { state: RootState; rejectValue: string }
>(
  "api/contracts/create",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const { contracts } = getState();

      const payload = {
        ...data,
        statusUpdate: {},
        generalTerms: {},
        delivery: {},
        product: {},
        forecastOrdering: {},
        pricing: {},
        rawMaterials: {},
        qcTesting: {},
        performance: {},
        governance: {},
        comments: {},
        specialFields: {},
        // ...generateContractSearchFields(data, contracts.selectedContract || {}),
      };

      const response = await saveContractAndRefresh(
        apiClient.post("/contracts/create", payload),
        dispatch,
        getState
      );
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Fail to save contract"
      );
    }
  }
);


export const updateContract = createAsyncThunk<
  string,
  { id: string; data: Partial<Contract> },
  { state: RootState; rejectValue: string }
>(
  "api/contracts/update",
  async ({ id, data }, { dispatch, getState, rejectWithValue }) => {
    try {
      // const { contracts } = getState();

      // const payload = {
      //   ...data,
      //   ...generateContractSearchFields(data, contracts.selectedContract || {}),
      // };

     const response =  await saveContractAndRefresh(
        apiClient.put(`/contracts/update/${id}`, data),
        dispatch,
        getState
      );
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Fail to update contract"
      );
    }
  }
);

export const fetchContractAuditLogs = createAsyncThunk(
  "contracts/fetchAuditLogs",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/contracts/auditlogs/${id}`);
      return {
        data: res.data.data,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const bulkUploadContracts = createAsyncThunk<
  void,
  any[],
  { state: RootState; rejectValue: string }
>(
  "api/contracts/bulkUpload",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const { page } = getState().contracts;

      await apiClient.post("/contracts/bulk-upload", data);

      await dispatch(fetchContracts({ page }));

    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Bulk upload failed"
      );
    }
  }
);