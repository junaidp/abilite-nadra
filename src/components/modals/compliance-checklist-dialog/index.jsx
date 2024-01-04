import React from "react";

const ComplianceCheckListDialog = ({ setShowComplianceCheckListDialog }) => {
  return (
    <div className="p-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="heading">Compliance Checklist</div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded equal-columns">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th>Area</th>
                      <th>Subject</th>
                      <th>Particulars</th>
                      <th>Remarks</th>
                      <th>Observation</th>
                      <th>File attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>XYZ</td>
                      <td>ABC</td>
                      <td>
                        <textarea
                          className="form-control"
                          placeholder="Enter Here"
                          id="ds"
                          rows="3"
                        ></textarea>
                      </td>
                      <td>
                        <select
                          className="form-select mb-2 w-80"
                          aria-label="Default select example"
                        >
                          <option>Yes</option>
                          <option value="2">No</option>
                          <option value="2">Not Applicable</option>
                          <option value="2">Partially Complied</option>
                        </select>
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          placeholder="Enter Here"
                          id="ds"
                          rows="3"
                        ></textarea>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="w-75 d-grid">
                            <a href="#" className="text-primary">
                              Attached file Name 1
                            </a>
                            <a href="#" className="text-primary">
                              Attached file Name 2
                            </a>
                          </div>
                          <div className="w-25">
                            <i className="fa fa-paperclip me-3 text-secondary"></i>
                            <i className="fa fa-eye text-primary"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-4 px-4">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setShowComplianceCheckListDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCheckListDialog;
