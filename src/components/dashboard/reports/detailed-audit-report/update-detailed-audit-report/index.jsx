import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
  setupSaveInternalAuditReport,
  resetInternalAuditReportAddSuccess,
  resetFileUploadAddSuccess,
  setupGetSingleInternalAuditReportAfterSave,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { CircularProgress } from "@mui/material";
import DetailedAuditReportLayout from "../components/DetailedAuditReportLayout";
import Header from "../components/Header";
import { groupObservationsBySubLocationAndArea, decryptString } from "../../../../../config/helper";

const UpdateDetailedAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Decrypt report ID from route param
  const reportId = decryptString(id);

  // Local state
  const [reportObject, setReportObject] = React.useState({});
  const [deleteFileId, setDeleteFileId] = React.useState("");
  const [consolidatedObservations, setConsolidatedObservations] = React.useState([]);

  // Redux state
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    singleInternalAuditReport,
    consolidationFileUploadAddSuccess,
  } = useSelector((state) => state?.consolidationReport);

  /** -------------------------------
   * Handlers
   * ------------------------------- */
  const handleChangeReportObject = (event) => {
    setReportObject((prev) => ({
      ...prev,
      [event?.target?.name]: event?.target?.value,
    }));
  };

  const handleChangeExtraFields = (event, id) => {
    setReportObject((prev) => ({
      ...prev,
      intAuditExtraFieldsList: prev?.intAuditExtraFieldsList?.map((field) =>
        Number(field?.id) === Number(id)
          ? { ...field, [event?.target?.name]: event?.target?.value }
          : field
      ),
    }));
  };

  const onContentChange = (value, name) => {
    setReportObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveInternalAuditReport = () => {
    if (!addReportLoading) {
      dispatch(setupSaveInternalAuditReport(reportObject));
    }
  };

  /** -------------------------------
   * Effects
   * ------------------------------- */

  // When report is approved/added, refetch updated object
  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      dispatch(resetInternalAuditReportAddSuccess());
      dispatch(
        setupGetSingleInternalAuditReportAfterSave(`?reportId=${Number(reportId)}`)
      );
    }
  }, [internalAuditReportAddSuccess]);

  // Handle annexure file deletion
  React.useEffect(() => {
    if (consolidationFileUploadAddSuccess) {
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
  }, [consolidationFileUploadAddSuccess]);

  // Sync main report into local state
  React.useEffect(() => {
    const hasData = Object.keys(singleInternalAuditReport).length !== 0;
    if (hasData) {
      setReportObject(singleInternalAuditReport);
    }
  }, [singleInternalAuditReport]);

  // Sync extra fields into local state
  React.useEffect(() => {
    const hasExtraFields = Object.keys(internalAuditReportExtraFieldsObject).length !== 0;
    if (hasExtraFields) {
      setReportObject((prev) => ({
        ...internalAuditReportExtraFieldsObject,
        // Keep some values from previous state
        reportName: prev?.reportName,
        reportDate: prev?.reportDate,
        executiveSummary: prev?.executiveSummary,
        auditPurpose: prev?.auditPurpose,
        annexure: prev?.annexure,
        consolidatedIARKeyFindingsList: prev?.consolidatedIARKeyFindingsList,
        annexureUploads: prev?.annexureUploads,
        summaryOfKeyFindingsList: prev?.summaryOfKeyFindingsList,
      }));
    }
  }, [internalAuditReportExtraFieldsObject]);

  // Redirect to list if reportId is invalid
  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-consolidation-report");
    }
  }, [reportId]);

  // Handle sidebar state and cleanup
  React.useEffect(() => {
    dispatch(changeActiveLink("li-consolidation-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleResetData());
    };
  }, []);

  // Fetch report by ID
  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      dispatch(setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`));
    }
  }, [dispatch]);

  // Build consolidated observations
  React.useEffect(() => {
    if (singleInternalAuditReport?.reportingsList) {
      setConsolidatedObservations(
        groupObservationsBySubLocationAndArea(singleInternalAuditReport?.reportingsList)
      );
    }
  }, [singleInternalAuditReport]);

  /** -------------------------------
   * Render
   * ------------------------------- */
  return (
    <div className="overflow-y-hidden">
      {loading ? (
        <CircularProgress />
      ) : singleInternalAuditReport[0]?.error === "Not Found" ||
        Object.keys(singleInternalAuditReport).length === 0 ? (
        "Internal Audit Consolidation Report Not Found"
      ) : (
        <div className="mb-4">
          <Header title="Update Detailed Audit Report" />
          <DetailedAuditReportLayout
            reportObject={reportObject}
            handleChangeReportObject={handleChangeReportObject}
            handleSaveInternalAuditReport={handleSaveInternalAuditReport}
            addReportLoading={addReportLoading}
            handleChangeExtraFields={handleChangeExtraFields}
            setDeleteFileId={setDeleteFileId}
            consolidatedObservations={consolidatedObservations}
            onContentChange={onContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateDetailedAuditReport;
