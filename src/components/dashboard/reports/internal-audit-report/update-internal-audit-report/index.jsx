import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  setupGetSingleInternalAuditReportAfterReportSave,
  setupSaveInternalAuditReport,
  handleResetData,
  resetInternalAuditReportAddSuccess,
  resetFileUploadAddSuccess,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { decryptString } from "../../../../../config/helper";
import InternalAuditReportBody from "../components/InternalAuditReportBody";
import Header from "../components/Header";

/**
 * UpdateInternalAuditReport Component
 * -----------------------------------
 * Allows viewing and updating an existing internal audit report.
 * Handles:
 * - Fetching the report by ID
 * - Managing local updates and syncing with Redux
 * - Saving report changes and reloading after update
 * - Handling file uploads and extra fields updates
 */
const UpdateInternalAuditReport = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const reportId = decryptString(id);

  // ✅ Redux State
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    singleInternalAuditReport,
    iahFileUploadSuccess,
  } = useSelector((state) => state?.internalAuditReport);

  // ✅ Local State
  const [reportObject, setReportObject] = useState({});
  const [deleteFileId, setDeleteFileId] = useState("");

  /** -----------------------------
   *  Handlers
   * ----------------------------- */

  // Handle text input changes
  const handleChangeReportObject = useCallback((event) => {
    const { name, value } = event.target;
    setReportObject((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle extra fields text changes
  const handleChangeExtraFields = useCallback((event, id) => {
    const { name, value } = event.target;
    setReportObject((prev) => ({
      ...prev,
      intAuditExtraFieldsList: prev?.intAuditExtraFieldsList?.map((field) =>
        Number(field?.id) === Number(id) ? { ...field, [name]: value } : field
      ),
    }));
  }, []);

  // Handle rich text content changes
  const onContentChange = useCallback((value, name) => {
    setReportObject((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Save updated report
  const handleSaveInternalAuditReport = useCallback(() => {
    if (!addReportLoading) {
      dispatch(setupSaveInternalAuditReport(reportObject));
    }
  }, [dispatch, addReportLoading, reportObject]);

  /** -----------------------------
   *  Effects
   * ----------------------------- */

  // Reload report after successful save
  useEffect(() => {
    if (internalAuditReportAddSuccess && reportId) {
      dispatch(resetInternalAuditReportAddSuccess());
      dispatch(
        setupGetSingleInternalAuditReportAfterReportSave(
          `?reportId=${Number(reportId)}`
        )
      );
    }
  }, [internalAuditReportAddSuccess, dispatch, reportId]);

  // Populate report object after fetching
  useEffect(() => {
    const hasReport =
      Object.keys(singleInternalAuditReport).length !== 0 &&
      singleInternalAuditReport.constructor === Object;
    if (hasReport) {
      setReportObject(singleInternalAuditReport);
    }
  }, [singleInternalAuditReport]);

  // Handle file upload success — refresh report and remove deleted file
  useEffect(() => {
    if (iahFileUploadSuccess) {
      dispatch(resetFileUploadAddSuccess());
      dispatch(
        setupSaveInternalAuditReport({
          ...reportObject,
          annexureUploads: reportObject?.annexureUploads?.filter(
            (file) => file?.id !== deleteFileId
          ),
        })
      );
      setDeleteFileId("");
    }
  }, [iahFileUploadSuccess, dispatch, reportObject, deleteFileId]);

  // Merge extra fields into current report when updated
  useEffect(() => {
    const hasExtraFields =
      Object.keys(internalAuditReportExtraFieldsObject).length !== 0 &&
      internalAuditReportExtraFieldsObject.constructor === Object;

    if (hasExtraFields) {
      setReportObject((prev) => ({
        ...internalAuditReportExtraFieldsObject,
        reportName: prev?.reportName,
        reportDate: prev?.reportDate,
        executiveSummary: prev?.executiveSummary,
        auditPurpose: prev?.auditPurpose,
        keyFindings: prev?.keyFindings,
        annexure: prev?.annexure,
        keyFindingsList: prev?.keyFindingsList,
        reportingAndFollowUp: prev?.reportingAndFollowUp,
        annexureUploads: prev?.annexureUploads,
      }));
    }
  }, [internalAuditReportExtraFieldsObject]);

  // Redirect if no report ID found
  useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-report");
    }
  }, [reportId, navigate]);

  // Fetch report by ID when token and ID exist
  useEffect(() => {
    if (user?.[0]?.token && reportId) {
      dispatch(setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`));
    }
  }, [dispatch, user, reportId]);

  // Activate sidebar links and reset data on unmount
  useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => dispatch(handleResetData());
  }, [dispatch]);

  /** -----------------------------
   *  Render
   * ----------------------------- */

  const reportNotFound =
    singleInternalAuditReport[0]?.error === "Not Found" ||
    (Object.keys(singleInternalAuditReport).length === 0 &&
      singleInternalAuditReport.constructor === Object);

  return (
    <div className="overflow-y-hidden">
      {loading ? (
        <CircularProgress />
      ) : reportNotFound ? (
        "Internal Audit Report Not Found"
      ) : (
        <div className="mb-4">
          <Header title="Update Internal Audit Report" />
          <InternalAuditReportBody
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            setDeleteFileId={setDeleteFileId}
            onContentChange={onContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateInternalAuditReport;
