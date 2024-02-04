import {
  getAllEngagements,
  addNewEngagement,
  saveCheckListObjective,
  getSingleEngagementObject,
  updateBusinessObjective,
  saveMapProcessBusinessObjective,
  getSingleCheckListObjective,
  getSingleSpecialProjectAuditObjective,
  updateBusinessMinuteMeeting,
  updateSpecialProjectAudit,
  updateBusinessObjectiveAndMapProcessSpecialProjectOrAudit,
  getCheckListItems,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allEngagements: [],
  engagementAddSuccess: false,
  selectedSingleEngagementItem: {},
  planingEngagementSingleObject: [],
  selectedCheckListItems: [],
};

export const setupGetAllEngagements = createAsyncThunk(
  "engagement/getAllEngagements",
  async (data, thunkAPI) => {
    return getAllEngagements(data, thunkAPI);
  }
);
export const setupAddNewEngagement = createAsyncThunk(
  "engagement/addNewEngagement",
  async (data, thunkAPI) => {
    return addNewEngagement(data, thunkAPI);
  }
);

export const setupSaveCheckListObjective = createAsyncThunk(
  "engagement/saveCheckListObjective",
  async (data, thunkAPI) => {
    return saveCheckListObjective(data, thunkAPI);
  }
);

export const setupGetSingleEngagementObject = createAsyncThunk(
  "engagement/getSingleEngagementObject",
  async (data, thunkAPI) => {
    return getSingleEngagementObject(data, thunkAPI);
  }
);
export const setupUpdateBusinessObjective = createAsyncThunk(
  "engagement/updateBusinessObjective",
  async (data, thunkAPI) => {
    return updateBusinessObjective(data, thunkAPI);
  }
);
export const setupSaveMapProcessBusinessObjective = createAsyncThunk(
  "engagement/saveMapProcessBusinessObjective",
  async (data, thunkAPI) => {
    return saveMapProcessBusinessObjective(data, thunkAPI);
  }
);
export const setupGetSingleCheckListObjective = createAsyncThunk(
  "engagement/getSingleCheckListObjective",
  async (data, thunkAPI) => {
    return getSingleCheckListObjective(data, thunkAPI);
  }
);

export const setupGetSingleSpecialProjectAuditObjective = createAsyncThunk(
  "engagement/getSingleSpecialProjectAuditObjective",
  async (data, thunkAPI) => {
    return getSingleSpecialProjectAuditObjective(data, thunkAPI);
  }
);
export const setupUpdateBusinessMinuteMeeting = createAsyncThunk(
  "engagement/updateBusinessMinuteMeeting",
  async (data, thunkAPI) => {
    return updateBusinessMinuteMeeting(data, thunkAPI);
  }
);
export const setupUpdateSpecialProjectAudit = createAsyncThunk(
  "engagement/updateSpecialProjectAudit",
  async (data, thunkAPI) => {
    return updateSpecialProjectAudit(data, thunkAPI);
  }
);

export const setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit =
  createAsyncThunk(
    "engagement/updateBusinessObjectiveAndMapProcessSpecialProjectOrAudit",
    async (data, thunkAPI) => {
      return updateBusinessObjectiveAndMapProcessSpecialProjectOrAudit(
        data,
        thunkAPI
      );
    }
  );

