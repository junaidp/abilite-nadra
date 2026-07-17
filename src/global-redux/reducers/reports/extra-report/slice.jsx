import { toast } from "react-toastify";
import {
  getAllAuditExceptions,
  getAllAuditExceptionsLight,
  getAuditExceptionFilterOptions,
  exportAuditExceptions,
  getAllLocations,
  getAllTimeAllocation,
  getAllPlanSummaryReport,
  getRiskAssessementReport,
  getAllUsers,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading: false,
  exportLoading: false,
  auditExceptionJobs: [],
  auditExceptionFilterOptions: {},
  auditExceptionTotalNoOfRecords: 0,
  resourceTimeAllocationJobs: [],
  locations: [],
  planSummaryReports: [],
  riskAssessmentReport: [],
  users: [],
};

export const setupGetAllAuditExceptions = createAsyncThunk(
  "extraReport/getAllAuditExceptions",
  async (data, thunkAPI) => {
    return getAllAuditExceptions(data, thunkAPI);
  }
);

export const setupGetAllAuditExceptionsLight = createAsyncThunk(
  "extraReport/getAllAuditExceptionsLight",
  async (data, thunkAPI) => {
    return getAllAuditExceptionsLight(data, thunkAPI);
  }
);

export const setupGetAuditExceptionFilterOptions = createAsyncThunk(
  "extraReport/getAuditExceptionFilterOptions",
  async (data, thunkAPI) => {
    return getAuditExceptionFilterOptions(data, thunkAPI);
  }
);

export const setupExportAuditExceptions = createAsyncThunk(
  "extraReport/exportAuditExceptions",
  async (data, thunkAPI) => {
    return exportAuditExceptions(data, thunkAPI);
  }
);

export const setupGetAllLocations = createAsyncThunk(
  "extraReport/getAllLocations",
  async (data, thunkAPI) => {
    return getAllLocations(data, thunkAPI);
  }
);

export const setupGetAllTimeAllocation = createAsyncThunk(
  "extraReport/getAllTimeAllocation",
  async (data, thunkAPI) => {
    return getAllTimeAllocation(data, thunkAPI);
  }
);

export const setupGetAllPlanSummaryReport = createAsyncThunk(
  "extraReport/getAllPlanSummaryReport",
  async (data, thunkAPI) => {
    return getAllPlanSummaryReport(data, thunkAPI);
  }
);

export const setupGetRiskAssessementReport = createAsyncThunk(
  "extraReport/getRiskAssessementReport",
  async (data, thunkAPI) => {
    return getRiskAssessementReport(data, thunkAPI);
  }
);

export const setupGetAllUsers = createAsyncThunk(
  "extraReport/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "extraReport",
  initialState,
  reducers: {
    handleReset: (state) => {
      (state.loading = false),
        (state.subLoading = false),
        (state.exportLoading = false),
        (state.auditExceptionJobs = []),
        (state.auditExceptionFilterOptions = {}),
        (state.auditExceptionTotalNoOfRecords = 0),
        (state.resourceTimeAllocationJobs = []),
        (state.locations = []),
        (state.planSummaryReports = []),
        (state.users = []);
    },
  },
  extraReducers: (builder) => {
    // Get All Audit Exception
    builder
      .addCase(setupGetAllAuditExceptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditExceptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auditExceptionJobs = payload?.data || [];
        state.auditExceptionTotalNoOfRecords = Number(payload?.message || 0);
      })
      .addCase(setupGetAllAuditExceptions.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Audit Exception Light
    builder
      .addCase(setupGetAllAuditExceptionsLight.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditExceptionsLight.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auditExceptionJobs = payload?.data || [];
        state.auditExceptionTotalNoOfRecords = Number(payload?.message || 0);
      })
      .addCase(setupGetAllAuditExceptionsLight.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Audit Exception Filter Options
    builder
      .addCase(setupGetAuditExceptionFilterOptions.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupGetAuditExceptionFilterOptions.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        state.auditExceptionFilterOptions = payload?.data || {};
      })
      .addCase(setupGetAuditExceptionFilterOptions.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Export Audit Exception
    builder
      .addCase(setupExportAuditExceptions.pending, (state) => {
        state.exportLoading = true;
      })
      .addCase(setupExportAuditExceptions.fulfilled, (state) => {
        state.exportLoading = false;
      })
      .addCase(setupExportAuditExceptions.rejected, (state, action) => {
        state.exportLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Locations
    builder
      .addCase(setupGetAllLocations.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupGetAllLocations.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        state.locations = payload?.data;
      })
      .addCase(setupGetAllLocations.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Resource Time Allocation
    builder
      .addCase(setupGetAllTimeAllocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllTimeAllocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resourceTimeAllocationJobs = payload?.data || [];
      })
      .addCase(setupGetAllTimeAllocation.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Plan Summary Report
    builder
      .addCase(setupGetAllPlanSummaryReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllPlanSummaryReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.planSummaryReports = payload?.data || [];
      })
      .addCase(setupGetAllPlanSummaryReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Plan Summary Report
    builder
      .addCase(setupGetRiskAssessementReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetRiskAssessementReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.riskAssessmentReport = payload?.data || [];
      })
      .addCase(setupGetRiskAssessementReport.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Users
    builder
      .addCase(setupGetAllUsers.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupGetAllUsers.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        state.users =
          payload?.data?.filter(
            (singleItem) =>
              singleItem?.employeeid?.userHierarchy !== "Management_Auditee" &&
              singleItem?.employeeid?.userHierarchy !== "IAH"
          ) || [];
      })
      .addCase(setupGetAllUsers.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { handleReset } = slice.actions;

export default slice.reducer;
