import axios from 'axios';
import { baseUrl } from '../../../config/constants';

const getAuthContext = (thunkAPI) => {
  const { user } = thunkAPI.getState().auth;
  const { company, year } = thunkAPI.getState().common;
  const currentUser = user?.[0] || {};
  const selectedCompany =
    currentUser?.company?.find((item) => item?.companyName === company) ||
    currentUser?.company?.[0];

  return {
    token: currentUser?.token,
    companyId: selectedCompany?.id,
    year,
    userId: currentUser?.id || currentUser?.userId?.id,
  };
};

const authHeaders = (token) => ({
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  },
});

export const getDashboardReporting = async ({ role }, thunkAPI) => {
  try {
    const { token, year } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/reportingAndFollowUp/reporting/by-role-year?year=' + year + '&role=' + role,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCompletedReportingByRole = async ({ role }, thunkAPI) => {
  try {
    const { token } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/reportingAndFollowUp/reporting/completed-by-role?role=' + role,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAuditEngagementDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId, year, userId } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/auditEngagement/dashboard/getAll?companyId=' + companyId + '&year=' + year + '&userId=' + userId,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAuditPlanSummaryDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId, year } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/auditPlanningAndScheduling/auditPlanSummary/getAllForDashboard?companyId=' + companyId + '&year=' + year,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getLightUsersDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId, userId } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/account/user/getAllUsersLight?companyId=' + companyId,
      authHeaders(token)
    );
    return { ...response.data, companyId, userId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getLocationsDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/configurations/location/getall?companyId=' + companyId,
      authHeaders(token)
    );
    return { ...response.data, companyId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getInternalAuditReportsDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId, year } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/internalauditreport/report/getAllForDashboard?companyId=' + companyId + '&Year=' + year,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getConsolidatedReportsDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId, year } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/consolidatedReports/report/getAllForDashboard?companyId=' + companyId + '&Year=' + year,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getSummarizedReportsDashboard = async (_, thunkAPI) => {
  try {
    const { token, companyId, year } = getAuthContext(thunkAPI);
    const response = await axios.get(
      baseUrl + '/summarizedReport/report/getAllForDashboard?companyId=' + companyId + '&Year=' + year,
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const approveInternalAuditReportDashboard = async (id, thunkAPI) => {
  try {
    const { token } = getAuthContext(thunkAPI);
    const response = await axios.post(
      baseUrl + '/internalauditreport/report/updateStatus?submitted=true&approved=true&internalAuditReportId=' + id,
      null,
      authHeaders(token)
    );
    return { ...response.data, id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const approveConsolidatedReportDashboard = async (id, thunkAPI) => {
  try {
    const { token } = getAuthContext(thunkAPI);
    const response = await axios.post(
      baseUrl + '/consolidatedReports/report/updateStatus?submitted=true&approved=true&internalAuditReportId=' + id,
      null,
      authHeaders(token)
    );
    return { ...response.data, id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const approveSummarizedReportDashboard = async (id, thunkAPI) => {
  try {
    const { token } = getAuthContext(thunkAPI);
    const response = await axios.post(
      baseUrl + '/summarizedReport/report/updateStatus?submitted=true&approved=true&summarizedReportId=' + id,
      null,
      authHeaders(token)
    );
    return { ...response.data, id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
