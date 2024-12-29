import { toast } from "react-toastify";
import { getAllUsers, uploadFile } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  previousObservationAddSuccess: false,
};

export const setupGetAllUser = createAsyncThunk(
  "previousObservations/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
  }
);

export const setupUploadFile = createAsyncThunk(
  "previousObservations/uploadFile",
  async (data, thunkAPI) => {
    return uploadFile(data, thunkAPI);
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
  extraReducers: (builder) => {
    // Get All Users
    builder
      .addCase(setupGetAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload?.data || [];
      })
      .addCase(setupGetAllUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Upload File
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
  },
});

export const { resetPreviousObservationsAddSuccess } = slice.actions;

export default slice.reducer;
