import React from "react";

const ResidualRisk = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-rcm-library"
      role="tabpanel"
      aria-labelledby="nav-rcm-library-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">RCM Library</div>
          <label className="fw-light">Define risk control matrix library</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label className="w-100">Add RCM Library:</label>
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

      <div className="row py-4">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Sub-Process</th>
                  <th>Objective</th>
                  <th>Risk</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-120">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td className="w-120">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </td>
                  <td>
                    <label>0.1</label>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                      id="exampleFormCon"
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="w-50 mb-2">Risk Rating</label>
                      <select
                        className="form-select w-50 mb-2"
                        aria-label="Default select example"
                      >
                        <option selected>high</option>
                        <option value="2">Medium</option>
                        <option value="2">Low</option>
                      </select>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                      id="exampleFormControlT"
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="w-50 mb-2">Control Risk</label>
                      <select
                        className="form-select w-50 mb-2"
                        aria-label="Default select example"
                      >
                        <option selected>high</option>
                        <option value="2">Medium</option>
                        <option value="2">Low</option>
                      </select>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                      id="exampleFormContr"
                      rows="3"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td className="w-120">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </td>
                  <td className="w-120">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </td>
                  <td>
                    <label>0.2</label>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                      id="exampleFo"
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="w-50 mb-2">Risk Rating</label>
                      <select
                        className="form-select w-50  mb-2"
                        aria-label="Default select example"
                      >
                        <option selected>high</option>
                        <option value="2">Medium</option>
                        <option value="2">Low</option>
                      </select>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                      id="example"
                      rows="3"
                    ></textarea>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="w-50 mb-2">Control Risk</label>
                      <select
                        className="form-select w-50  mb-2"
                        aria-label="Default select example"
                      >
                        <option selected>high</option>
                        <option value="2">Medium</option>
                        <option value="2">Low</option>
                      </select>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            "
                      id="examp"
                      rows="3"
                    ></textarea>
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

export default ResidualRisk;
