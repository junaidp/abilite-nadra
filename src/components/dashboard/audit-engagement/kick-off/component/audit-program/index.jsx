import React from "react";

const AuditProgram = () => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed br-8"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFive"
          aria-expanded="false"
          aria-controls="flush-collapseFive"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">Audit Program</div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseFive"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-2">
              <div className="col-lg-12">
                <button
                  className="btn btn-labeled btn-primary px-3 mt-3 shadow"
                  onClick={() => setViewAuditProgramLibraryDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-eye"></i>
                  </span>
                  View Library
                </button>
                <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                  <span className="btn-label me-2">
                    <i className="fa fa-eye"></i>
                  </span>
                  Add Audit Program
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead>
                      <tr>
                        <th>Sr. #</th>
                        <th>Controls</th>
                        <th>Rating</th>
                        <th>Program</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <textarea
                            className="form-control"
                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  "
                            id="exampleFormControlT"
                            rows="3"
                          ></textarea>
                        </td>
                        <td>High</td>
                        <td>
                          <textarea
                            className="form-control"
                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  "
                            id="exampleFormControlT"
                            rows="3"
                          ></textarea>
                          <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                            <span className="btn-label me-2">
                              <i className="fa fa-plus"></i>
                            </span>
                            Add program
                          </button>
                        </td>
                        <td>
                          <span className="action-buttons">
                            <i className="bi bi-trash danger trash-styles red"></i>
                          </span>
                          <span className="action-buttons">
                            <i className="bi bi-x-circle-fill trash-styles"></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-end">
                <button className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow">
                  <span className="btn-label me-2">
                    <i className="fa fa-save"></i>
                  </span>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditProgram;
