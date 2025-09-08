import { toast } from "react-toastify";
import {
  createRiskControlMatrix,
  updateRiskControlMatrix,
  getAllRiskControlMatrix,
  getInitialAllRiskControlMatrix,
  createObjective,
  updateObjective,
  createRisk,
  updateRisk,
  createControl,
  updateControl,
  createProgram,
  updateProgram,
  deleteRCM,
  deleteRCMObjective,
  deleteRCMRisk,
  deleteRCMControl,
  deleteRCMProgram,
  getAllProcess,
  getAllSubProcess,
  uploadRCM
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  initialLoading: false,
  allRCM: [],
  rcmAddSuccess: false,
  rcmUploadAddSuccess: false,
  allProcess: [],
  allSubProcess: [],
};

export const setupCreateRiskControlMatrix = createAsyncThunk(
  "rcm/createRiskControlMatrix",
  async (data, thunkAPI) => {
    return createRiskControlMatrix(data, thunkAPI);
  }
);

export const setupUpdateRiskControlMatrix = createAsyncThunk(
  "rcm/updateRiskControlMatrix",
  async (data, thunkAPI) => {
    return updateRiskControlMatrix(data, thunkAPI);
  }
);

export const setupGetAllRiskControlMatrix = createAsyncThunk(
  "rcm/getAllRiskControlMatrix",
  async (data, thunkAPI) => {
    return getAllRiskControlMatrix(data, thunkAPI);
  }
);

export const setupGetInitialAllRiskControlMatrix = createAsyncThunk(
  "rcm/getInitialAllRiskControlMatrix",
  async (data, thunkAPI) => {
    return getInitialAllRiskControlMatrix(data, thunkAPI);
  }
);
export const setupCreateObjective = createAsyncThunk(
  "rcm/createObjective",
  async (data, thunkAPI) => {
    return createObjective(data, thunkAPI);
  }
);
export const setupUpdateObjective = createAsyncThunk(
  "rcm/updateObjective",
  async (data, thunkAPI) => {
    return updateObjective(data, thunkAPI);
  }
);
export const setupCreateRisk = createAsyncThunk(
  "rcm/createRisk",
  async (data, thunkAPI) => {
    return createRisk(data, thunkAPI);
  }
);
export const setupUpdateRisk = createAsyncThunk(
  "rcm/updateRisk",
  async (data, thunkAPI) => {
    return updateRisk(data, thunkAPI);
  }
);
export const setupCreateControl = createAsyncThunk(
  "rcm/createControl",
  async (data, thunkAPI) => {
    return createControl(data, thunkAPI);
  }
);

export const setupUpdateControl = createAsyncThunk(
  "rcm/updateControl",
  async (data, thunkAPI) => {
    return updateControl(data, thunkAPI);
  }
);
export const setupCreateProgram = createAsyncThunk(
  "rcm/createProgram",
  async (data, thunkAPI) => {
    return createProgram(data, thunkAPI);
  }
);
export const setupUpdateProgram = createAsyncThunk(
  "rcm/updateProgram",
  async (data, thunkAPI) => {
    return updateProgram(data, thunkAPI);
  }
);
export const setupDeleteRCM = createAsyncThunk(
  "rcm/deleteRCM",
  async (data, thunkAPI) => {
    return deleteRCM(data, thunkAPI);
  }
);
export const setupDeleteRCMObjective = createAsyncThunk(
  "rcm/deleteRCMObjective",
  async (data, thunkAPI) => {
    return deleteRCMObjective(data, thunkAPI);
  }
);
export const setupDeleteRCMRisk = createAsyncThunk(
  "rcm/deleteRCMRisk",
  async (data, thunkAPI) => {
    return deleteRCMRisk(data, thunkAPI);
  }
);
export const setupDeleteRCMControl = createAsyncThunk(
  "rcm/deleteRCMControl",
  async (data, thunkAPI) => {
    return deleteRCMControl(data, thunkAPI);
  }
);
export const setupDeleteRCMProgram = createAsyncThunk(
  "rcm/deleteRCMProgram",
  async (data, thunkAPI) => {
    return deleteRCMProgram(data, thunkAPI);
  }
);

export const setupGetAllProcess = createAsyncThunk(
  "rcm/getAllProcess",
  async (data, thunkAPI) => {
    return getAllProcess(data, thunkAPI);
  }
);

export const setupGetAllSubProcess = createAsyncThunk(
  "rcm/getAllSubProcess",
  async (data, thunkAPI) => {
    return getAllSubProcess(data, thunkAPI);
  }
);

