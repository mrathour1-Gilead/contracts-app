import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

/**
 * LIST contracts
 * GET /contracts
 */
// export const fetchContracts = createAsyncThunk(
//   "contracts/fetchList",
//   async () => {
//     await new Promise((res) => setTimeout(res, 600));
//     return {
//       data : [
//       {
//         id: "CNT-001",
//         contractName: "Lonza Biologics Master Service Agreement",
//         cmo: "Lonza Biologics",
//         type: "MSA",
//         status: "Active",
//         effectiveDate: "2023-01-15",
//         owner: "John Smith",
//       },
//       {
//         id: "CNT-002",
//         contractName: "Catalent Pharma Supply Agreement",
//         cmo: "Catalent",
//         type: "PSA",
//         status: "Expiring Soon",
//         effectiveDate: "2020-08-01",
//         owner: "Priya Sharma",
//       },
//       {
//         id: "CNT-003",
//         contractName: "Samsung Biologics Statement of Work",
//         cmo: "Samsung Biologics",
//         type: "SOW",
//         status: "Draft",
//         effectiveDate: "2024-03-10",
//         owner: "Michael Brown",
//       },
//       {
//         id: "CNT-004",
//         contractName: "WuXi AppTec Quality Agreement",
//         cmo: "WuXi AppTec",
//         type: "QAG",
//         status: "Archived",
//         effectiveDate: "2019-11-20",
//         owner: "Anita Verma",
//       },
//     ],
//     }
//   },
// );

export const fetchContracts = createAsyncThunk(
  "api/contracts/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/contracts/fetchList");
      return response.data; // expecting array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// CREATE
export const createContract = createAsyncThunk(
  "api/contracts/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/contracts/create", payload);
      return response.data; // expecting created contract with id
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * UPDATE contract (section-wise)
 * PUT /contracts/:id
 */
export const updateContract = createAsyncThunk(
  "api/contracts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/api/contracts/update/${id}`, data);
      return response.data; // updated contract or partial
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);