import {
  getAllRiskAssessments,
  updateRiskAssessment,
  performRiskAssessment,
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

export const slice = createSlice({
  name: "riskAssessment",
  initialState,
  reducers: {
    resetRiskAssessment: (state) => {
      state.riskAssessmentSuccess = false;
    },
  },
  extraReducers: {
    // Get All Risk Assessment
    [setupGetAllRiskAssessments.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllRiskAssessments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allRiskAssessments = payload?.data;
    },
    [setupGetAllRiskAssessments.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Risk Assessment
    [setupUpdateRiskAssessment.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateRiskAssessment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.riskAssessmentSuccess = true;
      toast.success("Risk Assessment Updated Successfully");
    },
    [setupUpdateRiskAssessment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.riskAssessmentSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Risk Assessment
    [setupPerformRiskAssessment.pending]: (state) => {
      state.loading = true;
    },
    [setupPerformRiskAssessment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.performRiskAssessmentObject=payload?.data
    },
    [setupPerformRiskAssessment.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetRiskAssessment } = slice.actions;

export default slice.reducer;
