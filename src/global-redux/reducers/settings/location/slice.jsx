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
  extraReducers: (builder) => {
    // Add Location
    builder
      .addCase(setupAddLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddLocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.locationAddSuccess = true;
        toast.success("Location Added Successfully");
      })
      .addCase(setupAddLocation.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
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
        state.loading = false;
        state.allLocations = payload?.data || [];
      })
      .addCase(setupGetAllLocations.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Location
    builder
      .addCase(setupUpdateLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateLocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.locationAddSuccess = true;
        toast.success("Location Updated Successfully");
      })
      .addCase(setupUpdateLocation.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Save Sub Location
    builder
      .addCase(setupSaveSubLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveSubLocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Sub Location Added Successfully");
        state.locationAddSuccess = true;
      })
      .addCase(setupSaveSubLocation.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Sub Location
    builder
      .addCase(setupUpdateSubLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateSubLocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Sub Location Updated Successfully");
        state.locationAddSuccess = true;
      })
      .addCase(setupUpdateSubLocation.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Delete Sub Location
    builder
      .addCase(setupDeleteSubLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteSubLocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.locationAddSuccess = true;
        toast.success("Sub Location Deleted Successfully");
      })
      .addCase(setupDeleteSubLocation.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetLocationAddSuccess } = slice.actions;

export default slice.reducer;
