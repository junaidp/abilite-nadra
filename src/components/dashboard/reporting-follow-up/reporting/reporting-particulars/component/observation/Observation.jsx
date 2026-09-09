import React from "react";
import moment from "moment";
import RichTextEditor from "../rich-text/RichText";
import Select from "../select/Select";
import AuditEngagementAttachments from "../audit-engagement-attachments/AuditEngagementAttachments";

/**
 * Handles observation fields, ratings, implications, recommended actions,
 * auditee selection, management comments, and read-only report rendering.
 */
const ObservationSection = ({
  item,
  user,
  currentItem,
  singleReport,
  allUsers = [],
  setReport = () => {},
  handleChange,
  handleObservationChange,
  handleManagementCommentsChange,
  handleAllowEditSection1,
  readOnly = false,
}) => {
  const isEditable =
    !readOnly && handleAllowEditSection1?.(item) === true;
  const auditeeOptions =
    readOnly && item?.auditee ? [item.auditee] : allUsers;
  const isCurrentAuditee =
    Number(user?.[0]?.userId?.id) === Number(currentItem?.auditee?.id);
  const showEditableManagement =
    !readOnly && item?.stepNo === 2 && isCurrentAuditee;
  const showReadOnlyManagement = readOnly
    ? Number(item?.stepNo) >= 2
    : item?.stepNo !== 0 && item?.stepNo !== 1 && item?.stepNo !== 2;
  const implementationDate = item?.implementationDate
    ? moment.utc(item.implementationDate).format("YYYY-MM-DD")
    : "";

  return (
    <>
      <div className="d-flex items-center mb-4 justify-content-between">
        <div className="flex-1">
          <label>Observation Title:</label>
          <input
            className="form-control w-100"
            placeholder="Enter Observation Title here"
            type="text"
            value={item?.observationTitle || ""}
            name="observationTitle"
            onChange={(event) => handleChange?.(event, item?.id)}
            disabled={!isEditable}
          />
        </div>
      </div>

      <div className="d-flex items-center mb-4">
        <div className="flex-1">
          <label>Area:</label>
          <input
            className="form-control w-100"
            placeholder="Enter Observation Area here"
            type="text"
            value={item?.area || ""}
            name="area"
            onChange={(event) => handleChange?.(event, item?.id)}
            disabled={!isEditable}
          />
        </div>
      </div>

      <div className="mb-4">
        <label>Observation:</label>
        <RichTextEditor
          onContentChange={handleObservationChange}
          initialValue={item?.observationName}
          id={item?.id}
          editable={isEditable ? "true" : "false"}
          singleReport={singleReport}
          item={item}
        />
      </div>

      <div className="d-flex mb-4 align-items-center">
        <label className="pe-4">Implication Rating:</label>
        <select
          className="form-select w-150"
          value={item?.implicationRating || ""}
          name="implicationRating"
          onChange={(event) => handleChange?.(event, item?.id)}
          disabled={!isEditable}
        >
          <option value="">Select One</option>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Implication:</label>
        <textarea
          placeholder="Enter Reason"
          rows="3"
          value={item?.implication || ""}
          name="implication"
          onChange={(event) => handleChange?.(event, item?.id)}
          disabled={!isEditable}
          maxLength="5000"
          className={`form-control ${item?.implication?.length >= 5000 && "error-border"}`}
        />
        <p className="word-limit-info label-text">
          Maximum 5000 characters
        </p>
      </div>

      <div className="mb-4">
        <label>Recommended Action Step:</label>
        <textarea
          placeholder="Enter Reason"
          rows="3"
          value={item?.recommendedActionStep || ""}
          name="recommendedActionStep"
          onChange={(event) => handleChange?.(event, item?.id)}
          disabled={!isEditable}
          maxLength="5000"
          className={`form-control ${item?.recommendedActionStep?.length >= 5000 && "error-border"}`}
        />
        <p className="word-limit-info label-text">
          Maximum 5000 characters
        </p>
      </div>

      <div className="mb-4">
        <Select
          label="Auditee"
          value={item?.auditee?.name || ""}
          setReport={setReport}
          list={auditeeOptions.map((auditee) => auditee?.name)}
          id={item?.id}
          allUsers={auditeeOptions}
          disabled={!isEditable}
        />
      </div>

      <AuditEngagementAttachments item={item} user={user} />

      {readOnly && (
        <AuditEngagementAttachments
          item={item}
          user={user}
          attachments={item?.reportingFileAttachmentsList || []}
          title="Reporting Attachments"
          groupName="reporting"
          hideForManagementAuditee={false}
        />
      )}

      {showEditableManagement && (
        <div className="mb-4">
          <label>Management Comments:</label>
          <RichTextEditor
            onContentChange={handleManagementCommentsChange}
            initialValue={item?.managementComments}
            id={item?.id}
            editable="true"
            singleReport={singleReport}
            item={item}
          />
          <p className="word-limit-info label-text">
            Maximum 1500 characters
          </p>
          <label className="py-1">Implementation Date:</label>
          <input
            type="date"
            className="form-control"
            value={implementationDate}
            name="implementationDate"
            onChange={(event) => handleChange?.(event, item?.id)}
          />
        </div>
      )}

      {showReadOnlyManagement && (
        <div className="mb-4">
          <label>Management Comments:</label>
          <RichTextEditor
            initialValue={item?.managementComments}
            editable="false"
          />
          <label className="pt-4">Implementation Date:</label>
          <input
            type="date"
            className="form-control"
            value={implementationDate}
            name="implementationDate"
            disabled
          />
        </div>
      )}
    </>
  );
};

export default React.memo(ObservationSection);
