import React from "react";

const TimeAndDateAllocation = ({
  currentJobSchedulingObject,
  handleChangeJobSchedulingCheckFields,
  handleChangeJobSchedulingStringTextFields,
  handleChangeNumberTextField,
  handleFrequencyChange,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          Time and Date Allocation
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Estimated Weeks</label>
                <input
                  type="number"
                  className="form-control"
                  id="lav"
                  placeholder=""
                  value={currentJobSchedulingObject?.estimatedWeeks}
                  name="estimatedWeeks"
                  onChange={handleChangeNumberTextField}
                />
              </div>
              <div className="col-lg-6">
                <label>Field work Man Hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="lab"
                  placeholder=""
                  value={currentJobSchedulingObject?.fieldWorkManHours}
                  name="fieldWorkManHours"
                  onChange={handleChangeNumberTextField}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Internal Audit Management Hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="la"
                  placeholder=""
                  value={
                    currentJobSchedulingObject?.internalAuditManagementHours
                  }
                  name="internalAuditManagementHours"
                  onChange={handleChangeNumberTextField}
                />
              </div>
              <div className="col-lg-6">
                <label>Total Working Man Hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="l"
                  placeholder=""
                  value={currentJobSchedulingObject?.totalWorkingManHours}
                  name="totalWorkingManHours"
                  onChange={handleChangeNumberTextField}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label className="me-3">Place of work</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={currentJobSchedulingObject?.placeOfWork || ""}
                  name="placeOfWork"
                  onChange={handleChangeJobSchedulingStringTextFields}
                >
                  <option>Select One</option>
                  <option value="In-house">In-house</option>
                  <option value="Outstation">Outstation</option>
                  <option value="In-house & outstation">
                    In-house & outstation
                  </option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Travelling days</label>
                <input
                  type="number"
                  className="form-control"
                  id="sa"
                  placeholder=""
                  value={currentJobSchedulingObject?.travellingDays}
                  name="travellingDays"
                  onChange={handleChangeNumberTextField}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <p className="p-2 px-3 rounded  bg-body-secondary">
                  <span className="fw-bold label-text">
                    TOTAL HOURS INCLUSIVE OF TRAVELLING:
                  </span>
                  <span className="float-end">
                    {currentJobSchedulingObject?.totalHours}
                  </span>
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6 align-self-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    name="repeatJob"
                    checked={currentJobSchedulingObject?.repeatJob}
                    onChange={handleChangeJobSchedulingCheckFields}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Repeat job
                  </label>
                </div>
              </div>
              {currentJobSchedulingObject?.repeatJob === true && (
                <div className="col-lg-6">
                  <label className="me-3">Frequency</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={currentJobSchedulingObject?.frequency || ""}
                    name="frequency"
                    onChange={handleFrequencyChange}
                  >
                    <option>Select</option>
                    <option value="Semi Annually">Semi Annually</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAndDateAllocation;
