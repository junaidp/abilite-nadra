import React from "react";
import "./index.css";
// import img from "../../../../assets/under.gif";
import { useDispatch } from "react-redux";
import AreaChart from "./components/area-chart/AreaChart";
import BarChart from "./components/bar-chart/BarChart";
import LineChart from "./components/line-chart/LineChart";
import PieChart from "./components/pie-chart/PieChart";
import chart11 from "../../../assets/chart11.png";
import chart1 from "../../../assets/chart1.png";
import jChart from "../../../assets/j-chart.png";
import jobWise from "../../../assets/job-wise.png";
import jobs from "../../../assets/jobs.png";
import report from "../../../assets/report.png";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";
const DashboardHome = () => {
  let dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resetAuthValues());
  }, []);
  return (
    // <div>
    //   <div classNameName="dashboard-charts-wrapper">
    //     <AreaChart />
    //     <BarChart />
    //     <LineChart />
    //     <PieChart />
    //   </div>
    // </div>
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="section-header my-3  text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">Dashboard</div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9">
              <section id="minimal-statistics">
                <div className="row">
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex  justify-content-between">
                            <div className="align-self-center">
                              <i className="fa fa-tasks primary fa-2xl f-40"></i>
                            </div>
                            <div className="media-body">
                              <span>Jobs in Progress</span>
                              <h3>10 / 25</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex justify-content-between">
                            <div className="align-self-center">
                              <i className="fa fa-calculator primary fa-2xl f-40"></i>
                            </div>
                            <div className="media-body">
                              <span>Avg obs. per job</span>
                              <h3>30</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex justify-content-between">
                            <div className="align-self-center">
                              <i className="fa fa-check-circle primary fa-2xl f-40"></i>
                            </div>
                            <div className="media-body">
                              <span>Jobs Completed</span>

                              <h3>10</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex justify-content-between">
                            <div className="align-self-center">
                              <i class="bi bi-share primary f-40"></i>{" "}
                            </div>
                            <div className="media-body">
                              <span>Jobs by Business Objective</span>

                              <h3>10</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex justify-content-between">
                            <div className="align-self-center">
                              <i class="bi bi-shield-shaded primary f-40"></i>{" "}
                            </div>
                            <div className="media-body">
                              <span>Jobs by Compliance</span>

                              <h3>423</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="card glassmorphism-card">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="media d-flex justify-content-between">
                            <div className="align-self-center">
                              <i className="fa fa-exclamation-triangle primary fa-2xl f-40"></i>
                            </div>
                            <div className="media-body">
                              <span>Exceptions Implemented</span>

                              <h3>423</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="card job-card p-0">
                      <div className="card-header application-main-color color-white">
                        Jobs in Execution
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">1. Job name</h5>
                        <h5 className="card-title">2. Job name</h5>
                        <h5 className="card-title">3. Job name</h5>
                        <h5 className="card-title">4. Job name</h5>
                        <h5 className="card-title">5. Job name</h5>
                        <h5 className="card-title">6. Job name</h5>
                        <h5 className="card-title">7. Job name</h5>
                        <h5 className="card-title">8. Job name</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="card job-card p-0">
                      <div className="card-header application-main-color color-white">
                        Jobs Due for Kick Off within a week
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">1. Job name</h5>
                        <h5 className="card-title">2. Job name</h5>
                        <h5 className="card-title">3. Job name</h5>
                        <h5 className="card-title">4. Job name</h5>
                        <h5 className="card-title">5. Job name</h5>
                        <h5 className="card-title">6. Job name</h5>
                        <h5 className="card-title">7. Job name</h5>
                        <h5 className="card-title">8. Job name</h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="card job-card p-0">
                      <div className="card-header application-main-color color-white">
                        Management comments overdue
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">1. Job name</h5>
                        <h5 className="card-title">2. Job name</h5>
                        <h5 className="card-title">3. Job name</h5>
                        <h5 className="card-title">4. Job name</h5>
                        <h5 className="card-title">5. Job name</h5>
                        <h5 className="card-title">6. Job name</h5>
                        <h5 className="card-title">7. Job name</h5>
                        <h5 className="card-title">8. Job name</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card job-card p-0">
                      <div className="card-header application-main-color color-white">
                        Jobs Due for completion within a week
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">1. Job name</h5>
                        <h5 className="card-title">2. Job name</h5>
                        <h5 className="card-title">3. Job name</h5>
                        <h5 className="card-title">4. Job name</h5>
                        <h5 className="card-title">5. Job name</h5>
                        <h5 className="card-title">6. Job name</h5>
                        <h5 className="card-title">7. Job name</h5>
                        <h5 className="card-title">8. Job name</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="col-xl-12 col-sm-6 col-12">
                  <div className="card mb-4 application-main-color  glassmorphism-card-">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex  justify-content-between">
                          <div className="align-self-center">
                            <i className="fa fa-hourglass-end text-white primary fa-2xl f-40"></i>
                          </div>
                          <div className="media-body">
                            <span className="text-white">
                              Exceptions Overdue
                            </span>
                            <h3 className="text-white">78%</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card  glassmorphism-card">
                    <div className="card-content">
                      <div className="card-body">
                        <p className="text-center">
                          Observation by Risk Rating
                        </p>
                        <img src={chart11} className="w-100" rel="copyright" />
                        <div className="text-end">
                          <div className="label high">High</div>
                          <div className="label medium">Medium</div>
                          <div className="label low">Low</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card  glassmorphism-card text-center">
                    <div className="card-content">
                      <div className="card-body ">
                        <p className="text-center">
                          Observation by Due Implementation Date
                        </p>
                        <img
                          src={chart1}
                          className="mx-auto my-3 w-150 h-150"
                          rel="copyright"
                        />
                        <div className="text-end">
                          <div className="label highh">
                            Not Yet due for implementation
                          </div>
                          <div className="label mediumm">
                            Due for implementation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-2">
              <div>
                <label className="me-2 label-text fw-bold">Domain:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <label className="me-2 label-text fw-bold">Risk:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col-lg-2">
              <div>
                <label className="me-2 label-text fw-bold">
                  Residual Risk:
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <label className="me-2 label-text fw-bold">Resource:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <label className="me-2 label-text fw-bold">
                  Exceptions Status:
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div>
                <label className="me-2 label-text fw-bold">Job Name:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-xl-7 col-sm-7 col-12">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card glassmorphism-card">
                    <div className="card-content">
                      <div className="card-body">
                        <p className="text-center"></p>
                        <img
                          src={jChart}
                          rel="copyright"
                          className="w-100 mb-5  mt-3"
                        />
                        <div className="text-end d-flex mb-4 flex-wrap align-self-end">
                          <div className="label yellow  mb-2">Compliance</div>

                          <div className="label high mb-2">Strategic</div>
                          <div className="label low">Reporting </div>

                          <div className="label medium">Operations </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card glassmorphism-card">
                    <div className="card-content">
                      <div className="card-body">
                        <p className="text-center">Jobs by Risk</p>
                        <img
                          src={jChart}
                          rel="copyright"
                          className="w-100 mb-5  mt-3"
                        />
                        <div className="text-end d-flex mb-4 flex-wrap align-self-end">
                          <div className="label yellow mb-2 ">Extreme</div>

                          <div className="label high mb-2 ">Low</div>
                          <div className="label low ">High </div>

                          <div className="label medium  ">Moderate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card glassmorphism-card">
                    <div className="card-content">
                      <div className="card-body">
                        <p className="text-center">Jobs by Residual Risk</p>
                        <img
                          src={jChart}
                          rel="copyright"
                          className="w-100 mb-5  mt-3"
                        />
                        <div className="text-end d-flex mb-4 flex-wrap align-self-end">
                          <div className="label yellow mb-2">Extreme</div>

                          <div className="label high mb-2">Low</div>
                          <div className="label low  ">High </div>

                          <div className="label medium">Moderate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-sm-5 col-12">
              <div className="card glassmorphism-card">
                <div className="card-content">
                  <div className="card-body">
                    <p className="text-center">Jobs by Residual Risk</p>
                    <img
                      src={jobWise}
                      rel="copyright"
                      className="w-100  my-3"
                    />
                    <div className="text-end d-flex flex-wrap align-self-end">
                      <div className="label high ">
                        Implementation Implemented
                      </div>

                      <div className="label medium">
                        Not yet due for Implementation{" "}
                      </div>
                      <div className="label low mt-1 ">
                        Due for Implementation{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-xl-6 col-sm-6 col-12">
              <div className="card glassmorphism-card">
                <div className="card-content">
                  <div className="card-body">
                    <p className="text-center">Jobs in Progress by Resources</p>
                    <img src={jobs} rel="copyright" className="w-100  my-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-sm-6 col-12">
              <div className="card glassmorphism-card">
                <div className="card-content">
                  <div className="card-body">
                    <p className="text-center">Exception Reporting Status</p>
                    <img src={report} rel="copyright" className="w-100  my-3" />
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

export default DashboardHome;
