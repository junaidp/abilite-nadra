import React, { useEffect, useState, useMemo } from "react";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  setupGetDetailedReportSourceLite,
  setupGetDetailedReportSingleObservation,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReportFirstLayout from "../components/ReportFirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import ConsolidatedObservations from "../components/ConsolidatedObservataions";
import { groupObservationsBySubLocationAndArea, decryptString } from "../../../../../config/helper";

const ViewDetailedAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = useMemo(() => decryptString(id), [id]); // ✅ memoize decryption


  const [loadingObservationId, setLoadingObservationId] = useState(null);

  // Redux state selectors
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    singleInternalAuditReport,
    detailedReportSource,
    detailedReportSourceLoading,
    detailedReportObservationLoading,
  } = useSelector((state) => state?.consolidationReport);

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

  useEffect(() => {
    if (singleInternalAuditReport?.reportingAndFollowUpId) {
      dispatch(
        setupGetDetailedReportSourceLite({
          reportingAndFollowUpId: Number(singleInternalAuditReport.reportingAndFollowUpId),
        })
      );
    }
  }, [dispatch, singleInternalAuditReport?.reportingAndFollowUpId]);

  const handleLoadObservation = React.useCallback(
    async (reportingId) => {
      const existingObservation = detailedReportSource?.reportingList?.find(
        (item) => Number(item?.id) === Number(reportingId)
      );

      if (existingObservation?.observationName || existingObservation?.implication) {
        return;
      }

      setLoadingObservationId(reportingId);
      try {
        const response = await dispatch(
          setupGetDetailedReportSingleObservation({ reportingId })
        ).unwrap();
        if (!response?.status) {
          throw new Error(response?.message || "Failed to load observation");
        }
        return response;
      } finally {
        setLoadingObservationId(null);
      }
    },
    [dispatch, detailedReportSource?.reportingList]
  );

  const consolidatedObservations = useMemo(
    () =>
      detailedReportSource?.reportingList?.length
        ? groupObservationsBySubLocationAndArea(detailedReportSource.reportingList)
        : [],
    [detailedReportSource?.reportingList]
  );

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
          {(detailedReportSourceLoading || consolidatedObservations.length > 0) && (
            <ConsolidatedObservations
              consolidatedObservations={consolidatedObservations}
              loading={detailedReportSourceLoading}
              reportObject={singleInternalAuditReport}
              onLoadObservation={handleLoadObservation}
              loadingObservationId={detailedReportObservationLoading ? loadingObservationId : null}
            />
          )}

          {/* Extra Fields */}
          {singleInternalAuditReport?.intAuditExtraFieldsList?.length > 0 && (
            <AuditExtraFields singleInternalAuditReport={singleInternalAuditReport} />
          )}

          {/* File Upload Section */}
          <div className="mt-4">
            <FileUpload item={singleInternalAuditReport} readOnly />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetailedAuditReport;
