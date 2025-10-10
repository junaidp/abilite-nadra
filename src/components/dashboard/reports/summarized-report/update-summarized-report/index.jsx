import {
    changeActiveLink,
    InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
    setupGetSingleSummarizedReport,
    handleResetData,
    setupUpdateSummarizedReport,
} from "../../../../../global-redux/reducers/reports/summarized-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import Header from "../components/Header";
import ConsolidatedObservations from "./components/ConsolidatedObservataion";
import { decryptString } from "../../../../../config/helper";
import { useEffect, useCallback, useState } from "react";

/**
 * Allows editing and updating of an existing summarized audit report.
 * Handles report data fetching, state updates, and save operations.
 */
const UpdateSummarizedReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const reportId = decryptString(id);

    const { user } = useSelector((state) => state?.auth);
    const { loading, allLocations, singleSummarizedReport, addReportLoading } =
        useSelector((state) => state?.summarizedReport);

    const [editableSummarizedReport, setEditableSummarizedReport] = useState({});

    /** Save handler — triggers report update */
    const handleSaveSummarizedReport = useCallback(() => {
        if (!addReportLoading) {
            dispatch(setupUpdateSummarizedReport(editableSummarizedReport));
        }
    }, [addReportLoading, dispatch, editableSummarizedReport]);

    /** Handles simple input/text field updates */
    const handleChangeReportObject = useCallback((event) => {
        const { name, value } = event?.target || {};
        setEditableSummarizedReport((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    /** Handles rich text field updates */
    const onContentChange = useCallback((content, name) => {
        setEditableSummarizedReport((prev) => ({
            ...prev,
            [name]: content,
        }));
    }, []);

    /** Updates nested key findings within consolidation items */
    const onKeyFindingChange = useCallback(
        (content, consolidatedItemId, consolidatedObservationId) => {
            setEditableSummarizedReport((prev) => ({
                ...prev,
                consolidationItemsList: prev?.consolidationItemsList?.map((item) =>
                    item.id === consolidatedItemId
                        ? {
                            ...item,
                            consolidatedObservations: item?.consolidatedObservations?.map(
                                (observation) =>
                                    observation.id === consolidatedObservationId
                                        ? { ...observation, summaryOfKeyFinding: content }
                                        : observation
                            ),
                        }
                        : item
                ),
            }));
        },
        []
    );

    /** Redirect if reportId is missing */
    useEffect(() => {
        if (!reportId) navigate("/audit/summarized-report");
    }, [reportId, navigate]);

    /** Fetch report data */
    useEffect(() => {
        if (user[0]?.token && reportId) {
            dispatch(setupGetSingleSummarizedReport(`?reportId=${Number(reportId)}`));
        }
    }, [dispatch, user, reportId]);

    /** Initialize editable report state */
    useEffect(() => {
        if (singleSummarizedReport && Object.keys(singleSummarizedReport).length > 0) {
            setEditableSummarizedReport(singleSummarizedReport);
        }
    }, [singleSummarizedReport]);

    /** Sidebar and cleanup */
    useEffect(() => {
        dispatch(changeActiveLink("li-summarized-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, [dispatch]);

    const isReportEmpty =
        !editableSummarizedReport ||
        (Object.keys(editableSummarizedReport).length === 0 &&
            editableSummarizedReport.constructor === Object);

    return (
        <div className="overflow-y-hidden">
            {loading ? (
                <CircularProgress />
            ) : isReportEmpty ? (
                "Summarized Report Not Found"
            ) : (
                <div className="mb-4">
                    <Header title="Update Summarized Report" />

                    {/* Basic Info */}
                    <ReportFirstLayout
                        editableSummarizedReport={editableSummarizedReport}
                        handleChangeReportObject={handleChangeReportObject}
                    />

                    {/* Text Sections */}
                    <RichTextFields
                        editableSummarizedReport={editableSummarizedReport}
                        onContentChange={onContentChange}
                    />

                    {/* Consolidated Observations */}
                    {editableSummarizedReport?.length !== 0 && (
                        <ConsolidatedObservations
                            editableSummarizedReport={editableSummarizedReport}
                            allLocations={allLocations}
                            onKeyFindingChange={onKeyFindingChange}
                        />
                    )}

                    {/* Save Button */}
                    <div className="row my-3">
                        <div className="col-lg-12 d-flex justify-content-between">
                            <div
                                className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${addReportLoading && "disabled"
                                    }`}
                                onClick={handleSaveSummarizedReport}
                            >
                                <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18" />
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

export default UpdateSummarizedReport;
