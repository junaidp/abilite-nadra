import React, { useCallback, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import ObservationSection from "../../../reporting-follow-up/reporting/reporting-particulars/component/observation/Observation";
import "./ConsolidatedObservations.css";

const hasObservationDetails = (observation) =>
  Boolean(
    observation?.observationName ||
      observation?.implication ||
      observation?.recommendedActionStep ||
      observation?.managementComments ||
      observation?.implementationDate ||
      observation?.implicationRating ||
      observation?.auditee ||
      observation?.checklistObservations ||
      observation?.auditEngagementAttachmentsList?.length ||
      observation?.reportingFileAttachmentsList?.length
  );

const ObservationListSkeleton = () => (
  <section className="dar-observations mt-4" aria-busy="true">
    <Skeleton variant="text" width={150} height={34} />
    <div className="dar-observation-skeleton-list">
      {[0, 1, 2].map((item) => (
        <div className="dar-observation-skeleton" key={item}>
          <Skeleton variant="text" width="28%" height={22} />
          <Skeleton variant="rounded" width="100%" height={54} />
        </div>
      ))}
    </div>
  </section>
);

const ObservationDetailsSkeleton = () => (
  <div className="dar-observation-details-skeleton" aria-busy="true">
    <Skeleton variant="rounded" width="100%" height={42} />
    <Skeleton variant="rounded" width="100%" height={42} />
    <Skeleton variant="rounded" width="100%" height={150} />
    <Skeleton variant="rounded" width="38%" height={42} />
    <Skeleton variant="rounded" width="100%" height={82} />
  </div>
);
const ConsolidatedObservataions = ({
  consolidatedObservations,
  reportObject,
  onLoadObservation,
  loadingObservationId,
  loading = false,
  heading = "Observations",
}) => {
  const [expandedObservationId, setExpandedObservationId] = useState(null);
  const loadedObservationIds = useRef(new Set());
  const loadingObservationIds = useRef(new Set());
  const [pendingObservationIds, setPendingObservationIds] = useState(new Set());
  const { user } = useSelector((state) => state?.auth);

  const getSubLocationDescription = useCallback(
    (subLocationId) =>
      reportObject?.subLocationList?.find(
        (subLocation) => Number(subLocation?.id) === Number(subLocationId)
      )?.description || "Unknown Sub-Location",
    [reportObject?.subLocationList]
  );

  const handleToggleObservation = async (observation) => {
    const observationId = observation?.id;
    const isCurrentlyExpanded =
      Number(expandedObservationId) === Number(observationId);

    setExpandedObservationId(isCurrentlyExpanded ? null : observationId);

    if (
      isCurrentlyExpanded ||
      hasObservationDetails(observation) ||
      loadedObservationIds.current.has(observationId) ||
      loadingObservationIds.current.has(observationId)
    ) {
      return;
    }

    loadingObservationIds.current.add(observationId);
    setPendingObservationIds((current) => {
      const next = new Set(current);
      next.add(observationId);
      return next;
    });

    try {
      await onLoadObservation?.(observationId);
      loadedObservationIds.current.add(observationId);
    } catch {
      // A failed request can be retried the next time this item is opened.
    } finally {
      loadingObservationIds.current.delete(observationId);
      setPendingObservationIds((current) => {
        const next = new Set(current);
        next.delete(observationId);
        return next;
      });
    }
  };

  if (loading) {
    return <ObservationListSkeleton />;
  }

  return (
    <section className="dar-observations mt-4">
      <h3 className="heading fw-bold mb-3">{heading}</h3>

      <div className="dar-observation-groups">
        {consolidatedObservations.map((subLocationGroup) =>
          subLocationGroup?.areas?.map((areaGroup) => (
            <section
              className="dar-observation-group"
              key={`${subLocationGroup.subLocation}-${areaGroup?.area}`}
            >
              <div className="dar-observation-group-heading">
                <span>{areaGroup?.area || "General"}</span>
                <span className="dar-observation-count">
                  {areaGroup?.observations?.length || 0} observation
                  {areaGroup?.observations?.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="dar-observation-list">
                {areaGroup?.observations?.map((observation) => {
                  const isExpanded =
                    Number(expandedObservationId) === Number(observation?.id);
                  const isLoading =
                    pendingObservationIds.has(observation?.id) ||
                    Number(loadingObservationId) === Number(observation?.id);
                  const panelId = `dar-observation-panel-${observation?.id}`;

                  return (
                    <article
                      className={`dar-observation-accordion${
                        isExpanded ? " is-expanded" : ""
                      }`}
                      key={observation?.id || observation?.observationTitle}
                    >
                      <button
                        type="button"
                        className="dar-observation-trigger"
                        onClick={() => handleToggleObservation(observation)}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                      >
                        <span className="dar-observation-title">
                          {observation?.observationTitle || "Observation"}
                        </span>

                        <span className="dar-observation-trigger-meta">
                          <span className="dar-observation-location">
                            {getSubLocationDescription(observation?.subLocation)}
                          </span>
                          <i
                            className="fa fa-chevron-down dar-observation-chevron"
                            aria-hidden="true"
                          />
                        </span>
                      </button>

                      <div
                        id={panelId}
                        className="dar-observation-panel"
                        aria-hidden={!isExpanded}
                      >
                        <div className="dar-observation-panel-inner">
                          <div className="dar-observation-body">
                            {isLoading ? (
                              <ObservationDetailsSkeleton />
                            ) : hasObservationDetails(observation) ? (
                              <ObservationSection
                                item={observation}
                                user={user}
                                currentItem={observation}
                                readOnly
                              />
                            ) : (
                              <p className="text-muted mb-0">
                                No observation details found.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </section>
  );
};

export default ConsolidatedObservataions;
