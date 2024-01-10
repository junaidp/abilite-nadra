import { toast } from "react-toastify";
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
    resetCompanyRegisterSuccess: (state, action) => {
      state.registerCompanySuccess = false;
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
      toast.success("Company registered successfully");
    },
    [setupRegisterCompany.rejected]: (state, { payload }) => {
      state.loading = false;
      state.registerCompanySuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
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

export const { changeCompanyErrorState, resetCompanyRegisterSuccess } =
  slice.actions;

export default slice.reducer;
