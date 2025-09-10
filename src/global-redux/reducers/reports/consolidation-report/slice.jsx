import { toast } from "react-toastify";
import {
  getAllInternalAuditReports,
  saveInternalAuditReport,
  updateInternalAuditReport,
  deleteInternalAuditReport,
  getSingleInternalAuditReport,
  getSingleInternalAuditReportAfterSave,
  getAllJobsForInternalAuditReport,
  createInternalAuditReportObject,
  createExtraFields,
  updateExtraField,
  submitInternalAuditReport,
  approveInternalAuditReport,
  reportFeedBack,
  consolidationFileUpload,
  consolidationFileDelete,
  consolidationFileUpdate,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading: false,
  allInternalAuditReports: [],
  jobsForInternalAuditReports: [],
  internalAuditReportObject: {},
  singleInternalAuditReport: {},
  internalAuditReportAddSuccess: false,
  consolidationFileUploadAddSuccess: false,
  internalAuditReportExtraFieldsAddSuccess: false,
  addReportLoading: false,
  createExtraFieldsLoading: false,
  internalAuditReportExtraFieldsObject: {},
  totalNoOfRecords: 0,
  selectedReport: JSON.parse(sessionStorage.getItem("selectedReport")) || {}
};

export const setupGetAllInternalAuditReports = createAsyncThunk(
  "internalAuditConsolidationReport/getAllInternalAuditReports",
  async (data, thunkAPI) => {
    return getAllInternalAuditReports(data, thunkAPI);
  }
);

export const setupSaveInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/saveInternalAuditReport",
  async (data, thunkAPI) => {
    return saveInternalAuditReport(data, thunkAPI);
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

export const setupGetAllJobsForInternalAuditReport = createAsyncThunk(
  "internalAuditConsolidationReport/getAllJobsForInternalAuditReport",
  async (data, thunkAPI) => {
    return getAllJobsForInternalAuditReport(data, thunkAPI);
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
export const setupConsolidationFileUpdate = createAsyncThunk(
  "internalAuditConsolidationReport/consolidationFileUpdate",
  async (data, thunkAPI) => {
    return consolidationFileUpdate(data, thunkAPI);
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
    resetFileUploadAddSuccess: (state) => {
      state.consolidationFileUploadAddSuccess = false;
    },
    changeSelectedReport: (state, { payload }) => {
      state.selectedReport = payload
      sessionStorage.setItem("selectedReport", JSON.stringify(payload))
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
      state.internalAuditReportExtraFieldsObject = {};
      state.totalNoOfRecords = 0;
      state.selectedReport = {}
      sessionStorage.removeItem("selectedReport")
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
      .addCase(setupSaveInternalAuditReport.fulfilled, (state) => {
        state.addReportLoading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Consolidation Report Saved Successfully");
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
        state.internalAuditReportExtraFieldsAddSuccess = true;
        state.internalAuditReportExtraFieldsObject = payload?.data;
        toast.success("Extra Field Added Successfully");
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
      .addCase(setupConsolidationFileUpload.fulfilled, (state) => {
        state.subLoading = false;
        state.consolidationFileUploadAddSuccess = true;
        toast.success("File Uploaded Succussfully");
      })
      .addCase(setupConsolidationFileUpload.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // File Update
    builder
      .addCase(setupConsolidationFileUpdate.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupConsolidationFileUpdate.fulfilled, (state) => {
        state.subLoading = false;
        state.consolidationFileUploadAddSuccess = true;
        toast.success("File Updated Succussfully");
      })
      .addCase(setupConsolidationFileUpdate.rejected, (state, action) => {
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
      .addCase(setupConsolidationFileDelete.fulfilled, (state) => {
        state.subLoading = false;
        state.consolidationFileUploadAddSuccess = true;
        toast.success("File Deleted Succussfully");
      })
      .addCase(setupConsolidationFileDelete.rejected, (state, action) => {
        state.subLoading = false;
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
  resetFileUploadAddSuccess,
  changeSelectedReport
} = slice.actions;

export default slice.reducer;
