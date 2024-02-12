import React from "react";

const AditSteps = ({ setShowAuditStepsDialog }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseSix"
          aria-expanded="false"
          aria-controls="flush-collapseSix"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">Audit Steps</div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseSix"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="f-80">Sr No.</th>
                        <th>Program Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <a
                            onClick={() => setShowAuditStepsDialog(true)}
                            className="fw-bold  text-primary  px-3 py-1 f-10"
                          >
                            loram ipsum is simply dummay text of the prinitng
                            and type settings industry
                          </a>{" "}
                        </td>
                        <td>
                          <i className="fa fa-times-circle text-danger f-18"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <a
                            onClick={() => setShowAuditStepsDialog(true)}
                            className="fw-bold  text-primary  px-3 py-1 f-10"
                          >
                            loram ipsum is simply dummay text of the prinitng
                            and type settings industry
                          </a>
                        </td>
                        <td>
                          <i className="fa fa-check-circle text-success f-18"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AditSteps;
