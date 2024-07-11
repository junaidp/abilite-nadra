import React from "react";
import Editor from "../../../../../../common/rich-text/index";

const Editors = ({ data }) => {
  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Executive Summary
          </label>
          <Editor initialValue={data?.summary} editable="false" />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Audit Planning Methodology
          </label>
          <Editor initialValue={data?.methodology} editable="false" />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Risk assessment summary
          </label>
          <Editor initialValue={data?.riskAssessmentSummary} editable="false" />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Organizational strategy, key areas of focus, key risks, and
            associated assurance strategies in the audit plan.
          </label>
          <Editor initialValue={data?.organizationStrategy} editable="false" />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Summary of risks.
          </label>
          <Editor initialValue={data?.summaryRisk} editable="editable" />
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>
    </div>
  );
};

export default Editors;
