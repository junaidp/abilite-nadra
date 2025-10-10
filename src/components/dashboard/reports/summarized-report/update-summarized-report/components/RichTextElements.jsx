import UpdateRichTextEditor from "../../../../../common/update-rich-text-editor/UpdateRichTextEditor";

/**
 * Renders editable rich text sections for a summarized audit report.
 * Each section uses UpdateRichTextEditor for consistent rich-text editing experience.
 */
const RichTextElements = ({ editableSummarizedReport, onContentChange }) => {
    // Reusable renderer for each editor field
    const renderEditorField = (label, name, value, keyFindings = false) => (
        <div className="row mb-3">
            <div className="col-lg-12">
                <label>{label}</label>
                <UpdateRichTextEditor
                    initialValue={value}
                    onContentChange={onContentChange}
                    name={name}
                    keyFindings={keyFindings}
                />
            </div>
        </div>
    );

    return (
        <div className="border px-3 py-2 mt-3 rounded">
            {renderEditorField(
                "Identification",
                "overView",
                editableSummarizedReport?.overView
            )}
            {renderEditorField(
                "Executive Summary",
                "executiveSummary",
                editableSummarizedReport?.executiveSummary
            )}
            {renderEditorField(
                "Financial & Operational Key Figures",
                "auditPurpose",
                editableSummarizedReport?.auditPurpose,
                false
            )}
            {renderEditorField(
                "Previous Audit Follow Up",
                "previousAuditFollowUp",
                editableSummarizedReport?.previousAuditFollowUp
            )}
            {renderEditorField(
                "Operational Highlights",
                "operationalHighlight",
                editableSummarizedReport?.operationalHighlight
            )}
            {renderEditorField(
                "Annexure",
                "annexure",
                editableSummarizedReport?.annexure
            )}
        </div>
    );
};

export default RichTextElements;
