import ViewRichTextEditor from "../../../../../common/view-rich-text-editor/ViewRichTextEditor";

/**
 * Displays all rich-text sections of the summarized report in read-only mode.
 * Each section (Identification, Executive Summary, etc.) uses a consistent layout and spacing.
 */
const RichTextElements = ({ singleSummarizedReport }) => {
    return (
        <div className="border px-3 py-2 mt-3 rounded">
            {/* Identification */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Identification</label>
                    <ViewRichTextEditor initialValue={singleSummarizedReport?.overView} />
                </div>
            </div>

            {/* Executive Summary */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Executive Summary</label>
                    <ViewRichTextEditor
                        initialValue={singleSummarizedReport?.executiveSummary}
                    />
                </div>
            </div>

            {/* Financial & Operational Key Figures */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Financial & Operational Key Figures</label>
                    <ViewRichTextEditor
                        initialValue={singleSummarizedReport?.auditPurpose}
                    />
                </div>
            </div>

            {/* Previous Audit Follow-Up */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Previous Audit Follow-Up</label>
                    <ViewRichTextEditor
                        initialValue={singleSummarizedReport?.previousAuditFollowUp}
                    />
                </div>
            </div>

            {/* Operational Highlights */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Operational Highlights</label>
                    <ViewRichTextEditor
                        initialValue={singleSummarizedReport?.operationalHighlight}
                    />
                </div>
            </div>

            {/* Annexure */}
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Annexure</label>
                    <ViewRichTextEditor initialValue={singleSummarizedReport?.annexure} />
                </div>
            </div>
        </div>
    );
};

export default RichTextElements;
