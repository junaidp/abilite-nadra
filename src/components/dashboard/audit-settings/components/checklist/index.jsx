import React from "react";

const CheckList = ({ setCheckListManagementDialog }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-check"
      role="tabpanel"
      aria-labelledby="nav-check-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Checklist Management</div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation Location
            Division / Department
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label className="w-100">Add Check List:</label>
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
          <div className="accordion" id="accordionCheckListExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      1. Name of Checklist will show here
                    </div>
                    <div>
                      <i className="fa fa-edit  px-3 f-18"></i>

                      <i className="fa fa-trash text-danger f-18"></i>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionCheckListExample"
              >
                <div className="accordion-body">
                  <div className=" mt-3 bg-white p-3">
                    <div
                      className="btn btn-labeled btn-primary px-3 shadow col-lg-2"
                      onClick={() => setCheckListManagementDialog(true)}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      Add
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="w-80">Sr No.</th>
                                <th>Area</th>
                                <th>Subject</th>
                                <th>Particulars</th>
                                <th>Observation</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i className="fa fa-edit  px-3 f-18"></i>

                                  <i className="fa fa-trash text-danger f-18"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i className="fa fa-edit  px-3 f-18"></i>

                                  <i className="fa fa-trash text-danger f-18"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i className="fa fa-edit  px-3 f-18"></i>

                                  <i className="fa fa-trash text-danger f-18"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
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
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="4">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      1. Name of Checklist will show here
                    </div>
                    <div>
                      <i className="fa fa-edit  px-3 f-18"></i>

                      <i className="fa fa-trash text-danger f-18"></i>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionCheckListExample"
              >
                <div className="accordion-body">
                  <div className=" mt-3 bg-white p-3">
                    <div
                      className="btn btn-labeled btn-primary px-3 shadow col-lg-2"
                      onClick={() => setCheckListManagementDialog(true)}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      Add
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="w-80">Sr No.</th>
                                <th>Area</th>
                                <th>Subject</th>
                                <th>Particulars</th>
                                <th>Observation</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i className="fa fa-edit  px-3 f-18"></i>

                                  <i className="fa fa-trash text-danger f-18"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i className="fa fa-edit  px-3 f-18"></i>

                                  <i className="fa fa-trash text-danger f-18"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
                                <td>
                                  <i className="fa fa-edit  px-3 f-18"></i>

                                  <i className="fa fa-trash text-danger f-18"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxx</td>
                                <td>xxxxxxx</td>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
