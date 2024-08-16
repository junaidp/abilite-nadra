import React from "react";
import ProcedureFileUpload from "./ProcedureFileUpload";
import SamplingFileUpload from "./SamplingFileUpload";

const FirstLayout = ({
  currentAuditStep,
  handleChange,
  handleAllowEdit,
  setCurrentDeletedFileId,
}) => {
  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="sub-heading">
            {currentAuditStep?.program?.description}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6">
          <div>
            <label className="me-3">Perform Sampling</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={currentAuditStep?.sampling}
              onChange={(event) => handleChange(event)}
              name="sampling"
              disabled={handleAllowEdit() === true ? false : true}
            >
              <option value="">Select One</option>
              <option value={1}>Yes</option>
              <option value={2}>No</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="me-3">Sampling Method</label>
            <select
              className="form-select"
              onChange={(event) => handleChange(event)}
              aria-label="Default select example"
              value={currentAuditStep?.samplingMethod}
              name="samplingMethod"
              disabled={handleAllowEdit() === true ? false : true}
            >
              <option value="">Select One</option>
              <option value={1}>Simple Random Sampling</option>
              <option value={2}>Systematic Sampling</option>
              <option value={3}>Cluster Samling</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <div>
            <label className="me-3">Control Risk</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={currentAuditStep?.controlRisk}
              onChange={(event) => handleChange(event)}
              name="controlRisk"
              disabled={handleAllowEdit() === true ? false : true}
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="me-3">Frequency</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={currentAuditStep?.frequency}
              onChange={(event) => handleChange(event)}
              name="frequency"
              disabled={handleAllowEdit() === true ? false : true}
            >
              <option value="">Select One</option>
              <option value={1}>Annually</option>
              <option value={2}>Bi-annyally</option>
              <option value={3}>Quarterly</option>
              <option value={4}>Monthly</option>
              <option value={5}>Weekly</option>
              <option value={6}>Daily</option>
              <option value={7}>Recurring</option>
            </select>
          </div>
        </div>
      </div>

      <SamplingFileUpload
        currentAuditStep={currentAuditStep}
        handleAllowEdit={handleAllowEdit}
        setCurrentDeletedFileId={setCurrentDeletedFileId}
      />

      <ProcedureFileUpload
        handleChange={handleChange}
        currentAuditStep={currentAuditStep}
        handleAllowEdit={handleAllowEdit}
        setCurrentDeletedFileId={setCurrentDeletedFileId}
      />
    </div>
  );
};

export default FirstLayout;
