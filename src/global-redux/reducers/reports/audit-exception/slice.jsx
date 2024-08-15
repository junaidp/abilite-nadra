import { toast } from "react-toastify";
import {
  getAllAuditExceptions,
  getAllLocations,
  getAllTimeAllocation,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading: false,
  auditExceptionJobs: [],
  resourceTimeAllocationJobs: [],
  locations: [],
};

export const setupGetAllAuditExceptions = createAsyncThunk(
  "auditException/getAllAuditExceptions",
  async (data, thunkAPI) => {
    return getAllAuditExceptions(data, thunkAPI);
  }
);

export const setupGetAllLocations = createAsyncThunk(
  "auditException/getAllLocations",
  async (data, thunkAPI) => {
    return getAllLocations(data, thunkAPI);
  }
);

export const setupGetAllTimeAllocation = createAsyncThunk(
  "auditException/getAllTimeAllocation",
  async (data, thunkAPI) => {
    return getAllTimeAllocation(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auditException",
  initialState,
  reducers: {
    handleReset: (state) => {
      (state.loading = false),
        (state.auditExceptionJobs = []),
        (state.resourceTimeAllocationJobs = []),
        (state.locations = []);
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
  },
});

export const { handleReset } = slice.actions;

export default slice.reducer;
