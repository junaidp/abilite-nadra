import React from "react";
import RichTextEditor from "./RichText";

const RichTextElements = ({ singleInternalAuditReport }) => {
  return (
    <div className="border px-3 py-2  mt-3 rounded">
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Executive summary</label>
          <RichTextEditor
            initialValue={singleInternalAuditReport?.executiveSummary}
          />
          <label className="word-limit-info label-text">
            Maximum 5000 words
          </label>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Audit Purpose</label>
          <RichTextEditor
            initialValue={singleInternalAuditReport?.auditPurpose}
          />
          <label className="word-limit-info label-text">
            Maximum 5000 words
          </label>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Annexure</label>
          <RichTextEditor initialValue={singleInternalAuditReport?.annexure} />
          <label className="word-limit-info label-text">
            Maximum 5000 words
          </label>
        </div>
      </div>
    </div>
  );
};

export default RichTextElements;
