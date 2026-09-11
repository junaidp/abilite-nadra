import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupObservationsBySubLocationAndArea } from "../../../../../config/helper";
import {
  setupGetInternalReportSingleObservation,
  setupGetInternalReportSourceLite,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import ConsolidatedObservations from "../../detailed-audit-report/components/ConsolidatedObservataions";

const InternalReportObservations = ({ reportObject }) => {
  const dispatch = useDispatch();
  const requestedSourceId = useRef(null);
  const [loadingObservationId, setLoadingObservationId] = useState(null);
  const {
    internalReportSource,
    internalReportSourceLoading,
    internalReportObservationLoading,
  } = useSelector((state) => state?.internalAuditReport);

  const reportingAndFollowUpId = reportObject?.reportingAndFollowUpId;
  const subLocationId = reportObject?.subLocationList?.[0]?.id;

  useEffect(() => {
    if (
      !reportingAndFollowUpId ||
      Number(requestedSourceId.current) === Number(reportingAndFollowUpId)
    ) {
      return;
    }

    requestedSourceId.current = reportingAndFollowUpId;
    dispatch(
      setupGetInternalReportSourceLite({
        reportingAndFollowUpId: Number(reportingAndFollowUpId),
      })
    );
  }, [dispatch, reportingAndFollowUpId]);

  const observations = useMemo(() => {
    if (!subLocationId || !Array.isArray(internalReportSource?.reportingList)) {
      return [];
    }

    return internalReportSource.reportingList.filter(
      (item) => Number(item?.subLocation) === Number(subLocationId)
    );
  }, [internalReportSource?.reportingList, subLocationId]);

  const groupedObservations = useMemo(
    () => groupObservationsBySubLocationAndArea(observations),
    [observations]
  );

  const isSourceLoading =
    Boolean(reportingAndFollowUpId) &&
    (internalReportSourceLoading ||
      Number(requestedSourceId.current) !== Number(reportingAndFollowUpId));

  const handleLoadObservation = useCallback(
    async (reportingId) => {
      const existingObservation = internalReportSource?.reportingList?.find(
        (item) => Number(item?.id) === Number(reportingId)
      );

      if (existingObservation?.observationName || existingObservation?.implication) {
        return;
      }

      setLoadingObservationId(reportingId);
      try {
        const response = await dispatch(
          setupGetInternalReportSingleObservation({ reportingId })
        ).unwrap();

        if (!response?.status) {
          throw new Error(response?.message || "Failed to load observation");
        }
        return response;
      } finally {
        setLoadingObservationId(null);
      }
    },
    [dispatch, internalReportSource?.reportingList]
  );

  if (!isSourceLoading && groupedObservations.length === 0) {
    return null;
  }

  return (
    <ConsolidatedObservations
      consolidatedObservations={groupedObservations}
      loading={isSourceLoading}
      reportObject={reportObject}
      onLoadObservation={handleLoadObservation}
      loadingObservationId={
        internalReportObservationLoading ? loadingObservationId : null
      }
      heading="Main Findings And Recommendations"
    />
  );
};

export default InternalReportObservations;
