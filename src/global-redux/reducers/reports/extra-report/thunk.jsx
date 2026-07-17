import axios from "axios";
import { baseUrl } from "../../../../config/constants";

export const getAllAuditExceptions = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/getAll?companyId=${data?.companyId}&natureThrough=${data?.natureThrough}&location=${data?.location}&subLocation=${data?.subLocation}&stepNo=${data?.stepNo}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllAuditExceptionsLight = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const params = new URLSearchParams({
      companyId: data?.companyId,
      natureThrough: data?.natureThrough || "null",
      location: data?.location || "null",
      subLocation: data?.subLocation || "null",
      year: data?.year || "null",
      auditee: data?.auditee || "null",
      exceptionStatus: data?.exceptionStatus || "null",
      pageNo: data?.page || 1,
      noOfRecords: data?.itemsPerPage || 10,
    });
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/getAll/light?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAuditExceptionFilterOptions = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/filter-options?companyId=${data?.companyId}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const exportAuditExceptions = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const params = new URLSearchParams({
      companyId: data?.companyId,
      natureThrough: data?.natureThrough || "null",
      location: data?.location || "null",
      subLocation: data?.subLocation || "null",
      year: data?.year || "null",
      auditee: data?.auditee || "null",
      exceptionStatus: data?.exceptionStatus || "null",
    });
    let props = await axios.get(
      `${baseUrl}/auditExceptionReports/reports/export?${params.toString()}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllLocations = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/configurations/location/getall?companyId=${data?.companyId}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllTimeAllocation = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/jobResourceTimeAllocation/reports/getAll?companyId=${data?.companyId}&natureThrough=${data?.natureThrough}&location=${data?.location}&subLocation=${data?.subLocation}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllPlanSummaryReport = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/auditPlanningSummaryReport/reports/getAll?companyId=${data?.companyId}&location=${data?.location}&subLocation=${data?.subLocation}&riskRating=${data?.riskRating}&resource=${data?.resource}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getRiskAssessementReport = async (data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    let props = await axios.get(
      `${baseUrl}/riskAssessmentReport/report/get?companyId=${data.companyId}&Year=${data.year}`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllUsers = async (_, thunkAPI) => {
  const { user } = thunkAPI.getState().auth;
  let { company } = thunkAPI.getState().common;
  try {
    let props = await axios.post(
      `${baseUrl}/account/user/getAllUsers`,
      {
        user: {
          email: user[0]?.email,
        },
        company: user[0]?.company.find((item) => item?.companyName === company),
      },
      {
        headers: {
          shareWith: true,
          "Content-Type": "application/json",
          Authorization: `Bearer ${user[0]?.token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
