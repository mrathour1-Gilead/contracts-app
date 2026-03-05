import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import type { Contract, CMODetails } from "./contracts.types";
import { mapCMODetailsToContract } from "./contracts.mapper";
import type { RootState } from  "../store"

// LIST
// contractsThunks.ts
export const fetchContracts = createAsyncThunk<
  {
    data: Contract[]
    nextKey: string | null
    page: number
    totalCount: number
  },
  { page: number, search?: string },
  { state: RootState }
>("contracts/fetchList", async ({ page, search }, { getState }) => {
  const { contracts } = getState()

  const lastKey = contracts.lastKeyMap[page] ?? null

  const res = await apiClient.get("/contracts/fetchList", {
    params: {
      lastKey,
      search
    },
  })

  return {
    data: res.data.data,
    nextKey: res.data.nextKey ?? null,
    totalCount: res.data.totalCount,
    page,
  }
})

type CreateContractPayload = {
  cmoDetails: CMODetails;
};

export const createContract = createAsyncThunk<
  Contract,
  CreateContractPayload,
  { rejectValue: string }
>("api/contracts/create", async ({ cmoDetails }, { rejectWithValue }) => {
  try {
    // Flatten cmoDetails into top-level fields
    const payloadData: Partial<Contract> = mapCMODetailsToContract(cmoDetails)
    console.log("payloadData", payloadData)
    const res = await apiClient.post(
      "/contracts/create",
      payloadData
    );

    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message || "Fail to save contract");
  }
});

// UPDATE
export const updateContract = createAsyncThunk<
  Contract,
  { id: string; data: Partial<Contract> },
  { rejectValue: string }
>("api/contracts/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    // const res = await apiClient.put(
    //   `/contracts/update/${id}`,
    //   data
    // );
    // return res.data;
    console.log("id, data", id, data)
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});