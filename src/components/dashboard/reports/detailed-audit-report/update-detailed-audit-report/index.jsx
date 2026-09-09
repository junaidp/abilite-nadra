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
  setupGetDetailedReportSourceLite,
  setupGetDetailedReportSingleObservation,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { CircularProgress } from "@mui/material";
import DetailedAuditReportLayout from "../components/DetailedAuditReportLayout";
import Header from "../components/Header";
import { groupObservationsBySubLocationAndArea, decryptString } from "../../../../../config/helper";
import { buildDetailedAuditReportSavePayload } from "../components/reportPayload";

const UpdateDetailedAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Decrypt report ID from route param
  const reportId = decryptString(id);

  // Local state
  const [reportObject, setReportObject] = React.useState({});

  const [loadingObservationId, setLoadingObservationId] = React.useState(null);

  // Redux state
  const { user } = useSelector((state) => state?.auth);
  const {
    loading,
    internalAuditReportAddSuccess,
    addReportLoading,
    internalAuditReportExtraFieldsObject,
    singleInternalAuditReport,
    detailedReportSource,
    detailedReportSourceLoading,
    detailedReportObservationLoading,
  } = useSelector((state) => state?.consolidationReport);
  const consolidatedObservations = React.useMemo(
    () =>
      detailedReportSource?.reportingList?.length
        ? groupObservationsBySubLocationAndArea(detailedReportSource.reportingList)
        : [],
    [detailedReportSource?.reportingList]
  );

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
      dispatch(setupSaveInternalAuditReport(buildDetailedAuditReportSavePayload(reportObject)));
    }
  };

  /** -------------------------------
   * Effects
   * ------------------------------- */

  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      dispatch(resetInternalAuditReportAddSuccess());
    }
  }, [dispatch, internalAuditReportAddSuccess]);


  // Sync main report into local state
  React.useEffect(() => {
    const hasData = Object.keys(singleInternalAuditReport).length !== 0;
    if (hasData) {
      setReportObject(singleInternalAuditReport);
    }
  }, [singleInternalAuditReport]);

  // Merge the lightweight extra-field response without dropping report data.
  React.useEffect(() => {
    const extraFields =
      internalAuditReportExtraFieldsObject?.intAuditExtraFieldsList;

    if (Array.isArray(extraFields)) {
      setReportObject((prev) => ({
        ...prev,
        id: internalAuditReportExtraFieldsObject?.id || prev?.id,
        intAuditExtraFieldsList: extraFields,
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


  React.useEffect(() => {
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
            consolidatedObservations={consolidatedObservations}
            observationsLoading={detailedReportSourceLoading}
            onContentChange={onContentChange}
            onLoadObservation={handleLoadObservation}
            loadingObservationId={detailedReportObservationLoading ? loadingObservationId : null}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateDetailedAuditReport;
