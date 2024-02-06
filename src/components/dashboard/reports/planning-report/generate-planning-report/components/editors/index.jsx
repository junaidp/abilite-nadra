import React from "react";
import Editor from "../../../../../../common/rich-text/index"

const Editors = ({handleEditorContentChange,data,editable}) => {
  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Executive Summary
          </label>
          <Editor
            onContentChange={handleEditorContentChange}
            initialValue={data?.summary}
            name="summary"
            editable={editable}
          />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Audit Planning Methodology
          </label>
          <Editor
            onContentChange={handleEditorContentChange}
            initialValue={data?.methodology}
            name="methodology"
            editable={editable}
          />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Risk assessment summary
          </label>
          <Editor
            onContentChange={handleEditorContentChange}
            initialValue={data?.riskAssesmentSummary}
            name="riskAssesmentSummary"
            editable={editable}
          />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Organizational strategy, key areas of focus, key risks, and
            associated assurance strategies in the audit plan.
          </label>
          <Editor
            onContentChange={handleEditorContentChange}
            initialValue={data?.orgnizationStrategy}
            name="orgnizationStrategy"
            editable={editable}
          />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Summary of risks.
          </label>
          <Editor
            onContentChange={handleEditorContentChange}
            initialValue={data?.summaryRisk}
            name="summaryRisk"
            editable={editable}
          />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
    </div>
  );
};

export default Editors;
