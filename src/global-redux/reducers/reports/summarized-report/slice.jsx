import { toast } from "react-toastify";
import {
    getAllSummarizedReports,
    updateSummarizedReport,
    deleteSummarizedReport,
    getSingleSummarizedReport,
    getSingleSummarizedReportAfterReportSave,
    getAllJobsForSummarizedReport,
    createSummarizedReport,
    createSummarizedReportExtraFields,
    updateSummarizedReportExtraField,
    summarizedReportFeedBack,
    getAllLocations,
    downloadSummarizedReport
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allSummarizedReports: [],
    jobsForSummarizedReports: [],
    singleSummarizedReport: {},
    summarizedReportAddSuccess: false,
    summarizedReportExtraFieldsAddSuccess: false,
    addReportLoading: false,
    createExtraFieldsLoading: false,
    summarizedReportExtraFieldsObject: {},
    totalNoOfRecords: 0,
    allLocations: sessionStorage.getItem("allLocations") ? JSON.parse(sessionStorage.getItem("allLocations")) : [],
};

export const setupGetAllSummarizedReports = createAsyncThunk(
    "summarizedReport/getAllSummarizedReports",
    async (data, thunkAPI) => {
        return getAllSummarizedReports(data, thunkAPI);
    }
);

export const setupUpdateSummarizedReport = createAsyncThunk(
    "summarizedReport/updateSummarizedReport",
    async (data, thunkAPI) => {
        return updateSummarizedReport(data, thunkAPI);
    }
);
export const setupDeleteSummarizedReport = createAsyncThunk(
    "summarizedReport/deleteSummarizedReport",
    async (data, thunkAPI) => {
        return deleteSummarizedReport(data, thunkAPI);
    }
);

export const setupGetSingleSummarizedReport = createAsyncThunk(
    "summarizedReport/getSingleSummarizedReport",
    async (data, thunkAPI) => {
        return getSingleSummarizedReport(data, thunkAPI);
    }
);
export const setupGetSingleSummarizedReportAfterReportSave =
    createAsyncThunk(
        "summarizedReport/getSingleSummarizedReportAfterReportSave",
        async (data, thunkAPI) => {
            return getSingleSummarizedReportAfterReportSave(data, thunkAPI);
        }
    );

export const setupGetAllJobsForSummarizedReport = createAsyncThunk(
    "summarizedReport/getAllJobsForSummarizedReport",
    async (data, thunkAPI) => {
        return getAllJobsForSummarizedReport(data, thunkAPI);
    }
);

export const setupCreateSummarizedReport = createAsyncThunk(
    "summarizedReport/createSummarizedReport",
    async (data, thunkAPI) => {
        return createSummarizedReport(data, thunkAPI);
    }
);

export const setupCreateSummarizedReportExtraFields = createAsyncThunk(
    "summarizedReport/createSummarizedReportExtraFields",
    async (data, thunkAPI) => {
        return createSummarizedReportExtraFields(data, thunkAPI);
    }
);
export const setupUpdateSummarizedReportExtraField = createAsyncThunk(
    "summarizedReport/updateSummarizedReportExtraField",
    async (data, thunkAPI) => {
        return updateSummarizedReportExtraField(data, thunkAPI);
    }
);

export const setupSummarizedReportFeedBack = createAsyncThunk(
    "summarizedReport/summarizedReportFeedBack",
    async (data, thunkAPI) => {
        return summarizedReportFeedBack(data, thunkAPI);
    }
);

export const setupGetAllLocations = createAsyncThunk(
    "summarizedReport/getAllLocations",
    async (data, thunkAPI) => {
        return getAllLocations(data, thunkAPI);
    }
);

export const setupDownloadSummarizedReport = createAsyncThunk(
    "summarizedReport/downloadSummarizedReport",
    async (data, thunkAPI) => {
        return downloadSummarizedReport(data, thunkAPI);
    }
);


