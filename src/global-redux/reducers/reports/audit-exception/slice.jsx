import { toast } from "react-toastify";
import { getJobsBasedOnNatureThrough } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  jobs: [],
};

export const setupGetJobsBasedOnNatureThrough = createAsyncThunk(
  "auditException/getJobsBasedOnNatureThrough",
  async (data, thunkAPI) => {
    return getJobsBasedOnNatureThrough(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auditException",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Internal Audit Reports
    builder
      .addCase(setupGetJobsBasedOnNatureThrough.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetJobsBasedOnNatureThrough.fulfilled,
        (state, { payload }) => {
          console.log(payload);
        }
      )
      .addCase(setupGetJobsBasedOnNatureThrough.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {} = slice.actions;

export default slice.reducer;
