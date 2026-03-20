/**
 * Authentication Slice
 * Manages user authentication state using Redux Toolkit
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserInfo, loginAsync, signupAsync } from './authThunks';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userFetched: boolean,
  userFetching: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  userFetched: false,
  userFetching: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('contractToken');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Signup
    builder.addCase(signupAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupAsync.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(signupAsync.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.user = null;
      state.userFetching = true;

    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userFetched = true;
      state.user = action?.payload.data || null;
      state.isAuthenticated = true;
      state.userFetching = false;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.userFetched = true;
      state.user = null;
      state.userFetching = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
