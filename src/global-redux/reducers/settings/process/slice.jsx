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
  extraReducers: {
    // Setup Add Process
    [setupAddProcess.pending]: (state) => {
      state.loading = true;
    },
    [setupAddProcess.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.processAddSuccess = true;
      toast.success("Process Added Successfully");
    },
    [setupAddProcess.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Get All Process
    [setupGetAllProcess.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllProcess.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allProcess =
        payload?.data?.filter((all) => all?.description !== null) || [];
    },
    [setupGetAllProcess.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Add Sub Process
    [setupSaveSubProcess.pending]: (state) => {
      state.loading = true;
    },
    [setupSaveSubProcess.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.processAddSuccess = true;
      toast.success("Sub Process Added Successfully");
    },
    [setupSaveSubProcess.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },

    // Setup Add Sub Process
    [setupGetAllSubProcess.pending]: (state) => {},
    [setupGetAllSubProcess.fulfilled]: (state, { payload }) => {
      if (Array.isArray(payload?.data)) {
        state.allSubProcess = payload?.data || [];
      }
      if (!Array.isArray(payload?.data) && payload?.data) {
        state.allSubProcess = [{ ...payload?.data }];
      }
      if (!Array.isArray(payload?.data) && !payload?.data) {
        state.allSubProcess = [];
      }
    },
    [setupGetAllSubProcess.rejected]: (state, { payload }) => {
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetProcessAddSuccess } = slice.actions;

export default slice.reducer;
