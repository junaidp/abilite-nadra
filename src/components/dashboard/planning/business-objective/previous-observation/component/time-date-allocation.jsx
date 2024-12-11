import React from "react";

const TimeAndDateAllocation = ({
  values,
  handleChangeJobSchedulingCheckFields,
  handleChangeJobSchedulingStringTextFields,
  handleChangeNumberTextField,
  fieldWorkManHours,
  totalWorkingManHours,
  totalHours,
  setFieldWorkManHours,
  setTotalWorkingManHours,
  setTotalHours,
}) => {
  React.useEffect(() => {
    let totalResources =
      Number(values?.numberOfResourcesRequired?.finance) +
      Number(values?.numberOfResourcesRequired?.business) +
      Number(values?.numberOfResourcesRequired?.fraud) +
      Number(values?.numberOfResourcesRequired?.operations) +
      Number(values?.numberOfResourcesRequired?.other) +
      Number(values?.numberOfResourcesRequired?.it);
    let totalWeeksHours =
      Number(values?.timeAndDateAllocation?.estimatedWeeks) * 40;
    setFieldWorkManHours(totalResources * totalWeeksHours);
    setTotalWorkingManHours(
      totalResources * totalWeeksHours +
        Number(values?.timeAndDateAllocation?.internalAuditManagementHours)
    );
    setTotalHours(
      Number(values?.timeAndDateAllocation?.travellingDays) * 8 +
        totalResources * totalWeeksHours +
        Number(values?.timeAndDateAllocation?.internalAuditManagementHours)
    );
  }, [values]);

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
          {values?.timeAndDateAllocation?.estimatedWeeks !== 0 &&
            values?.timeAndDateAllocation?.fieldWorkManHours !== 0 &&
            values?.timeAndDateAllocation?.internalAuditManagementHours !== 0 &&
            values?.timeAndDateAllocation?.totalHours !== 0 &&
            values?.timeAndDateAllocation?.totalWorkingManHours !== 0 &&
            values?.timeAndDateAllocation?.placeOfWork && (
              <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
            )}
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
                  value={values?.timeAndDateAllocation?.estimatedWeeks}
                  name="estimatedWeeks"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "timeAllocation")
                  }
                />
              </div>
              <div className="col-lg-6">
                <label>Field work Man Hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="lab"
                  placeholder=""
                  disabled
                  value={fieldWorkManHours}
                  readOnly
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
                  value={
                    values?.timeAndDateAllocation?.internalAuditManagementHours
                  }
                  name="internalAuditManagementHours"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "timeAllocation")
                  }
                />
              </div>
              <div className="col-lg-6">
                <label>Total Working Man Hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="l"
                  placeholder=""
                  value={totalWorkingManHours}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label className="me-3">Place of work</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={values?.timeAndDateAllocation?.placeOfWork || ""}
                  name="placeOfWork"
                  onChange={handleChangeJobSchedulingStringTextFields}
                >
                  <option value="">Select One</option>
                  <option value="In-house">In-house</option>
                  <option value="Outstation">Outstation</option>
                  <option value="In-house & outstation">
                    In-house & outstation
                  </option>
                </select>
              </div>
              {values?.timeAndDateAllocation?.placeOfWork !== "In-house" && (
                <div className="col-lg-6">
                  <label>Travelling days</label>
                  <input
                    type="number"
                    className="form-control"
                    id="sa"
                    placeholder=""
                    value={values?.timeAndDateAllocation?.travellingDays}
                    name="travellingDays"
                    onChange={(event) =>
                      handleChangeNumberTextField(event, "timeAllocation")
                    }
                  />
                </div>
              )}
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <p className="p-2 px-3 rounded  bg-body-secondary">
                  <span className="fw-bold label-text">
                    TOTAL HOURS INCLUSIVE OF TRAVELLING:
                  </span>
                  <span className="float-end">{totalHours}</span>
                </p>
              </div>
            </div>
            {values?.natureThrough !== "Compliance Checklist" && (
              <div className="row mb-3">
                <div className="col-lg-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      name="repeatJob"
                      checked={values?.timeAndDateAllocation?.repeatJob}
                      onChange={(event) =>
                        handleChangeJobSchedulingCheckFields(event)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Repeat job
                    </label>
                  </div>
                </div>
                {values?.timeAndDateAllocation?.repeatJob === true && (
                  <div className="col-lg-6">
                    <label className="me-3">Frequency</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={values?.timeAndDateAllocation?.frequency || ""}
                      name="frequency"
                      onChange={handleChangeJobSchedulingStringTextFields}
                    >
                      <option value="">Select</option>
                      <option value="Semi Annually">Semi Annually</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAndDateAllocation;
