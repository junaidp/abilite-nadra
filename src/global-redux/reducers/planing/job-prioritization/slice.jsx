import { getAllJobPrioritization } from "./thunk";
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

export const slice = createSlice({
  name: "jobPrioritization",
  initialState,
  reducers: {
    resetJobPrioritizationSuccess: (state) => {
      state.jobPrioritizationAddSuccess = false;
    },
  },
  extraReducers: {
    // Get all auditable units
    [setupGetAllJobPrioritization.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllJobPrioritization.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allJobPrioritization = payload?.data;
    },
    [setupGetAllJobPrioritization.rejected]: (state, { payload }) => {
      state.loading = false;
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
