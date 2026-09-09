import { toast } from "react-toastify";
import {
  getAllConsolidatedReports,
  saveInternalAuditReport,
  updateInternalAuditReport,
  deleteInternalAuditReport,
  getSingleInternalAuditReport,
  getSingleInternalAuditReportAfterSave,
  getAllJobsForConsolidatedReport,
  createInternalAuditReportObject,
  createExtraFields,
  updateExtraField,
  submitInternalAuditReport,
  approveInternalAuditReport,
  reportFeedBack,
  consolidationFileUpload,
  consolidationFileDelete,
  downloadDetailedAuditReport,
  getDetailedReportSourceLite,
  getDetailedReportSingleObservation
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading: false,
  allConsolidatedReports: [],
  jobsForConsolidatedReports: [],
  internalAuditReportObject: {},
  singleInternalAuditReport: {},
  detailedReportSource: {},
  detailedReportSourceLoading: false,
  detailedReportObservationLoading: false,
  internalAuditReportAddSuccess: false,
  internalAuditReportExtraFieldsAddSuccess: false,
  addReportLoading: false,
  createExtraFieldsLoading: false,
  internalAuditReportExtraFieldsObject: {},
  totalNoOfRecords: 0,
  selectedReport: JSON.parse(sessionStorage.getItem("selectedReport")) || {}
};

export const setupGetAllConsolidatedReports = createAsyncThunk(
  "internalAuditConsolidationReport/getAllConsolidatedReports",
  async (data, thunkAPI) => {
    return getAllConsolidatedReports(data, thunkAPI);
  }
);

export const setupSaveInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/saveInternalAuditReport",
  async (data, thunkAPI) => {
    return saveInternalAuditReport(data, thunkAPI);
  }
);
export const setupGetDetailedReportSourceLite = createAsyncThunk(
  "internalAuditConsolidationReport/getDetailedReportSourceLite",
  async (data, thunkAPI) => {
    return getDetailedReportSourceLite(data, thunkAPI);
  }
);

export const setupGetDetailedReportSingleObservation = createAsyncThunk(
  "internalAuditConsolidationReport/getDetailedReportSingleObservation",
  async (data, thunkAPI) => {
    return getDetailedReportSingleObservation(data, thunkAPI);
  }
);
export const setupSubmitInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/submitInternalAuditReport",
  async (data, thunkAPI) => {
    return submitInternalAuditReport(data, thunkAPI);
  }
);
export const setupApproveInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/approveInternalAuditReport",
  async (data, thunkAPI) => {
    return approveInternalAuditReport(data, thunkAPI);
  }
);

export const setupUpdateInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/updateInternalAuditReport",
  async (data, thunkAPI) => {
    return updateInternalAuditReport(data, thunkAPI);
  }
);
export const setupDeleteInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/deleteInternalAuditReport",
  async (data, thunkAPI) => {
    return deleteInternalAuditReport(data, thunkAPI);
  }
);

export const setupGetSingleInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/getSingleInternalAuditReport",
  async (data, thunkAPI) => {
    return getSingleInternalAuditReport(data, thunkAPI);
  }
);

export const setupGetSingleInternalAuditReportAfterSave = createAsyncThunk(
  "internalAuditConsolidationReport/getSingleInternalAuditReportAfterSave",
  async (data, thunkAPI) => {
    return getSingleInternalAuditReportAfterSave(data, thunkAPI);
  }
);

export const setupGetAllJobsForConsolidatedReport = createAsyncThunk(
  "internalAuditConsolidationReport/getAllJobsForConsolidatedReport",
  async (data, thunkAPI) => {
    return getAllJobsForConsolidatedReport(data, thunkAPI);
  }
);

export const setupCreateInternalAuditReportObject = createAsyncThunk(
  "internalAuditConsolidationReport/createInternalAuditReportObject",
  async (data, thunkAPI) => {
    return createInternalAuditReportObject(data, thunkAPI);
  }
);

export const setupCreateExtraFields = createAsyncThunk(
  "internalAuditConsolidationReport/createExtraFields",
  async (data, thunkAPI) => {
    return createExtraFields(data, thunkAPI);
  }
);
export const setupUpdateExtraField = createAsyncThunk(
  "internalAuditConsolidationReport/updateExtraField",
  async (data, thunkAPI) => {
    return updateExtraField(data, thunkAPI);
  }
);
export const setupReportFeedBack = createAsyncThunk(
  "internalAuditConsolidationReport/reportFeedBack",
  async (data, thunkAPI) => {
    return reportFeedBack(data, thunkAPI);
  }
);

