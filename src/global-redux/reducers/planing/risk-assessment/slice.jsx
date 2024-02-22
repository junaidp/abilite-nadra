import {
  getAllRiskAssessments,
  updateRiskAssessment,
  performRiskAssessment,
  addRiskAssessment,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allRiskAssessments: [],
  riskAssessmentSuccess: false,
  performRiskAssessmentObject: {},
};

export const setupGetAllRiskAssessments = createAsyncThunk(
  "riskAssessment/getAllRiskAssessments",
  async (data, thunkAPI) => {
    return getAllRiskAssessments(data, thunkAPI);
  }
);

export const setupUpdateRiskAssessment = createAsyncThunk(
  "riskAssessment/updateRiskAssessment",
  async (data, thunkAPI) => {
    return updateRiskAssessment(data, thunkAPI);
  }
);

export const setupPerformRiskAssessment = createAsyncThunk(
  "riskAssessment/performRiskAssessment",
  async (data, thunkAPI) => {
    return performRiskAssessment(data, thunkAPI);
  }
);

export const setupAddRiskAssessment = createAsyncThunk(
  "riskAssessment/addRiskAssessment",
  async (data, thunkAPI) => {
    return addRiskAssessment(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "riskAssessment",
  initialState,
  reducers: {
    resetRiskAssessment: (state) => {
      state.riskAssessmentSuccess = false;
    },
    handleCleanUp: (state) => {
      (state.loading = false),
        (state.allRiskAssessments = []),
        (state.riskAssessmentSuccess = false),
        (state.performRiskAssessmentObject = {});
    },
  },
  extraReducers: (builder) => {
    // Get All Risk Assessment
    builder
      .addCase(setupGetAllRiskAssessments.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllRiskAssessments.fulfilled, (state, { payload }) => {
        state.loading = false;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allRiskAssessments = sortedArray || [];
      })
      .addCase(setupGetAllRiskAssessments.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Risk Assessment
    builder
      .addCase(setupUpdateRiskAssessment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateRiskAssessment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.riskAssessmentSuccess = true;
        toast.success("Risk Assessment Updated Successfully");
      })
      .addCase(setupUpdateRiskAssessment.rejected, (state, { payload }) => {
        state.loading = false;
        state.riskAssessmentSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Perform Risk Assessment
    builder
      .addCase(setupPerformRiskAssessment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupPerformRiskAssessment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.performRiskAssessmentObject = payload?.data;
      })
      .addCase(setupPerformRiskAssessment.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add Risk Assessment
    builder
      .addCase(setupAddRiskAssessment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddRiskAssessment.fulfilled, (state) => {
        state.loading = false;
        state.riskAssessmentSuccess = true;
      })
      .addCase(setupAddRiskAssessment.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetRiskAssessment, handleCleanUp } = slice.actions;

export default slice.reducer;
