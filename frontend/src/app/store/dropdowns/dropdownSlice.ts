import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDropdownOptions,
  createDropdownOption,
  updateDropdownOption,
  toggleDropdownOption,
} from "./dropdownThunks";

export interface DropdownOption {
  id: number;
  label: string;
  value: string;
  type: string;
  active: boolean;
}

interface DropdownState {
  list: DropdownOption[];
  selected: DropdownOption | null;
  loading: {
    list: boolean;
    createUpdate: boolean;
  };
  error: string | null;
}

const initialState: DropdownState = {
  list: [],
  selected: null,
  loading: {
    list: false,
    createUpdate: false,
  },
  error: null,
};

const dropdownOptionsSlice = createSlice({
  name: "dropdownOptions",
  initialState,
  reducers: {
    setSelectedOption(state, action: PayloadAction<DropdownOption | null>) {
      state.selected = action.payload;
    },
    clearSelectedOption(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchDropdownOptions.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchDropdownOptions.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = action.payload;
      })
      .addCase(fetchDropdownOptions.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createDropdownOption.pending, (state) => {
        state.loading.createUpdate = true;
      })
      .addCase(createDropdownOption.fulfilled, (state) => {
        state.loading.createUpdate = false;
      })
      .addCase(createDropdownOption.rejected, (state, action) => {
        state.loading.createUpdate = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateDropdownOption.pending, (state) => {
        state.loading.createUpdate = true;
      })
      .addCase(updateDropdownOption.fulfilled, (state) => {
        state.loading.createUpdate = false;
      })
      .addCase(updateDropdownOption.rejected, (state, action) => {
        state.loading.createUpdate = false;
        state.error = action.payload as string;
      })

      // TOGGLE
      .addCase(toggleDropdownOption.fulfilled, (state, action) => {
        const { id, active } = action.payload;

        const item = state.list.find((i) => i.id === id);
        if (item) item.active = active;
      });
  },
});

export const {
  setSelectedOption,
  clearSelectedOption,
} = dropdownOptionsSlice.actions;

export default dropdownOptionsSlice.reducer;