import { toast } from "react-toastify";
import { uploadFile, updateFile, getAllFiles } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allFiles: [],
  fileAddSuccess: false,
};

export const setupUploadFile = createAsyncThunk(
  "docs/uploadFile",
  async (data, thunkAPI) => {
    return uploadFile(data, thunkAPI);
  }
);

export const setupUpdateFile = createAsyncThunk(
  "docs/updateFile",
  async (data, thunkAPI) => {
    return updateFile(data, thunkAPI);
  }
);

export const setupGetAllFiles = createAsyncThunk(
  "docs/getAllFiles",
  async (data, thunkAPI) => {
    return getAllFiles(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    resetFileAddSuccess: (state) => {
      state.fileAddSuccess = false;
    },
  },
  // Upload File
  extraReducers: (builder) => {
    builder
      .addCase(setupUploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.fileAddSuccess = true;
        toast.success("File Added Successfully");
      })
      .addCase(setupUploadFile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update File
    builder
      .addCase(setupUpdateFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateFile.fulfilled, (state, action) => {
        state.loading = false;
        state.fileAddSuccess = true;
        toast.success("File Updated Successfully");
      })
      .addCase(setupUpdateFile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Files
    builder
      .addCase(setupGetAllFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllFiles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allFiles = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllFiles.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetFileAddSuccess } = slice.actions;

export default slice.reducer;
