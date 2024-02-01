import { toast } from "react-toastify";
import { registerCompany, getAllCompanies } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allCompanies: [],
  loading: false,
  companyAddSuccess: false,
};

export const setupRegisterCompany = createAsyncThunk(
  "company/registerCompany",
  async (data, thunkAPI) => {
    return registerCompany(data, thunkAPI);
  }
);

export const setupGetAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async (data, thunkAPI) => {
    return getAllCompanies(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCompanyRegisterSuccess: (state, action) => {
      state.companyAddSuccess = false;
    },
  },
  extraReducers: {
    // Register Comapany
    [setupRegisterCompany.pending]: (state) => {
      state.loading = true;
    },
    [setupRegisterCompany.fulfilled]: (state) => {
      state.loading = false;
      toast.success("Company registered successfully");
      state.companyAddSuccess = true;
    },
    [setupRegisterCompany.rejected]: (state, { payload }) => {
      state.loading = false;
      state.companyAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Get Comapanies
    [setupGetAllCompanies.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllCompanies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allCompanies = payload || [];
    },
    [setupGetAllCompanies.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetCompanyRegisterSuccess } = slice.actions;

export default slice.reducer;
