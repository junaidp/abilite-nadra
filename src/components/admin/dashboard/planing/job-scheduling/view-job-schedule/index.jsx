import React from "react";
import TopBar from "../../../../../common/top-bar/TopBar";
import Sidebar from "../../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewJobSchedule = () => {
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
          <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">
              <button
                className="btn btn-indigo me-2"
                onClick={() => navigate("/audit/job-scheduling")}
              >
                Back
              </button>
              Job Scheduling
            </div>

            <div className="d-flex align-items-center">
              <label className="me-3">Year:</label>
              <select className="form-select" aria-label="Default select example">
                <option selected>2023</option>
                <option value="2">2022</option>
                <option value="3">2021</option>
              </select>
            </div>
          </header>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded equal-columns">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th>Auditable Unit</th>
                      <th>Year</th>
                      <th>Planned Start Date</th>
                      <th>Planned End Date</th>
                      <th>Resources Allocated</th>
                      <th>Total Estimated Hours</th>
                      <th>Risk Rating</th>
                      <th>Created by</th>
                      <th>Status</th>
                      <th>Approved by</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ height: "50px" }}>
                      <td>1</td>
                      <td>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </td>
                      <td>2023</td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="DD/MM/YYYY"
                        />
                      </td>
                      <td>DD/MM/YYYY</td>
                      <td>2</td>
                      <td>80</td>
                      <td className="bg-warning text-white">Moderate</td>
                      <td>AR</td>
                      <td>Draft</td>
                      <td>AR</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </td>
                      <td>2023</td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormCon"
                          placeholder="DD/MM/YYYY"
                        />
                      </td>
                      <td>DD/MM/YYYY</td>
                      <td>2</td>
                      <td>160</td>
                      <td className="bg-danger text-white">Extreme</td>
                      <td>AR</td>
                      <td>Draft</td>
                      <td>AR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-2 d-flex align-items-center">
              <label className="me-2 label-text fw-bold">View Entries</label>
              <select
                style={{ width: "70px" }}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
              </select>
            </div>

            <div className="col-10 d-flex align-items-center justify-content-end">
              <a href="#" className="text-secondary">
                <i className="fa fa-print me-3" style={{ fontSize: "18px" }}></i>
              </a>

              <nav aria-label="Page navigation example">
                <ul className="pagination mb-0 justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
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
        </div>
      </div>
    </div>
  );
};

export default ViewJobSchedule;
