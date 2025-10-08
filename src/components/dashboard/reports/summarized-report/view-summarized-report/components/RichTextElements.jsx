import RichTextEditor from "./RichText";

const RichTextElements = ({ singleSummarizedReport }) => {
    return (
        <div className="border px-3 py-2  mt-3 rounded">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Identification</label>
                    <RichTextEditor
                        initialValue={singleSummarizedReport?.overView}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Executive summary</label>
                    <RichTextEditor
                        initialValue={singleSummarizedReport?.executiveSummary}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Financial & Operational Key Figures</label>
                    <RichTextEditor
                        initialValue={singleSummarizedReport?.auditPurpose}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Previous Audit Follow Up</label>
                    <RichTextEditor
                        initialValue={singleSummarizedReport?.previousAuditFollowUp}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Operational Highlights</label>
                    <RichTextEditor
                        initialValue={singleSummarizedReport?.operationalHighlight}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-12">
                    <label>Annexure</label>
                    <RichTextEditor initialValue={singleSummarizedReport?.annexure} />
                </div>
            </div>
        </div>
    );
};

export default RichTextElements;
