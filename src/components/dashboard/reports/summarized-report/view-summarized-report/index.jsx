import React from "react";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
    setupGetSingleSummarizedReport,
    handleResetData,
} from "../../../../../global-redux/reducers/reports/summarized-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import Header from "../components/Header";
import ConsolidatedObservations from "./components/ConsolidatedObservataion";
import { decryptString } from "../../../../../config/helper";

/**
 * Displays a summarized report in read-only mode.
 * Includes report metadata, rich-text sections, and consolidated observations.
 */
const ViewSummarizedReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const reportId = decryptString(id);

    const { user } = useSelector((state) => state?.auth);
    const { loading, allLocations, singleSummarizedReport } = useSelector(
        (state) => state?.summarizedReport
    );

    // Redirect if invalid or missing report ID
    React.useEffect(() => {
        if (!reportId) {
            navigate("/audit/summarized-report");
        }
    }, [reportId, navigate]);

    // Fetch report details on mount
    React.useEffect(() => {
        if (user?.[0]?.token && reportId) {
            dispatch(setupGetSingleSummarizedReport(`?reportId=${Number(reportId)}`));
        }
    }, [dispatch, user, reportId]);

    // Sidebar setup and cleanup on unmount
    React.useEffect(() => {
        dispatch(changeActiveLink("li-summarized-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, [dispatch]);

    const isReportEmpty =
        !singleSummarizedReport ||
        (Object.keys(singleSummarizedReport).length === 0 &&
            singleSummarizedReport.constructor === Object);

    return (
        <div className="overflow-y-hidden">
            {loading ? (
                <CircularProgress />
            ) : isReportEmpty ? (
                "Summarized Report Not Found"
            ) : (
                <div className="mb-4">
                    <Header title="View Summarized Report" />

                    {/* Report Metadata */}
                    <ReportFirstLayout singleSummarizedReport={singleSummarizedReport} />

                    {/* Rich Text Sections */}
                    <RichTextFields singleSummarizedReport={singleSummarizedReport} />

                    {/* Consolidated Observations */}
                    {singleSummarizedReport?.consolidationItemsList?.length > 0 && (
                        <ConsolidatedObservations
                            singleSummarizedReport={singleSummarizedReport}
                            allLocations={allLocations}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewSummarizedReport;
