import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/app/api/apiClient";


// FETCH
export const fetchDropdownOptions = createAsyncThunk(
  "dropdownOptions/fetch",
  async (params: { type?: string; active?: boolean; search?: string }, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/dropdownOptions/fetchList", { params });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// CREATE
export const createDropdownOption = createAsyncThunk(
  "dropdownOptions/create",
  async (payload: { label: string; value: string; type: string }, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiClient.post("/dropdownOptions/create", payload);
      await dispatch(fetchDropdownOptions({ type: payload.type }))
      return res.data.id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// UPDATE
export const updateDropdownOption = createAsyncThunk(
  "dropdownOptions/update",
  async (
    { id, data }: { id: number; data: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await apiClient.put(`/dropdownOptions/update/${id}`, data);
      await dispatch(fetchDropdownOptions({ type: data.type }))
      return res.data.id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// TOGGLE ACTIVE
export const toggleDropdownOption = createAsyncThunk(
  "dropdownOptions/toggle",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiClient.patch(`/dropdownOptions/toggle/${id}`);
      await dispatch(fetchDropdownOptions({ type: res.data.type }))
      return res.data.type;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Toggle failed");
    }
  }
);