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
        state.processAddSuccess = !action.error;
        if (!action.error) {
          toast.success("Process Added Successfully");
        }
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
        state.allProcess =
          action.payload?.data?.filter((all) => all?.description !== null) ||
          [];
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
        state.processAddSuccess = !action.error;
        if (!action.error) {
          toast.success("Sub Process Added Successfully");
        }
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
      .addCase(setupGetAllSubProcess.pending, (state) => {})
      .addCase(setupGetAllSubProcess.fulfilled, (state, action) => {
        if (Array.isArray(action.payload?.data)) {
          state.allSubProcess = action.payload?.data || [];
        }
        if (!Array.isArray(action.payload?.data) && action.payload?.data) {
          state.allSubProcess = [{ ...action.payload?.data }];
        }
        if (!Array.isArray(action.payload?.data) && !action.payload?.data) {
          state.allSubProcess = [];
        }
      })
      .addCase(setupGetAllSubProcess.rejected, (state, action) => {
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
