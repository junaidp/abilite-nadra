import { getAllJobPrioritization, updateJobPrioritization } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allJobPrioritization: [],
  jobPrioritizationAddSuccess: false,
};

export const setupGetAllJobPrioritization = createAsyncThunk(
  "jobPrioritization/getAllJobPrioritization",
  async (data, thunkAPI) => {
    return getAllJobPrioritization(data, thunkAPI);
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
  extraReducers: {
    // Get all job prioritization
    [setupGetAllJobPrioritization.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllJobPrioritization.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allJobPrioritization = payload?.data || [];
    },
    [setupGetAllJobPrioritization.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update job Prioritization
    [setupUpdateJobPrioritization.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateJobPrioritization.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success("Job Prioritizing Updated Successfully");
      state.jobPrioritizationAddSuccess = true;
    },
    [setupUpdateJobPrioritization.rejected]: (state, { payload }) => {
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
