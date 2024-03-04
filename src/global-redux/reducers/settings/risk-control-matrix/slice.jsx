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
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  initialLoading: false,
  allRCM: [],
  rcmAddSuccess: false,
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

export const slice = createSlice({
  name: "rcm",
  initialState,
  reducers: {
    resetRCMAddSuccess: (state) => {
      state.rcmAddSuccess = false;
    },
    handleReset: (state) => {
      state.allRCM = [];
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
  },
});

export const { resetRCMAddSuccess,handleReset } = slice.actions;

export default slice.reducer;
