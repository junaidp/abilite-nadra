import {
  AddCheckList,
  getAllCheckLists,
  updateCheckListName,
  updateCheckListRemarks,
  addCheckListItem,
  getAllCheckListItems,
  editCheckListItem,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  checkListAddSuccess: false,
  loading: false,
  subLoading: false,
  checkList: [],
  checkListItems: [],
  checkListId: "",
  currentSubCheckListItem: {},
};

export const setupAddCheckList = createAsyncThunk(
  "settingsCheckList/AddCheckList",
  async (data, thunkAPI) => {
    return AddCheckList(data, thunkAPI);
  }
);
export const setupGetAllCheckLists = createAsyncThunk(
  "settingsCheckList/getAllCheckLists",
  async (data, thunkAPI) => {
    return getAllCheckLists(data, thunkAPI);
  }
);

export const setupUpdateCheckListName = createAsyncThunk(
  "settingsCheckList/updateCheckListName",
  async (data, thunkAPI) => {
    return updateCheckListName(data, thunkAPI);
  }
);

export const setupUpdateCheckListRemarks = createAsyncThunk(
  "settingsCheckList/updateCheckListRemarks",
  async (data, thunkAPI) => {
    return updateCheckListRemarks(data, thunkAPI);
  }
);

export const setupAddCheckListItem = createAsyncThunk(
  "settingsCheckList/addCheckListItem",
  async (data, thunkAPI) => {
    return addCheckListItem(data, thunkAPI);
  }
);

export const setupGetAllCheckListItems = createAsyncThunk(
  "settingsCheckList/getAllCheckListItems",
  async (data, thunkAPI) => {
    return getAllCheckListItems(data, thunkAPI);
  }
);
export const setupEditCheckListItem = createAsyncThunk(
  "settingsCheckList/editCheckListItem",
  async (data, thunkAPI) => {
    return editCheckListItem(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "settingsCheckList",
  initialState,
  reducers: {
    resetAddCheckListSuccess: (state) => {
      state.checkListAddSuccess = false;
    },
    addCheckListId: (state, action) => {
      state.checkListId = action.payload;
    },
    changeCurrentSubListItem: (state, action) => {
      state.currentSubCheckListItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add Check List
    builder
      .addCase(setupAddCheckList.fulfilled, (state) => {
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List Added Successfully");
      })
      .addCase(setupAddCheckList.rejected, (state, { payload }) => {
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get All CheckList
    builder
      .addCase(setupGetAllCheckLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllCheckLists.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.checkList = payload.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllCheckLists.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update CheckList Name
    builder
      .addCase(setupUpdateCheckListName.fulfilled, (state) => {
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List Name Edited Successfully");
      })
      .addCase(setupUpdateCheckListName.rejected, (state, { payload }) => {
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Update CheckList Remarks
    builder
      .addCase(setupUpdateCheckListRemarks.fulfilled, (state) => {
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        state.checkListAddSuccess = true;
        toast.success("Check List Remarks Edited Successfully");
      })
      .addCase(setupUpdateCheckListRemarks.rejected, (state, { payload }) => {
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add CheckList Item
    builder
      .addCase(setupAddCheckListItem.fulfilled, (state) => {
        state.checkListAddSuccess = true;
        state.checkListId = "";
        toast.success("Check List Item Added Successfully");
      })
      .addCase(setupAddCheckListItem.rejected, (state, { payload }) => {
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Get all CheckList Items
    builder
      .addCase(setupGetAllCheckListItems.pending, (state) => {
        state.subLoading = true;
      })
      .addCase(setupGetAllCheckListItems.fulfilled, (state, { payload }) => {
        state.subLoading = false;
        state.checkListItems = payload?.data || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllCheckListItems.rejected, (state, { payload }) => {
        state.subLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Edit CheckList Item
    builder
      .addCase(setupEditCheckListItem.fulfilled, (state) => {
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List Item edited Successfully");
      })
      .addCase(setupEditCheckListItem.rejected, (state, { payload }) => {
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  resetAddCheckListSuccess,
  addCheckListId,
  changeCurrentSubListItem,
} = slice.actions;

export default slice.reducer;
