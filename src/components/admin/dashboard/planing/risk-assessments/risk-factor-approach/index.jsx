import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const RiskFactorApproach = () => {
  let navigate = useNavigate();
  return (
    <div>
      <header className="section-header my-3 align-items-center  text-start d-flex ">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/risk-assessment")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        <div className="mb-0 heading">Risk Factor Approach</div>
      </header>

      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12">
            <h6>Score effectiveness of Risk Management and Controls</h6>

            <div className="table-responsive overflow-x-hidden">
              <table className="table w-100 table-bordered table-hover rounded equal-columns">
                <tr>
                  <th>Impact-related Risk Factors</th>
                  <th>Weight</th>
                  <th>Rating</th>
                  <th>Score</th>
                </tr>
                <tr>
                  <td>Loss/material exposure</td>
                  <td style={{ width: "80px" }}>
                    <input
                      type="text"
                      className="form-control border"
                      id="exampleFormContr"
                      placeholder="Enter Percentage"
                    />
                  </td>
                  <td>
                    <select
                      className="form-select border-2"
                      style={{ width: "60px", padding: "0px 6px" }}
                      aria-label="Default select example"
                    >
                      <option>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option>4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option>7</option>
                      <option value="2">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>
                    </select>
                  </td>
                  <td>0.5</td>
                </tr>
                <tr>
                  <td>Strategic risk</td>
                  <td style={{ width: "80px" }}>
                    <input
                      type="text"
                      className="form-control border"
                      id="exampleForm"
                      placeholder="Enter Percentage"
                    />
                  </td>
                  <td>
                    <select
                      className="form-select border-2"
                      style={{ width: "80px", padding: "0px 6px" }}
                      aria-label="Default select example"
                    >
                      <option>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option>4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option>7</option>
                      <option value="2">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>
                    </select>
                  </td>
                  <td>1.0</td>
                </tr>
                <tr>
                  <th colSpan="1">Total</th>
                  <th colSpan="2">100%</th>

                  <th>1.5</th>
                </tr>
                <tr>
                  <th>Likelihood-related Risk Factors</th>
                  <th>Weight</th>
                  <th>Rating</th>
                  <th>Score</th>
                </tr>
                <tr>
                  <td>Control environment</td>
                  <td style={{ width: "150px" }}>
                    <input
                      type="text"
                      className="form-control border"
                      id="exampleFormControlInpu"
                      placeholder="Enter Percentage"
                    />
                  </td>
                  <td>
                    <select
                      className="form-select border-2"
                      style={{ width: "60px", padding: "0px 6px" }}
                      aria-label="Default select example"
                    >
                      <option>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option>4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option>7</option>
                      <option value="2">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>
                    </select>
                  </td>
                  <td>0.7</td>
                </tr>
                <tr>
                  <td>Complexity</td>
                  <td style={{ width: "80px" }}>
                    <input
                      type="text"
                      className="form-control border"
                      id="exampleFormControlInput1"
                      placeholder="Enter Percentage"
                    />
                  </td>
                  <td>
                    <select
                      className="form-select border-2"
                      style={{ width: "60px", padding: "0px 6px" }}
                      aria-label="Default select example"
                    >
                      <option>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option>4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option>7</option>
                      <option value="2">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>
                    </select>
                  </td>
                  <td>0.4</td>
                </tr>
                <tr>
                  <td>Assurance coverage</td>
                  <td style={{ width: "80px" }}>
                    <input
                      type="text"
                      className="form-control border"
                      id="exampleFormControlInput1"
                      placeholder="Enter Percentage"
                    />
                  </td>
                  <td>
                    <select
                      className="form-select border-2"
                      style={{ width: "60px", padding: "0px 6px" }}
                      aria-label="Default select example"
                    >
                      <option>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option>4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option>7</option>
                      <option value="2">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>
                    </select>
                  </td>
                  <td>0.6</td>
                </tr>
                <tr>
                  <td>Management awareness</td>
                  <td style={{ width: "80px" }}>
                    <input
                      type="text"
                      className="form-control border"
                      id="example"
                      placeholder="Enter Percentage"
                    />
                  </td>
                  <td>
                    <select
                      className="form-select border-2"
                      style={{ width: "60px", padding: "0px 6px" }}
                      aria-label="Default select example"
                    >
                      <option>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option>4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option>7</option>
                      <option value="2">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>
                    </select>
                  </td>
                  <td>0.1</td>
                </tr>
                <tr>
                  <th colSpan="1">Total</th>
                  <th colSpan="2">100%</th>

                  <th>1.8</th>
                </tr>
                <tr>
                  <th colSpan="3">Total Score</th>
                  <th>3.25</th>
                </tr>
              </table>
            </div>

            <div className="row mt-2 mb-1">
              <div className="col-lg-12">
                <h6 className="mb-0">Rating of Score Ranges</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <div className="px-3 py-2 border-0 card mb-0 label-text bg-success text-white">
                  2-4 = Low
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="px-3 py-2 border-0 card mb-0 label-text text-white"
                  style={{ background: "#d9d900" }}
                >
                  4.1 to 6.5 = Moderate
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="px-3 py-2 border-0 card mb-0  label-text text-white"
                  style={{ background: "#FFBF00" }}
                >
                  6.6 to 8.5 = High
                </div>
              </div>
              <div className="col-lg-3">
                <div className="px-3 py-2 border-0 card mb-0 label-text bg-danger text-white">
                  9 = Extreme
                </div>
              </div>
            </div>
            <label className="label-text mb-4">
              Ranking Scale: 1 is lowest; 5 is Highest. Lowest possible total
              score = 2. Highest Possible total score = 10.
            </label>

            <h6 className="mt-2">Risk factor Approach with Total Risk Score</h6>

            <div className="table-responsive overflow-x-hidden">
              <table className="table w-100 table-bordered table-hover rounded equal-columns">
                <thead>
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Criteria for Risk Management and Control Processes</th>
                    <th style={{ width: "100px" }}>Remarks</th>
                    <th style={{ width: "100px" }}>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      Lorem ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </td>
                    <td>
                      <select
                        className="form-select border-2"
                        style={{ width: "60px", padding: "0px 6px" }}
                        aria-label="Default select example"
                      >
                        <option>Yes</option>
                        <option value="2">No</option>
                      </select>
                    </td>
                    <td style={{ width: "400px" }}>
                      <textarea
                        className="form-control"
                        placeholder="Enter Reason"
                        id="exampleFormCont"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text">
                        Maximum 1500 words
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="row">
                <div className="col-lg-3">
                  <label className="label-text" htmlFor="residualRisk">
                    Residual Level of Risk
                  </label>
                </div>
                <div className="col-lg-3">
                  <select
                    id="residualRisk"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="extreme">Extreme</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <label htmlFor="residualRiskkk" className="label-text">
                    Control Effectiveness
                  </label>
                </div>
                <div className="col-lg-3">
                  <select
                    id="residualRiskkk"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="low">Adequate</option>
                    <option value="moderate">Needs Improvement</option>
                    <option value="high">Inadequate</option>
                  </select>
                </div>
              </div>

              <div className="btn btn-labeled btn-primary px-3 shadow float-end my-4">
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

export default RiskFactorApproach;
