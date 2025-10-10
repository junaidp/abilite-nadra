import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setupGetAllJobsForSummarizedReport,
    setupCreateSummarizedReport,
    handleResetData,
    resetSummarizedReportAddSuccess,
} from "../../../../../global-redux/reducers/reports/summarized-report/slice";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { FormControl, InputLabel, Select, MenuItem, Chip, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import Header from "../components/Header";

/**
 * Allows user to generate a summarized audit report for a selected job.
 * Displays available jobs and initiates report creation.
 */
const GenerateSummarizedReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux states
    const { user } = useSelector((state) => state?.auth);
    const { company, year } = useSelector((state) => state?.common);
    const { jobsForSummarizedReports, loading, summarizedReportAddSuccess } =
        useSelector((state) => state?.summarizedReport);

    // Local state
    const [jobForSummarizedReportId, setJobForSummarizedReportId] = useState("");

    /** ------------------------------
     * Handlers
     * ------------------------------ */

    const handleChange = useCallback((event) => {
        setJobForSummarizedReportId(event.target.value);
    }, []);

    const handleGenerateReport = useCallback(() => {
        if (loading) return;
        if (!jobForSummarizedReportId) {
            toast.error("Please select a report.");
            return;
        }

        dispatch(
            setupCreateSummarizedReport(
                `?reportingAndFollowUpId=${Number(jobForSummarizedReportId)}`
            )
        );
    }, [dispatch, jobForSummarizedReportId, loading]);

    /** ------------------------------
     * Effects
     * ------------------------------ */

    // Navigate after report is successfully created
    useEffect(() => {
        if (summarizedReportAddSuccess) {
            dispatch(resetSummarizedReportAddSuccess());
            navigate("/audit/summarized-report");
        }
    }, [summarizedReportAddSuccess, dispatch, navigate]);

    // Fetch available jobs for summarized report
    useEffect(() => {
        const companyId = user?.[0]?.company?.find(
            (item) => item?.companyName === company
        )?.id;

        if (companyId) {
            dispatch(
                setupGetAllJobsForSummarizedReport(
                    `?companyId=${companyId}&currentYear=${Number(year)}`
                )
            );
        }
    }, [dispatch, user, company, year]);

    // Manage sidebar and cleanup on unmount
    useEffect(() => {
        dispatch(changeActiveLink("li-summarized-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => dispatch(handleResetData());
    }, [dispatch]);

    /** ------------------------------
     * Render
     * ------------------------------ */

    return (
        <div className="overflow-y-hidden">
            <Header title="Generate Summarized Report" />

            <div className="row pt-4">
                {/* Report Selection Dropdown */}
                <div className="col-lg-10">
                    <FormControl fullWidth>
                        <InputLabel id="summarized-report-label">Summarized Report</InputLabel>
                        <Select
                            labelId="summarized-report-label"
                            id="summarized-report-select"
                            value={jobForSummarizedReportId}
                            label="Summarized Report"
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select One</MenuItem>
                            {jobsForSummarizedReports?.map((job, index) => (
                                <MenuItem
                                    key={index}
                                    value={job?.id}
                                    sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                                >
                                    {job?.title}
                                    {job?.subLocationList?.map((location, idx) => (
                                        <Chip
                                            key={idx}
                                            label={location?.description}
                                            sx={{ marginLeft: "20px" }}
                                        />
                                    ))}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Create Report Button */}
                <div className="col-lg-2">
                    <div
                        className={`btn btn-labeled btn-primary px-3 shadow my-4 ${loading ? "disabled" : ""
                            }`}
                        onClick={handleGenerateReport}
                    >
                        {loading ? "Loading.." : "Create Report"}
                    </div>
                </div>
            </div>

            {/* Loading Indicator */}
            {loading && <CircularProgress />}
        </div>
    );
};

export default GenerateSummarizedReport;
