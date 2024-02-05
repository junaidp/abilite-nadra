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
  extraReducers: (builder) => {
    // Save Reports
    builder
      .addCase(setupSaveReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveReports.fulfilled, (state) => {
        state.loading = false;
        toast.success("Report Added Successfully");
        state.reportAddSuccess = true;
      })
      .addCase(setupSaveReports.rejected, (state, { payload }) => {
        state.loading = false;
        state.companyAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All Reports
    builder
      .addCase(setupGetAllReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllReports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allReports = payload?.data || [];
      })
      .addCase(setupGetAllReports.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Single Report
    builder
      .addCase(setupUpdateSingleReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateSingleReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Updated Successfully");
      })
      .addCase(setupUpdateSingleReport.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Delete Report
    builder
      .addCase(setupDeleteSingleReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteSingleReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Deleted Successfully");
      })
      .addCase(setupDeleteSingleReport.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Publish Report
    builder
      .addCase(setupPublishReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupPublishReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Published Successfully");
      })
      .addCase(setupPublishReport.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetReportAddSuccess } = slice.actions;

export default slice.reducer;
