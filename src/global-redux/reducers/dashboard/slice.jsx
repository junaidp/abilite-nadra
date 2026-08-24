import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  approveConsolidatedReportDashboard,
  approveInternalAuditReportDashboard,
  approveSummarizedReportDashboard,
  getAuditEngagementDashboard,
  getAuditPlanSummaryDashboard,
  getCompletedReportingByRole,
  getConsolidatedReportsDashboard,
  getDashboardReporting,
  getInternalAuditReportsDashboard,
  getLightUsersDashboard,
  getLocationsDashboard,
  getSummarizedReportsDashboard,
} from './thunk';

export const setupGetDashboardReporting = createAsyncThunk(
  'dashboard/getDashboardReporting',
  async (data, thunkAPI) => getDashboardReporting(data, thunkAPI)
);

export const setupGetCompletedReportingByRole = createAsyncThunk(
  'dashboard/getCompletedReportingByRole',
  async (data, thunkAPI) => getCompletedReportingByRole(data, thunkAPI)
);

export const setupGetAuditEngagementDashboard = createAsyncThunk(
  'dashboard/getAuditEngagementDashboard',
  async (data, thunkAPI) => getAuditEngagementDashboard(data, thunkAPI)
);

export const setupGetAuditPlanSummaryDashboard = createAsyncThunk(
  'dashboard/getAuditPlanSummaryDashboard',
  async (data, thunkAPI) => getAuditPlanSummaryDashboard(data, thunkAPI)
);

export const setupGetLightUsersDashboard = createAsyncThunk(
  'dashboard/getLightUsersDashboard',
  async (data, thunkAPI) => getLightUsersDashboard(data, thunkAPI)
);

export const setupGetLocationsDashboard = createAsyncThunk(
  'dashboard/getLocationsDashboard',
  async (data, thunkAPI) => getLocationsDashboard(data, thunkAPI)
);

export const setupGetInternalAuditReportsDashboard = createAsyncThunk(
  'dashboard/getInternalAuditReportsDashboard',
  async (data, thunkAPI) => getInternalAuditReportsDashboard(data, thunkAPI)
);

export const setupGetConsolidatedReportsDashboard = createAsyncThunk(
  'dashboard/getConsolidatedReportsDashboard',
  async (data, thunkAPI) => getConsolidatedReportsDashboard(data, thunkAPI)
);

export const setupGetSummarizedReportsDashboard = createAsyncThunk(
  'dashboard/getSummarizedReportsDashboard',
  async (data, thunkAPI) => getSummarizedReportsDashboard(data, thunkAPI)
);

export const setupApproveInternalAuditReportDashboard = createAsyncThunk(
  'dashboard/approveInternalAuditReportDashboard',
  async (id, thunkAPI) => approveInternalAuditReportDashboard(id, thunkAPI)
);

export const setupApproveConsolidatedReportDashboard = createAsyncThunk(
  'dashboard/approveConsolidatedReportDashboard',
  async (id, thunkAPI) => approveConsolidatedReportDashboard(id, thunkAPI)
);

export const setupApproveSummarizedReportDashboard = createAsyncThunk(
  'dashboard/approveSummarizedReportDashboard',
  async (id, thunkAPI) => approveSummarizedReportDashboard(id, thunkAPI)
);

const initialState = {
  loading: false,
  reportApprovalsLoading: false,
  completedByRoleLoading: false,
  approvingReport: false,
  dashboardReporting: [],
  completedByRoleReporting: [],
  auditEngagements: [],
  auditPlanSummaryApprovals: [],
  users: [],
  usersCompanyId: null,
  usersLoadedByUserId: null,
  locations: [],
  locationsCompanyId: null,
  internalAuditReports: [],
  consolidatedReports: [],
  summarizedReports: [],
  reportApprovalsLoadedKey: null,
};

const getErrorMessage = (payload) =>
  payload?.response?.data?.message || 'An Error has occurred';

