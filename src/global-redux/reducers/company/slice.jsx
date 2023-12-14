import { registerCompany, getCompanies } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  error: false,
  loading: false,
  registerCompanySuccess: false,
};

export const setupRegisterCompany = createAsyncThunk(
  "company/registerCompany",
  async (data, thunkAPI) => {
    return registerCompany(data, thunkAPI);
  }
);

export const setupGetCompanies = createAsyncThunk(
  "company/getCompanies",
  async (data, thunkAPI) => {
    return getCompanies(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeCompanyErrorState: (state, action) => {
      state.error = action.payload;
    },
    changeCompanyRegisterSuccess: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    // Register Comapany
    [setupRegisterCompany.pending]: (state) => {
      state.loading = true;
    },
    [setupRegisterCompany.fulfilled]: (state) => {
      state.loading = false;
      state.registerCompanySuccess = true;
    },
    [setupRegisterCompany.rejected]: (state, { payload }) => {
      state.loading = false;
      state.registerCompanySuccess = false;
      state.error = true;
    },
    // Get Comapanies
    [setupGetCompanies.pending]: (state) => {
      state.loading = true;
    },
    [setupGetCompanies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.companies = payload;
    },
    [setupGetCompanies.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { changeCompanyErrorState, changeCompanyRegisterSuccess } =
  slice.actions;

export default slice.reducer;
