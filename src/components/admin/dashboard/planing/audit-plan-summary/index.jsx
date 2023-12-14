import React from "react";
import TopBar from "../../../../common/top-bar/TopBar";
import Sidebar from "../../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";

const AuditPlanSummary = () => {
  let { showSidebar } = useSelector((state) => state.common);

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
            <div className="mb-0 heading">Audit Plan Summary</div>
          </header>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded equal-columns">
                  <thead>
                    <tr>
                      <th className="text-center" colspan="4">
                        Current Risk Assessment
                      </th>
                      <th className="text-center" colspan="3">
                        Year of Recent Reviews
                      </th>
                      <th className="text-center" colspan="3">
                        Proposed Staff Hours Current Year
                      </th>
                      <th className="text-center" colspan="4">
                        Proposed schedule current year
                      </th>
                      <th>Total Annual Effort</th>
                      <th className="text-center" colspan="4">
                        Proposed schedule Two years from current
                      </th>
                      <th>Total Annual Effort</th>
                      <th className="text-center" colspan="4">
                        Proposed schedule Two years from current
                      </th>
                      <th>Total Annual Effort</th>
                    </tr>
                  </thead>

                  <thead>
                    <tr className="bg-white">
                      <th className="bg-white">Rank</th>
                      <th className="bg-white">Auditable Unit</th>

                      <th className="bg-white ">Residual Risk Rating</th>
                      <th className="bg-white">Priority</th>
                      <th className="bg-white">Three Years Ago</th>
                      <th className="bg-white">Two Years Ago</th>
                      <th className="bg-white">Last Year</th>
                      <th className="bg-white">Service Provider</th>
                      <th className="bg-white">IAA</th>
                      <th className="bg-white">Total</th>
                      <th className="bg-white">Q1</th>
                      <th className="bg-white">Q2</th>
                      <th className="bg-white">Q3</th>
                      <th className="bg-white">Q4</th>
                      <th className="bg-white"></th>
                      <th className="bg-white">Q1</th>
                      <th className="bg-white">Q2</th>
                      <th className="bg-white">Q3</th>
                      <th className="bg-white">Q4</th>
                      <th className="bg-white"></th>
                      <th className="bg-white">Q1</th>
                      <th className="bg-white">Q2</th>
                      <th className="bg-white">Q3</th>
                      <th className="bg-white">Q4</th>
                      <th className="bg-white"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td style={{ minWidth: "300px" }}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </td>
                      <td className="normal-text">4.5</td>
                      <td>
                        <select
                          style={{ width: "95px" }}
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>High</option>
                          <option value="1">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </td>
                      <td className="normal-text">
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
                          ></label>
                        </div>
                      </td>
                      <td className="normal-text">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flex"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          ></label>
                        </div>
                      </td>
                      <td className="normal-text">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheck"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          ></label>
                        </div>
                      </td>
                      <td className="normal-text">15</td>
                      <td className="normal-text">30</td>
                      <td className="normal-text">45</td>
                      <td className="full-audit" style={{ width: "20px" }}>
                        20
                      </td>
                      <td className="full-audit" style={{ width: "20px" }}>
                        15
                      </td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="limited-audit normal-text">5</td>
                      <td className="limited-audit normal-text">15</td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>

                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>

                      <td className="normal-text"></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td style={{ width: "250px" }}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </td>
                      <td className="normal-text">4.5</td>
                      <td>
                        <select
                          style={{ width: "95px" }}
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>High</option>
                          <option value="1">Medium</option>
                          <option value="2">Low</option>
                        </select>
                      </td>
                      <td className="normal-text">
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
                          ></label>
                        </div>
                      </td>
                      <td className="normal-text">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flex"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          ></label>
                        </div>
                      </td>
                      <td className="normal-text">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheck"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          ></label>
                        </div>
                      </td>
                      <td className="normal-text">15</td>
                      <td className="normal-text">30</td>
                      <td className="normal-text">45</td>
                      <td className="full-audit normal-text">20</td>
                      <td className="full-audit normal-text">15</td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="limited-audit normal-text">5</td>
                      <td className="limited-audit normal-text">15</td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>

                      <td className="normal-text"></td>
                      <td className="normal-text"></td>
                      <td className="normal-text"></td>

                      <td className="normal-text"></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td colspan="7"></td>
                      <td className="fw-bold">55</td>
                      <td className="fw-bold">90</td>
                      <td className="fw-bold">145</td>
                      <td className="fw-bold">40</td>
                      <td className="fw-bold">55</td>
                      <td className="fw-bold">40</td>
                      <td className="fw-bold">10</td>
                      <td className="fw-bold">145</td>
                      <td className="fw-bold">20</td>
                      <td className="fw-bold">75</td>
                      <td className="fw-bold">50</td>
                      <td className="fw-bold">15</td>
                      <td className="fw-bold">160</td>
                      <td className="fw-bold">25</td>
                      <td className="fw-bold">50</td>
                      <td className="fw-bold">30</td>
                      <td className="fw-bold">35</td>
                      <td className="fw-bold">140</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-3">
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

export default AuditPlanSummary;
