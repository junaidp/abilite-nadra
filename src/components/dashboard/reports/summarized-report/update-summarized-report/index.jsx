import React from "react";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
    setupGetSingleSummarizedReport,
    handleResetData,
    setupUpdateSummarizedReport
} from "../../../../../global-redux/reducers/reports/summarized-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "./components/Header";
import ConsolidatedObservations from "./components/ConsolidatedObservataion";
import { decryptString } from "../../../../../config/helper";

const UpdateSummarizedReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const reportId = decryptString(id);

    const { user } = useSelector((state) => state?.auth);
    const { loading, allLocations, singleSummarizedReport, addReportLoading } = useSelector(
        (state) => state?.summarizedReport
    );

    const [editableSummarizedReport, setEditableSummarizedReport] = React.useState({});

    // ✅ memoized callbacks so children don’t re-render unnecessarily
    const handleSaveSummarizedReport = React.useCallback(() => {
        if (!addReportLoading) {
            dispatch(setupUpdateSummarizedReport(editableSummarizedReport));
        }
    }, [addReportLoading, dispatch, editableSummarizedReport]);

    const handleChangeReportObject = React.useCallback((event) => {
        const { name, value } = event?.target || {};
        setEditableSummarizedReport((pre) => ({
            ...pre,
            [name]: value,
        }));
    }, []);

    const onContentChange = React.useCallback((content, name) => {
        setEditableSummarizedReport((pre) => ({
            ...pre,
            [name]: content,
        }));
    }, []);

    const onKeyFindingChangeChange = React.useCallback((content, consolidatedItemId, consolidatedObservationId) => {
        setEditableSummarizedReport((pre) => ({
            ...pre,
            consolidationItemsList: pre?.consolidationItemsList?.map((item) =>
                item.id === consolidatedItemId
                    ? {
                        ...item,
                        consolidatedObservations: item?.consolidatedObservations?.map((observation) =>
                            observation.id === consolidatedObservationId
                                ? { ...observation, summaryOfKeyFinding: content }
                                : observation
                        ),
                    }
                    : item
            ),
        }));
    }, []);

    // Effects
    React.useEffect(() => {
        if (!reportId) {
            navigate("/audit/summarized-report");
        }
    }, [reportId, navigate]);

    React.useEffect(() => {
        if (user[0]?.token && reportId) {
            dispatch(setupGetSingleSummarizedReport(`?reportId=${Number(reportId)}`));
        }
    }, [dispatch, user, reportId]);

    React.useEffect(() => {
        if (singleSummarizedReport && Object.keys(singleSummarizedReport).length !== 0) {
            setEditableSummarizedReport(singleSummarizedReport);
        }
    }, [singleSummarizedReport]);

    React.useEffect(() => {
        dispatch(changeActiveLink("li-summarized-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, [dispatch]);

    return (
        <div className="overflow-y-hidden">
            {loading ? (
                <CircularProgress />
            ) : !editableSummarizedReport ||
                (Object.keys(editableSummarizedReport).length === 0 &&
                    editableSummarizedReport.constructor === Object) ? (
                "Summarized Report Not Found"
            ) : (
                <div className="mb-4">
                    <Header />
                    <ReportFirstLayout
                        editableSummarizedReport={editableSummarizedReport}
                        handleChangeReportObject={handleChangeReportObject}
                    />

                    <RichTextFields
                        editableSummarizedReport={editableSummarizedReport}
                        onContentChange={onContentChange}
                    />

                    {editableSummarizedReport &&
                        editableSummarizedReport?.length !== 0 && (
                            <ConsolidatedObservations
                                editableSummarizedReport={editableSummarizedReport}
                                allLocations={allLocations}
                                onKeyFindingChangeChange={onKeyFindingChangeChange}
                            />
                        )}

                    {editableSummarizedReport?.intAuditExtraFieldsList &&
                        editableSummarizedReport?.intAuditExtraFieldsList?.length !== 0 && (
                            <AuditExtraFields
                                editableSummarizedReport={editableSummarizedReport}
                            />
                        )}

                    <div className="row my-3">
                        <div className="col-lg-12 d-flex justify-content-between">
                            <div
                                className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${addReportLoading && "disabled"
                                    }`}
                                onClick={handleSaveSummarizedReport}
                            >
                                <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18"></i>
                                </span>
                                {addReportLoading ? "Loading..." : "Save"}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(UpdateSummarizedReport);
