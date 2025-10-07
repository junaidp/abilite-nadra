import { toast } from "react-toastify";
import {
  getAllAuditExceptions,
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
  auditExceptionJobs: [],
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
        (state.auditExceptionJobs = []),
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
      })
      .addCase(setupGetAllAuditExceptions.rejected, (state, action) => {
        state.loading = false;
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
