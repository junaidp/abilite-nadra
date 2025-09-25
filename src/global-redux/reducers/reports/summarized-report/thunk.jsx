import axios from "axios";
import { baseUrl } from "../../../../config/constants";

export const getAllSummarizedReports = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.get(
            `${baseUrl}/summarizedReport/report/getAll?companyId=${data?.companyId}&pageNo=${data?.page}&pageSize=${data?.itemsPerPage}&Year=${data?.year}`,
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


export const updateSummarizedReport = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/update`,
            data,
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

export const deleteSummarizedReport = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.delete(
            `${baseUrl}/summarizedReport/delete/${data}`,
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

export const getSingleSummarizedReport = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/report/detail${data}`,
            null,
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

export const getSingleSummarizedReportAfterReportSave = async (
    data,
    thunkAPI
) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/report/detail${data}`,
            null,
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

export const getAllJobsForSummarizedReport = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.get(
            `${baseUrl}/reportingAndFollowUp/reporting/getJobForReports${data}`,
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

export const createSummarizedReport = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/report/create${data}`,
            null,
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

export const createSummarizedReportExtraFields = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/report/createExtraField?SummarizedReportId=${Number(
                data?.reportId
            )}`,
            data?.extraFieldsArray,
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

export const updateSummarizedReportExtraField = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/report/updateExtraField`,
            data,
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

export const summarizedReportFeedBack = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.post(
            `${baseUrl}/summarizedReport/report/feedBack?SummarizedReportsId=${data?.internalAuditReportId}&feedBackDescription=${data?.description}`,
            null,
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

export const getAllLocations = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        let props = await axios.get(
            `${baseUrl}/configurations/location/getall${data}`,
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
