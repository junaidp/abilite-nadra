import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateJobSchedulingNumberOfResourcesRequired } from "../../../../../../../global-redux/reducers/planing/job-scheduling/slice";

const ResourcesRequired = ({
  currentJobSchedulingObject,
  handleChangeNumberTextField,
  handleSaveMainJobScheduling,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.planingJobScheduling);
  function handleSave() {
    if (!loading) {
      dispatch(
        setupUpdateJobSchedulingNumberOfResourcesRequired(
          currentJobSchedulingObject?.numberOfResourcesRequired
        )
      );
    }

    setTimeout(() => {
      handleSaveMainJobScheduling();
    }, 2000);
  }
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
                  value={
                    currentJobSchedulingObject?.numberOfResourcesRequired?.it
                  }
                  name="it"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
                />
              </div>
              <div className="col-lg-6">
                <label>Finance</label>
                <input
                  type="number"
                  className="form-control"
                  id="labeltex"
                  placeholder=""
                  value={
                    currentJobSchedulingObject?.numberOfResourcesRequired
                      ?.finance
                  }
                  name="finance"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
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
                  value={
                    currentJobSchedulingObject?.numberOfResourcesRequired
                      ?.business
                  }
                  name="business"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
                />
              </div>
              <div className="col-lg-6">
                <label>Fraud</label>
                <input
                  type="number"
                  className="form-control"
                  id="labelte"
                  placeholder=""
                  value={
                    currentJobSchedulingObject?.numberOfResourcesRequired?.fraud
                  }
                  name="fraud"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
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
                  value={
                    currentJobSchedulingObject?.numberOfResourcesRequired
                      ?.operations
                  }
                  name="operations"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
                />
              </div>
              <div className="col-lg-6">
                <label>Other</label>
                <input
                  type="number"
                  className="form-control"
                  id="labe"
                  placeholder=""
                  value={
                    currentJobSchedulingObject?.numberOfResourcesRequired?.other
                  }
                  name="other"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
                />
              </div>
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

export default ResourcesRequired;
