import { toast } from "react-toastify";
import {
  saveReport,
  getAllReports,
  getSingleReport,
  getSingleUpdatedReport,
  updateReport,
  deleteReport,
  publishReport,
  addHeading,
  updateHeading,
  deleteHeading,
  getAllUsers,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reportAddSuccess: false,
  singleReportObject: {},
  allReports: [],
  users: [],
  updateLoading: false,
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
export const setupGetSingleUpdatedReport = createAsyncThunk(
  "planningReport/getSingleUpdatedReport",
  async (data, thunkAPI) => {
    return getSingleUpdatedReport(data, thunkAPI);
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

export const setupGetAllUsers = createAsyncThunk(
  "planningReport/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
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
      state.updateLoading = false;
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
        state.reportAddSuccess = true;
        toast.success("Report Added Successfully");
      })
      .addCase(setupSaveReport.rejected, (state, { payload }) => {
        state.loading = false;
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
    // Get Initial Single Report
    builder
      .addCase(setupGetSingleReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetSingleReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReportObject = payload?.data;
      })
      .addCase(setupGetSingleReport.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Single Updated Report
    builder
      .addCase(setupGetSingleUpdatedReport.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(setupGetSingleUpdatedReport.fulfilled, (state, { payload }) => {
        state.updateLoading = false;
        state.singleReportObject = payload?.data;
      })
      .addCase(setupGetSingleUpdatedReport.rejected, (state, { payload }) => {
        state.updateLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Single Report
    builder
      .addCase(setupUpdateSingleReport.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(setupUpdateSingleReport.fulfilled, (state) => {
        state.updateLoading = false;
        state.reportAddSuccess = true;
        toast.success("Planning Report Updated Successfully");
      })
      .addCase(setupUpdateSingleReport.rejected, (state, { payload }) => {
        state.updateLoading = false;
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
        state.updateLoading = true;
      })
      .addCase(setupAddHeading.fulfilled, (state) => {
        state.updateLoading = false;
        state.reportAddSuccess = true;
        toast.success("Heading Added Successfully");
      })
      .addCase(setupAddHeading.rejected, (state, { payload }) => {
        state.updateLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Heading
    builder
      .addCase(setupUpdateHeading.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(setupUpdateHeading.fulfilled, (state) => {
        state.updateLoading = false;
        state.reportAddSuccess = true;
        toast.success("Report Published Successfully");
      })
      .addCase(setupUpdateHeading.rejected, (state, { payload }) => {
        state.updateLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Heading
    builder
      .addCase(setupDeleteHeading.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(setupDeleteHeading.fulfilled, (state) => {
        state.updateLoading = false;
        state.reportAddSuccess = true;
        toast.success("Report Deleted Successfully");
      })
      .addCase(setupDeleteHeading.rejected, (state, { payload }) => {
        state.updateLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    builder
      .addCase(setupGetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        const sortedArray = payload?.data;
        state.users = sortedArray;
      })
      .addCase(setupGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetReportAddSuccess, handleCleanUp } = slice.actions;

export default slice.reducer;
