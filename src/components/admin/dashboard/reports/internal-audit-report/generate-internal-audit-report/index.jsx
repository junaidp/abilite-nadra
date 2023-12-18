import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GenerateInternalAuditReport = () => {
  let { showSidebar } = useSelector((state) => state.common);
  let navigate = useNavigate();
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">
              <a
                className="text-primary"
                onClick={() => navigate("/audit/internal-audit-report")}
              >
                <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
              </a>
              Generated Internal Audit Report
            </div>
            <div className="">
              <div className="btn btn-labeled btn-primary px-3 shadow">
                <span className="btn-label me-2">
                  <i className="fa fa-plus"></i>
                </span>
                Add Section
              </div>
              <i
                className="fa fa-info-circle ps-3 text-secondary"
                style={{ cursor: "pointer" }}
                title="Info"
              ></i>
            </div>
          </header>

          <div className="row  ">
            <div className="col-md-12">
              <div className="sub-heading ps-2  fw-bold">
                1. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </div>
              <hr />
            </div>
          </div>

          <div className="border px-3 py-2 rounded">
            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3">Report Date:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Select Date"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3">Planned Start Date:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Select Date"
                    type="date"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <label className="me-3">Planned End Date:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Select Date"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <div></div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3">Planned Hours:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter planned Hours"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3   ">Risk Approach:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Risk Approach"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <label className="me-3   ">Risk Rating:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Risk Rating"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3   ">
                    Department/Division/ Location:
                  </label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Department/Division/ Location"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <label className="me-3   ">
                    Sub-Department/Sub-Division/Sub-Location:
                  </label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Sub-Department/Sub-Division/Sub-Location"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border px-3 py-2  mt-3 rounded">
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Executive summary</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Executive summary"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Audit Purpose</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Audit Purpose"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-lg-12">
              <div className="sub-heading   fw-bold">
                Summary of key Finding(s)
              </div>
            </div>
          </div>

          <div className="border px-3 py-2  mt-3 rounded">
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Finding 1</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Finding"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Finding 2</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Finding"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Finding 3</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Finding"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-lg-12">
              <div className="sub-heading  fw-bold">All Findings</div>
            </div>
          </div>

          <div className="border px-3 py-2  mt-3 rounded">
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
              <label className="mb-0 label-text">Observation No. 1</label>
              <div className="">
                <div className="btn btn-labeled btn-primary px-3 shadow">
                  <span className="btn-label"></span>View
                </div>
                <i
                  className="fa fa-eye ps-3 text-secondary"
                  style={{ cursor: "pointer" }}
                  title="Info"
                ></i>
              </div>
            </header>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3   ">Location:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Division/Department to be shown here"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Observation:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Observation"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Implication Rating:</label>
                <select
                  className="form-select mb-2"
                  aria-label="Default select example"
                >
                  <option selected>high</option>
                  <option value="2">Medium</option>
                  <option value="2">Low</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Implication:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Implication"
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
                <label>Recommended Action Step:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Recommended Action Step"
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
                <label>Management Comments:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Management Comments"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 1500 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Auditee:</label>
                <select
                  className="form-select mb-2"
                  aria-label="Default select example"
                >
                  <option selected>Auditee 1</option>
                  <option value="2">Auditee 2</option>
                  <option value="2">Auditee 3</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th style={{ width: "80px" }}>Sr No.</th>
                        <th>File Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>File Attachment 1</td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>File Attachment 2</td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="border px-3 py-2  mt-3 rounded">
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
              <label className="mb-0 label-text">Observation No. 2</label>
              <div className="">
                <div className="btn btn-labeled btn-primary px-3 shadow">
                  <span className="btn-label"></span>View
                </div>
                <i
                  className="fa fa-eye ps-3 text-secondary"
                  style={{ cursor: "pointer" }}
                  title="Info"
                ></i>
              </div>
            </header>

            <div className="row mb-3">
              <div className="col-lg-6">
                <div>
                  <label className="me-3   ">Location:</label>
                  <input
                    className="form-control w-100"
                    placeholder="Division/Department to be shown here"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Observation:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Observation"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Implication Rating:</label>
                <select
                  className="form-select mb-2"
                  aria-label="Default select example"
                >
                  <option selected>high</option>
                  <option value="2">Medium</option>
                  <option value="2">Low</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Implication:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Implication"
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
                <label>Recommended Action Step:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Recommended Action Step"
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
                <label>Management Comments:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Management Comments"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 1500 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label>Auditee:</label>
                <select
                  className="form-select mb-2"
                  aria-label="Default select example"
                >
                  <option selected>Auditee 1</option>
                  <option value="2">Auditee 2</option>
                  <option value="2">Auditee 3</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th style={{ width: "80px" }}>Sr No.</th>
                        <th>File Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>File Attachment 1</td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>File Attachment 2</td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="border px-3 py-2  mt-3 rounded">
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Add heading here</label>
                <textarea
                  className="form-control"
                  placeholder="Enter heading"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Add heading here</label>
                <textarea
                  className="form-control"
                  placeholder="Enter heading"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>
          </div>

          <div className="border px-3 py-2  mt-3 rounded">
            <div className="row mb-3">
              <div className="col-lg-12">
                <label> Annexure</label>
                <textarea
                  className="form-control"
                  placeholder="Enter heading"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label for="fileInput">Add Attachment:</label>
                <input
                  className="ms-3"
                  style={{ fontSize: "10px" }}
                  type="file"
                  id="fileInput"
                />

                <div className="table-responsive mt-3">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th style={{ width: "80px" }}>Sr No.</th>
                        <th>File Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>File Attachment 1</td>
                        <td>
                          <i className="fa-eye fa "></i>
                          <i className="fa fa-edit  px-3"></i>

                          <i className="fa fa-trash text-danger"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>File Attachment 2</td>
                        <td>
                          <i className="fa-eye fa "></i>
                          <i className="fa fa-edit  px-3"></i>

                          <i className="fa fa-trash text-danger"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-lg-12 text-end">
              <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                Save draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInternalAuditReport;
