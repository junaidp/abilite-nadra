import { toast } from "react-toastify";
import {
  getSingleReport,
  getSingleReportLite,
  getInitialSingleReport,
  getInitialSingleReportLite,
  getSingleObservation,
  getAllReporting,
  updateReporting,
  submitReportingInFollowUp,
  approveReporting,
  getAllFollowUp,
  updateFollowUp,
  updateFollowUpByManagement,
  updateReportingByManagementAuditee,
  reportingFileUpload,
  reportingFileDelete,
  reportingFileUpdate,
  reportingFeedBack,
  reportingPDFDownload
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  initialLoading: false,
  reportingAddSuccess: false,
  followUpSubmittedAddSuccess: false,
  allReporting: [],
  allFollowUp: [],
  singleReport: {},
  reportingFileUploadSuccess: false,
  totalNoOfRecords: 0,
  approveAddSuccess: false,
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

export const setupGetInitialSingleReportLite = createAsyncThunk(
  "reporting/getInitialSingleReportLite",
  async (data, thunkAPI) => {
    return getInitialSingleReportLite(data, thunkAPI);
  }
);

export const setupGetSingleReport = createAsyncThunk(
  "reporting/getSingleReport",
  async (data, thunkAPI) => {
    return getSingleReport(data, thunkAPI);
  }
);

export const setupGetSingleReportLite = createAsyncThunk(
  "reporting/getSingleReportLite",
  async (data, thunkAPI) => {
    return getSingleReportLite(data, thunkAPI);
  }
);

export const setupGetSingleObservation = createAsyncThunk(
  "reporting/getSingleObservation",
  async (data, thunkAPI) => {
    return getSingleObservation(data, thunkAPI);
  }
);

export const setupUpdateReporting = createAsyncThunk(
  "reporting/updateReporting",
  async (data, thunkAPI) => {
    return updateReporting(data, thunkAPI);
  }
);

export const setupSubmitReportingInFollowUp = createAsyncThunk(
  "reporting/submitReportingInFollowUp",
  async (data, thunkAPI) => {
    return submitReportingInFollowUp(data, thunkAPI);
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

export const setupUpdateFollowUpByManagement = createAsyncThunk(
  "reporting/updateFollowUpByManagement",
  async (data, thunkAPI) => {
    return updateFollowUpByManagement(data, thunkAPI);
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

export const setupReportingPDFDownload = createAsyncThunk(
  "reporting/reportingPDFDownload",
  async (data, thunkAPI) => {
    return reportingPDFDownload(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "reporting",
  initialState,
  reducers: {
    resetReportingAddSuccess: (state) => {
      state.reportingAddSuccess = false;
      state.approveAddSuccess = false;
    },
    resetFollowUpSubmittedAddSuccess: (state) => {
      state.followUpSubmittedAddSuccess = false;
    },
    resetReportingFileUploadAddSuccess: (state) => {
      state.reportingFileUploadSuccess = false;
    },
    resetReports: (state) => {
      state.loading = false;
      state.initialLoading = false;
      state.reportingAddSuccess = false;
      state.approveAddSuccess = false;
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
        state.allReporting = payload?.data || [];
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
        state.singleReport = payload?.data || {};
      })

      .addCase(setupGetSingleReport.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupGetSingleReportLite.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetSingleReportLite.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReport = payload?.data || {};
      })
      .addCase(setupGetSingleReportLite.rejected, (state, { payload }) => {
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
        state.singleReport = payload?.data || {};

      })
      .addCase(setupGetInitialSingleReport.rejected, (state, { payload }) => {
        state.initialLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupGetInitialSingleReportLite.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(setupGetInitialSingleReportLite.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.singleReport = payload?.data || {};
      })
      .addCase(setupGetInitialSingleReportLite.rejected, (state, { payload }) => {
        state.initialLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get Single Observation
    builder
      .addCase(setupGetSingleObservation.fulfilled, (state, { payload }) => {
        const observation =
          payload?.data?.value || payload?.data?.data || payload?.data;

        if (observation?.id) {
          state.singleReport = {
            ...state.singleReport,
            reportingList: state.singleReport?.reportingList?.map((item) =>
              Number(item.id) === Number(observation.id) ? { ...item, ...observation } : item
            ),
          };
        }
      })
      .addCase(setupGetSingleObservation.rejected, (state, { payload }) => {
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
      .addCase(setupUpdateReporting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReport = { ...state.singleReport, reportingList: state.singleReport?.reportingList?.map((item) => (item.id === payload?.data?.id ? { ...item, ...payload?.data } : item)) }
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

    // Update Reporting
    builder
      .addCase(setupSubmitReportingInFollowUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSubmitReportingInFollowUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReport = { ...state.singleReport, reportingList: state.singleReport?.reportingList?.map((item) => (item.id === payload?.data?.id ? { ...item, ...payload?.data } : item)) }
        state.followUpSubmittedAddSuccess = true;
        toast.success("Follow Up Submitted Successfully");
      })
      .addCase(
        setupSubmitReportingInFollowUp.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Approve Reporting
    builder
      .addCase(setupApproveReporting.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupApproveReporting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.approveAddSuccess = true;
        state.singleReport = { ...state.singleReport, reportingList: state.singleReport?.reportingList?.map((item) => (item.id === payload?.data?.id ? { ...item, ...payload?.data } : item)) }
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
        state.allFollowUp = payload?.data || [];
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
      .addCase(setupUpdateFollowUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReport = { ...state.singleReport, reportingList: state.singleReport?.reportingList?.map((item) => (item.followUp?.id === payload?.data?.id ? { ...item, followUp: payload.data } : item)) }
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
    // Update Follow Up By Management
    builder
      .addCase(setupUpdateFollowUpByManagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateFollowUpByManagement.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleReport = { ...state.singleReport, reportingList: state.singleReport?.reportingList?.map((item) => (item.followUp?.id === payload?.data?.id ? { ...item, followUp: payload.data } : item)) }
      })
      .addCase(
        setupUpdateFollowUpByManagement.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Update Reporting By Management Auditee
    builder
      .addCase(setupUpdateReportingByManagementAuditee.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateReportingByManagementAuditee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.approveAddSuccess = true;
        state.singleReport = { ...state.singleReport, reportingList: state.singleReport?.reportingList?.map((item) => (item.id === payload?.data?.id ? { ...item, ...payload?.data } : item)) }
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
        state.reportingFileUploadSuccess = false;
      })
      .addCase(setupReportingFileUpload.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reportingFileUploadSuccess = true;
        const attachmentUpdate = payload?.data;
        if (attachmentUpdate?.reportingId) {
          state.singleReport = {
            ...state.singleReport,
            reportingList: state.singleReport?.reportingList?.map((item) =>
              Number(item?.id) === Number(attachmentUpdate.reportingId)
                ? {
                    ...item,
                    reportingFileAttachmentsList:
                      attachmentUpdate.reportingFileAttachmentsList || [],
                  }
                : item
            ),
          };
        }
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
        state.reportingFileUploadSuccess = false;
      })
      .addCase(setupReportingFileDelete.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reportingFileUploadSuccess = true;
        const attachmentUpdate = payload?.data;
        if (attachmentUpdate?.reportingId) {
          state.singleReport = {
            ...state.singleReport,
            reportingList: state.singleReport?.reportingList?.map((item) =>
              Number(item?.id) === Number(attachmentUpdate.reportingId)
                ? {
                    ...item,
                    reportingFileAttachmentsList:
                      attachmentUpdate.reportingFileAttachmentsList || [],
                  }
                : item
            ),
          };
        }
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
        state.reportingFileUploadSuccess = false;
      })
      .addCase(setupReportingFileUpdate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reportingFileUploadSuccess = true;
        const updatedFile = payload?.data;
        if (updatedFile?.id) {
          state.singleReport = {
            ...state.singleReport,
            reportingList: state.singleReport?.reportingList?.map((item) => ({
              ...item,
              reportingFileAttachmentsList:
                item?.reportingFileAttachmentsList?.map((file) =>
                  Number(file?.id) === Number(updatedFile.id)
                    ? { ...file, ...updatedFile, source: file?.source || "REPORTING_ATTACHMENT" }
                    : file
                ) || [],
            })),
          };
        }
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
    // Reporting PDF Download
    builder
      .addCase(setupReportingPDFDownload.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportingPDFDownload.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setupReportingPDFDownload.rejected, (state, { payload }) => {
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
  resetReportingFileUploadAddSuccess,
  resetFollowUpSubmittedAddSuccess,
} = slice.actions;

export default slice.reducer;
