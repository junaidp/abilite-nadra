import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuditParticulars = () => {
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
          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() => navigate("/audit/follow-up")}
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Reporting & Follow-Up</div>
          </header>
          <div className="row px-4">
            <div className="col-md-12">
              <div className="sub-heading ps-2 mb-3 fw-bold">
                1. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </div>

              <hr />

              <div className="border px-3 py-2 rounded">
                <p>
                  <label className="label-text" style={{ fontSize: "14px" }}>
                    Observation No. 1
                  </label>
                </p>

                <div className="d-flex mb-2">
                  <label className="pe-4">Location:</label>
                  <label className="fw-normal">
                    Division/Department to be shown here
                  </label>
                </div>

                <label>Observation:</label>
                <textarea
                  className="form-control "
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text mb-3">
                  Maximum 1500 words
                </label>

                <div className="d-flex mb-3 align-items-center">
                  <label className="pe-4">Implication Rating:</label>
                  <select
                    className="form-select mb-2"
                    style={{ width: "150px" }}
                    aria-label="Default select example"
                  >
                    <option selected>high</option>
                    <option value="2">Medium</option>
                    <option value="2">Low</option>
                  </select>
                </div>

                <label>Implication:</label>
                <textarea
                  className="form-control "
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text mb-3">
                  Maximum 1500 words
                </label>
                <br />

                <label>Recommended Action Step:</label>
                <textarea
                  className="form-control "
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text mb-3">
                  Maximum 1500 words
                </label>
                <br />

                <label>Management Comments:</label>
                <textarea
                  className="form-control "
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text mb-3">
                  Maximum 1500 words
                </label>

                <div className="d-flex mb-3 align-items-center">
                  <label className="pe-4" style={{ width: "250px" }}>
                    Implementation Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ width: "150px" }}
                    id="exampleFormControlInput1"
                    placeholder="DD/MM/YYYY"
                  />
                </div>

                <div
                  className="d-flex mb-3 align-items-center"
                  style={{ width: "450px" }}
                ></div>

                <div className="d-flex mb-3 align-items-center">
                  <label className="pe-4" style={{ width: "250px" }}>
                    Recommendations Implemented:
                  </label>
                  <select
                    className="form-select mb-2"
                    style={{ width: "150px" }}
                    aria-label="Default select example"
                  >
                    <option selected>high</option>
                    <option value="2">Medium</option>
                    <option value="2">Low</option>
                  </select>
                </div>

                <label>Final Comments:</label>
                <textarea
                  className="form-control "
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <label className="word-limit-info label-text mb-3">
                  Maximum 1500 words
                </label>

                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th>Files</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a
                            className=" text-primary  fw-bold "
                            style={{ fontSize: "12px" }}
                          >
                            File Attachment 1
                          </a>
                        </td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a
                            className=" text-primary  fw-bold "
                            style={{ fontSize: "12px" }}
                          >
                            File Attachment 2
                          </a>
                        </td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex mb-3 align-items-center">
                      <label className="pe-4" style={{ width: "140px" }}>
                        Test in Next Year:
                      </label>
                      <select
                        className="form-select mb-2"
                        style={{ width: "150px" }}
                        aria-label="Default select example"
                      >
                        <option selected>high</option>
                        <option value="2">Medium</option>
                        <option value="2">Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 text-end">
                  <div
                    className="d-flex align-items-center"
                    style={{ placeContent: "end" }}
                  >
                    <a
                      href="#"
                      className="underline text-primary pt-3 me-4 label-text"
                      style={{ textDecoration: "underline" }}
                    >
                      Feedback
                    </a>
                    <button className="btn btn-labeled btn-primary px-3 mt-3 shadow">
                      <span className="btn-label me-2">
                        <i className="fa fa-check"></i>
                      </span>
                      Save
                    </button>
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

export default AuditParticulars;
