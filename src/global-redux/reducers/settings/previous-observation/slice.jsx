import { toast } from "react-toastify";
import { uploadFile, getAllPreviousObservations } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  previousObservationAddSuccess: false,
  previousObservations: [],
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

export const slice = createSlice({
  name: "previousObservations",
  initialState,
  reducers: {
    resetPreviousObservationsAddSuccess: (state) => {
      state.previousObservationAddSuccess = false;
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
  },
});

export const { resetPreviousObservationsAddSuccess } = slice.actions;

export default slice.reducer;
