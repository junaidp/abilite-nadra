import React from "react";

const RatingDialog = () => {
  return (
    <div className="p-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="heading">Auditable Units</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9 sub-heading">
              <span className="me-2 fw-bold">1.</span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
            <div className=" col-lg-3 text-end">
              <div
                className="text-white bg-danger float-end  px-2 py-3 rounded shadow"
                style={{
                  fontSize: "11px",
                  height: "15px",
                  lineHeight: "0px",
                  width: "fitContent",
                }}
              >
                Risks Rating: 65
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-12">
              <label>Auditable Unit</label>
              <textarea
                className="form-control"
                placeholder="Enter Reason"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
              <label className="word-limit-info label-text">
                Maximum 1500 words
              </label>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-12">
              <label>Job Type</label>
              <select className="form-select" aria-label="Default select example">
                <option selected>Review</option>
                <option value="1">Compliance Checklist</option>
                <option value="2">Special Audit</option>
                <option value="3">Fraud & Investigation</option>
                <option>Assurance and Compiance</option>
                <option>Advisory and consulting</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Process</label>
              <select className="form-select" aria-label="Default select example">
                <option selected>loram</option>
                <option value="1">Loram 2</option>
              </select>
            </div>

            <div className="col-lg-6">
              <label>Sub-Process</label>
              <select className="form-select" aria-label="Default select example">
                <option selected>loram</option>
                <option value="1">Loram 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-danger mb-4 mt-5 float-end" mat-dialog-close>
        Close
      </button>
    </div>
  );
};

export default RatingDialog;
