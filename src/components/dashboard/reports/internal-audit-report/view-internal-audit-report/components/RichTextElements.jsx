import ViewRichTextEditor from "../../../../../common/view-rich-text-editor/ViewRichTextEditor";

/**
 * Displays all rich-text sections of an internal audit report in read-only mode.
 * Includes executive summary, key figures, main findings, and annexure.
 */
const RichTextElements = ({ singleInternalAuditReport }) => {
  const report = singleInternalAuditReport || {};

  return (
    <div className="border px-3 py-2 mt-3 rounded">

      {/* Annexure */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Identification</label>
          <ViewRichTextEditor initialValue={report?.annexure} />
        </div>
      </div>
      {/* Executive Summary */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Executive Summary</label>
          <ViewRichTextEditor initialValue={report?.executiveSummary} />
        </div>
      </div>

      {/* Financial & Operational Key Figures */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Financial & Operational Key Figures</label>
          <ViewRichTextEditor initialValue={report?.auditPurpose} />
        </div>
      </div>

      {/* Summary Of Main Findings */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Summary of Main Findings</label>
          <ViewRichTextEditor initialValue={report?.keyFindings} />
        </div>
      </div>
    </div>
  );
};

export default RichTextElements;
