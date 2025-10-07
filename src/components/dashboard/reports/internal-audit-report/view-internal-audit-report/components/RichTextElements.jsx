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
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Financial & Operational Key Figures</label>
          <RichTextEditor
            initialValue={singleInternalAuditReport?.auditPurpose}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Summary Of Main Findings</label>
          <RichTextEditor
            initialValue={singleInternalAuditReport?.keyFindings}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Annexure</label>
          <RichTextEditor initialValue={singleInternalAuditReport?.annexure} />
        </div>
      </div>
    </div>
  );
};

export default RichTextElements;
