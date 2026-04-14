import moment from "moment";
import ViewRichTextEditor from "../../../../common/view-rich-text-editor/ViewRichTextEditor";

/**
 * Displays detailed follow-up information for a specific audit observation.
 * Includes observation details, implications, management comments, and follow-up status.
 */
const FollowUpItem = ({ item }) => {
    const followUp = item?.followUp || {};
    const formattedDate = item?.implementationDate
        ? moment(item?.implementationDate).format("YYYY-MM-DD")
        : "";

    return (
        <div>
            {/* Observation Title */}
            <div className="mb-3">
                <label>Observation Title:</label>
                <p>{item?.observationTitle || "N/A"}</p>
            </div>

            {/* Area */}
            <div className="mb-3">
                <label>Area:</label>
                <p>{item?.area || "N/A"}</p>
            </div>

            {/* Observation */}
            <div className="mb-3">
                <label>Observation:</label>
                <ViewRichTextEditor initialValue={item?.observationName} />
            </div>

            {/* Implication Rating */}
            <div className="mb-3 align-items-center">
                <label className="pe-4">Implication Rating:</label>
                <select
                    className="form-select"
                    aria-label="Implication Rating"
                    value={item?.implicationRating || ""}
                    disabled
                >
                    <option value="">Select One</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>

            {/* Implication */}
            <div className="mb-3">
                <label>Implication:</label>
                <textarea
                    className="form-control"
                    rows="3"
                    value={item?.implication || ""}
                    placeholder="No implication provided"
                    disabled
                    readOnly
                />
            </div>

            {/* Auditee */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Auditee:</label>
                    <input
                        type="text"
                        className="form-control w-100"
                        value={item?.auditee?.name || ""}
                        placeholder="No auditee assigned"
                        disabled
                        readOnly
                    />
                </div>
            </div>

            {/* Management Comments */}
            <div className="mb-3">
                <label>Management Comments:</label>
                <ViewRichTextEditor initialValue={item?.managementComments} />
            </div>

            {/* Implementation Date */}
            <div className="mb-3">
                <label className="py-1">Implementation Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={formattedDate}
                    disabled
                    readOnly
                />
            </div>
        </div>
    );
};

export default FollowUpItem;
