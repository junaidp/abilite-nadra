import { toast } from "react-toastify";
import {
  getAllInternalAuditReports,
  saveInternalAuditReport,
  updateInternalAuditReport,
  deleteInternalAuditReport,
  getSingleInternalAuditReport,
  getAllJobsForInternalAuditReport,
  createInternalAuditReportObject,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allInternalAuditReports: [],
  jobsForInternalAuditReports: [],
  internalAuditReportObject: {},
  singleInternalAuditReport: {},
  internalAuditReportAddSuccess: false,
};

export const setupGetAllInternalAuditReports = createAsyncThunk(
  "internalAuditReport/getAllInternalAuditReports",
  async (data, thunkAPI) => {
    return getAllInternalAuditReports(data, thunkAPI);
  }
);

export const setupSaveInternalAuditReport = createAsyncThunk(
  "internalAuditReport/saveInternalAuditReport",
  async (data, thunkAPI) => {
    return saveInternalAuditReport(data, thunkAPI);
  }
);

export const setupUpdateInternalAuditReport = createAsyncThunk(
  "internalAuditReport/updateInternalAuditReport",
  async (data, thunkAPI) => {
    return updateInternalAuditReport(data, thunkAPI);
  }
);
export const setupDeleteInternalAuditReport = createAsyncThunk(
  "internalAuditReport/deleteInternalAuditReport",
  async (data, thunkAPI) => {
    return deleteInternalAuditReport(data, thunkAPI);
  }
);

export const setupGetSingleInternalAuditReport = createAsyncThunk(
  "internalAuditReport/getSingleInternalAuditReport",
  async (data, thunkAPI) => {
    return getSingleInternalAuditReport(data, thunkAPI);
  }
);

export const setupGetAllJobsForInternalAuditReport = createAsyncThunk(
  "internalAuditReport/getAllJobsForInternalAuditReport",
  async (data, thunkAPI) => {
    return getAllJobsForInternalAuditReport(data, thunkAPI);
  }
);

export const setupCreateInternalAuditReportObject = createAsyncThunk(
  "internalAuditReport/createInternalAuditReportObject",
  async (data, thunkAPI) => {
    return createInternalAuditReportObject(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "internalAuditReport",
  initialState,
  reducers: {
    resetInternalAuditReportAddSuccess: (state) => {
      state.internalAuditReportAddSuccess = false;
    },
    handleResetData: (state) => {
      (state.loading = false),
        (state.allInternalAuditReports = []),
        (state.jobsForInternalAuditReports = []),
        (state.internalAuditReportObject = {}),
        (state.singleInternalAuditReport = {}),
        (state.internalAuditReportAddSuccess = false);
    },
  },
  extraReducers: (builder) => {
    // Get All Internal Audit Reports
    builder
      .addCase(setupGetAllInternalAuditReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllInternalAuditReports.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.allInternalAuditReports = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(setupGetAllInternalAuditReports.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Add Internal Audit Report
    builder
      .addCase(setupSaveInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveInternalAuditReport.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Report Added Successfully");
      })
      .addCase(setupSaveInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Internal Audit Report
    builder
      .addCase(setupUpdateInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateInternalAuditReport.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Report Updated Successfully");
      })
      .addCase(setupUpdateInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Internal Audit Report
    builder
      .addCase(setupDeleteInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteInternalAuditReport.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Report Deleted Successfully");
      })
      .addCase(setupDeleteInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Single Internal  Audit Report
    builder
      .addCase(setupGetSingleInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetSingleInternalAuditReport.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.singleInternalAuditReport = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(setupGetSingleInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Jobs  Audit Report
    builder
      .addCase(setupGetAllJobsForInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllJobsForInternalAuditReport.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.jobsForInternalAuditReports = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(
        setupGetAllJobsForInternalAuditReport.rejected,
        (state, action) => {
          state.loading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Get Single Internal  Audit Report
    builder
      .addCase(setupCreateInternalAuditReportObject.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupCreateInternalAuditReportObject.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.internalAuditReportObject = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(
        setupCreateInternalAuditReportObject.rejected,
        (state, action) => {
          state.loading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
  },
});

export const { resetInternalAuditReportAddSuccess, handleResetData } =
  slice.actions;

export default slice.reducer;
