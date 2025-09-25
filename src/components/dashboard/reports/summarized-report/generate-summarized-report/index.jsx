import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setupGetAllJobsForSummarizedReport,
    setupCreateSummarizedReport,
    handleResetData,
    resetSummarizedReportAddSuccess
} from "../../../../../global-redux/reducers/reports/summarized-report/slice";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "./Header";
import { toast } from "react-toastify";
import { Chip, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GenerateSummarizedReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.auth);
    const { company, year } = useSelector((state) => state?.common);
    const {
        jobsForSummarizedReports,
        loading,
        summarizedReportAddSuccess
    } = useSelector((state) => state?.summarizedReport);

    const [jobForSummarizedReportId, setJobForSummarizedReportId] =
        React.useState("");

    const handleChange = (event) => {
        setJobForSummarizedReportId(event.target.value);
    };

    function handleGetInternalAuditReportObject() {
        if (!loading) {
            if (jobForSummarizedReportId === "") {
                toast.error("Please Select Report");
            }
            if (jobForSummarizedReportId !== "") {
                dispatch(
                    setupCreateSummarizedReport(
                        `?reportingAndFollowUpId=${Number(jobForSummarizedReportId)}`
                    )
                );
            }
        }
    }

    React.useEffect(() => {
        if (summarizedReportAddSuccess) {
            dispatch(resetSummarizedReportAddSuccess());
            navigate("/audit/summarized-report");
        }
    }, [summarizedReportAddSuccess]);

    React.useEffect(() => {
        const companyId = user[0]?.company?.find(
            (item) => item?.companyName === company
        )?.id;
        if (companyId) {
            dispatch(
                setupGetAllJobsForSummarizedReport(
                    `?companyId=${companyId}&currentYear=${Number(year)}`
                )
            );
        }
    }, [dispatch, year]);

    React.useEffect(() => {
        dispatch(changeActiveLink("li-summarized-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, []);

    return (
        <div className="overflow-y-hidden">
            <Header />
            {
                <div className="row pt-4">
                    <div className="col-lg-10">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Summarized Report
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={jobForSummarizedReportId}
                                label="Reporting And Follow Up"
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select One</MenuItem>
                                {jobsForSummarizedReports?.map((item, index) => {
                                    return (
                                        <MenuItem value={item?.id} key={index} sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                            {item?.title} {item.subLocationList.map((location, index) => <Chip key={index} label={location.description} sx={{ marginLeft: "20px" }} />)}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-lg-2">
                        <div
                            className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${loading && "disabled"
                                }`}
                            onClick={handleGetInternalAuditReportObject}
                        >
                            {loading ? "Loading.." : "Create Report"}
                        </div>
                    </div>
                </div>
            }

            {
                loading && <CircularProgress />
            }

        </div>
    );
};

export default GenerateSummarizedReport;
