import RichTextEditor from "../../../../../../components/common/view-rich-text-editor/ViewRichTextEditor";

const RichTextElements = ({ singleInternalAuditReport }) => {
  return (
    <div className="border px-3 py-2 mt-3 rounded">
      {/* Executive Summary Section */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Executive Summary</label>
          <RichTextEditor
            initialValue={singleInternalAuditReport?.executiveSummary}
          />
        </div>
      </div>

      {/* Audit Purpose Section */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Financial & Operational Key Figures</label>
          <RichTextEditor
            initialValue={singleInternalAuditReport?.auditPurpose}
          />
        </div>
      </div>

      {/* Annexure Section */}
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
