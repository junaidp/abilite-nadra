import React from "react";

const ResourcesRequired = ({ handleChangeNumberTextField, values }) => {
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
          {values?.numberOfResourcesRequired?.business ||
          values?.numberOfResourcesRequired?.finance ||
          values?.numberOfResourcesRequired?.fraud ||
          values?.numberOfResourcesRequired?.it ||
          values?.numberOfResourcesRequired?.operations ||
          values?.numberOfResourcesRequired?.other ? (
            <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          ) : null}
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
                  value={values?.numberOfResourcesRequired?.it}
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
                  value={values?.numberOfResourcesRequired?.finance}
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
                  value={values?.numberOfResourcesRequired?.business}
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
                  value={values?.numberOfResourcesRequired?.fraud}
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
                  value={values?.numberOfResourcesRequired?.operations}
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
                  value={values?.numberOfResourcesRequired?.other}
                  name="other"
                  onChange={(event) =>
                    handleChangeNumberTextField(event, "resourcesRequired")
                  }
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
