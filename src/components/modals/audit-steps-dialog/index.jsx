import React from "react";

const AuditStepsDialog = ({ setShowAuditStepsDialog }) => {
  return (
    <div className="mx-5">
      <header className="section-header mt-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">AUDIT STEP</h2>
        </div>
      </header>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="sub-heading">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <div>
            <label className="me-3   ">Perform Sampling</label>
            <select className="form-select" aria-label="Default select example">
              <option>Yes</option>
              <option value="2">No</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="me-3   ">Sampling Method</label>
            <select className="form-select" aria-label="Default select example">
              <option value="1">Simple Random Sampling</option>
              <option>Systematic Sampling</option>
              <option value="2">Cluster Samling</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <div>
            <label className="me-3   ">Control Risk</label>
            <select className="form-select" aria-label="Default select example">
              <option value="1">Low</option>
              <option>Medium</option>
              <option value="2">High</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="me-3   ">Frequency</label>
            <select className="form-select" aria-label="Default select example">
              <option value="1">Annually</option>
              <option>Bi-annyally</option>
              <option value="2">Quarterly</option>
              <option value="1">Monthly</option>
              <option>Weekly</option>
              <option value="2">Daily</option>
              <option value="2">Recurring</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div>
            <label className="me-3 fw-normal  ">Population size:</label>
            <label className="fw-bolder">50</label>
          </div>
        </div>
        <div className="col-lg-12">
          <div>
            <label className="me-3 fw-normal  ">Sample Size</label>
            <label className="fw-bolder">50</label>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <div>
            <label className="form-label me-3 mb-3">Attach files</label>

            <input
              style={{ fontSize: "10px", width: "180px" }}
              type="file"
              id="fileInput"
            />
            <a
              className="form-label label-text "
              href="#"
              style={{ textDecoration: "underline" }}
            >
              View Sample
            </a>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Uploaded File </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="me-3   ">Audit Procedure Performed</label>
          <textarea
            className="form-control"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            id="exampleFormControlT"
            rows="3"
          ></textarea>
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label me-3 mb-3">Attach files</label>

          <input style={{ fontSize: "10px" }} type="file" id="fileInpu" />

          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="sr-col">Sr No.</th>
                  <th>Attach Files </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                  <td style={{ width: "130px" }}>
                    <i className="fa fa-eye text-primary"></i>
                    <i className="fa fa-edit mx-3 text-secondary"></i>
                    <i className="fa fa-trash text-danger"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                  <td style={{ width: "130px" }}>
                    <i className="fa fa-eye text-primary"></i>
                    <i className="fa fa-edit mx-3 text-secondary"></i>
                    <i className="fa fa-trash text-danger"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="sub-heading me-3 mb-3">Observation(s)</div>
            <button className="btn btn-labeled float-end btn-primary px-3 shadow">
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Observation
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label me-3">1</label>
            <div className="">
              <a href="#" style={{ fontSize: "12px" }}>
                + Attach file
              </a>
              <i className="ms-4 text-danger fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <textarea
            className="form-control"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            id="exampleFormControlT"
            rows="3"
          ></textarea>
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label me-3 mb-3">Attach files</label>

          <input style={{ fontSize: "10px" }} type="file" id="fileInpu" />

          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Attach Files </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                  <td style={{ width: "130px" }}>
                    <i className="fa fa-eye text-primary"></i>
                    <i className="fa fa-edit mx-3 text-secondary"></i>
                    <i className="fa fa-trash text-danger"></i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                  <td style={{ width: "130px" }}>
                    <i className="fa fa-eye text-primary"></i>
                    <i className="fa fa-edit mx-3 text-secondary"></i>
                    <i className="fa fa-trash text-danger"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setShowAuditStepsDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditStepsDialog;
