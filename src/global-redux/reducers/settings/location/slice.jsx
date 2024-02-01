import { toast } from "react-toastify";
import {
  addLocation,
  getAllLocations,
  updateLocation,
  saveSubLocation,
  updateSubLocation,
  deleteSubLocation,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  locationAddSuccess: false,
  allLocations: [],
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

export const setupUpdateLocation = createAsyncThunk(
  "location/updateLocation",
  async (data, thunkAPI) => {
    return updateLocation(data, thunkAPI);
  }
);
export const setupSaveSubLocation = createAsyncThunk(
  "location/saveSubLocation",
  async (data, thunkAPI) => {
    return saveSubLocation(data, thunkAPI);
  }
);

export const setupUpdateSubLocation = createAsyncThunk(
  "location/updateSubLocation",
  async (data, thunkAPI) => {
    return updateSubLocation(data, thunkAPI);
  }
);

export const setupDeleteSubLocation = createAsyncThunk(
  "location/deleteSubLocation",
  async (data, thunkAPI) => {
    return deleteSubLocation(data, thunkAPI);
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
      state.loading = false;
      state.locationAddSuccess = true;
      toast.success("Location Added Successfully");
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
      state.loading = false;
      state.allLocations = payload?.data || [];
    },
    [setupGetAllLocations.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Update  Location
    [setupUpdateLocation.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateLocation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.locationAddSuccess = true;
      toast.success("Location Updated Successfully")
    },
    [setupUpdateLocation.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Save Sub   Location
    [setupSaveSubLocation.pending]: (state) => {
      state.loading = true;
    },
    [setupSaveSubLocation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success("Sub Location Added Successfully");
      state.locationAddSuccess = true;
    },
    [setupSaveSubLocation.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Update Sub Location
    [setupUpdateSubLocation.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateSubLocation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success("Sub Location Updated Successfully");
      state.locationAddSuccess = true;
    },
    [setupUpdateSubLocation.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },

    // Setup Delete Sub Location
    [setupDeleteSubLocation.pending]: (state) => {
      state.loading = true;
    },
    [setupDeleteSubLocation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.locationAddSuccess = true;
      toast.success("Sub Location Deleted Successfully");
    },
    [setupDeleteSubLocation.rejected]: (state, { payload }) => {
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