export const setupConsolidationFileUpload = createAsyncThunk(
  "internalAuditConsolidationReport/consolidationFileUpload",
  async (data, thunkAPI) => {
    return consolidationFileUpload(data, thunkAPI);
  }
);
export const setupConsolidationFileDelete = createAsyncThunk(
  "internalAuditConsolidationReport/consolidationFileDelete",
  async (data, thunkAPI) => {
    return consolidationFileDelete(data, thunkAPI);
  }
);

export const setupDownloadDetailedAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/downloadDetailedAuditReport",
  async (data, thunkAPI) => {
    return downloadDetailedAuditReport(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "internalAuditConsolidationReport",
  initialState,
  reducers: {
    resetInternalAuditReportAddSuccess: (state) => {
      state.internalAuditReportAddSuccess = false;
    },
    resetInternalAuditReportExtraFieldsAddSuccess: (state) => {
      state.internalAuditReportExtraFieldsAddSuccess = false;
    },
    changeSelectedReport: (state, { payload }) => {
      state.selectedReport = payload
      sessionStorage.setItem("selectedReport", JSON.stringify(payload))
    },
    handleResetData: (state) => {
      state.loading = false;
      state.allConsolidatedReports = [];
      state.jobsForConsolidatedReports = [];
      state.internalAuditReportObject = {};
      state.singleInternalAuditReport = {};
      state.detailedReportSource = {};
      state.detailedReportSourceLoading = false;
      state.detailedReportObservationLoading = false;
      state.internalAuditReportAddSuccess = false;
      state.internalAuditReportExtraFieldsAddSuccess = false;
      state.addReportLoading = false;
      state.createExtraFieldsLoading = false;
      state.internalAuditReportExtraFieldsObject = {};
      state.totalNoOfRecords = 0;
      state.selectedReport = {}
      sessionStorage.removeItem("selectedReport")
    },
    handleChangeReport: (state, { payload }) => {
      state.singleInternalAuditReport = payload
    },
  },
  extraReducers: (builder) => {
    // Get All Internal Audit Reports
    builder
      .addCase(setupGetAllConsolidatedReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllConsolidatedReports.fulfilled,
        (state, { payload }) => {
          state.totalNoOfRecords = payload?.message;
          state.loading = false;
          state.allConsolidatedReports = payload?.data || [];
        }
      )
      .addCase(setupGetAllConsolidatedReports.rejected, (state, action) => {
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
        const savedReport = payload?.data;

        if (payload?.status && savedReport?.id) {
          if (
            Number(state.internalAuditReportObject?.id) === Number(savedReport.id)
          ) {
            state.internalAuditReportObject = {
              ...state.internalAuditReportObject,
              ...savedReport,
            };
          }

          if (
            Number(state.singleInternalAuditReport?.id) === Number(savedReport.id)
          ) {
            state.singleInternalAuditReport = {
              ...state.singleInternalAuditReport,
              ...savedReport,
            };
          }

          toast.success(
            "Internal Audit Consolidation Report Saved Successfully"
          );
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
    // Submit Internal Audit Report
    builder
      .addCase(setupSubmitInternalAuditReport.pending, (state) => {
        state.addReportLoading = true;
      })
      .addCase(setupSubmitInternalAuditReport.fulfilled, (state) => {
        state.addReportLoading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Consolidation Report Submitted Successfully");
      })
      .addCase(setupSubmitInternalAuditReport.rejected, (state, action) => {
        state.addReportLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Approve Internal Audit Report
    builder
      .addCase(setupApproveInternalAuditReport.pending, (state) => {
        state.addReportLoading = true;
      })
      .addCase(setupApproveInternalAuditReport.fulfilled, (state) => {
        state.addReportLoading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Consolidation Report Approved Successfully");
      })
      .addCase(setupApproveInternalAuditReport.rejected, (state, action) => {
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
        toast.success(
          "Internal Audit Consolidation Report Deleted Successfully"
        );
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
    // Get Single Internal  Audit Report After
    builder
      .addCase(setupGetSingleInternalAuditReportAfterSave.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(
        setupGetSingleInternalAuditReportAfterSave.fulfilled,
        (state, { payload }) => {
          state.subLoading = false;
          state.singleInternalAuditReport = payload?.data || [
            { error: "Not Found" },
          ];
          state.internalAuditReportObject = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(
        setupGetSingleInternalAuditReportAfterSave.rejected,
        (state, action) => {
          state.subLoading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Get Jobs  Audit Report
    builder
      .addCase(setupGetAllJobsForConsolidatedReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllJobsForConsolidatedReport.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.jobsForConsolidatedReports = payload?.data || [];
        }
      )
      .addCase(
        setupGetAllJobsForConsolidatedReport.rejected,
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

          if (
            Number(state.internalAuditReportObject?.id) ===
            Number(updatedReport.id)
          ) {
            state.internalAuditReportObject.intAuditExtraFieldsList =
              updatedReport.intAuditExtraFieldsList;
          }

          if (
            Number(state.singleInternalAuditReport?.id) ===
            Number(updatedReport.id)
          ) {
            state.singleInternalAuditReport.intAuditExtraFieldsList =
              updatedReport.intAuditExtraFieldsList;
          }

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
    // FeedBack
    builder
      .addCase(setupReportFeedBack.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupReportFeedBack.fulfilled, (state) => {
        state.loading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("FeedBack Provided Succussfully");
      })
      .addCase(setupReportFeedBack.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // File Upload
    builder
      .addCase(setupConsolidationFileUpload.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupConsolidationFileUpload.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        const updatedReport = payload?.data;

        if (
          payload?.status &&
          updatedReport?.id &&
          Array.isArray(updatedReport?.annexureUploads)
        ) {
          if (
            Number(state.internalAuditReportObject?.id) ===
            Number(updatedReport.id)
          ) {
            state.internalAuditReportObject.annexureUploads =
              updatedReport.annexureUploads;
          }

          if (
            Number(state.singleInternalAuditReport?.id) ===
            Number(updatedReport.id)
          ) {
            state.singleInternalAuditReport.annexureUploads =
              updatedReport.annexureUploads;
          }

          toast.success("File Uploaded Successfully");
        } else {
          toast.error(payload?.message || "Failed to upload the file");
        }
      })
      .addCase(setupConsolidationFileUpload.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // File Delete
    builder
      .addCase(setupConsolidationFileDelete.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(
        setupConsolidationFileDelete.fulfilled,
        (state, { payload, meta }) => {
          state.subLoading = false;
          const reportId = meta?.arg?.id;
          const deletedFileId = meta?.arg?.fileId;

          if (payload?.status) {
            if (
              Number(state.internalAuditReportObject?.id) === Number(reportId)
            ) {
              state.internalAuditReportObject.annexureUploads =
                state.internalAuditReportObject?.annexureUploads?.filter(
                  (file) => Number(file?.id) !== Number(deletedFileId)
                ) || [];
            }

            if (
              Number(state.singleInternalAuditReport?.id) === Number(reportId)
            ) {
              state.singleInternalAuditReport.annexureUploads =
                state.singleInternalAuditReport?.annexureUploads?.filter(
                  (file) => Number(file?.id) !== Number(deletedFileId)
                ) || [];
            }

            toast.success("File Deleted Successfully");
          } else {
            toast.error(payload?.message || "Failed to delete the file");
          }
        }
      )
      .addCase(setupConsolidationFileDelete.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get detailed report source lite reporting list
    builder
      .addCase(setupGetDetailedReportSourceLite.pending, (state) => {
        state.subLoading = true;
        state.detailedReportSourceLoading = true;
      })
      .addCase(setupGetDetailedReportSourceLite.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        state.detailedReportSourceLoading = false;
        state.detailedReportSource = payload?.data || {};
      })
      .addCase(setupGetDetailedReportSourceLite.rejected, (state, action) => {
        state.subLoading = false;
        state.detailedReportSourceLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get one detailed report observation on demand
    builder
      .addCase(setupGetDetailedReportSingleObservation.pending, (state) => {
        state.detailedReportObservationLoading = true;
      })
      .addCase(setupGetDetailedReportSingleObservation.fulfilled, (state, { payload }) => {
        state.detailedReportObservationLoading = false;
        const observation = payload?.data?.value || payload?.data?.data || payload?.data;

        if (observation?.id && state.detailedReportSource?.reportingList) {
          state.detailedReportSource = {
            ...state.detailedReportSource,
            reportingList: state.detailedReportSource.reportingList.map((item) =>
              Number(item.id) === Number(observation.id) ? { ...item, ...observation } : item
            ),
          };
        }
      })
      .addCase(setupGetDetailedReportSingleObservation.rejected, (state, action) => {
        state.detailedReportObservationLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // File Download
    builder
      .addCase(setupDownloadDetailedAuditReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDownloadDetailedAuditReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setupDownloadDetailedAuditReport.rejected, (state, action) => {
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
  changeSelectedReport,
  handleChangeReport
} = slice.actions;

export default slice.reducer;
