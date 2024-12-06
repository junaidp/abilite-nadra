import {
  getAllAuditableUnits,
  addAuditableUnit,
  EditAuditableUnit,
  SubmitAuditableUnit,
  GetRiskAssessment,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allAuditableUnits: [],
  auditableUnitAddSuccess: false,
  totalNoOfRecords: 0,
  riskAssessments: [],
};

export const setupGetAllAuditableUnits = createAsyncThunk(
  "auditableUnits/getAllAuditableUnits",
  async (data, thunkAPI) => {
    return getAllAuditableUnits(data, thunkAPI);
  }
);
export const setupAddAuditableUnit = createAsyncThunk(
  "auditableUnits/addAuditableUnit",
  async (data, thunkAPI) => {
    return addAuditableUnit(data, thunkAPI);
  }
);

export const setupEditAuditableUnit = createAsyncThunk(
  "auditableUnits/EditAuditableUnit",
  async (data, thunkAPI) => {
    return EditAuditableUnit(data, thunkAPI);
  }
);

export const setupSubmitAuditableUnit = createAsyncThunk(
  "auditableUnits/SubmitAuditableUnit",
  async (data, thunkAPI) => {
    return SubmitAuditableUnit(data, thunkAPI);
  }
);
export const setupGetRiskAssessment = createAsyncThunk(
  "auditableUnits/GetRiskAssessment",
  async (data, thunkAPI) => {
    return GetRiskAssessment(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "auditableUnits",
  initialState,
  reducers: {
    resetAuditableUnitSuccess: (state) => {
      state.auditableUnitAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Get all auditable units
    builder
      .addCase(setupGetAllAuditableUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditableUnits.fulfilled, (state, { payload }) => {
        state.totalNoOfRecords = payload?.message;
        state.loading = false;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allAuditableUnits = sortedArray || [];
      })
      .addCase(setupGetAllAuditableUnits.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add Auditable Unit
    builder
      .addCase(setupAddAuditableUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddAuditableUnit.fulfilled, (state) => {
        state.loading = false;
        state.auditableUnitAddSuccess = true;
        toast.success("Auditable Unit Added Successfully");
      })
      .addCase(setupAddAuditableUnit.rejected, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Edit Auditable Unit
    builder
      .addCase(setupEditAuditableUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupEditAuditableUnit.fulfilled, (state) => {
        state.loading = false;
        state.auditableUnitAddSuccess = true;
        toast.success("Auditable Unit Updated Successfully");
      })
      .addCase(setupEditAuditableUnit.rejected, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Edit Auditable Unit
    builder
      .addCase(setupSubmitAuditableUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSubmitAuditableUnit.fulfilled, (state) => {
        state.loading = false;
        state.auditableUnitAddSuccess = true;
        toast.success("Auditable Unit Submitted Successfully");
      })
      .addCase(setupSubmitAuditableUnit.rejected, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Edit Auditable Unit
    builder
      .addCase(setupGetRiskAssessment.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetRiskAssessment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.riskAssessments = payload?.data?.riskAssessmentList || [];
      })
      .addCase(setupGetRiskAssessment.rejected, (state, { payload }) => {
        state.loading = false;
        state.auditableUnitAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetAuditableUnitSuccess } = slice.actions;

export default slice.reducer;
