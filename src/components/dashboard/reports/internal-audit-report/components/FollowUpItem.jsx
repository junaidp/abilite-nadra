import moment from "moment";
import ViewRichTextEditor from "../../../../../components/common/view-rich-text-editor/ViewRichTextEditor";

/**
 * FollowUpItem Component
 * -----------------------
 * Displays detailed information for a follow-up observation.
 * Includes observation details, implications, management comments,
 * implementation date, and follow-up status.
 *
 */
const FollowUpItem = ({ item, consolidatedObservationsItem }) => {
    return (
        <div>
            {/* Observation Title (only if not consolidated) */}
            {!consolidatedObservationsItem && (
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <label>Observation Title:</label>
                        <p>{item?.observationTitle}</p>
                    </div>
                </div>
            )}

            {/* Observation Description */}
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
                    value={item?.implicationRating}
                    disabled
                >
                    <option value="">Select One</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>

            {/* Implication Description */}
            <div className="mb-3">
                <label>Implication:</label>
                <textarea
                    className="form-control"
                    placeholder="Enter Reason"
                    rows="3"
                    value={item?.implication || ""}
                    disabled
                />
            </div>

            {/* Auditee Information */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Auditee:</label>
                    <input
                        className="form-control w-100"
                        type="text"
                        value={item?.auditee?.name || ""}
                        placeholder="Enter Observation Title here"
                        disabled
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
                    value={moment(item?.implementationDate).format("YYYY-MM-DD")}
                    name="implementationDate"
                    disabled
                />
            </div>

            {/* Recommendations Implemented */}
            <div className="mb-3 align-items-center">
                <label className="pe-4">Recommendations Implemented:</label>
                <select
                    className="form-select"
                    aria-label="Recommendations Implemented"
                    value={item?.followUp?.recommendationsImplemented?.toString() || ""}
                    name="recommendationsImplemented"
                    disabled
                >
                    <option value="">Select One</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            {/* Final Comments (visible only if recommendations are implemented) */}
            {item?.followUp?.recommendationsImplemented?.toString() === "true" && (
                <div className="mb-3">
                    <label>Final Comments:</label>
                    <ViewRichTextEditor initialValue={item?.followUp?.finalComments} />
                </div>
            )}

            {/* Test in Next Year */}
            <div className="mb-3 align-items-center">
                <label className="pe-4">Test In Next Year:</label>
                <select
                    className="form-select"
                    aria-label="Test In Next Year"
                    value={item?.followUp?.testInNextYear?.toString() || ""}
                    name="testInNextYear"
                    disabled
                >
                    <option value="">Select One</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
    );
};

export default FollowUpItem;
