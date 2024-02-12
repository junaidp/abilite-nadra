import {
  getAllAuditEngagement,
  saveAuditNotification,
  saveRiskControlMatrixObjective,
  updateRiskControlMatrixObjective,
  saveRiskControlMatrixRating,
  updateRiskControlMatrixRating,
  saveRiskControlMatrixControl,
  updateRiskControlMatrixControl,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  loading: false,
  auditEngagementAddSuccess: false,
  allAuditEngagement: [],
};

export const setupGetAllAuditEngagement = createAsyncThunk(
  "auditEngagement/getAllAuditEngagement",
  async (data, thunkAPI) => {
    return getAllAuditEngagement(data, thunkAPI);
  }
);

export const setupSaveAuditNotification = createAsyncThunk(
  "auditEngagement/saveAuditNotification",
  async (data, thunkAPI) => {
    return saveAuditNotification(data, thunkAPI);
  }
);

export const setupSaveRiskControlMatrixObjective = createAsyncThunk(
  "auditEngagement/saveRiskControlMatrixObjective",
  async (data, thunkAPI) => {
    return saveRiskControlMatrixObjective(data, thunkAPI);
  }
);

export const setupUpdateRiskControlMatrixObjective = createAsyncThunk(
  "auditEngagement/updateRiskControlMatrixObjective",
  async (data, thunkAPI) => {
    return updateRiskControlMatrixObjective(data, thunkAPI);
  }
);

export const setupSaveRiskControlMatrixRating = createAsyncThunk(
  "auditEngagement/saveRiskControlMatrixRating",
  async (data, thunkAPI) => {
    return saveRiskControlMatrixRating(data, thunkAPI);
  }
);
export const setupUpdateRiskControlMatrixRating = createAsyncThunk(
  "auditEngagement/updateRiskControlMatrixRating",
  async (data, thunkAPI) => {
    return updateRiskControlMatrixRating(data, thunkAPI);
  }
);

export const setupSaveRiskControlMatrixControl = createAsyncThunk(
  "auditEngagement/saveRiskControlMatrixControl",
  async (data, thunkAPI) => {
    return saveRiskControlMatrixControl(data, thunkAPI);
  }
);

export const setupUpdateRiskControlMatrixControl = createAsyncThunk(
  "auditEngagement/updateRiskControlMatrixControl",
  async (data, thunkAPI) => {
    return updateRiskControlMatrixControl(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auditEngagement",
  initialState,
  reducers: {
    resetAuditEngagementAddSuccess: (state, action) => {
      state.auditEngagementAddSuccess = false;
    },
  },
  // Get all audit notifications
  extraReducers: (builder) => {
    builder
      .addCase(setupGetAllAuditEngagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditEngagement.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allAuditEngagement = payload?.data || [];
      })
      .addCase(setupGetAllAuditEngagement.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Save audit notification
    builder
      .addCase(setupSaveAuditNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveAuditNotification.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Audit notification saved successfully");
      })
      .addCase(setupSaveAuditNotification.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Save Risk Control Matrix Objective
    builder
      .addCase(setupSaveRiskControlMatrixObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveRiskControlMatrixObjective.fulfilled, (state) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Risk Control Matrix Objective Saved Successfully");
      })
      .addCase(
        setupSaveRiskControlMatrixObjective.rejected,
        (state, action) => {
          state.loading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Update  Risk Control Matrix Objective
    builder
      .addCase(setupUpdateRiskControlMatrixObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRiskControlMatrixObjective.fulfilled, (state) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Risk Control Matrix Objective Updated Successfully");
      })
      .addCase(
        setupUpdateRiskControlMatrixObjective.rejected,
        (state, action) => {
          state.loading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Save Risk Control Matrix Rating
    builder
      .addCase(setupSaveRiskControlMatrixRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveRiskControlMatrixRating.fulfilled, (state) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Risk Control Matrix Rating Saved Successfully");
      })
      .addCase(setupSaveRiskControlMatrixRating.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Risk Control Matrix Rating
    builder
      .addCase(setupUpdateRiskControlMatrixRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRiskControlMatrixRating.fulfilled, (state) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Risk Control Matrix Rating Updated Successfully");
      })
      .addCase(setupUpdateRiskControlMatrixRating.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Save Risk Control Matrix Control
    builder
      .addCase(setupSaveRiskControlMatrixControl.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveRiskControlMatrixControl.fulfilled, (state) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Risk Control Matrix Control Saved Successfully");
      })
      .addCase(setupSaveRiskControlMatrixControl.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Risk Control Matrix Control
    builder
      .addCase(setupUpdateRiskControlMatrixControl.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRiskControlMatrixControl.fulfilled, (state) => {
        state.loading = false;
        state.auditEngagementAddSuccess = true;
        toast.success("Risk Control Matrix Control Updated Successfully");
      })
      .addCase(
        setupUpdateRiskControlMatrixControl.rejected,
        (state, action) => {
          state.loading = false;
          if (action.payload?.response?.data?.message) {
            toast.error(action.payload.response.data.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
  },
});

export const { resetAuditEngagementAddSuccess } = slice.actions;

export default slice.reducer;
