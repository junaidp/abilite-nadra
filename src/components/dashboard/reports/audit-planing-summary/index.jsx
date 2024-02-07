import React from "react";

const AuditPlaningSummary = () => {
  return (
    <div>
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Audit Planning Summary Report</div>
      </header>

      <div className="row mb-3">
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Domain:</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3">
          <div>
            <label className="me-2 label-text fw-bold">
              Location:
            </label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div className="col-lg-3">
          <div>
            <label className="me-2 label-text fw-bold">
              Sub-Location:
            </label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Risk Rating:</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div>
            <label className="me-2 label-text fw-bold">Resource:</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="min-w-80">Sr No.</th>
                  <th>Auditable Unit</th>
                  <th>Domain</th>
                  <th>Location:</th>
                  <th>Location:</th>
                  <th>Risk Assessment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td>Strategic</td>
                  <td>XYZABC</td>
                  <td>XYZABC</td>
                  <td>Low</td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td>Strategic</td>
                  <td>XYZABC</td>
                  <td>XYZABC</td>
                  <td>Medium</td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td>Strategic</td>
                  <td>XYZABC</td>
                  <td>XYZABC</td>
                  <td>High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPlaningSummary;
