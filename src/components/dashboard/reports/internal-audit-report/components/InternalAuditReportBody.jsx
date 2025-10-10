import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Chip from "@mui/material/Chip";
import LazyLoad from "react-lazyload";

import FollowUpItem from "./FollowUpItem";
import ReportFirstLayout from "./ReportFirstLayout";
import UpdateRichTextEditor from "../../../../common/update-rich-text-editor/UpdateRichTextEditor";
import ExtraFields from "./ExtraFields";
import FileUpload from "./FileUpload";
import {
    setupCreateExtraFields,
    resetInternalAuditReportExtraFieldsAddSuccess,
    setupUpdateExtraField,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { groupByArea } from "../../../../../config/helper";

/**
 * InternalAuditReportBody Component
 * ---------------------------------
 * Handles the core layout and logic for the Internal Audit Report form.
 * Includes:
 *  - Dynamic sections for Executive Summary, Key Figures, and Findings.
 *  - Follow-up items grouped by area.
 *  - Extra field management.
 *  - File upload management.
 */
const InternalAuditReportBody = ({
    reportObject,
    handleChangeReportObject,
    handleSaveInternalAuditReport,
    addReportLoading,
    handleChangeExtraFields,
    setDeleteFileId,
    onContentChange,
}) => {
    const dispatch = useDispatch();

    // ✅ Local state
    const [extraFieldsArray, setExtraFieldsArray] = useState([]);

    // ✅ Redux state
    const { createExtraFieldsLoading, internalAuditReportExtraFieldsAddSuccess } =
        useSelector((state) => state?.internalAuditReport);

    // ✅ Memoized grouped observations for better performance
    const sortedObservations = useMemo(
        () => groupByArea(reportObject?.reportingList || []),
        [reportObject?.reportingList]
    );

    /** ------------------------------
     *  Extra Fields Handlers
     * ------------------------------ */

    const handleUpdateExtraField = useCallback(
        (item) => {
            if (!createExtraFieldsLoading) {
                dispatch(setupUpdateExtraField(item));
            }
        },
        [dispatch, createExtraFieldsLoading]
    );

    const handleDeleteExtraField = useCallback((id) => {
        setExtraFieldsArray((prev) => prev.filter((field) => field?.id !== id));
    }, []);

    const handleAddExtraFieldInArray = useCallback(() => {
        setExtraFieldsArray((prev) => [
            ...prev,
            { id: uuidv4(), data: "data", heading: "heading" },
        ]);
    }, []);

    const handleAddExtraField = useCallback(() => {
        if (extraFieldsArray?.length === 0) {
            toast.error("Provide both values");
            return;
        }

        if (!createExtraFieldsLoading) {
            dispatch(
                setupCreateExtraFields({
                    reportId: reportObject?.id,
                    extraFieldsArray: extraFieldsArray.map(({ heading, data }) => ({
                        heading,
                        data,
                    })),
                })
            );
        }
    }, [dispatch, reportObject?.id, extraFieldsArray, createExtraFieldsLoading]);

    const handleChangeExtraField = useCallback((event, id) => {
        const { name, value } = event?.target || {};
        setExtraFieldsArray((prev) =>
            prev.map((field) =>
                field?.id === id ? { ...field, [name]: value } : field
            )
        );
    }, []);

    /** Reset extra fields state after successful addition */
    useEffect(() => {
        if (internalAuditReportExtraFieldsAddSuccess) {
            setExtraFieldsArray([]);
            dispatch(resetInternalAuditReportExtraFieldsAddSuccess());
        }
    }, [internalAuditReportExtraFieldsAddSuccess, dispatch]);

    /** ------------------------------
     *  Render Sections
     * ------------------------------ */

    const renderRichTextSection = useCallback(
        (label, name, value) => (
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>{label}</label>
                    <UpdateRichTextEditor
                        initialValue={value}
                        name={name}
                        onContentChange={onContentChange}
                    />
                </div>
            </div>
        ),
        [onContentChange]
    );

    const renderObservationGroups = useMemo(
        () =>
            sortedObservations.map((areaGroup, idx) => (
                <div key={idx}>
                    <p className="mb-3 consolidatedTitle">{areaGroup.area}</p>
                    <div className="border rounded px-3 py-2 mb-3">
                        {areaGroup.items.map((observation, oIdx) => (
                            <LazyLoad
                                key={oIdx}
                                height={window.innerHeight * 2}
                                offset={300}
                            >
                                <div>
                                    <div className="d-flex items-end justify-content-end">
                                        <Chip
                                            label={
                                                reportObject?.subLocationList?.find(
                                                    (subLocation) =>
                                                        subLocation?.id === observation?.subLocation
                                                )?.description
                                            }
                                        />
                                    </div>
                                    <FollowUpItem
                                        item={observation}
                                        consolidatedObservationsItem={true}
                                    />
                                    <hr />
                                </div>
                            </LazyLoad>
                        ))}
                    </div>
                </div>
            )),
        [sortedObservations, reportObject?.subLocationList]
    );

    /** ------------------------------
     *  Component Render
     * ------------------------------ */
    return (
        <div>
            {/* Report Header Section */}
            <ReportFirstLayout
                reportObject={reportObject}
                handleChangeReportObject={handleChangeReportObject}
            />

            {/* Main Editor Sections */}
            <div className="border px-3 py-2 mt-3 rounded">
                {renderRichTextSection(
                    "Executive summary",
                    "executiveSummary",
                    reportObject?.executiveSummary
                )}
                {renderRichTextSection(
                    "Financial & Operational Key Figures",
                    "auditPurpose",
                    reportObject?.auditPurpose
                )}
                {renderRichTextSection(
                    "Summary Of Main Findings",
                    "keyFindings",
                    reportObject?.keyFindings
                )}
            </div>

            {/* Reporting and Follow-Up */}
            <div className="col-lg-12 mt-4">
                <div className="heading fw-bold">Main Findings And Recommendations</div>
            </div>
            <div className="mt-3 mb-3">{renderObservationGroups}</div>

            {/* Extra Fields Section */}
            <ExtraFields
                reportObject={reportObject}
                handleChangeExtraFields={handleChangeExtraFields}
                createExtraFieldsLoading={createExtraFieldsLoading}
                handleUpdateExtraField={handleUpdateExtraField}
                handleAddExtraFieldInArray={handleAddExtraFieldInArray}
                extraFieldsArray={extraFieldsArray}
                handleDeleteExtraField={handleDeleteExtraField}
                handleChangeExtraField={handleChangeExtraField}
                handleAddExtraField={handleAddExtraField}
            />

            {/* Annexure Section */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Annexure</label>
                    <UpdateRichTextEditor
                        initialValue={reportObject?.annexure}
                        name="annexure"
                        onContentChange={onContentChange}
                    />
                </div>
            </div>

            {/* File Upload Section */}
            <div className="mt-4">
                <FileUpload item={reportObject} setDeleteFileId={setDeleteFileId} />
            </div>

            {/* Save Button */}
            <div className="row my-3">
                <div className="col-lg-12 d-flex justify-content-between">
                    <div
                        className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${addReportLoading ? "disabled" : ""
                            }`}
                        onClick={handleSaveInternalAuditReport}
                    >
                        <span className="btn-label me-2">
                            <i className="fa fa-check-circle f-18"></i>
                        </span>
                        {addReportLoading ? "Loading..." : "Save"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalAuditReportBody;
