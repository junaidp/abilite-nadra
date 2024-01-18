import { toast } from "react-toastify";
import { addLocation, getAllLocations } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  locationAddSuccess: false,
};

export const setupAddLocation = createAsyncThunk(
  "location/addLocation",
  async (data, thunkAPI) => {
    return addLocation(data, thunkAPI);
  }
);

export const setupGetAllLocations = createAsyncThunk(
  "location/getAllLocations",
  async (data, thunkAPI) => {
    return getAllLocations(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetLocationAddSuccess: (state, action) => {
      state.locationAddSuccess = false;
    },
  },
  extraReducers: {
    // Setup Add Location
    [setupAddLocation.pending]: (state) => {
      state.loading = true;
    },
    [setupAddLocation.fulfilled]: (state, { payload }) => {
      toast.success("Location Added Successfully");
      state.loading = false;
    },
    [setupAddLocation.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Get All Locations
    [setupGetAllLocations.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllLocations.fulfilled]: (state, { payload }) => {
      toast.success("Location Added Successfully");
      state.loading = false;
    },
    [setupGetAllLocations.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetLocationAddSuccess } = slice.actions;

export default slice.reducer;
