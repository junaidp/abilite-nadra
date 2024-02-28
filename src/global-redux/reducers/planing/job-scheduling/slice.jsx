import {
  getAllJobScheduling,
  updateJobScheduling,
  getSingleJobScheduling,
  updateJobSchedulingTimeAndDateAllocation,
  updateJobSchedulingNumberOfResourcesRequired,
  updateJobSchedulingResourcesAllocation,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  allJobScheduling: [],
  jobSchedulingAddSuccess: false,
  singleJobSchedulingObject: {},
};

export const setupGetAllJobScheduling = createAsyncThunk(
  "jobScheduling/getAllJobScheduling",
  async (data, thunkAPI) => {
    return getAllJobScheduling(data, thunkAPI);
  }
);

export const setupGetSingleJobScheduling = createAsyncThunk(
  "jobScheduling/getSingleJobScheduling",
  async (data, thunkAPI) => {
    return getSingleJobScheduling(data, thunkAPI);
  }
);

export const setupUpdateJobScheduling = createAsyncThunk(
  "jobScheduling/updateJobScheduling",
  async (data, thunkAPI) => {
    return updateJobScheduling(data, thunkAPI);
  }
);

export const setupUpdateJobSehedulingTimeAndDateAllocation = createAsyncThunk(
  "jobScheduling/updateJobSchedulingTimeAndDateAllocation",
  async (data, thunkAPI) => {
    return updateJobSchedulingTimeAndDateAllocation(data, thunkAPI);
  }
);

export const setupUpdateJobSchedulingNumberOfResourcesRequired =
  createAsyncThunk(
    "jobScheduling/updateJobSchedulingNumberOfResourcesRequired",
    async (data, thunkAPI) => {
      return updateJobSchedulingNumberOfResourcesRequired(data, thunkAPI);
    }
  );

export const setUpupdateJobSchedulingResourcesAllocation = createAsyncThunk(
  "jobScheduling/updateJobSchedulingResourcesAllocation",
  async (data, thunkAPI) => {
    return updateJobSchedulingResourcesAllocation(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "jobScheduling",
  initialState,
  reducers: {
    resetJobSchedulingSuccess: (state) => {
      state.jobSchedulingAddSuccess = false;
    },
    handleCleanUp: (state) => {
      (state.loading = false),
        (state.allJobScheduling = []),
        (state.jobSchedulingAddSuccess = false),
        (state.singleJobSchedulingObject = {});
    },
  },
  extraReducers: (builder) => {
    // Get all job scheduling
    builder
      .addCase(setupGetAllJobScheduling.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllJobScheduling.fulfilled, (state, { payload }) => {
        state.loading = false;
        const sortedArray = payload?.data?.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        state.allJobScheduling = sortedArray || [];
      })
      .addCase(setupGetAllJobScheduling.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get single job scheduling
    builder
      .addCase(setupGetSingleJobScheduling.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetSingleJobScheduling.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleJobSchedulingObject = payload?.data;
      })
      .addCase(setupGetSingleJobScheduling.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update job scheduling
    builder
      .addCase(setupUpdateJobScheduling.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateJobScheduling.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Job Scheduling Updated Successfully");
        state.jobSchedulingAddSuccess = true;
      })
      .addCase(setupUpdateJobScheduling.rejected, (state, { payload }) => {
        state.loading = false;
        state.jobSchedulingAddSuccess = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Time and date allocation
    builder
      .addCase(
        setupUpdateJobSehedulingTimeAndDateAllocation.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        setupUpdateJobSehedulingTimeAndDateAllocation.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.jobSchedulingAddSuccess = true;
          toast.success("Time and date allocation updated successfully");
        }
      )
      .addCase(
        setupUpdateJobSehedulingTimeAndDateAllocation.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.jobSchedulingAddSuccess = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Update resource required
    builder
      .addCase(
        setupUpdateJobSchedulingNumberOfResourcesRequired.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        setupUpdateJobSchedulingNumberOfResourcesRequired.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.jobSchedulingAddSuccess = true;
          toast.success("Resource required updated successfully");
        }
      )
      .addCase(
        setupUpdateJobSchedulingNumberOfResourcesRequired.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.jobSchedulingAddSuccess = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
    // Update resource allocation
    builder
      .addCase(setUpupdateJobSchedulingResourcesAllocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setUpupdateJobSchedulingResourcesAllocation.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.jobSchedulingAddSuccess = true;
          toast.success("Resource allocation updated successfully");
        }
      )
      .addCase(
        setUpupdateJobSchedulingResourcesAllocation.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.jobSchedulingAddSuccess = false;
          if (payload?.response?.data?.message) {
            toast.error(payload?.response?.data?.message);
          } else {
            toast.error("An Error has occurred");
          }
        }
      );
  },
});

export const { resetJobSchedulingSuccess, handleCleanUp } = slice.actions;

export default slice.reducer;
