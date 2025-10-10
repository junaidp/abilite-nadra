import { useMemo } from "react";
import Chip from "@mui/material/Chip";
import UpdateRichTextEditor from "../../../../../common/update-rich-text-editor/UpdateRichTextEditor";

/**
 * Displays and allows editing of consolidated audit observations grouped by area.
 * Each observation includes a rich-text editor for key findings and associated sub-location chips.
 */
const consolidatedObservation = ({ editableSummarizedReport, allLocations, onKeyFindingChange }) => {
    // Create a lookup map for sub-location descriptions for quick access
    const subLocationMap = useMemo(() => {
        const map = {};
        allLocations?.forEach((loc) => {
            (loc?.subLocations || []).forEach((subLoc) => {
                map[subLoc.id] = subLoc.description;
            });
        });
        return map;
    }, [allLocations]);

    // Helper to get sub-location description
    const getSubLocationDescription = (id) =>
        subLocationMap[id] || "Unknown Sub-location";

    return (
        <div className="mt-3 mb-3">
            {editableSummarizedReport?.consolidationItemsList?.map(
                (consolidatedItem, idx) => (
                    <div key={idx}>
                        {/* Area Header */}
                        <p className="mb-3 heading fw-bold">
                            Area ({consolidatedItem?.area || "Unnamed Area"})
                        </p>
                        <hr />

                        {/* Consolidated Observations */}
                        {consolidatedItem?.consolidatedObservations?.map(
                            (observation, obsIdx) => (
                                <div key={obsIdx} className="mb-3">
                                    {/* Observation Title */}
                                    <p className="mb-3 heading">
                                        {observation?.observationTitle || "Untitled Observation"}
                                    </p>

                                    {/* Key Findings */}
                                    <div className="row mb-3">
                                        <div className="col-lg-12">
                                            <label>Key Findings</label>
                                            <UpdateRichTextEditor
                                                initialValue={observation?.summaryOfKeyFinding}
                                                onKeyFindingChange={onKeyFindingChange}
                                                consolidatedItemId={consolidatedItem?.id}
                                                consolidatedObservationId={observation?.id}
                                            />
                                        </div>
                                    </div>

                                    {/* Locations */}
                                    <div className="col-lg-12 mb-3">
                                        <label>Locations</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {observation?.reportingList?.length ? (
                                                observation.reportingList.map((reportObj, rIdx) => (
                                                    <Chip
                                                        key={rIdx}
                                                        label={getSubLocationDescription(reportObj?.subLocation)}
                                                    />
                                                ))
                                            ) : (
                                                <span>No locations available</span>
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default consolidatedObservation;
