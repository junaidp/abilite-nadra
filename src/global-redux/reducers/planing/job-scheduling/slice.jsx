import { getAllJobScheduling, updateJobScheduling } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allJobScheduling: [],
  jobSchedulingAddSuccess: false,
};

export const setupGetAllJobScheduling = createAsyncThunk(
  "jobScheduling/getAllJobScheduling",
  async (data, thunkAPI) => {
    return getAllJobScheduling(data, thunkAPI);
  }
);
export const setupUpdateJobScheduling = createAsyncThunk(
  "jobScheduling/updateJobScheduling",
  async (data, thunkAPI) => {
    return updateJobScheduling(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "jobScheduling",
  initialState,
  reducers: {
    resetJobSchedulingSuccess: (state) => {
      state.jobSchedulingAddSuccess = false;
    },
  },
  extraReducers: {
    // Get all job prioritization
    [setupGetAllJobScheduling.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllJobScheduling.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allJobScheduling = payload?.data || [];
    },
    [setupGetAllJobScheduling.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update job Prioritization
    [setupUpdateJobScheduling.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateJobScheduling.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success("Job Scheduling Updated Successfully");
      state.jobSchedulingAddSuccess = true;
    },
    [setupUpdateJobScheduling.rejected]: (state, { payload }) => {
      state.loading = false;
      state.jobPrioritizationAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetJobPrioritizationSuccess } = slice.actions;

export default slice.reducer;
