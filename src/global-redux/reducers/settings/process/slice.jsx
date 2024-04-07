import { toast } from "react-toastify";
import {
  addProcess,
  getAllProcess,
  saveSubProcess,
  getAllSubProcess,
  editSubProcess,
  deleteProcess,
  deleteSubProcess,
  editProcess,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subLoading: false,
  processAddSuccess: false,
  allProcess: [],
  allSubProcess: [],
  subProcessAddSuccess: false,
};

export const setupAddProcess = createAsyncThunk(
  "process/addProcess",
  async (data, thunkAPI) => {
    return addProcess(data, thunkAPI);
  }
);
export const setupEditProcess = createAsyncThunk(
  "process/editProcess",
  async (data, thunkAPI) => {
    return editProcess(data, thunkAPI);
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
export const setupEditSubProcess = createAsyncThunk(
  "process/editSubProcess",
  async (data, thunkAPI) => {
    return editSubProcess(data, thunkAPI);
  }
);
export const setupDeleteProcess = createAsyncThunk(
  "process/deleteProcess",
  async (data, thunkAPI) => {
    return deleteProcess(data, thunkAPI);
  }
);
export const setupDeleteSubProcess = createAsyncThunk(
  "process/deleteSubProcess",
  async (data, thunkAPI) => {
    return deleteSubProcess(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "process",
  initialState,
  reducers: {
    resetProcessAddSuccess: (state) => {
      state.processAddSuccess = false;
    },
    resetSubProcessAddSuccess: (state) => {
      state.subProcessAddSuccess = false;
    },
    resetAllValues: (state) => {
      state.allProcess = [];
      state.allSubProcess = [];
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
    // Edit Process
    builder
      .addCase(setupEditProcess.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupEditProcess.fulfilled, (state) => {
        state.loading = false;
        state.processAddSuccess = true;
        toast.success("Process Updated Successfully");
      })
      .addCase(setupEditProcess.rejected, (state, action) => {
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
        state.subLoading = true;
      })
      .addCase(setupSaveSubProcess.fulfilled, (state) => {
        state.subLoading = false;
        state.subProcessAddSuccess = true;
        toast.success("Sub Process Added Successfully");
      })
      .addCase(setupSaveSubProcess.rejected, (_, action) => {
        state.subLoading = false;
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
    // Edit Sub Process
    builder
      .addCase(setupEditSubProcess.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupEditSubProcess.fulfilled, (state) => {
        state.subLoading = false;
        state.subProcessAddSuccess = true;
        toast.success("Sub Process Updated Successfully");
      })
      .addCase(setupEditSubProcess.rejected, (_, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Sub Process
    builder
      .addCase(setupDeleteSubProcess.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupDeleteSubProcess.fulfilled, (state) => {
        state.subLoading = false;
        state.subProcessAddSuccess = true;
        toast.success("Sub Process Deleted Successfully");
      })
      .addCase(setupDeleteSubProcess.rejected, (_, action) => {
        state.subLoading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete  Process
    builder
      .addCase(setupDeleteProcess.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteProcess.fulfilled, (state) => {
        state.loading = false;
        state.processAddSuccess = true;
        toast.success("Process Deleted Successfully");
      })
      .addCase(setupDeleteProcess.rejected, (_, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  resetProcessAddSuccess,
  resetAllValues,
  resetSubProcessAddSuccess,
} = slice.actions;

export default slice.reducer;
