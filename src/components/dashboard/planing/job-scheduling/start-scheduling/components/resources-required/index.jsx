import React from "react";

const ResourcesRequired = ({
  currentJobSchedulingObject,
  handleChangeNumberTextField,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          Determination of Number of Resources Required
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-3">
              <div className="col-lg-6">
                <label>IT</label>
                <input
                  type="number"
                  className="form-control"
                  id="labeltext"
                  placeholder=""
                  value={currentJobSchedulingObject?.it}
                  name="it"
                  onChange={handleChangeNumberTextField}
                />
              </div>
              <div className="col-lg-6">
                <label>Finance</label>
                <input
                  type="number"
                  className="form-control"
                  id="labeltex"
                  placeholder=""
                  value={currentJobSchedulingObject?.finance}
                  name="finance"
                  onChange={handleChangeNumberTextField}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Business</label>
                <input
                  type="number"
                  className="form-control"
                  id="labelt"
                  placeholder=""
                  value={currentJobSchedulingObject?.business}
                  name="business"
                  onChange={handleChangeNumberTextField}
                />
              </div>
              <div className="col-lg-6">
                <label>Fraud</label>
                <input
                  type="number"
                  className="form-control"
                  id="labelte"
                  placeholder=""
                  value={currentJobSchedulingObject?.fraud}
                  name="fraud"
                  onChange={handleChangeNumberTextField}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Operations</label>
                <input
                  type="number"
                  className="form-control"
                  id="label"
                  placeholder=""
                  value={currentJobSchedulingObject?.operations}
                  name="operations"
                  onChange={handleChangeNumberTextField}
                />
              </div>
              <div className="col-lg-6">
                <label>Other</label>
                <input
                  type="number"
                  className="form-control"
                  id="labe"
                  placeholder=""
                  value={currentJobSchedulingObject?.other}
                  name="other"
                  onChange={handleChangeNumberTextField}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesRequired;
