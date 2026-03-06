import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import type { Contract } from "./contracts.types";
import {
  generateContractSearchFields,
  generateInitialPayload,
} from "./contracts.mapper";
import type { RootState } from "../store";

/* ================================
   Helper Function
================================ */

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

/* ================================
   FETCH CONTRACT LIST
================================ */

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

/* ================================
   CREATE CONTRACT
================================ */

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
        ...generateContractSearchFields(data, contracts.selectedContract || {}),
        ...generateInitialPayload(),
      };

      return await saveContractAndRefresh(
        apiClient.post("/contracts/create", payload),
        dispatch,
        getState
      );
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Fail to save contract"
      );
    }
  }
);

/* ================================
   UPDATE CONTRACT
================================ */

export const updateContract = createAsyncThunk<
  string,
  { id: string; data: Partial<Contract> },
  { state: RootState; rejectValue: string }
>(
  "api/contracts/update",
  async ({ id, data }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { contracts } = getState();

      const payload = {
        ...data,
        ...generateContractSearchFields(data, contracts.selectedContract || {}),
      };

      return await saveContractAndRefresh(
        apiClient.put(`/contracts/update/${id}`, payload),
        dispatch,
        getState
      );
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Fail to update contract"
      );
    }
  }
);