import React from "react";

const RiskFactor = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-risk"
      role="tabpanel"
      aria-labelledby="nav-risk-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Risk Factor</div>
          <label className="fw-light">
            Define list of Risk factors here for Risk Factor approach at
            Universe Level Risk Assessment{" "}
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label className="w-100">Add Risk Factor:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
          />
        </div>
        <div className="col-lg-6 text-end float-end align-self-end">
          <div className="btn btn-labeled btn-primary px-3 shadow">
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            Add
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th>Particulars</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Show Sub-Department/Sub-Division/Sub-Location</td>
                  <td>
                    <i className="fa fa-edit  px-3 f-18"></i>

                    <i className="fa fa-trash text-danger f-18"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Show Sub-Department/Sub-Division/Sub-Location</td>
                  <td>
                    <i className="fa fa-edit  px-3 f-18"></i>

                    <i className="fa fa-trash text-danger f-18"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskFactor;
