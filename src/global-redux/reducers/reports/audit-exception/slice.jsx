import { toast } from "react-toastify";
import { getAllAuditExceptions, getAllLocations } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  jobs: [],
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

export const slice = createSlice({
  name: "auditException",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Audit Exception
    builder
      .addCase(setupGetAllAuditExceptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditExceptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.jobs = payload?.data;
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
        state.loading = true;
      })
      .addCase(setupGetAllLocations.fulfilled, (state, { payload }) => {
        state.jobs = payload?.data;
      })
      .addCase(setupGetAllLocations.rejected, (state, action) => {
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
