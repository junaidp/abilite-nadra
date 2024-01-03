import React from "react";

const ViewRiskControlMatrixLibraryDialog = ({ setShowViewLibrary }) => {
  return (
    <div className="mx-5">
      <header className="section-header mt-3  px-4  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="mx-2 m-2 heading">Library</h2>
        </div>
      </header>

      <div className="row py-4 px-4">
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
                  <th>
                    <input id="rememberMe" type="checkbox" const index />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: "250px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td style={{ width: "250px" }}>
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
                        <option>high</option>
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
                        <option>high</option>
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
                  <td>
                    <input id="rememberMe" type="checkbox" const index />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "250px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </td>
                  <td style={{ width: "250px" }}>
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
                        <option>high</option>
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
                        <option>high</option>
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

                  <td>
                    <input type="checkbox" const index />
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
            onClick={() => setShowViewLibrary(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRiskControlMatrixLibraryDialog;
