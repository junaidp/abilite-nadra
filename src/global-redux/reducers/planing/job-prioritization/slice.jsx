import {
  getAllJobPrioritization,
  updateJobPrioritization,
  getInitialAllJobPrioritization,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  initialLoading: false,
  allJobPrioritization: [],
  jobPrioritizationAddSuccess: false,
  totalNoOfRecords: 0,
};

export const setupGetAllJobPrioritization = createAsyncThunk(
  "jobPrioritization/getAllJobPrioritization",
  async (data, thunkAPI) => {
    return getAllJobPrioritization(data, thunkAPI);
  }
);

export const setupGetInitialAllJobPrioritization = createAsyncThunk(
  "jobPrioritization/getInitialAllJobPrioritization",
  async (data, thunkAPI) => {
    return getInitialAllJobPrioritization(data, thunkAPI);
  }
);

export const setupUpdateJobPrioritization = createAsyncThunk(
  "jobPrioritization/updateJobPrioritization",
  async (data, thunkAPI) => {
    return updateJobPrioritization(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "jobPrioritization",
  initialState,
  reducers: {
    resetJobPrioritizationSuccess: (state) => {
      state.jobPrioritizationAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Get all job prioritization
    builder
      .addCase(setupGetAllJobPrioritization.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllJobPrioritization.fulfilled, (state, { payload }) => {
        state.totalNoOfRecords = payload?.message;
        state.loading = false;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allJobPrioritization = sortedArray || [];
      })
      .addCase(setupGetAllJobPrioritization.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Initial all job prioritization
    builder
      .addCase(setupGetInitialAllJobPrioritization.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(
        setupGetInitialAllJobPrioritization.fulfilled,
        (state, { payload }) => {
          state.totalNoOfRecords = payload?.message;
          state.initialLoading = false;
          const sortedArray = payload?.data?.sort(
            (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
          );
          state.allJobPrioritization = sortedArray || [];
        }
      )
      .addCase(
        setupGetInitialAllJobPrioritization.rejected,
        (state, { payload }) => {
          state.initialLoading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Update job Prioritization
    builder
      .addCase(setupUpdateJobPrioritization.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateJobPrioritization.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Job Prioritizing Updated Successfully");
        state.jobPrioritizationAddSuccess = true;
      })
      .addCase(setupUpdateJobPrioritization.rejected, (state, { payload }) => {
        state.loading = false;
        state.jobPrioritizationAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetJobPrioritizationSuccess } = slice.actions;

export default slice.reducer;
