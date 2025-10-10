import { useMemo } from "react";
import Chip from "@mui/material/Chip";
import ViewRichTextEditor from "../../../../../common/view-rich-text-editor/ViewRichTextEditor";

/**
 * Displays all summarized report observations, grouped by area.
 * Each observation shows its key findings and associated sub-locations.
 */
const consolidatedObservations = ({ singleSummarizedReport, allLocations }) => {
    // Build lookup map of subLocationId → description (memoized for performance)
    const subLocationMap = useMemo(() => {
        const map = {};
        allLocations?.forEach((loc) => {
            (loc.subLocations || []).forEach((subLoc) => {
                map[subLoc.id] = subLoc.description;
            });
        });
        return map;
    }, [allLocations]);

    // Helper to find sub-location description safely
    const findSubLocationDescription = (id) => subLocationMap[id] || "Unknown Sub-location";

    return (
        <div className="mt-3 mb-3">
            {singleSummarizedReport?.consolidationItemsList?.map((consolidatedItem, idx) => (
                <div key={idx}>
                    {/* Area Title */}
                    <p className="mb-3 heading fw-bold">Area ({consolidatedItem?.area})</p>
                    <hr />

                    {/* Observations under this Area */}
                    {consolidatedItem?.consolidatedObservations?.map((observation, obsIdx) => (
                        <div key={obsIdx} className="mb-3">
                            <p className="mb-3 heading">{observation?.observationTitle}</p>

                            {/* Key Findings */}
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label>Key Findings</label>
                                    <ViewRichTextEditor initialValue={observation?.summaryOfKeyFinding} />
                                </div>
                            </div>

                            {/* Locations */}
                            <div className="col-lg-12 mb-3">
                                <label>Locations</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {observation?.reportingList?.map((reportObject, rIdx) => (
                                        <Chip
                                            key={rIdx}
                                            label={findSubLocationDescription(reportObject?.subLocation)}
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

export default consolidatedObservations;
