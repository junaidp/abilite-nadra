import { toast } from "react-toastify";
import {
  getAllInternalAuditReports,
  saveInternalAuditReport,
  getInternalReportSourceLite,
  getInternalReportSingleObservation,
  updateInternalAuditReport,
  deleteInternalAuditReport,
  getSingleInternalAuditReport,
  getAllJobsForInternalAuditReport,
  createInternalAuditReportObject,
  createExtraFields,
  updateExtraField,
  iahFileUpload,
  iahFileDelete,
  reportFeedBack,
  submitInternalAuditReport,
  approveInternalAuditReport,
  downloadInternalAuditReport
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allInternalAuditReports: [],
  jobsForInternalAuditReports: [],
  internalAuditReportObject: {},
  singleInternalAuditReport: {},
  internalAuditReportAddSuccess: false,
  internalAuditReportExtraFieldsAddSuccess: false,
  addReportLoading: false,
  createExtraFieldsLoading: false,
  fileActionLoading: false,
  internalReportSource: {},
  internalReportSourceLoading: false,
  internalReportObservationLoading: false,
  internalAuditReportExtraFieldsObject: {},
  totalNoOfRecords: 0,
  selectedInternalAuditReport: JSON.parse(sessionStorage.getItem("selectedInternalAuditReport")) || {}
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

export const setupGetInternalReportSourceLite = createAsyncThunk(
  "internalAuditReport/getInternalReportSourceLite",
  async (data, thunkAPI) => getInternalReportSourceLite(data, thunkAPI)
);

export const setupGetInternalReportSingleObservation = createAsyncThunk(
  "internalAuditReport/getInternalReportSingleObservation",
  async (data, thunkAPI) => getInternalReportSingleObservation(data, thunkAPI)
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

export const setupCreateExtraFields = createAsyncThunk(
  "internalAuditReport/createExtraFields",
  async (data, thunkAPI) => {
    return createExtraFields(data, thunkAPI);
  }
);
export const setupUpdateExtraField = createAsyncThunk(
  "internalAuditReport/updateExtraField",
  async (data, thunkAPI) => {
    return updateExtraField(data, thunkAPI);
  }
);

export const setupIahFileUpload = createAsyncThunk(
  "internalAuditReport/iahFileUpload",
  async (data, thunkAPI) => {
    return iahFileUpload(data, thunkAPI);
  }
);
export const setupIahFileDelete = createAsyncThunk(
  "internalAuditReport/iahFileDelete",
  async (data, thunkAPI) => {
    return iahFileDelete(data, thunkAPI);
  }
);
export const setupReportFeedBack = createAsyncThunk(
  "internalAuditReport/reportFeedBack",
  async (data, thunkAPI) => {
    return reportFeedBack(data, thunkAPI);
  }
);
export const setupSubmitInternalAuditReport = createAsyncThunk(
  "internalAuditReport/submitInternalAuditReport",
  async (data, thunkAPI) => {
    return submitInternalAuditReport(data, thunkAPI);
  }
);
export const setupApproveInternalAuditReport = createAsyncThunk(
  "internalAuditReport/approveInternalAuditReport",
  async (data, thunkAPI) => {
    return approveInternalAuditReport(data, thunkAPI);
  }
);

export const setupDownloadInternalAuditReport = createAsyncThunk(
  "internalAuditReport/downloadInternalAuditReport",
  async (data, thunkAPI) => {
    return downloadInternalAuditReport(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "internalAuditReport",
  initialState,
  reducers: {
    resetInternalAuditReportAddSuccess: (state) => {
      state.internalAuditReportAddSuccess = false;
    },

    changeSelectedInternalAuditReport: (state, { payload }) => {
      state.selectedInternalAuditReport = payload
      sessionStorage.setItem("selectedInternalAuditReport", JSON.stringify(payload))
    },
    resetInternalAuditReportExtraFieldsAddSuccess: (state) => {
      state.internalAuditReportExtraFieldsAddSuccess = false;
    },
    handleResetData: (state) => {
      state.loading = false;
      state.allInternalAuditReports = [];
      state.jobsForInternalAuditReports = [];
      state.internalAuditReportObject = {};
      state.singleInternalAuditReport = {};
      state.internalAuditReportAddSuccess = false;
      state.internalAuditReportExtraFieldsAddSuccess = false;
      state.addReportLoading = false;
      state.createExtraFieldsLoading = false;
      state.fileActionLoading = false;
      state.internalReportSource = {};
      state.internalReportSourceLoading = false;
      state.internalReportObservationLoading = false;
      state.internalAuditReportExtraFieldsObject = {};
      state.totalNoOfRecords = 0;
      state.selectedInternalAuditReport = {}
      sessionStorage.removeItem("selectedInternalAuditReport")
    },
    handleChangeReport: (state, { payload }) => {
      state.singleInternalAuditReport = payload
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
          state.totalNoOfRecords = payload?.message;
          state.loading = false;
          state.allInternalAuditReports = payload?.data || [];
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
        state.addReportLoading = true;
      })
      .addCase(setupSaveInternalAuditReport.fulfilled, (state, { payload }) => {
        state.addReportLoading = false;
        if (payload?.status && payload?.data?.id) {
          toast.success("Internal Audit Report Saved Successfully");
        } else {
          toast.error(payload?.message || "Failed to save the report");
        }
      })
      .addCase(setupSaveInternalAuditReport.rejected, (state, action) => {
        state.addReportLoading = false;
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
          state.jobsForInternalAuditReports = payload?.data || [];
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
    // Create Extra Fields
    builder
      .addCase(setupCreateExtraFields.pending, (state) => {
        state.createExtraFieldsLoading = true;
      })
      .addCase(setupCreateExtraFields.fulfilled, (state, { payload }) => {
        state.createExtraFieldsLoading = false;
        const updatedReport = payload?.data;
        if (
          payload?.status &&
          updatedReport?.id &&
          Array.isArray(updatedReport?.intAuditExtraFieldsList)
        ) {
          state.internalAuditReportExtraFieldsAddSuccess = true;
          state.internalAuditReportExtraFieldsObject = updatedReport;
          toast.success("Extra Field Added Successfully");
        } else {
          toast.error(payload?.message || "Failed to add the extra field");
        }
      })
      .addCase(setupCreateExtraFields.rejected, (state, action) => {
        state.createExtraFieldsLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Create Extra Fields
    builder
      .addCase(setupUpdateExtraField.pending, (state) => {
        state.createExtraFieldsLoading = true;
      })
      .addCase(setupUpdateExtraField.fulfilled, (state) => {
        state.createExtraFieldsLoading = false;
        toast.success("Extra Field Updated Successfully");
      })
      .addCase(setupUpdateExtraField.rejected, (state, action) => {
        state.createExtraFieldsLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // IAH File Upload
    builder
      .addCase(setupIahFileUpload.pending, (state) => {
        state.fileActionLoading = true;
      })
      .addCase(setupIahFileUpload.fulfilled, (state, { payload }) => {
        state.fileActionLoading = false;
        if (payload?.status && Array.isArray(payload?.data?.annexureUploads)) {
          toast.success("File Uploaded Successfully");
        } else {
          toast.error(payload?.message || "Failed to upload the file");
        }
      })
      .addCase(setupIahFileUpload.rejected, (state, action) => {
        state.fileActionLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // IAH File Delete
    builder
      .addCase(setupIahFileDelete.pending, (state) => {
        state.fileActionLoading = true;
      })
      .addCase(setupIahFileDelete.fulfilled, (state, { payload }) => {
        state.fileActionLoading = false;
        if (payload?.status) {
          toast.success("File Deleted Successfully");
        } else {
          toast.error(payload?.message || "Failed to delete the file");
        }
      })
      .addCase(setupIahFileDelete.rejected, (state, action) => {
        state.fileActionLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Lightweight reporting source
    builder
      .addCase(setupGetInternalReportSourceLite.pending, (state) => {
        state.internalReportSourceLoading = true;
        state.internalReportSource = {};
      })
      .addCase(setupGetInternalReportSourceLite.fulfilled, (state, { payload }) => {
        state.internalReportSourceLoading = false;
        state.internalReportSource = payload?.data || {};
      })
      .addCase(setupGetInternalReportSourceLite.rejected, (state, action) => {
        state.internalReportSourceLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // One reporting observation loaded on demand
    builder
      .addCase(setupGetInternalReportSingleObservation.pending, (state) => {
        state.internalReportObservationLoading = true;
      })
      .addCase(
        setupGetInternalReportSingleObservation.fulfilled,
        (state, { payload }) => {
          state.internalReportObservationLoading = false;
          const observation =
            payload?.data?.value || payload?.data?.data || payload?.data;

          if (
            observation?.id &&
            Array.isArray(state.internalReportSource?.reportingList)
          ) {
            state.internalReportSource = {
              ...state.internalReportSource,
              reportingList: state.internalReportSource.reportingList.map((item) =>
                Number(item?.id) === Number(observation.id)
                  ? { ...item, ...observation }
                  : item
              ),
            };
          }
        }
      )
      .addCase(
        setupGetInternalReportSingleObservation.rejected,
        (state, action) => {
          state.internalReportObservationLoading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // IAH Feedback
    builder
      .addCase(setupReportFeedBack.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportFeedBack.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("FeedBack Provided Successfully");
      })
      .addCase(setupReportFeedBack.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // IAH Approve
    builder
      .addCase(setupApproveInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupApproveInternalAuditReport.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Report Approved Successfully");
      })
      .addCase(setupApproveInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // IAH Submit
    builder
      .addCase(setupSubmitInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSubmitInternalAuditReport.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Report Submitted Successfully");
      })
      .addCase(setupSubmitInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Download Report
    builder
      .addCase(setupDownloadInternalAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDownloadInternalAuditReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setupDownloadInternalAuditReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  resetInternalAuditReportAddSuccess,
  handleResetData,
  resetInternalAuditReportExtraFieldsAddSuccess,
  changeSelectedInternalAuditReport,
  handleChangeReport
} = slice.actions;

export default slice.reducer;
