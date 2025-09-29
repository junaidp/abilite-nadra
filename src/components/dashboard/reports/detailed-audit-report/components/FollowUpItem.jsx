import moment from "moment";
import ViewRichTextEditor from "../../../../../components/common/view-rich-text-editor/ViewRichTextEditor";
import FileAttachement from "./Attachments";

const FollowUpItem = ({ item, consolidatedObservationsItem }) => {
  // Format implementation date safely (fallback empty string if null/invalid)
  const formattedImplementationDate = item?.implementationDate
    ? moment(item.implementationDate).format("YYYY-MM-DD")
    : "";

  return (
    <div>
      {/* Show title only if this is NOT a consolidated observation */}
      {consolidatedObservationsItem === false && (
        <div className="mb-3">
          <label>Observation Title:</label>
          <p>{item?.observationTitle}</p>
        </div>
      )}

      {/* Area of observation */}
      <div className="mb-3">
        <label>Area:</label>
        <p>{item?.area}</p>
      </div>

      {/* Observation description (rich text) */}
      <div className="mb-3">
        <label>Observation:</label>
        <ViewRichTextEditor initialValue={item?.observationName} />
      </div>

      {/* Implication rating (dropdown but read-only) */}
      <div className="mb-3 align-items-center">
        <label className="pe-4">Implication Rating:</label>
        <select
          className="form-select"
          value={item?.implicationRating}
          disabled
        >
          <option value="">Select One</option>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
      </div>

      {/* Implication details */}
      <div className="mb-3">
        <label>Implication:</label>
        <textarea
          className="form-control"
          rows="3"
          value={item?.implication}
          disabled
        />
      </div>

      {/* Auditee info */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Auditee:</label>
          <input
            className="form-control w-100"
            type="text"
            value={item?.auditee?.name || ""}
            disabled
          />
        </div>
      </div>

      {/* Management comments */}
      <div className="mb-3">
        <label>Management Comments:</label>
        <ViewRichTextEditor initialValue={item?.managementComments} />
      </div>

      {/* Implementation date */}
      <div className="mb-3">
        <label className="py-1">Implementation Date:</label>
        <input
          type="date"
          className="form-control"
          value={formattedImplementationDate}
          disabled
        />
      </div>

      {/* Recommendations implemented dropdown */}
      <div className="mb-3 align-items-center">
        <label className="pe-4">Recommendations Implemented:</label>
        <select
          className="form-select"
          value={item?.followUp?.recommendationsImplemented?.toString()}
          disabled
        >
          <option value="">Select One</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Final comments (only if recommendations implemented) */}
      {item?.followUp?.recommendationsImplemented?.toString() === "true" && (
        <div className="mb-3">
          <label>Final Comments:</label>
          <ViewRichTextEditor initialValue={item?.followUp?.finalComments} />
        </div>
      )}

      {/* Test in next year dropdown */}
      <div className="mb-3 align-items-center">
        <label className="pe-4">Test In Next Year:</label>
        <select
          className="form-select"
          value={item?.followUp?.testInNextYear?.toString()}
          disabled
        >
          <option value="">Select One</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* File attachments (if any) */}
      <FileAttachement item={item} />
    </div>
  );
};

export default FollowUpItem;