const removeApproved = (items, id) =>
  (items || []).filter((item) => Number(item?.id) !== Number(id));

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardReportApprovals: (state) => {
      state.internalAuditReports = [];
      state.consolidatedReports = [];
      state.summarizedReports = [];
      state.reportApprovalsLoadedKey = null;
    },
    setDashboardReportApprovalsLoadedKey: (state, { payload }) => {
      state.reportApprovalsLoadedKey = payload;
    },
    resetDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setupGetDashboardReporting.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetDashboardReporting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashboardReporting = payload?.data || [];
      })
      .addCase(setupGetDashboardReporting.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupGetAuditEngagementDashboard.fulfilled, (state, { payload }) => {
        state.auditEngagements = payload?.data || [];
      })
      .addCase(setupGetAuditPlanSummaryDashboard.fulfilled, (state, { payload }) => {
        state.auditPlanSummaryApprovals = payload?.data || [];
      })
      .addCase(setupGetLightUsersDashboard.fulfilled, (state, { payload }) => {
        state.users = payload?.data || [];
        state.usersCompanyId = payload?.companyId || null;
        state.usersLoadedByUserId = payload?.userId || null;
      })
      .addCase(setupGetLocationsDashboard.fulfilled, (state, { payload }) => {
        state.locations = payload?.data || [];
        state.locationsCompanyId = payload?.companyId || null;
      })
      .addCase(setupGetCompletedReportingByRole.pending, (state) => {
        state.completedByRoleLoading = true;
      })
      .addCase(setupGetCompletedReportingByRole.fulfilled, (state, { payload }) => {
        state.completedByRoleLoading = false;
        state.completedByRoleReporting = payload?.data || [];
      })
      .addCase(setupGetCompletedReportingByRole.rejected, (state, { payload }) => {
        state.completedByRoleLoading = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupGetInternalAuditReportsDashboard.pending, (state) => {
        state.reportApprovalsLoading = true;
      })
      .addCase(setupGetInternalAuditReportsDashboard.fulfilled, (state, { payload }) => {
        state.internalAuditReports = payload?.data || [];
      })
      .addCase(setupGetInternalAuditReportsDashboard.rejected, (state, { payload }) => {
        state.reportApprovalsLoading = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupGetConsolidatedReportsDashboard.fulfilled, (state, { payload }) => {
        state.consolidatedReports = payload?.data || [];
      })
      .addCase(setupGetConsolidatedReportsDashboard.rejected, (state, { payload }) => {
        state.reportApprovalsLoading = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupGetSummarizedReportsDashboard.fulfilled, (state, { payload }) => {
        state.reportApprovalsLoading = false;
        state.summarizedReports = payload?.data || [];
      })
      .addCase(setupGetSummarizedReportsDashboard.rejected, (state, { payload }) => {
        state.reportApprovalsLoading = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupApproveInternalAuditReportDashboard.pending, (state) => {
        state.approvingReport = true;
      })
      .addCase(setupApproveInternalAuditReportDashboard.fulfilled, (state, { payload }) => {
        state.approvingReport = false;
        state.internalAuditReports = removeApproved(state.internalAuditReports, payload?.id);
        toast.success('Report approved successfully');
      })
      .addCase(setupApproveInternalAuditReportDashboard.rejected, (state, { payload }) => {
        state.approvingReport = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupApproveConsolidatedReportDashboard.pending, (state) => {
        state.approvingReport = true;
      })
      .addCase(setupApproveConsolidatedReportDashboard.fulfilled, (state, { payload }) => {
        state.approvingReport = false;
        state.consolidatedReports = removeApproved(state.consolidatedReports, payload?.id);
        toast.success('Report approved successfully');
      })
      .addCase(setupApproveConsolidatedReportDashboard.rejected, (state, { payload }) => {
        state.approvingReport = false;
        toast.error(getErrorMessage(payload));
      })
      .addCase(setupApproveSummarizedReportDashboard.pending, (state) => {
        state.approvingReport = true;
      })
      .addCase(setupApproveSummarizedReportDashboard.fulfilled, (state, { payload }) => {
        state.approvingReport = false;
        state.summarizedReports = removeApproved(state.summarizedReports, payload?.id);
        toast.success('Report approved successfully');
      })
      .addCase(setupApproveSummarizedReportDashboard.rejected, (state, { payload }) => {
        state.approvingReport = false;
        toast.error(getErrorMessage(payload));
      });
  },
});

export const {
  resetDashboard,
  resetDashboardReportApprovals,
  setDashboardReportApprovalsLoadedKey,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
