// store/contracts/contractsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// LIST
export const fetchContracts = createAsyncThunk(
  "contracts/fetchList",
  async () => {
    await new Promise((res) => setTimeout(res, 600));
    return [
      {
        id: "CNT-001",
        contractName: "Lonza Biologics Master Service Agreement",
        cmo: "Lonza Biologics",
        type: "MSA",
        status: "Active",
        effectiveDate: "2023-01-15",
        owner: "John Smith",
      },
      {
        id: "CNT-002",
        contractName: "Catalent Pharma Supply Agreement",
        cmo: "Catalent",
        type: "PSA",
        status: "Expiring Soon",
        effectiveDate: "2020-08-01",
        owner: "Priya Sharma",
      },
      {
        id: "CNT-003",
        contractName: "Samsung Biologics Statement of Work",
        cmo: "Samsung Biologics",
        type: "SOW",
        status: "Draft",
        effectiveDate: "2024-03-10",
        owner: "Michael Brown",
      },
      {
        id: "CNT-004",
        contractName: "WuXi AppTec Quality Agreement",
        cmo: "WuXi AppTec",
        type: "QAG",
        status: "Archived",
        effectiveDate: "2019-11-20",
        owner: "Anita Verma",
      },
    ];
  },
);

// CREATE
export const createContract = createAsyncThunk(
  "contracts/create",
  async (payload) => {
    // 🔁 backend later
    return {
      id: Date.now().toString(), // mock ID
      ...payload,
    };
  },
);

// UPDATE (section-wise)
export const updateContract = createAsyncThunk(
  "contracts/update",
  async ({ id, data }) => {
    // 🔁 backend later
    return { id, data };
  },
);
