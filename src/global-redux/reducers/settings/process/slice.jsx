import { toast } from "react-toastify";
import {
  addProcess,
  getAllProcess,
  saveSubProcess,
  getAllSubProcess,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading: false,
  processAddSuccess: false,
  allProcess: [],
  allSubProcess: [],
};

export const setupAddProcess = createAsyncThunk(
  "process/addProcess",
  async (data, thunkAPI) => {
    return addProcess(data, thunkAPI);
  }
);
export const setupGetAllProcess = createAsyncThunk(
  "process/getAllProcess",
  async (data, thunkAPI) => {
    return getAllProcess(data, thunkAPI);
  }
);
export const setupSaveSubProcess = createAsyncThunk(
  "process/saveSubProcess",
  async (data, thunkAPI) => {
    return saveSubProcess(data, thunkAPI);
  }
);

export const setupGetAllSubProcess = createAsyncThunk(
  "process/getAllSubProcess",
  async (data, thunkAPI) => {
    return getAllSubProcess(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "process",
  initialState,
  reducers: {
    resetProcessAddSuccess: (state, action) => {
      state.processAddSuccess = false;
    },
  },
  // Add Process
  extraReducers: (builder) => {
    builder
      .addCase(setupAddProcess.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.processAddSuccess = true;
        toast.success("Process Added Successfully");
      })
      .addCase(setupAddProcess.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Process
    builder
      .addCase(setupGetAllProcess.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.allProcess = action.payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllProcess.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Save Sub Process
    builder
      .addCase(setupSaveSubProcess.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveSubProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.processAddSuccess = true;
        toast.success("Sub Process Added Successfully");
      })
      .addCase(setupSaveSubProcess.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Sub Process
    builder
      .addCase(setupGetAllSubProcess.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupGetAllSubProcess.fulfilled, (state, action) => {
        state.subLoading = false;
        if (Array.isArray(action.payload?.data)) {
          state.allSubProcess = action.payload?.data || [
            { error: "Not Found" },
          ];
        }
        if (!Array.isArray(action.payload?.data) && action.payload?.data) {
          state.allSubProcess = [{ ...action.payload?.data }] || [
            { error: "Not Found" },
          ];
        }
        if (!Array.isArray(action.payload?.data) && !action.payload?.data) {
          state.allSubProcess = [{ error: "Not Found" }];
        }
      })
      .addCase(setupGetAllSubProcess.rejected, (state, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetProcessAddSuccess } = slice.actions;

export default slice.reducer;
