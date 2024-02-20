import { getAllAuditPlanSummary, updateAuditPlanSummary } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allAuditPlanSummary: [],
  auditPlanSummaryAddSuccess: false,
};

export const setupGetAllAuditPlanSummary = createAsyncThunk(
  "auditPlanSummary/getAllAuditPlanSummary",
  async (data, thunkAPI) => {
    return getAllAuditPlanSummary(data, thunkAPI);
  }
);

export const setupUpdateAuditPlanSummary = createAsyncThunk(
  "auditPlanSummary/updateAuditPlanSummary",
  async (data, thunkAPI) => {
    return updateAuditPlanSummary(data, thunkAPI);
  }
);
export const slice = createSlice({
  name: "auditPlanSummary",
  initialState,
  reducers: {
    resetAuditPlanSummarySuccess: (state) => {
      state.auditPlanSummaryAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Get all audit plan summary
    builder
      .addCase(setupGetAllAuditPlanSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditPlanSummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allAuditPlanSummary = sortedArray || [];
      })
      .addCase(setupGetAllAuditPlanSummary.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Audit Plan Summary
    builder
      .addCase(setupUpdateAuditPlanSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateAuditPlanSummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auditPlanSummaryAddSuccess = true;
        toast.success("Audit Plan Summary Updated Successfully");
      })
      .addCase(setupUpdateAuditPlanSummary.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetAuditPlanSummarySuccess } = slice.actions;

export default slice.reducer;
