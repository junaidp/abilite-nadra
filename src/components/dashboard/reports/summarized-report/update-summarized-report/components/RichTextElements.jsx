import React from "react";
import RichTextEditor from "./RichText";

const RichTextElements = ({ editableSummarizedReport, onContentChange }) => {
    return (
        <div className="border px-3 py-2 mt-3 rounded">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Overview</label>
                    <RichTextEditor
                        initialValue={editableSummarizedReport?.overView}
                        onContentChange={onContentChange}
                        name="overView"
                        keyFindings={false}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Executive summary</label>
                    <RichTextEditor
                        initialValue={editableSummarizedReport?.executiveSummary}
                        onContentChange={onContentChange}
                        name="executiveSummary"
                        keyFindings={false}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Audit Purpose</label>
                    <RichTextEditor
                        initialValue={editableSummarizedReport?.auditPurpose}
                        onContentChange={onContentChange}
                        name="auditPurpose"
                        keyFindings={false}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Previous Audit Follow Up</label>
                    <RichTextEditor
                        initialValue={editableSummarizedReport?.previousAuditFollowUp}
                        onContentChange={onContentChange}
                        name="previousAuditFollowUp"
                        keyFindings={false}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Operational Highlights</label>
                    <RichTextEditor
                        initialValue={editableSummarizedReport?.operationalHighlight}
                        onContentChange={onContentChange}
                        name="operationalHighlight"
                        keyFindings={false}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Annexure</label>
                    <RichTextEditor
                        initialValue={editableSummarizedReport?.annexure}
                        onContentChange={onContentChange}
                        name="annexure"
                        keyFindings={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(RichTextElements);
