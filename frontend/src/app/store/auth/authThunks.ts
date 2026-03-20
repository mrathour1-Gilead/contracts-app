import apiClient from "@/app/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk<any, void>(
  "auth/finduserInfo",
  async (_: any, { rejectWithValue }) => {
    try {
      const res: any = await apiClient.get("/auth/userinfo");
      return {
        data: res.data,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message || "error fetching user info");
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      if (!email || !password) {
        return rejectWithValue("Email and password are required");
      }

      const res: any = await apiClient.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("contractToken", res?.data?.token);
      await dispatch(fetchUserInfo());
       return res?.data?.token;
    } catch (error) {
      return rejectWithValue("Login failed. Please try again.");
    }
  },
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const res: any = await apiClient.post("/auth/signup", {
        email,
        password,
        name,
      });
      localStorage.setItem("contractToken", res?.data?.token);
      await dispatch(fetchUserInfo());
      return res?.data?.token;
    } catch (error) {
      return rejectWithValue("Signup failed. Please try again.");
    }
  },
);

