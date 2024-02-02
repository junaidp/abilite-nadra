import { toast } from "react-toastify";
import { saveReports } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reportAddSuccess: false,
};

export const setupSaveReports = createAsyncThunk(
  "reports/saveReports",
  async (data, thunkAPI) => {
    return saveReports(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    resetReportAddSuccess: (state, action) => {
      state.reportAddSuccess = false;
    },
  },
  extraReducers: {
    // Save Reports
    [setupSaveReports.pending]: (state) => {
      state.loading = true;
    },
    [setupSaveReports.fulfilled]: (state) => {
      state.loading = false;
      toast.success("Report Added successfully");
      state.reportAddSuccess = true;
    },
    [setupSaveReports.rejected]: (state, { payload }) => {
      state.loading = false;
      state.companyAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetReportAddSuccess } = slice.actions;

export default slice.reducer;
