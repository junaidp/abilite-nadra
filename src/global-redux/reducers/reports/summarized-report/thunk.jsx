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
            `${baseUrl}/reportingAndFollowUp/reporting/getJobForConsolidatedReports${data}`,
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

export const downloadSummarizedReport = async (data, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState().auth;
        const response = await axios.get(
            `${baseUrl}/summarizedReport/report/detail/pdf?reportId=${data.reportId}`,
            {
                headers: {
                    Authorization: `Bearer ${user[0]?.token}`,
                },
                responseType: "blob",
            }
        );

        // Trigger download
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", data.fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
};


