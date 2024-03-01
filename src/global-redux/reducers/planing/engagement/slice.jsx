import {
  getAllEngagements,
  addNewEngagement,
  saveCheckListObjective,
  getInitialSingleEngagementObject,
  getSingleEngagementObject,
  updateBusinessObjective,
  saveMapProcessBusinessObjective,
  getInitialSingleCheckListObjective,
  getSingleCheckListObjective,
  getInitialSingleSpecialProjectAuditObjective,
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
  initialLoading: false,
  allEngagements: [],
  engagementAddSuccess: false,
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
export const setupGetInitialSingleEngagementObject = createAsyncThunk(
  "engagement/getInitialSingleEngagementObject",
  async (data, thunkAPI) => {
    return getInitialSingleEngagementObject(data, thunkAPI);
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

export const setupGetInitialSingleCheckListObjective = createAsyncThunk(
  "engagement/getInitialSingleCheckListObjective",
  async (data, thunkAPI) => {
    return getInitialSingleCheckListObjective(data, thunkAPI);
  }
);

export const setupGetSingleSpecialProjectAuditObjective = createAsyncThunk(
  "engagement/getSingleSpecialProjectAuditObjective",
  async (data, thunkAPI) => {
    return getSingleSpecialProjectAuditObjective(data, thunkAPI);
  }
);

export const setupGetInitialSingleSpecialProjectAuditObjective =
  createAsyncThunk(
    "engagement/getInitialSingleSpecialProjectAuditObjective",
    async (data, thunkAPI) => {
      return getInitialSingleSpecialProjectAuditObjective(data, thunkAPI);
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
    handleCleanUp: (state) => {
      (state.loading = false),
        (state.allEngagements = []),
        (state.engagementAddSuccess = false),
        (state.planingEngagementSingleObject = []),
        (state.selectedCheckListItems = []);
    },
  },
  extraReducers: (builder) => {
    // Get All Engagements
    builder
      .addCase(setupGetAllEngagements.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllEngagements.fulfilled, (state, { payload }) => {
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allEngagements = sortedArray || [];
        state.loading = false;
      })
      .addCase(setupGetAllEngagements.rejected, (state, { payload }) => {
        state.loading = false;
      });

    // Add New Engagements
    builder
      .addCase(setupAddNewEngagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddNewEngagement.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.engagementAddSuccess = true;
        state.planingEngagementSingleObject = payload?.data;
        toast.success("Engagement Added Successfully");
      })
      .addCase(setupAddNewEngagement.rejected, (state, { payload }) => {
        state.loading = false;
        state.engagementAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Setup Save CheckList Objective
    builder
      .addCase(setupSaveCheckListObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveCheckListObjective.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.engagementAddSuccess = true;
        state.planingEngagementSingleObject = payload?.data;
        toast.success("Checklist Objective Edited Successfully");
      })
      .addCase(setupSaveCheckListObjective.rejected, (state, { payload }) => {
        state.loading = false;
        state.engagementAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Setup Get Single Engagement Object
    builder
      .addCase(setupGetSingleEngagementObject.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetSingleEngagementObject.fulfilled,
        (state, { payload }) => {
          state.planingEngagementSingleObject = payload?.data || [
            { error: "Not Found" },
          ];
          state.loading = false;
        }
      )
      .addCase(
        setupGetSingleEngagementObject.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Setup Get Initial Single Engagement Object
    builder
      .addCase(setupGetInitialSingleEngagementObject.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(
        setupGetInitialSingleEngagementObject.fulfilled,
        (state, { payload }) => {
          state.planingEngagementSingleObject = payload?.data || [
            { error: "Not Found" },
          ];
          state.initialLoading = false;
        }
      )
      .addCase(
        setupGetInitialSingleEngagementObject.rejected,
        (state, { payload }) => {
          state.initialLoading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Update Business Objective
    builder
      .addCase(setupUpdateBusinessObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateBusinessObjective.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.engagementAddSuccess = true;
        toast.success("Business Objective Updated Successfully");
      })
      .addCase(setupUpdateBusinessObjective.rejected, (state, { payload }) => {
        state.loading = false;
        state.engagementAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update Business Objective Map Process
    builder
      .addCase(setupSaveMapProcessBusinessObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupSaveMapProcessBusinessObjective.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.engagementAddSuccess = true;
          toast.success("Business Objective Map Process Updated Successfully");
        }
      )
      .addCase(
        setupSaveMapProcessBusinessObjective.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.engagementAddSuccess = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Get Single CheckList Objective
    builder
      .addCase(setupGetSingleCheckListObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetSingleCheckListObjective.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.planingEngagementSingleObject = payload?.data || [
            {
              error: "Not Found",
            },
          ];
        }
      )
      .addCase(
        setupGetSingleCheckListObjective.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Get Initial Single CheckList Objective
    builder
      .addCase(setupGetInitialSingleCheckListObjective.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(
        setupGetInitialSingleCheckListObjective.fulfilled,
        (state, { payload }) => {
          state.initialLoading = false;
          state.planingEngagementSingleObject = payload?.data || [
            {
              error: "Not Found",
            },
          ];
        }
      )
      .addCase(
        setupGetInitialSingleCheckListObjective.rejected,
        (state, { payload }) => {
          state.initialLoading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Get Single Special Project Audit
    builder
      .addCase(setupGetSingleSpecialProjectAuditObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetSingleSpecialProjectAuditObjective.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.planingEngagementSingleObject = payload?.data || [
            { error: "Not Found" },
          ];
        }
      )
      .addCase(
        setupGetSingleSpecialProjectAuditObjective.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Get Initial Single Special Project Audit
    builder
      .addCase(
        setupGetInitialSingleSpecialProjectAuditObjective.pending,
        (state) => {
          state.initialLoading = true;
        }
      )
      .addCase(
        setupGetInitialSingleSpecialProjectAuditObjective.fulfilled,
        (state, { payload }) => {
          state.initialLoading = false;
          state.planingEngagementSingleObject = payload?.data || [
            {
              error: "Not Found",
            },
          ];
        }
      )
      .addCase(
        setupGetInitialSingleSpecialProjectAuditObjective.rejected,
        (state, { payload }) => {
          state.initialLoading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Update Business Minute Meeting
    builder
      .addCase(setupUpdateBusinessMinuteMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupUpdateBusinessMinuteMeeting.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          toast.success("Meeting Updated Successfully");
          state.engagementAddSuccess = true;
        }
      )
      .addCase(
        setupUpdateBusinessMinuteMeeting.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Update Special Project Audit
    builder
      .addCase(setupUpdateSpecialProjectAudit.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupUpdateSpecialProjectAudit.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          toast.success("Special Project Audit Updated Successfully");
          state.engagementAddSuccess = true;
        }
      )
      .addCase(
        setupUpdateSpecialProjectAudit.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Update Special Project Audit Map Process
    builder
      .addCase(
        setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          toast.success(
            "Special Project Audit Map Process Updated Successfully"
          );
          state.engagementAddSuccess = true;
        }
      )
      .addCase(
        setupUpdateBusinessObjectiveAndMapProcessSpecialProjectOrAudit.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Setup get checklists
    builder
      .addCase(setupGetCheckListItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetCheckListItems.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedCheckListItems = payload?.data;
      })
      .addCase(setupGetCheckListItems.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetAddEngagementSuccess, handleCleanUp } = slice.actions;

export default slice.reducer;