export const setupGetCheckListItems = createAsyncThunk(
  "engagement/getCheckListItems",
  async (data, thunkAPI) => {
    return getCheckListItems(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "engagement",
  initialState,
  reducers: {
    resetAddEngagementSuccess: (state) => {
      state.engagementAddSuccess = false;
    },
    changeSelectedEngagementDialog: (state, action) => {
      state.selectedSingleEngagementItem = action.payload;
    },
  },
  extraReducers: {
    // Get All Engagements
    [setupGetAllEngagements.pending]: (state) => {
      state.loading = true;
    },
    [setupGetAllEngagements.fulfilled]: (state, { payload }) => {
      const sortedArray = payload?.data?.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      state.allEngagements = sortedArray || [];
      state.loading = false;
    },
    [setupGetAllEngagements.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // Add New Engagements
    [setupAddNewEngagement.pending]: (state) => {
      state.loading = true;
    },
    [setupAddNewEngagement.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = true;
      state.planingEngagementSingleObject = payload?.data;
      toast.success("Engagement Added Successfully");
    },
    [setupAddNewEngagement.rejected]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },

    // Setup Save CheckList Objective
    [setupSaveCheckListObjective.pending]: (state) => {
      state.loading = true;
    },
    [setupSaveCheckListObjective.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = true;
      state.planingEngagementSingleObject = payload?.data;
      toast.success("Checklist Objective Edited Successfully");
    },
    [setupSaveCheckListObjective.rejected]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup Get Single Engagement Object
    [setupGetSingleEngagementObject.pending]: (state) => {
      state.loading = true;
    },
    [setupGetSingleEngagementObject.fulfilled]: (state, { payload }) => {
      state.planingEngagementSingleObject = payload?.data;
      state.loading = false;
      // state.engagementAddSuccess = true;
    },
    [setupGetSingleEngagementObject.rejected]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Business Objective
    [setupUpdateBusinessObjective.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateBusinessObjective.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = true;
      toast.success("Business Objective Updated Successfully");
    },
    [setupUpdateBusinessObjective.rejected]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Business Objective Map Process
    [setupSaveMapProcessBusinessObjective.pending]: (state) => {
      state.loading = true;
    },
    [setupSaveMapProcessBusinessObjective.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = true;
      toast.success("Business Objective Map Process Updated Successfully");
    },
    [setupSaveMapProcessBusinessObjective.rejected]: (state, { payload }) => {
      state.loading = false;
      state.engagementAddSuccess = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Get Single CheckList Objective
    [setupGetSingleCheckListObjective.pending]: (state) => {
      state.loading = true;
    },
    [setupGetSingleCheckListObjective.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.planingEngagementSingleObject = payload?.data || [];
    },
    [setupGetSingleCheckListObjective.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Get Single Special Project Audit
    [setupGetSingleSpecialProjectAuditObjective.pending]: (state) => {
      state.loading = true;
    },
    [setupGetSingleSpecialProjectAuditObjective.fulfilled]: (
      state,
      { payload }
    ) => {
      state.loading = false;
      state.planingEngagementSingleObject = payload?.data;
    },
    [setupGetSingleSpecialProjectAuditObjective.rejected]: (
      state,
      { payload }
    ) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Business Minute Meeting
    [setupUpdateBusinessMinuteMeeting.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateBusinessMinuteMeeting.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success("Meeting Updated Successfully");
      state.engagementAddSuccess = true;
    },
    [setupUpdateBusinessMinuteMeeting.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Special Project Audit
    [setupUpdateSpecialProjectAudit.pending]: (state) => {
      state.loading = true;
    },
    [setupUpdateSpecialProjectAudit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success("Special Project Audit Updated Successfully");
      state.engagementAddSuccess = true;
    },
    [setupUpdateSpecialProjectAudit.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Update Special Project Audit Map Process
    [setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit.pending]: (
      state
    ) => {
      state.loading = true;
    },
    [setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        toast.success("Special Project Audit Map Process Updated Successfully");
        state.engagementAddSuccess = true;
      },
    [setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit.rejected]: (
      state,
      { payload }
    ) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
    // Setup get checklists
    [setupGetCheckListItems.pending]: (state) => {
      state.loading = true;
    },
    [setupGetCheckListItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.selectedCheckListItems = payload?.data;
    },
    [setupGetCheckListItems.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload?.response?.data?.message) {
        toast.error(payload?.response?.data?.message);
      } else {
        toast.error("An Error has accoured");
      }
    },
  },
});

export const { resetAddEngagementSuccess, changeSelectedEngagementDialog } =
  slice.actions;

export default slice.reducer;
