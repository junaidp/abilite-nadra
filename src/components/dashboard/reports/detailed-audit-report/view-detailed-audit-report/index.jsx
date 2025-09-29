import React, { useEffect, useState, useMemo } from "react";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReportFirstLayout from "../components/ReportFirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "../components/Header";
import FileUpload from "./components/FileUpload";
import ConsolidatedObservations from "../components/ConsolidatedObservataions";
import { groupObservationsBySubLocationAndArea, decryptString } from "../../../../../config/helper";

const ViewDetailedAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = useMemo(() => decryptString(id), [id]); // ✅ memoize decryption

  const [consolidatedObservations, setConsolidatedObservations] = useState([]);

  // Redux state selectors
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.consolidationReport
  );

  // ✅ Redirect if reportId is missing
  useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-consolidation-report");
    }
  }, [reportId, navigate]);

  // ✅ Handle sidebar active link state
  useEffect(() => {
    dispatch(changeActiveLink("li-consolidation-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));

    // Cleanup on unmount
    return () => {
      dispatch(handleResetData());
    };
  }, [dispatch]);

  // ✅ Fetch report data when token & reportId available
  useEffect(() => {
    if (user?.[0]?.token && reportId) {
      dispatch(setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`));
    }
  }, [dispatch, user, reportId]);

  // ✅ Recompute grouped observations when report data changes
  useEffect(() => {
    if (singleInternalAuditReport?.reportingsList) {
      setConsolidatedObservations(
        groupObservationsBySubLocationAndArea(singleInternalAuditReport.reportingsList)
      );
    }
  }, [singleInternalAuditReport]);

  // ✅ Memoize error state to avoid recalculating in render
  const isNotFound = useMemo(() => {
    return (
      singleInternalAuditReport?.[0]?.error === "Not Found" ||
      (Object.keys(singleInternalAuditReport).length === 0 &&
        singleInternalAuditReport.constructor === Object)
    );
  }, [singleInternalAuditReport]);

  return (
    <div className="overflow-y-hidden">
      {loading ? (
        <CircularProgress />
      ) : isNotFound ? (
        "Internal Audit Consolidation Report Not Found"
      ) : (
        <div className="mb-4">
          {/* Header */}
          <Header title="View Detailed Audit Report" />

          {/* Report Layout */}
          <ReportFirstLayout
            reportObject={singleInternalAuditReport}
            isReadOnly={true}
          />

          {/* Rich Text Fields */}
          <RichTextFields singleInternalAuditReport={singleInternalAuditReport} />

          {/* Consolidated Observations */}
          {consolidatedObservations?.length > 0 && (
            <ConsolidatedObservations
              consolidatedObservations={consolidatedObservations}
              reportObject={singleInternalAuditReport}
            />
          )}

          {/* Extra Fields */}
          {singleInternalAuditReport?.intAuditExtraFieldsList?.length > 0 && (
            <AuditExtraFields singleInternalAuditReport={singleInternalAuditReport} />
          )}

          {/* File Upload Section */}
          <div className="mt-4">
            <FileUpload item={singleInternalAuditReport} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetailedAuditReport;
