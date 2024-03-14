import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateJobSehedulingTimeAndDateAllocation } from "../../../../../../../global-redux/reducers/planing/job-scheduling/slice";

const TimeAndDateAllocation = ({
  currentJobSchedulingObject,
  handleChangeJobSchedulingCheckFields,
  handleChangeJobSchedulingStringTextFields,
  handleChangeNumberTextField,
  handleSaveMainJobScheduling,
}) => {
  const dispatch = useDispatch();
  const [fieldWorkManHours, setFieldWorkManHours] = React.useState(0);
  const [totalWorkingManHours, setTotalWorkingManHours] = React.useState(0);
  const [totalHours, setTotalHours] = React.useState(0);
  const { loading } = useSelector((state) => state?.planingJobScheduling);
  function handleSave() {
    if (!loading) {
      dispatch(
        setupUpdateJobSehedulingTimeAndDateAllocation({
          ...currentJobSchedulingObject?.timeAndDateAllocation,
          fieldWorkManHours: fieldWorkManHours,
          totalWorkingManHours: totalWorkingManHours,
          totalHours: totalHours,
          repeatJob:
            currentJobSchedulingObject?.timeAndDateAllocation?.repeatJob ===
            null
              ? false
              : currentJobSchedulingObject?.timeAndDateAllocation?.repeatJob,
          frequency:
            currentJobSchedulingObject?.timeAndDateAllocation?.repeatJob ===
              false ||
            currentJobSchedulingObject?.timeAndDateAllocation?.repeatJob ===
              null
              ? "Once"
              : currentJobSchedulingObject?.timeAndDateAllocation?.frequency,
        })
      );
    }
    setTimeout(() => {
      handleSaveMainJobScheduling();
    }, 2000);
  }

  React.useEffect(() => {
    let totalResources =
      Number(currentJobSchedulingObject?.numberOfResourcesRequired?.finance) +
      Number(currentJobSchedulingObject?.numberOfResourcesRequired?.business) +
      Number(currentJobSchedulingObject?.numberOfResourcesRequired?.fraud) +
      Number(
        currentJobSchedulingObject?.numberOfResourcesRequired?.operations
      ) +
      Number(currentJobSchedulingObject?.numberOfResourcesRequired?.other) +
      Number(currentJobSchedulingObject?.numberOfResourcesRequired?.it);
    let totalWeeksHours =
      Number(
        currentJobSchedulingObject?.timeAndDateAllocation?.estimatedWeeks
      ) * 40;
    setFieldWorkManHours(totalResources * totalWeeksHours);
    setTotalWorkingManHours(
      totalResources * totalWeeksHours +
        Number(
          currentJobSchedulingObject?.timeAndDateAllocation
            ?.internalAuditManagementHours
        )
    );
    setTotalHours(
      Number(
        currentJobSchedulingObject?.timeAndDateAllocation?.travellingDays
      ) *
        8 +
        totalResources * totalWeeksHours +
        Number(
          currentJobSchedulingObject?.timeAndDateAllocation
            ?.internalAuditManagementHours
        )
    );
  }, [currentJobSchedulingObject]);

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
                  value={
                    currentJobSchedulingObject?.timeAndDateAllocation
                      ?.estimatedWeeks
                  }
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
                  placeholder=""
                  value={
                    currentJobSchedulingObject?.timeAndDateAllocation
                      ?.internalAuditManagementHours
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
                  value={
                    currentJobSchedulingObject?.timeAndDateAllocation
                      ?.placeOfWork || ""
                  }
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
              <div className="col-lg-6">
                <label>Travelling days</label>
                <input
                  type="number"
                  className="form-control"
                  id="sa"
                  placeholder=""
                  value={
                    currentJobSchedulingObject?.timeAndDateAllocation
                      ?.travellingDays
                  }
                  name="travellingDays"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "timeAllocation")
                  }
                />
              </div>
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

            <div className="row mb-3">
              <div className="col-lg-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    name="repeatJob"
                    checked={
                      currentJobSchedulingObject?.timeAndDateAllocation
                        ?.repeatJob
                    }
                    onChange={(event) =>
                      handleChangeJobSchedulingCheckFields(event, "repeatJob")
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
              {currentJobSchedulingObject?.timeAndDateAllocation?.repeatJob ===
                true && (
                <div className="col-lg-6">
                  <label className="me-3">Frequency</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={
                      currentJobSchedulingObject?.timeAndDateAllocation
                        ?.frequency || ""
                    }
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
            <div className="row mt-3">
              <div className="col-lg-12 justify-content-end text-end">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow ${
                    loading && "disabled"
                  }`}
                  onClick={handleSave}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  {loading ? "Loading..." : "Save"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAndDateAllocation;
