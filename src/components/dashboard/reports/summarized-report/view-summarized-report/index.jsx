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
import { useNavigate } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "./components/Header";
import ConsolidatedObservations from "./components/ConsolidatedObservataion";
import { decryptString } from "../../../../../config/helper";
import { useParams } from "react-router-dom";

const ViewSummarizedReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const reportId = decryptString(id);
    const { user } = useSelector((state) => state?.auth);
    const { loading, allLocations, singleSummarizedReport } = useSelector(
        (state) => state?.summarizedReport
    );


    React.useEffect(() => {
        if (!reportId) {
            navigate("/audit/summarized-report");
        }
    }, [reportId]);


    React.useEffect(() => {
        if (user[0]?.token && reportId) {
            dispatch(
                setupGetSingleSummarizedReport(`?reportId=${Number(reportId)}`)
            );
        }
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(changeActiveLink("li-summarized-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, []);

    return (
        <div className="overflow-y-hidden">
            {loading ? (
                <CircularProgress />
            ) : !singleSummarizedReport ||
                (Object.keys(singleSummarizedReport).length === 0 &&
                    singleSummarizedReport.constructor === Object) ? (
                "Summarized Report Not Found"
            ) : (
                <div className="mb-4">
                    <Header />
                    <ReportFirstLayout
                        singleSummarizedReport={singleSummarizedReport}
                    />

                    <RichTextFields
                        singleSummarizedReport={singleSummarizedReport}
                    />
                    {singleSummarizedReport &&
                        singleSummarizedReport?.length !== 0 && (
                            <ConsolidatedObservations
                                singleSummarizedReport={singleSummarizedReport}
                                allLocations={allLocations}
                            />
                        )}
                    {singleSummarizedReport?.intAuditExtraFieldsList &&
                        singleSummarizedReport?.intAuditExtraFieldsList?.length !==
                        0 && (
                            <AuditExtraFields
                                singleSummarizedReport={singleSummarizedReport}
                            />
                        )}

                </div>
            )}
        </div>
    );
};

export default ViewSummarizedReport;
