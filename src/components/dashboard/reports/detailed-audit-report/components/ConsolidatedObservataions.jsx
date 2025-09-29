import React, { useCallback } from "react";
import Chip from "@mui/material/Chip";
import FollowUpItem from "./FollowUpItem";
import LazyLoad from "react-lazyload";

const ConsolidatedObservataions = ({ consolidatedObservations, reportObject }) => {
  // Safely find and return sub-location description by ID
  const getSubLocationDescription = useCallback(
    (subLocationId) =>
      reportObject?.subLocationList?.find((s) => s?.id === subLocationId)
        ?.description || "Unknown Sub-Location",
    [reportObject?.subLocationList]
  );

  return (
    <div>
      {/* Section heading */}
      <div className="col-lg-12 mt-4">
        <div className="heading fw-bold">Observations</div>
      </div>

      <div className="mt-3 mb-3">
        {/* Group by sub-location */}
        {consolidatedObservations.map((subLocationGroup, idx) => (
          <div key={idx}>
            {/* Sub-location title */}
            <p className="mb-3 consolidatedTitle">
              {getSubLocationDescription(subLocationGroup.subLocation)}
            </p>

            {/* Loop through areas in the current sub-location */}
            {subLocationGroup?.areas?.map((areaGroup, aIdx) => (
              <div key={aIdx} className="mb-3">
                {/* Area title */}
                <p className="mb-3 consolidatedTitle">{areaGroup?.area}</p>

                {/* Observations list */}
                <div className="border rounded px-3 py-2 mb-3">
                  {areaGroup.observations.map((observation, oIdx) => (
                    <LazyLoad
                      key={oIdx}
                      height={window.innerHeight * 2}
                      offset={300}
                    >
                      <div>
                        {/* Chip shows sub-location reference for observation */}
                        <div className="d-flex items-center justify-content-between">
                          <div></div>
                          <Chip
                            label={
                              reportObject?.subLocationList?.find(
                                (subLocation) =>
                                  subLocation?.id === observation?.subLocation
                              )?.description
                            }
                          />
                        </div>

                        {/* Observation details with follow-up info */}
                        <FollowUpItem
                          item={observation}
                          consolidatedObservationsItem={true}
                        />

                        <hr />
                      </div>
                    </LazyLoad>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsolidatedObservataions;
