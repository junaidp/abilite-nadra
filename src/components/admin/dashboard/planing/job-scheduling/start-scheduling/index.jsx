import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "./components/select/Select";

const StartScheduling = () => {
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
          <form>
            <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">
                <i
                  onClick={() => navigate("/audit/job-scheduling")}
                  className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
                ></i>
                <span className="me-3">1.</span> Lorem Ipsum is simply dummy text of
                the printing and typesetting industry.
              </div>
            </header>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label className="me-3">Department/Division/ Location</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>loram</option>
                  <option value="2">loram</option>
                  <option value="3">loram</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label className="me-3">
                  Sub-Department/Sub-Division/Sub-Location
                </label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>loram</option>
                  <option value="2">loram</option>
                  <option value="3">loram</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label className="me-3">Separate Job for each location</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>loram</option>
                  <option value="2">loram</option>
                  <option value="3">loram</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label className="me-3">Audit Year</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>loram</option>
                  <option value="2">loram</option>
                  <option value="3">loram</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="accordion" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Determination of Number of Resources Required
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>IT</label>
                              <input
                                type="email"
                                className="form-control"
                                id="labeltext"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Finance</label>
                              <input
                                type="email"
                                className="form-control"
                                id="labeltex"
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Business</label>
                              <input
                                type="email"
                                className="form-control"
                                id="labelt"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Fraud</label>
                              <input
                                type="email"
                                className="form-control"
                                id="labelte"
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Operations</label>
                              <input
                                type="email"
                                className="form-control"
                                id="label"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Other</label>
                              <input
                                type="email"
                                className="form-control"
                                id="labe"
                                placeholder=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Time and Date Allocation
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Estimated Weeks</label>
                              <input
                                type="email"
                                className="form-control"
                                id="lav"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Field work Man Hours</label>
                              <input
                                type="email"
                                className="form-control"
                                id="lab"
                                placeholder=""
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Internal Audit Management Hours</label>
                              <input
                                type="email"
                                className="form-control"
                                id="la"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Total Working Man Hours</label>
                              <input
                                type="email"
                                className="form-control"
                                id="l"
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label className="me-3">Place of work</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option selected>loram</option>
                                <option value="2">loram</option>
                                <option value="3">loram</option>
                              </select>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Travelling days</label>
                              <input
                                type="email"
                                className="form-control"
                                id="sa"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Total Jobs</label>
                              <input
                                type="email"
                                className="form-control"
                                id="wa"
                                placeholder=""
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-12">
                              <p className="p-2 px-3 rounded  bg-body-secondary">
                                <span className="fw-bold label-text">
                                  TOTAL HOURS INCLUSIVE OF TRAVELLING:
                                </span>
                                <span className="float-end">1234</span>
                              </p>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Planned Job Start Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="DD/MM/YYYY"
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>Planned Job End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="DD/MM/YYYY"
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-6 align-self-center">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexCheckDefault"
                                >
                                  Repeat job
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <label className="me-3">Frequency</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option selected>Once</option>
                                <option value="2">Monthly</option>
                                <option value="3">Quarterly</option>
                                <option selected>Semi-Annually</option>
                                <option value="2">Every Second Year</option>
                                <option value="3">Every Third Year</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        Resource Allocation
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="container overflow-x-auto">
                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <label>Head of Internal Audit</label>
                              <input
                                type="email"
                                className="form-control"
                                id="fds"
                                placeholder=""
                              />
                            </div>
                            <div className="col-lg-6">
                              <label>
                                Secondary/Backup of Internal Audit Head
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="sdf"
                                placeholder=""
                              />
                            </div>
                          </div>

                          <div className="select-grid">
                            <div className="single-select-grid single-select-grid-part-1">
                              <p>Year</p>
                              <p>2023</p>
                              <p>2024</p>
                              <p>2025</p>
                              <p>2026</p>
                              <p>2027</p>
                            </div>
                            <div className="resource-allocation-select-wrap">
                              <div className="single-select-grid single-select-grid-part-2">
                                <p>Proposed Resources </p>
                                <Select />
                                <Select />
                                <Select />
                                <Select />
                                <Select />
                              </div>
                              <div className="single-select-grid single-select-grid-part-3">
                                <p>Proposed Job Approver</p>
                                <Select />
                                <Select />
                                <Select />
                                <Select />
                                <Select />
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

            <div className="row mt-3">
              <div className="col-lg-12 justify-content-end text-end">
                <div className="btn btn-labeled btn-primary px-3 shadow">
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  Save
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartScheduling;
