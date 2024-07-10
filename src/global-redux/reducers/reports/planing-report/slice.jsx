import { toast } from "react-toastify";
import {
  saveReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
  publishReport,
  addHeading,
  updateHeading,
  deleteHeading,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reportAddSuccess: false,
  singleReportObject: {},
  allReports: [],
};

export const setupSaveReport = createAsyncThunk(
  "planningReport/saveReport",
  async (data, thunkAPI) => {
    return saveReport(data, thunkAPI);
  }
);
export const setupGetAllReports = createAsyncThunk(
  "planningReport/getAllReports",
  async (data, thunkAPI) => {
    return getAllReports(data, thunkAPI);
  }
);

export const setupGetSingleReport = createAsyncThunk(
  "planningReport/getSingleReport",
  async (data, thunkAPI) => {
    return getSingleReport(data, thunkAPI);
  }
);

export const setupUpdateSingleReport = createAsyncThunk(
  "planningReport/updateReport",
  async (data, thunkAPI) => {
    return updateReport(data, thunkAPI);
  }
);

export const setupDeleteReport = createAsyncThunk(
  "planningReport/deleteReport",
  async (data, thunkAPI) => {
    return deleteReport(data, thunkAPI);
  }
);
export const setupPublishReport = createAsyncThunk(
  "planningReport/publishReport",
  async (data, thunkAPI) => {
    return publishReport(data, thunkAPI);
  }
);

export const setupAddHeading = createAsyncThunk(
  "planningReport/addHeading",
  async (data, thunkAPI) => {
    return addHeading(data, thunkAPI);
  }
);
export const setupUpdateHeading = createAsyncThunk(
  "planningReport/updateHeading",
  async (data, thunkAPI) => {
    return updateHeading(data, thunkAPI);
  }
);
export const setupDeleteHeading = createAsyncThunk(
  "planningReport/deleteHeading",
  async (data, thunkAPI) => {
    return deleteHeading(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "planningReport",
  initialState,
  reducers: {
    resetReportAddSuccess: (state) => {
      state.reportAddSuccess = false;
    },
    handleCleanUp: (state) => {
      state.loading = false;
      state.reportAddSuccess = false;
      state.singleReportObject = {};
    },
  },
  extraReducers: (builder) => {
    // Save Reports
    builder
      .addCase(setupSaveReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveReport.fulfilled, (state) => {
        state.loading = false;
        toast.success("Report Added Successfully");
        state.reportAddSuccess = true;
      })
      .addCase(setupSaveReport.rejected, (state, { payload }) => {
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
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        state.allReports = sortedArray || [];
        state.loading = false;
      })
      .addCase(setupGetAllReports.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Initial Single Report
    builder
      .addCase(setupGetSingleReport.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(setupGetSingleReport.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.singleReportObject = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetSingleReport.rejected, (state, { payload }) => {
        state.initialLoading = false;
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
      .addCase(setupUpdateSingleReport.fulfilled, (state) => {
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
      .addCase(setupDeleteReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteReport.fulfilled, (state) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Deleted Successfully");
      })
      .addCase(setupDeleteReport.rejected, (state, { payload }) => {
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
      .addCase(setupPublishReport.fulfilled, (state) => {
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
    // Add Heading
    builder
      .addCase(setupAddHeading.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddHeading.fulfilled, (state) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Published Successfully");
      })
      .addCase(setupAddHeading.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Heading
    builder
      .addCase(setupUpdateHeading.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateHeading.fulfilled, (state) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Published Successfully");
      })
      .addCase(setupUpdateHeading.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Heading
    builder
      .addCase(setupDeleteHeading.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteHeading.fulfilled, (state) => {
        state.loading = false;
        state.reportAddSuccess = true;
        toast.success("Report Deleted Successfully");
      })
      .addCase(setupDeleteHeading.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetReportAddSuccess, handleCleanUp } = slice.actions;

export default slice.reducer;
