import { toast } from "react-toastify";
import {
  getSingleReport,
  getInitialSingleReport,
  getAllReporting,
  updateReporting,
  approveReporting,
  getAllFollowUp,
  updateFollowUp,
  updateReportingByManagementAuditee,
  reportingFileUpload,
  reportingFileDelete,
  reportingFileUpdate,
  reportingFeedBack,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  initialLoading: false,
  reportingAddSuccess: false,
  allReporting: [],
  allFollowUp: [],
  singleReport: {},
  managementAuditeeReportingAddSuccess: false,
  reportingFileUploadSuccess: false,
  totalNoOfRecords: 0,
};

export const setupGetAllReporting = createAsyncThunk(
  "reporting/getAllReporting",
  async (data, thunkAPI) => {
    return getAllReporting(data, thunkAPI);
  }
);

export const setupGetInitialSingleReport = createAsyncThunk(
  "reporting/getInitialSingleReport",
  async (data, thunkAPI) => {
    return getInitialSingleReport(data, thunkAPI);
  }
);

export const setupGetSingleReport = createAsyncThunk(
  "reporting/getSingleReport",
  async (data, thunkAPI) => {
    return getSingleReport(data, thunkAPI);
  }
);

export const setupUpdateReporting = createAsyncThunk(
  "reporting/updateReporting",
  async (data, thunkAPI) => {
    return updateReporting(data, thunkAPI);
  }
);
export const setupApproveReporting = createAsyncThunk(
  "reporting/approveReporting",
  async (data, thunkAPI) => {
    return approveReporting(data, thunkAPI);
  }
);

export const setupGetAllFollowUp = createAsyncThunk(
  "reporting/getAllFollowUp",
  async (data, thunkAPI) => {
    return getAllFollowUp(data, thunkAPI);
  }
);

export const setupUpdateFollowUp = createAsyncThunk(
  "reporting/updateFollowUp",
  async (data, thunkAPI) => {
    return updateFollowUp(data, thunkAPI);
  }
);
export const setupUpdateReportingByManagementAuditee = createAsyncThunk(
  "reporting/updateReportingByManagementAuditee",
  async (data, thunkAPI) => {
    return updateReportingByManagementAuditee(data, thunkAPI);
  }
);
export const setupReportingFileUpload = createAsyncThunk(
  "reporting/reportingFileUpload",
  async (data, thunkAPI) => {
    return reportingFileUpload(data, thunkAPI);
  }
);
export const setupReportingFileDelete = createAsyncThunk(
  "reporting/reportingFileDelete",
  async (data, thunkAPI) => {
    return reportingFileDelete(data, thunkAPI);
  }
);
export const setupReportingFileUpdate = createAsyncThunk(
  "reporting/reportingFileUpdate",
  async (data, thunkAPI) => {
    return reportingFileUpdate(data, thunkAPI);
  }
);
export const setupReportingFeedBack = createAsyncThunk(
  "reporting/reportingFeedBack",
  async (data, thunkAPI) => {
    return reportingFeedBack(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "reporting",
  initialState,
  reducers: {
    resetReportingAddSuccess: (state) => {
      state.reportingAddSuccess = false;
    },
    resetReportingFileUploadAddSuccess: (state) => {
      state.reportingFileUploadSuccess = false;
    },
    resetManagementAuditeeReportingAddSuccess: (state) => {
      state.managementAuditeeReportingAddSuccess = false;
    },
    resetReports: (state) => {
      state.loading = false;
      state.initialLoading = false;
      state.reportingAddSuccess = false;
      state.allReporting = [];
      state.allFollowUp = [];
      state.singleReport = {};
      state.totalNoOfRecords = 0;
    },
  },
  extraReducers: (builder) => {
    // Get All Reporting
    builder
      .addCase(setupGetAllReporting.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllReporting.fulfilled, (state, { payload }) => {
        state.totalNoOfRecords = payload?.message;
        state.loading = false;
        state.allReporting = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllReporting.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Initial Report
    builder
      .addCase(setupGetSingleReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetSingleReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReport = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetSingleReport.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Initial Single Report
    builder
      .addCase(setupGetInitialSingleReport.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(setupGetInitialSingleReport.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.singleReport = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetInitialSingleReport.rejected, (state, { payload }) => {
        state.initialLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Reporting
    builder
      .addCase(setupUpdateReporting.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateReporting.fulfilled, (state) => {
        state.loading = false;
        state.reportingAddSuccess = true;
        toast.success("Reporting updated successfully");
      })
      .addCase(setupUpdateReporting.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Approve Reporting
    builder
      .addCase(setupApproveReporting.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupApproveReporting.fulfilled, (state) => {
        state.loading = false;
        state.reportingAddSuccess = true;
        toast.success("Reporting Approved Successfully");
      })
      .addCase(setupApproveReporting.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All Follow Up
    builder
      .addCase(setupGetAllFollowUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllFollowUp.fulfilled, (state, { payload }) => {
        state.totalNoOfRecords = payload?.message;
        state.loading = false;
        state.allFollowUp = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllFollowUp.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Follow Up
    builder
      .addCase(setupUpdateFollowUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateFollowUp.fulfilled, (state) => {
        state.loading = false;
        state.reportingAddSuccess = true;
        toast.success("Follow-up updated successfully");
      })
      .addCase(setupUpdateFollowUp.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Reporting By Management Auditee
    builder
      .addCase(setupUpdateReportingByManagementAuditee.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateReportingByManagementAuditee.fulfilled, (state) => {
        state.loading = false;
        state.managementAuditeeReportingAddSuccess = true;
        toast.success("Reporting submitted successfully");
      })
      .addCase(
        setupUpdateReportingByManagementAuditee.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Reporting File Upload
    builder
      .addCase(setupReportingFileUpload.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportingFileUpload.fulfilled, (state) => {
        state.loading = false;
        state.reportingFileUploadSuccess = true;
        toast.success("Reporting file uploaded successfully");
      })
      .addCase(setupReportingFileUpload.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Reporting File Delete
    builder
      .addCase(setupReportingFileDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportingFileDelete.fulfilled, (state) => {
        state.loading = false;
        state.reportingFileUploadSuccess = true;
        toast.success("Reporting file deleted successfully");
      })
      .addCase(setupReportingFileDelete.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Reporting File Update
    builder
      .addCase(setupReportingFileUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportingFileUpdate.fulfilled, (state) => {
        state.loading = false;
        state.reportingFileUploadSuccess = true;
        toast.success("Reporting file updated successfully");
      })
      .addCase(setupReportingFileUpdate.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Reporting Feedback
    builder
      .addCase(setupReportingFeedBack.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportingFeedBack.fulfilled, (state) => {
        state.loading = false;
        state.reportingAddSuccess = true;
        toast.success("Reporting FeedBack Provided Successfully");
      })
      .addCase(setupReportingFeedBack.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  resetReportingAddSuccess,
  resetReports,
  resetManagementAuditeeReportingAddSuccess,
  resetReportingFileUploadAddSuccess,
} = slice.actions;

export default slice.reducer;
