import React, { useMemo } from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "./RichText";

const Observations = ({ editableSummarizedReport, allLocations,onKeyFindingChangeChange }) => {
    // Build lookup map ONCE
    const subLocationMap = useMemo(() => {
        const map = {};
        allLocations.forEach(loc => {
            (loc.subLocations || []).forEach(subLoc => {
                map[subLoc.id] = subLoc.description;
            });
        });
        return map;
    }, [allLocations]);


    const findSubLocationDescription = (id) =>
        subLocationMap[id] || "Unknown Sub-location";

    return (
        <div className="mt-3 mb-3">
            {editableSummarizedReport.consolidationItemsList.map((consolidatedItem, idx) => (
                <div key={idx}>
                    <p className="mb-3 heading fw-bold">
                        Area ({consolidatedItem?.area})
                    </p>
                    <hr />

                    {consolidatedItem?.consolidatedObservations?.map((consolidatedObservation, aIdx) => (
                        <div key={aIdx} className="mb-3">
                            <p className="mb-3 heading">
                                {consolidatedObservation?.observationTitle}
                            </p>

                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label>Key Findings</label>
                                    <RichTextEditor
                                        initialValue={consolidatedObservation?.summaryOfKeyFinding}
                                        keyFindings={true}
                                        onKeyFindingChangeChange={onKeyFindingChangeChange}
                                        consolidatedItemId={consolidatedItem.id}
                                        consolidatedObservationId={consolidatedObservation.id}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12 mb-3">
                                <label>Locations</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {consolidatedObservation?.reportingList.map((reportObject, rIdx) => (
                                        <Chip
                                            label={findSubLocationDescription(reportObject?.subLocation)}
                                            key={rIdx}
                                        />
                                    ))}
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Observations;
