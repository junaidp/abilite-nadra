import {
  getAllEngagements,
  addNewEngagement,
  saveCheckListObjective,
  getInitialSingleEngagementObject,
  getSingleEngagementObject,
  submitBusinessObjective,
  saveMapProcessBusinessObjective,
  getInitialSingleCheckListObjective,
  getInitialSingleSpecialProjectAuditObjective,
  getSingleSpecialProjectAuditObjective,
  updateSpecialProjectAudit,
  submitSpecialProjectAudit,
  updateBusinessObjectiveAndMapProcessSpecialProjectOrAudit,
  getCheckListItems,
  deleteEngagement,
  saveIndustryAndCompanyUpdates,
  getIndustryAndCompanyUpdates,
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
  totalNoOfRecords: 0,
  companyAndIndustryUpdates: null,
  companyAndIndustryUpdateAddSuccess: false,
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

export const setupSubmitBusinessObjective = createAsyncThunk(
  "engagement/submitBusinessObjective",
  async (data, thunkAPI) => {
    return submitBusinessObjective(data, thunkAPI);
  }
);

export const setupSaveMapProcessBusinessObjective = createAsyncThunk(
  "engagement/saveMapProcessBusinessObjective",
  async (data, thunkAPI) => {
    return saveMapProcessBusinessObjective(data, thunkAPI);
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

export const setupUpdateSpecialProjectAudit = createAsyncThunk(
  "engagement/updateSpecialProjectAudit",
  async (data, thunkAPI) => {
    return updateSpecialProjectAudit(data, thunkAPI);
  }
);

export const setupSubmitSpecialProjectAudit = createAsyncThunk(
  "engagement/submitSpecialProjectAudit",
  async (data, thunkAPI) => {
    return submitSpecialProjectAudit(data, thunkAPI);
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

export const setupDeleteEngagement = createAsyncThunk(
  "engagement/deleteEngagement",
  async (data, thunkAPI) => {
    return deleteEngagement(data, thunkAPI);
  }
);

export const setupSaveIndustryAndCompanyUpdates = createAsyncThunk(
  "engagement/saveIndustryAndCompanyUpdates",
  async (data, thunkAPI) => {
    return saveIndustryAndCompanyUpdates(data, thunkAPI);
  }
);

export const setupGetIndustryAndCompanyUpdates = createAsyncThunk(
  "engagement/getIndustryAndCompanyUpdates",
  async (data, thunkAPI) => {
    return getIndustryAndCompanyUpdates(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "engagement",
  initialState,
  reducers: {
    resetAddEngagementSuccess: (state) => {
      state.engagementAddSuccess = false;
      state.companyAndIndustryUpdateAddSuccess=false
    },
    handleCleanUp: (state) => {
      state.loading = false;
      state.allEngagements = [];
      state.engagementAddSuccess = false;
      state.planingEngagementSingleObject = [];
      state.selectedCheckListItems = [];
      state.totalNoOfRecords = 0;
    },
  },
  extraReducers: (builder) => {
    // Get All Engagements
    builder
      .addCase(setupGetAllEngagements.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllEngagements.fulfilled, (state, { payload }) => {
        state.totalNoOfRecords = payload?.message;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allEngagements = sortedArray || [];
        state.loading = false;
      })
      .addCase(setupGetAllEngagements.rejected, (state) => {
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

    // Submit Business Objective
    builder
      .addCase(setupSubmitBusinessObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSubmitBusinessObjective.fulfilled, (state) => {
        state.loading = false;
        state.engagementAddSuccess = true;
        toast.success("Business Objective Submitted Successfully");
      })
      .addCase(setupSubmitBusinessObjective.rejected, (state, { payload }) => {
        state.loading = false;
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
      .addCase(setupSaveMapProcessBusinessObjective.fulfilled, (state) => {
        state.loading = false;
        state.engagementAddSuccess = true;
        toast.success("Business Objective Map Process Updated Successfully");
      })
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

    // Update Special Project Audit
    builder
      .addCase(setupUpdateSpecialProjectAudit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateSpecialProjectAudit.fulfilled, (state) => {
        state.loading = false;
        toast.success("Special Project Audit Updated Successfully");
        state.engagementAddSuccess = true;
      })
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

    // Submit Special Project Audit
    builder
      .addCase(setupSubmitSpecialProjectAudit.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSubmitSpecialProjectAudit.fulfilled, (state) => {
        state.loading = false;
        state.engagementAddSuccess = true;
        toast.success("Special Project Audit Submitted Successfully");
      })
      .addCase(
        setupSubmitSpecialProjectAudit.rejected,
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
        (state) => {
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
    // Delete Engagement
    builder
      .addCase(setupDeleteEngagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteEngagement.fulfilled, (state) => {
        state.loading = false;
        toast.success("Enagement Deleted Successfully");
        state.engagementAddSuccess = true;
      })
      .addCase(setupDeleteEngagement.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Save Industry And Company Updates
    builder
      .addCase(setupSaveIndustryAndCompanyUpdates.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSaveIndustryAndCompanyUpdates.fulfilled, (state) => {
        state.loading = false;
        state.companyAndIndustryUpdateAddSuccess = true;
        toast.success("Industry And Company Updates Saved Successfully");
      })
      .addCase(
        setupSaveIndustryAndCompanyUpdates.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );

    // Get Industry And Company Updates
    builder
      .addCase(setupGetIndustryAndCompanyUpdates.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetIndustryAndCompanyUpdates.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.companyAndIndustryUpdates = payload?.data || null;
        }
      )
      .addCase(
        setupGetIndustryAndCompanyUpdates.rejected,
        (state, { payload }) => {
          state.loading = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
  },
});

export const { resetAddEngagementSuccess, handleCleanUp } = slice.actions;

export default slice.reducer;
