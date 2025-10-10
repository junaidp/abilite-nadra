import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import {
  setupGetAllJobsForInternalAuditReport,
  setupCreateInternalAuditReportObject,
  setupSaveInternalAuditReport,
  setupGetSingleInternalAuditReportAfterReportSave,
  handleResetData,
  resetInternalAuditReportAddSuccess,
  resetFileUploadAddSuccess,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";

import Header from "../components/Header";
import SelectJob from "./components/SelectJob";
import InternalAuditReportBody from "../components/InternalAuditReportBody";

/**
 * Main container for generating the Internal Audit Report.
 * Handles:
 *  - Job selection and report creation
 *  - Report field updates and content changes
 *  - Saving report data
 *  - File upload synchronization
 *  - Redux state and UI flow management
 */
const GenerateInternalAuditReport = () => {
  const dispatch = useDispatch();

  // ✅ Redux State
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const {
    jobsForInternalAuditReports,
    internalAuditReportObject,
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    iahFileUploadSuccess,
  } = useSelector((state) => state?.internalAuditReport);

  // ✅ Local State
  const [reportObject, setReportObject] = useState({});
  const [jobForInternalAuditReportId, setJobForInternalAuditReportId] = useState("");
  const [deleteFileId, setDeleteFileId] = useState("");

  /** -----------------------------
   *  Event Handlers
   * ----------------------------- */

  // Handle job selection change
  const handleChange = useCallback((event) => {
    setJobForInternalAuditReportId(event.target.value);
  }, []);

  // Fetch report object based on selected job and sub-location
  const handleGetInternalAuditReportObject = useCallback(() => {
    if (loading) return;
    if (!jobForInternalAuditReportId) {
      toast.error("Please select a report");
      return;
    }

    const [reportingAndFollowUpId, subLocationId] = jobForInternalAuditReportId.split(" ");
    dispatch(
      setupCreateInternalAuditReportObject(
        `?reportingAndFollowUpId=${Number(reportingAndFollowUpId)}&subLocationId=${Number(subLocationId)}`
      )
    );
  }, [dispatch, jobForInternalAuditReportId, loading]);

  // Handle text/field updates inside report
  const handleChangeReportObject = useCallback((event) => {
    const { name, value } = event.target;
    setReportObject((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle extra field text change
  const handleChangeExtraFields = useCallback((event, id) => {
    const { name, value } = event.target;
    setReportObject((prev) => ({
      ...prev,
      intAuditExtraFieldsList: prev?.intAuditExtraFieldsList?.map((field) =>
        Number(field?.id) === Number(id) ? { ...field, [name]: value } : field
      ),
    }));
  }, []);

  // Handle rich-text content updates
  const onContentChange = useCallback((value, name) => {
    setReportObject((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Save report data
  const handleSaveInternalAuditReport = useCallback(() => {
    if (!addReportLoading) {
      dispatch(setupSaveInternalAuditReport(reportObject));
    }
  }, [dispatch, addReportLoading, reportObject]);

  /** -----------------------------
   *  Effects
   * ----------------------------- */

  // Refresh single report after successful save
  useEffect(() => {
    if (internalAuditReportAddSuccess && internalAuditReportObject?.id) {
      dispatch(resetInternalAuditReportAddSuccess());
      dispatch(
        setupGetSingleInternalAuditReportAfterReportSave(
          `?reportId=${Number(internalAuditReportObject?.id)}`
        )
      );
    }
  }, [internalAuditReportAddSuccess, internalAuditReportObject?.id, dispatch]);

  // Fetch jobs when company/year changes and no report is loaded
  useEffect(() => {
    const companyId = user?.[0]?.company?.find((c) => c?.companyName === company)?.id;
    const isReportEmpty =
      Object.keys(internalAuditReportObject).length === 0 &&
      internalAuditReportObject.constructor === Object;

    if (companyId && isReportEmpty) {
      dispatch(
        setupGetAllJobsForInternalAuditReport(
          `?companyId=${companyId}&currentYear=${Number(year)}`
        )
      );
    }
  }, [dispatch, user, company, year, internalAuditReportObject]);

  // Load internal audit report object into state when available
  useEffect(() => {
    const hasReport =
      Object.keys(internalAuditReportObject).length !== 0 &&
      internalAuditReportObject.constructor === Object;
    if (hasReport) setReportObject(internalAuditReportObject);
  }, [internalAuditReportObject]);

  // Sync report after file upload success
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

  // Merge extra fields object into main report when added
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

  // Handle sidebar activation and cleanup
  useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));

    return () => {
      dispatch(handleResetData());
    };
  }, [dispatch]);

  /** -----------------------------
   *  Render
   * ----------------------------- */

  const isReportAvailable =
    Object.keys(internalAuditReportObject).length !== 0 &&
    internalAuditReportObject.constructor === Object;

  return (
    <div className="overflow-y-hidden">
      <Header title="Generate Internal Audit Report" />

      {/* Job Selection */}
      <SelectJob
        internalAuditReportObject={internalAuditReportObject}
        jobForInternalAuditReportId={jobForInternalAuditReportId}
        handleChange={handleChange}
        jobsForInternalAuditReports={jobsForInternalAuditReports}
        handleGetInternalAuditReportObject={handleGetInternalAuditReportObject}
        loading={loading}
      />

      {/* Report Content */}
      {loading ? (
        <CircularProgress />
      ) : (
        isReportAvailable && (
          <InternalAuditReportBody
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            setDeleteFileId={setDeleteFileId}
            onContentChange={onContentChange}
          />
        )
      )}
    </div>
  );
};

export default GenerateInternalAuditReport;
