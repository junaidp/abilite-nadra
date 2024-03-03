import { toast } from "react-toastify";
import {
  getAllReporting,
  getInitialAllReporting,
  updateReporting,
  getAllFollowUp,
  getInitialAllFollowUp,
  updateFollowUp,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  initialLoading: false,
  reportingAddSuccess: false,
  allReporting: [],
  allFollowUp: [],
};

export const setupGetAllReporting = createAsyncThunk(
  "reporting/getAllReporting",
  async (data, thunkAPI) => {
    return getAllReporting(data, thunkAPI);
  }
);

export const setupGetInitialAllReporting = createAsyncThunk(
  "reporting/getInitialAllReporting",
  async (data, thunkAPI) => {
    return getInitialAllReporting(data, thunkAPI);
  }
);

export const setupUpdateReporting = createAsyncThunk(
  "reporting/updateReporting",
  async (data, thunkAPI) => {
    return updateReporting(data, thunkAPI);
  }
);

export const setupGetAllFollowUp = createAsyncThunk(
  "reporting/getAllFollowUp",
  async (data, thunkAPI) => {
    return getAllFollowUp(data, thunkAPI);
  }
);

export const setupGetInitialAllFollowUp = createAsyncThunk(
  "reporting/getInitialAllFollowUp",
  async (data, thunkAPI) => {
    return getInitialAllFollowUp(data, thunkAPI);
  }
);

export const setupUpdateFollowUp = createAsyncThunk(
  "reporting/updateFollowUp",
  async (data, thunkAPI) => {
    return updateFollowUp(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "reporting",
  initialState,
  reducers: {
    resetReportingAddSuccess: (state, action) => {
      state.reportingAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Get All Reporting
    builder
      .addCase(setupGetAllReporting.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllReporting.fulfilled, (state, { payload }) => {
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
    // Get Initial All Reporting
    builder
      .addCase(setupGetInitialAllReporting.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(setupGetInitialAllReporting.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.allReporting = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetInitialAllReporting.rejected, (state, { payload }) => {
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

    // Get All Follow Up
    builder
      .addCase(setupGetAllFollowUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllFollowUp.fulfilled, (state, { payload }) => {
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

    // Get Initial All Follow Up
    builder
      .addCase(setupGetInitialAllFollowUp.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(setupGetInitialAllFollowUp.fulfilled, (state, { payload }) => {
        state.initialLoading = false;
        state.allFollowUp = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetInitialAllFollowUp.rejected, (state, { payload }) => {
        state.initialLoading = false;
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
  },
});

export const { resetReportingAddSuccess } = slice.actions;

export default slice.reducer;
