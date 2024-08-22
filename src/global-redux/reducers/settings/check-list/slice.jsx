import {
  AddCheckList,
  getAllCheckLists,
  updateCheckListName,
  updateCheckListRemarks,
  addCheckListItem,
  getAllCheckListItems,
  editCheckListItem,
  deleteCheckList,
  deleteSubCheckList,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  checkListAddSuccess: false,
  loading: false,
  subLoading: false,
  editLoading: false,
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
export const setupDeleteCheckList = createAsyncThunk(
  "settingsCheckList/deleteCheckList",
  async (data, thunkAPI) => {
    return deleteCheckList(data, thunkAPI);
  }
);
export const setupDeleteSubCheckList = createAsyncThunk(
  "settingsCheckList/deleteSubCheckList",
  async (data, thunkAPI) => {
    return deleteSubCheckList(data, thunkAPI);
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
    resetCheckListId: (state) => {
      state.checkListId = "";
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
      .addCase(setupAddCheckList.rejected, (_, { payload }) => {
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
      .addCase(setupUpdateCheckListName.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(setupUpdateCheckListName.fulfilled, (state) => {
        state.editLoading = false;
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List Name Edited Successfully");
      })
      .addCase(setupUpdateCheckListName.rejected, (state, { payload }) => {
        state.editLoading = false;
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
      .addCase(setupUpdateCheckListRemarks.rejected, (_, { payload }) => {
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    // Add CheckList Item
    builder
      .addCase(setupAddCheckListItem.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(setupAddCheckListItem.fulfilled, (state) => {
        state.editLoading = false;
        state.checkListAddSuccess = true;
        toast.success("Check List Item Added Successfully");
      })
      .addCase(setupAddCheckListItem.rejected, (state, { payload }) => {
        state.editLoading = false;
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
      .addCase(setupEditCheckListItem.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(setupEditCheckListItem.fulfilled, (state) => {
        state.editLoading = false;
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List Item edited Successfully");
      })
      .addCase(setupEditCheckListItem.rejected, (state, { payload }) => {
        state.editLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete CheckList
    builder
      .addCase(setupDeleteCheckList.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(setupDeleteCheckList.fulfilled, (state) => {
        state.editLoading = false;
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List  Deleted Successfully");
      })
      .addCase(setupDeleteCheckList.rejected, (state, { payload }) => {
        state.editLoading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Sub CheckList
    builder
      .addCase(setupDeleteSubCheckList.fulfilled, (state) => {
        state.checkListAddSuccess = true;
        state.checkListId = "";
        state.currentSubCheckListItem = {};
        toast.success("Check List Item  Deleted Successfully");
      })
      .addCase(setupDeleteSubCheckList.rejected, (_, { payload }) => {
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
  resetCheckListId,
  changeCurrentSubListItem,
} = slice.actions;

export default slice.reducer;
