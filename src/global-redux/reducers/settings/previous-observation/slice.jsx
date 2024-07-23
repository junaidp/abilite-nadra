import { toast } from "react-toastify";
import {
  uploadFile,
  getAllPreviousObservations,
  createNewJob,
  getAllUsers,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  createObservationLoding: false,
  previousObservationAddSuccess: false,
  previousObservations: [],
  users: [],
};

export const setupUploadFile = createAsyncThunk(
  "previousObservations/uploadFile",
  async (data, thunkAPI) => {
    return uploadFile(data, thunkAPI);
  }
);
export const setupGetAllPreviousObservations = createAsyncThunk(
  "previousObservations/getAllPreviousObservations",
  async (data, thunkAPI) => {
    return getAllPreviousObservations(data, thunkAPI);
  }
);
export const setupCreateNewJob = createAsyncThunk(
  "previousObservations/createNewJob",
  async (data, thunkAPI) => {
    return createNewJob(data, thunkAPI);
  }
);
export const setupGetAllUsers = createAsyncThunk(
  "previousObservations/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "previousObservations",
  initialState,
  reducers: {
    resetPreviousObservationsAddSuccess: (state) => {
      state.previousObservationAddSuccess = false;
    },
    handleCleanUp: (state) => {
      (state.loading = false),
        (state.createObservationLoding = false),
        (state.previousObservationAddSuccess = false),
        (state.previousObservations = []),
        (state.users = []);
    },
  },
  // Upload File
  extraReducers: (builder) => {
    builder
      .addCase(setupUploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUploadFile.fulfilled, (state) => {
        state.loading = false;
        state.previousObservationAddSuccess = true;
        toast.success("File Uploaded Successfully");
      })
      .addCase(setupUploadFile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Previous Observations
    builder
      .addCase(setupGetAllPreviousObservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllPreviousObservations.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.previousObservations = payload?.data || [];
        }
      )
      .addCase(setupGetAllPreviousObservations.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Create New Job
    builder
      .addCase(setupCreateNewJob.pending, (state) => {
        state.createObservationLoding = true;
      })
      .addCase(setupCreateNewJob.fulfilled, (state) => {
        state.createObservationLoding = false;
        state.previousObservationAddSuccess = true;
        toast.success("Job Created Successfully");
      })
      .addCase(setupCreateNewJob.rejected, (state, action) => {
        state.createObservationLoding = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Create New Job
    builder
      .addCase(setupGetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload?.data || [];
      })
      .addCase(setupGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetPreviousObservationsAddSuccess, handleCleanUp } =
  slice.actions;

export default slice.reducer;
