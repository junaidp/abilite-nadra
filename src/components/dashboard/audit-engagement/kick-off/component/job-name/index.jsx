import React from "react";

const JobName = () => {
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
          <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          Job Name
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-3 f-13">
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">Planned Start Date:</div>
                <div className="">28-03-2023</div>
              </div>
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">Process</div>
                <div className="">28-03-2023</div>
              </div>
            </div>

            <div className="row mb-3 f-13">
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">Planned End Date:</div>
                <div className="">28-03-2023</div>
              </div>
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">Sub Process</div>
                <div className="">28-03-2023</div>
              </div>
            </div>

            <div className="row mb-3 f-13">
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">Job Type:</div>
                <div className="">Job type will display here</div>
              </div>
            </div>

            <div className="row mb-3 f-13">
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">Department/Division/ Location:</div>
                <div className="">list of divisions will display here</div>
              </div>
            </div>

            <div className="row mb-3 f-13">
              <div className="col-lg-6 px-3 d-flex justify-content-between">
                <div className="fw-bold">
                  Sub-Department/Sub-Division/Sub-Location
                </div>
                <div className="">list of department will display here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobName;