export const setupUploadRCM = createAsyncThunk(
  "rcm/uploadRCM",
  async (data, thunkAPI) => {
    return uploadRCM(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "rcm",
  initialState,
  reducers: {
    resetRCMAddSuccess: (state) => {
      state.rcmAddSuccess = false;
    },
    resetRCMUploadAddSuccess: (state) => {
      state.rcmUploadAddSuccess = false;
    },
    handleReset: (state) => {
      state.allRCM = [];
    },
    handleResetProcessData: (state) => {
      state.allProcess = [];
      state.allSubProcess = [];
    },
  },
  extraReducers: (builder) => {
    // Get All RCM
    builder
      .addCase(setupGetAllRiskControlMatrix.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllRiskControlMatrix.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allRCM = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllRiskControlMatrix.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    //   Get Initial All RCM
    builder
      .addCase(setupGetInitialAllRiskControlMatrix.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(
        setupGetInitialAllRiskControlMatrix.fulfilled,
        (state, { payload }) => {
          state.initialLoading = false;
          state.allRCM = payload?.data || [{ error: "Not Found" }];
        }
      )
      .addCase(
        setupGetInitialAllRiskControlMatrix.rejected,
        (state, action) => {
          state.initialLoading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    //   Create RCM
    builder
      .addCase(setupCreateRiskControlMatrix.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupCreateRiskControlMatrix.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Added Successfully");
      })
      .addCase(setupCreateRiskControlMatrix.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Update RCM
    builder
      .addCase(setupUpdateRiskControlMatrix.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRiskControlMatrix.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Updated Successfully");
      })
      .addCase(setupUpdateRiskControlMatrix.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Create Objective
    builder
      .addCase(setupCreateObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupCreateObjective.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Objective Added Successfully");
      })
      .addCase(setupCreateObjective.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Update Objective
    builder
      .addCase(setupUpdateObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateObjective.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Objective Updated Successfully");
      })
      .addCase(setupUpdateObjective.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Create Risk
    builder
      .addCase(setupCreateRisk.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupCreateRisk.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Risk Added Successfully");
      })
      .addCase(setupCreateRisk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Update Risk
    builder
      .addCase(setupUpdateRisk.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRisk.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Risk Updated Successfully");
      })
      .addCase(setupUpdateRisk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Create Control
    builder
      .addCase(setupCreateControl.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupCreateControl.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Control Added Successfully");
      })
      .addCase(setupCreateControl.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Update Control
    builder
      .addCase(setupUpdateControl.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateControl.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Control Updated Successfully");
      })
      .addCase(setupUpdateControl.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Create Program
    builder
      .addCase(setupCreateProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupCreateProgram.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Program Added Successfully");
      })
      .addCase(setupCreateProgram.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Update Program
    builder
      .addCase(setupUpdateProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateProgram.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Program Updated Successfully");
      })
      .addCase(setupUpdateProgram.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Delete RCM
    builder
      .addCase(setupDeleteRCM.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteRCM.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Deleted Successfully");
      })
      .addCase(setupDeleteRCM.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Delete RCM Objective
    builder
      .addCase(setupDeleteRCMObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteRCMObjective.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Objective Deleted Successfully");
      })
      .addCase(setupDeleteRCMObjective.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Delete RCM Risk
    builder
      .addCase(setupDeleteRCMRisk.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteRCMRisk.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Risk Deleted Successfully");
      })
      .addCase(setupDeleteRCMRisk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Delete RCM Control
    builder
      .addCase(setupDeleteRCMControl.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteRCMControl.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Control Deleted Successfully");
      })
      .addCase(setupDeleteRCMControl.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    //   Delete RCM Program
    builder
      .addCase(setupDeleteRCMProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteRCMProgram.fulfilled, (state) => {
        state.loading = false;
        state.rcmAddSuccess = true;
        toast.success("Risk Control Matrix Program Deleted Successfully");
      })
      .addCase(setupDeleteRCMProgram.rejected, (state, action) => {
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
    builder
      .addCase(setupGetAllSubProcess.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllSubProcess.fulfilled, (state, action) => {
        state.loading = false;
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
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    builder
      .addCase(setupUploadRCM.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUploadRCM.fulfilled, (state) => {
        state.loading = false;
        state.rcmUploadAddSuccess = true;
        toast.success("File Uploaded Successfully");
      })
      .addCase(setupUploadRCM.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetRCMAddSuccess, handleReset, handleResetProcessData, resetRCMUploadAddSuccess } =
  slice.actions;

export default slice.reducer;
