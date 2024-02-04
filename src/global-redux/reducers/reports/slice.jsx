import { toast } from "react-toastify";
import {
  saveReports,
  getAllReports,
  editSingleReport,
  deleteSingleReport,
  publishReport,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reportAddSuccess: false,
  allReports: [],
};

export const setupSaveReports = createAsyncThunk(
  "reports/saveReports",
  async (data, thunkAPI) => {
    return saveReports(data, thunkAPI);
  }
);
export const setupGetAllReports = createAsyncThunk(
  "reports/getAllReports",
  async (data, thunkAPI) => {
    return getAllReports(data, thunkAPI);
  }
);

export const setupUpdateSingleReport = createAsyncThunk(
  "reports/editSingleReport",
  async (data, thunkAPI) => {
    return editSingleReport(data, thunkAPI);
  }
);

export const setupDeleteSingleReport = createAsyncThunk(
  "reports/deleteSingleReport",
  async (data, thunkAPI) => {
    return deleteSingleReport(data, thunkAPI);
  }
);
export const setupPublishReport = createAsyncThunk(
  "reports/publishReport",
  async (data, thunkAPI) => {
    return publishReport(data, thunkAPI);
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
    // Get All Reports
    [setupGetAllReports.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllReports.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allReports = payload?.data || [];
    },
    [setupGetAllReports.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Single Report
    [setupUpdateSingleReport.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateSingleReport.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reportAddSuccess = true;
      toast.success("Report Updated Successfully");
    },
    [setupGetAllReports.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Delete Report
    [setupDeleteSingleReport.pending]: (state) => {
      state.loading = true;
    },
    [setupDeleteSingleReport.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reportAddSuccess = true;
      toast.success("Report Deleted Successfully");
    },
    [setupDeleteSingleReport.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Publish Report
    [setupPublishReport.pending]: (state) => {
      state.loading = true;
    },
    [setupPublishReport.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reportAddSuccess = true;
      toast.success("Report Published Successfully");
    },
    [setupPublishReport.rejected]: (state, { payload }) => {
      state.loading = false;
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
