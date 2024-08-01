import { toast } from "react-toastify";
import {
  addTask,
  updateTask,
  getSingleTask,
  getAllTasks,
  getAllUsers,
  getAllAuditEngagement,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  initialLoading: false,
  users: [],
  auditEngagements: [],
  allTasks: [],
  singleTask: {},
  taskAddSuccess: false,
  totalNoOfRecords: 0,
};

export const setupAddTask = createAsyncThunk(
  "tasks/addTask",
  async (data, thunkAPI) => {
    return addTask(data, thunkAPI);
  }
);
export const setupUpdateTask = createAsyncThunk(
  "tasks/updateTask",
  async (data, thunkAPI) => {
    return updateTask(data, thunkAPI);
  }
);
export const setupGetSingleTask = createAsyncThunk(
  "tasks/getSingleTask",
  async (data, thunkAPI) => {
    return getSingleTask(data, thunkAPI);
  }
);
export const setupGetAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (data, thunkAPI) => {
    return getAllTasks(data, thunkAPI);
  }
);
export const setupGetAllUsers = createAsyncThunk(
  "tasks/getAllUsers",
  async (data, thunkAPI) => {
    return getAllUsers(data, thunkAPI);
  }
);
export const setupGetAllAuditEngagement = createAsyncThunk(
  "tasks/getAllAuditEngagement",
  async (data, thunkAPI) => {
    return getAllAuditEngagement(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTaskAddSuccess: (state) => {
      state.taskAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add Task
    builder
      .addCase(setupAddTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddTask.fulfilled, (state) => {
        state.loading = false;
        state.taskAddSuccess = true;
        toast.success("Information Request Added Successfully");
      })
      .addCase(setupAddTask.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Update Task
    builder
      .addCase(setupUpdateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupUpdateTask.fulfilled, (state) => {
        state.loading = false;
        state.taskAddSuccess = true;
        toast.success("Information Request Updated Successfully");
      })
      .addCase(setupUpdateTask.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get Single Task
    builder
      .addCase(setupGetSingleTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetSingleTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singleTask = payload;
      })
      .addCase(setupGetSingleTask.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Tasks
    builder
      .addCase(setupGetAllTasks.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(setupGetAllTasks.fulfilled, (state, { payload }) => {
        state.totalNoOfRecords = payload?.message;
        state.initialLoading = false;
        state.allTasks = payload?.data || [];
      })
      .addCase(setupGetAllTasks.rejected, (state, { payload }) => {
        state.initialLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Users
    builder
      .addCase(setupGetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        const currentUser = JSON.parse(localStorage.getItem("user"));
        state.users = payload?.data?.filter(
          (singleUser) =>
            singleUser?.employeeid?.userHierarchy !== "Management_Auditee" &&
            singleUser?.id !== currentUser[0]?.id
        );
      })
      .addCase(setupGetAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get All Users
    builder
      .addCase(setupGetAllAuditEngagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllAuditEngagement.fulfilled, (state, { payload }) => {
        state.auditEngagements = payload?.data;
        state.loading = false;
      })
      .addCase(setupGetAllAuditEngagement.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetTaskAddSuccess } = slice.actions;

export default slice.reducer;
