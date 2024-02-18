import { toast } from "react-toastify";
import { getAllReporting, updateReporting, updateFollowUp } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reportingAddSuccess: false,
  allReports: [],
};

export const setupGetAllReporting = createAsyncThunk(
  "reports/getAllReporting",
  async (data, thunkAPI) => {
    return getAllReporting(data, thunkAPI);
  }
);

export const setupUpdateReporting = createAsyncThunk(
  "reports/updateReporting",
  async (data, thunkAPI) => {
    return updateReporting(data, thunkAPI);
  }
);

export const setupUpdateFollowUp = createAsyncThunk(
  "reports/updateFollowUp",
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
        state.allReports = payload?.data || [];
      })
      .addCase(setupGetAllReporting.rejected, (state, { payload }) => {
        state.loading = false;
        state.companyAddSuccess = false;
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
        state.companyAddSuccess = false;
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
        state.companyAddSuccess = false;
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
