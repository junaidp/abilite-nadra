import { toast } from "react-toastify";
import {
  getAllInternalAuditReports,
  saveInternalAuditReport,
  updateInternalAuditReport,
  deleteInternalAuditReport,
  getSingleInternalAuditReport,
  getSingleInternalAuditReportAfterReportSave,
  getAllJobsForInternalAuditReport,
  createInternalAuditReportObject,
  createExtraFields,
  updateExtraField,
  iahFileUpload,
  iahFileDelete,
  iahFileUpdate,
  reportFeedBack,
  submitInternalAuditReport,
  approveInternalAuditReport,
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
  iahFileUploadSuccess: false,
  internalAuditReportExtraFieldsObject: {},
  totalNoOfRecords: 0,
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
export const setupGetSingleInternalAuditReportAfterReportSave =
  createAsyncThunk(
    "internalAuditReport/getSingleInternalAuditReportAfterReportSave",
    async (data, thunkAPI) => {
      return getSingleInternalAuditReportAfterReportSave(data, thunkAPI);
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
export const setupIahFileUpdate = createAsyncThunk(
  "internalAuditReport/iahFileUpdate",
  async (data, thunkAPI) => {
    return iahFileUpdate(data, thunkAPI);
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

export const slice = createSlice({
  name: "internalAuditReport",
  initialState,
  reducers: {
    resetInternalAuditReportAddSuccess: (state) => {
      state.internalAuditReportAddSuccess = false;
    },
    resetIahReportAddSuccess: (state) => {
      state.iahFileUploadSuccess = false;
    },
    resetFileUploadAddSuccess: (state) => {
      state.iahFileUploadSuccess = false;
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
      state.iahFileUploadSuccess = false;
      state.internalAuditReportExtraFieldsObject = {};
      state.totalNoOfRecords = 0;
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
        state.addReportLoading = true;
      })
      .addCase(setupSaveInternalAuditReport.fulfilled, (state) => {
        state.addReportLoading = false;
        state.internalAuditReportAddSuccess = true;
        toast.success("Internal Audit Report Saved Successfully");
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
    // Get Single Internal  Audit Report After Save
    builder
      .addCase(
        setupGetSingleInternalAuditReportAfterReportSave.pending,
        (state) => {
          state.addReportLoading = true;
        }
      )
      .addCase(
        setupGetSingleInternalAuditReportAfterReportSave.fulfilled,
        (state, { payload }) => {
          state.addReportLoading = false;
          state.singleInternalAuditReport = payload?.data || [
            { error: "Not Found" },
          ];
          state.internalAuditReportObject = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(
        setupGetSingleInternalAuditReportAfterReportSave.rejected,
        (state, action) => {
          state.addReportLoading = false;
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
    // IAH File Upload
    builder
      .addCase(setupIahFileUpload.pending, (state) => {
        state.addReportLoading = true;
      })
      .addCase(setupIahFileUpload.fulfilled, (state) => {
        state.addReportLoading = false;
        state.iahFileUploadSuccess = true;
        toast.success("File Uploaded Successfully");
      })
      .addCase(setupIahFileUpload.rejected, (state, action) => {
        state.addReportLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // IAH File Delete
    builder
      .addCase(setupIahFileDelete.pending, (state) => {
        state.addReportLoading = true;
      })
      .addCase(setupIahFileDelete.fulfilled, (state) => {
        state.addReportLoading = false;
        state.iahFileUploadSuccess = true;
        toast.success("File Deleted Successfully");
      })
      .addCase(setupIahFileDelete.rejected, (state, action) => {
        state.addReportLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // IAH File Update
    builder
      .addCase(setupIahFileUpdate.pending, (state) => {
        state.addReportLoading = true;
      })
      .addCase(setupIahFileUpdate.fulfilled, (state) => {
        state.addReportLoading = false;
        state.iahFileUploadSuccess = true;
        toast.success("File Updated Successfully");
      })
      .addCase(setupIahFileUpdate.rejected, (state, action) => {
        state.addReportLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
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
  },
});

export const {
  resetInternalAuditReportAddSuccess,
  handleResetData,
  resetIahReportAddSuccess,
  resetInternalAuditReportExtraFieldsAddSuccess,
  resetFileUploadAddSuccess,
} = slice.actions;

export default slice.reducer;