export const slice = createSlice({
    name: "summarizedReport",
    initialState,
    reducers: {
        resetSummarizedReportAddSuccess: (state) => {
            state.summarizedReportAddSuccess = false;
        },
        resetsummarizedReportExtraFieldsAddSuccess: (state) => {
            state.summarizedReportExtraFieldsAddSuccess = false;
        },
        handleResetData: (state) => {
            state.loading = false,
                state.allSummarizedReports = [],
                state.jobsForSummarizedReports = [],
                state.singleSummarizedReport = {},
                state.summarizedReportAddSuccess = false,
                state.summarizedReportExtraFieldsAddSuccess = false,
                state.addReportLoading = false,
                state.createExtraFieldsLoading = false,
                state.summarizedReportExtraFieldsObject = {},
                state.totalNoOfRecords = 0
        }
    },
    extraReducers: (builder) => {
        // Get All Internal Audit Reports
        builder
            .addCase(setupGetAllSummarizedReports.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                setupGetAllSummarizedReports.fulfilled,
                (state, { payload }) => {
                    state.totalNoOfRecords = payload?.message;
                    state.loading = false;
                    state.allSummarizedReports = payload?.data || [];
                }
            )
            .addCase(setupGetAllSummarizedReports.rejected, (state, action) => {
                state.loading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });
        // Add Internal Audit Report
        builder
            .addCase(setupUpdateSummarizedReport.pending, (state) => {
                state.addReportLoading = true;
            })
            .addCase(setupUpdateSummarizedReport.fulfilled, (state) => {
                state.addReportLoading = false;
                state.summarizedReportAddSuccess = true;
                toast.success("Summarized Report Saved Successfully");
            })
            .addCase(setupUpdateSummarizedReport.rejected, (state, action) => {
                state.addReportLoading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });
        // Delete Internal Audit Report
        builder
            .addCase(setupDeleteSummarizedReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(setupDeleteSummarizedReport.fulfilled, (state) => {
                state.loading = false;
                state.summarizedReportAddSuccess = true;
                toast.success("Summarized Report Deleted Successfully");
            })
            .addCase(setupDeleteSummarizedReport.rejected, (state, action) => {
                state.loading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });
        // Get Single Internal  Audit Report
        builder
            .addCase(setupGetSingleSummarizedReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                setupGetSingleSummarizedReport.fulfilled,
                (state, { payload }) => {
                    state.loading = false;
                    state.singleSummarizedReport = payload?.data || {}
                }
            )
            .addCase(setupGetSingleSummarizedReport.rejected, (state, action) => {
                state.loading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });
        // Get Single Internal  Audit Report After Save
        builder
            .addCase(
                setupGetSingleSummarizedReportAfterReportSave.pending,
                (state) => {
                    state.addReportLoading = true;
                }
            )
            .addCase(
                setupGetSingleSummarizedReportAfterReportSave.fulfilled,
                (state, { payload }) => {
                    state.addReportLoading = false;
                    state.singleSummarizedReport = payload?.data || {};
                }
            )
            .addCase(
                setupGetSingleSummarizedReportAfterReportSave.rejected,
                (state, action) => {
                    state.addReportLoading = false;
                    if (action.payload?.response?.data?.message) {
                        toast.error(action.payload.response.data.message);
                    } else {
                        toast.error("An Error has occurred");
                    }
                }
            );
        // Get Jobs  Audit Report
        builder
            .addCase(setupGetAllJobsForSummarizedReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                setupGetAllJobsForSummarizedReport.fulfilled,
                (state, { payload }) => {
                    state.loading = false;
                    state.jobsForSummarizedReports = payload?.data || [];
                }
            )
            .addCase(
                setupGetAllJobsForSummarizedReport.rejected,
                (state, action) => {
                    state.loading = false;
                    if (action.payload?.response?.data?.message) {
                        toast.error(action.payload.response.data.message);
                    } else {
                        toast.error("An Error has occurred");
                    }
                }
            );
        // Get Single Internal  Audit Report
        builder
            .addCase(setupCreateSummarizedReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                setupCreateSummarizedReport.fulfilled,
                (state) => {
                    toast.success("Summarized Report Created Successfully");
                    state.loading = false;
                    state.summarizedReportAddSuccess = true;
                }
            )
            .addCase(
                setupCreateSummarizedReport.rejected,
                (state, action) => {
                    state.loading = false;
                    if (action.payload?.response?.data?.message) {
                        toast.error(action.payload.response.data.message);
                    } else {
                        toast.error("An Error has occurred");
                    }
                }
            );
        // Create Extra Fields
        builder
            .addCase(setupCreateSummarizedReportExtraFields.pending, (state) => {
                state.createExtraFieldsLoading = true;
            })
            .addCase(setupCreateSummarizedReportExtraFields.fulfilled, (state, { payload }) => {
                state.createExtraFieldsLoading = false;
                state.summarizedReportExtraFieldsAddSuccess = true;
                state.summarizedReportExtraFieldsObject = payload?.data;
                toast.success("Extra Field Added Successfully");
            })
            .addCase(setupCreateSummarizedReportExtraFields.rejected, (state, action) => {
                state.createExtraFieldsLoading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });
        // Create Extra Fields
        builder
            .addCase(setupUpdateSummarizedReportExtraField.pending, (state) => {
                state.createExtraFieldsLoading = true;
            })
            .addCase(setupUpdateSummarizedReportExtraField.fulfilled, (state) => {
                state.createExtraFieldsLoading = false;
                toast.success("Extra Field Updated Successfully");
            })
            .addCase(setupUpdateSummarizedReportExtraField.rejected, (state, action) => {
                state.createExtraFieldsLoading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });

        // IAH Feedback
        builder
            .addCase(setupSummarizedReportFeedBack.pending, (state) => {
                state.loading = true;
            })
            .addCase(setupSummarizedReportFeedBack.fulfilled, (state) => {
                state.loading = false;
                state.summarizedReportAddSuccess = true;
                toast.success("FeedBack Provided Successfully");
            })
            .addCase(setupSummarizedReportFeedBack.rejected, (state, action) => {
                state.loading = false;
                if (action.payload?.response?.data?.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });

        // Download Summarized Report
        builder
            .addCase(setupDownloadSummarizedReport.pending, (state) => {
                state.loading = true;
            })
            .addCase(setupDownloadSummarizedReport.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(setupDownloadSummarizedReport.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload?.response?.data?.message) {
                    toast.error(payload?.response?.data?.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });

        // Get All Locations
        builder
            .addCase(setupGetAllLocations.pending, (state) => {
                state.loading = true;
            })
            .addCase(setupGetAllLocations.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allLocations = payload?.data || [];
                sessionStorage.setItem("allLocations", JSON.stringify(payload?.data || []));
            })
            .addCase(setupGetAllLocations.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload?.response?.data?.message) {
                    toast.error(payload?.response?.data?.message);
                } else {
                    toast.error("An Error has occurred");
                }
            });

    },
});

export const {
    resetSummarizedReportAddSuccess,
    handleResetData,
    resetsummarizedReportExtraFieldsAddSuccess
} = slice.actions;

export default slice.reducer;
