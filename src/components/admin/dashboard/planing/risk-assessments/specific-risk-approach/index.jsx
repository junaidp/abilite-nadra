import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AddRiskFactorDialog from "../../../../../modals/add-risk-factor-dialog/index";

const SpecificRiskApproach = () => {
  let [showAddRiskFactorDialog, setShowAddRiskFactorDialog] =
    React.useState(false);
  let navigate = useNavigate();
  return (
    <div>
      {showAddRiskFactorDialog && (
        <div className="add-risk-factor-dialog">
          <div className="modal-objective-factor ">
            <div className="model-wrap-factor">
              <AddRiskFactorDialog
                setShowAddRiskFactorDialog={setShowAddRiskFactorDialog}
              />
            </div>
          </div>
        </div>
      )}

      <div className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="align-items-center  text-start d-flex my-3">
          <a
            className="text-primary"
            onClick={() => navigate("/audit/risk-assessment")}
          >
            <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
          </a>
          <div className="mb-0 heading">
            Specific Risk Approach with Total Risk Score
          </div>
        </div>

        <div
          className="btn btn-labeled btn-primary px-3 shadow"
          onClick={() => setShowAddRiskFactorDialog(true)}
        >
          <span className="btn-label me-2">
            <i className="fa fa-plus-circle"></i>
          </span>
          Add Risk Factor
        </div>
      </div>
      <div className="ps-3 sub-heading mb-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table w-100 table-bordered table-hover rounded equal-columns">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Risk factors</th>
                    <th>Likelihood</th>
                    <th>Impact</th>
                    <th>Score</th>
                    <th>Comments</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Risk 1</td>
                    <td style={{ width: "80px" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                      </select>
                    </td>
                    <td style={{ width: "80px" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                      </select>
                    </td>
                    <td style={{ width: "50px", fontWeight: "bold" }}>8</td>
                    <td>
                      <textarea
                        className="form-control"
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text">
                        Maximum 1500 words
                      </label>
                    </td>
                    <td className="text-center justify-content-center pt-3">
                      <i className="fa fa-trash text-danger"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Risk 2</td>
                    <td style={{ width: "50px" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                      </select>
                    </td>
                    <td style={{ width: "50px" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                      </select>
                    </td>
                    <td style={{ width: "50px", fontWeight: "bold" }}>8</td>
                    <td>
                      <textarea
                        className="form-control"
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text">
                        Maximum 1500 words
                      </label>
                    </td>
                    <td className="text-center justify-content-center pt-3">
                      <i className="fa fa-trash text-danger"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Risk 3</td>
                    <td style={{ width: "50px" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                      </select>
                    </td>
                    <td style={{ width: "50px" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                      </select>
                    </td>
                    <td style={{ width: "50px", fontWeight: "bold" }}>8</td>
                    <td>
                      <textarea
                        className="form-control"
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <label className="word-limit-info label-text">
                        Maximum 1500 words
                      </label>
                    </td>
                    <td className="text-center justify-content-center pt-3">
                      <i className="fa fa-trash text-danger"></i>
                    </td>
                  </tr>

                  <tr>
                    <th className="fw-bold" colSpan="4">
                      Total Score
                    </th>
                    <th className="fw-bold" colSpan="1">
                      24
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row my-3">
              <div className="col-lg-12">
                <h6>Rating of Score Ranges</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="px-3 py-2 border-0 card shadow bg-success text-white label-text ">
                  Low(L) = 0 to 32
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="px-3 py-2 border-0 card shadow text-white label-text  label-text  label-text "
                  style={{ background: "#d9d900" }}
                >
                  Moderate(M) = 33 to 45
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="px-3 py-2 border-0 card shadow  text-white label-text"
                  style={{ background: "#FFBF00" }}
                >
                  High(H) = 46 to 59
                </div>
              </div>
              <div className="col-lg-3">
                <div className="px-3 py-2 border-0 card shadow bg-danger text-white label-text">
                  Extreme = 60
                </div>
              </div>
            </div>

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
                    <td style={{ width: "400px" }}>
                      Lorem ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </td>
                    <td>
                      <select
                        className="form-select border-2"
                        aria-label="Default select example"
                        style={{ width: "60px", padding: "0px 6px" }}
                      >
                        <option>Yes</option>
                        <option value="2">No</option>
                      </select>
                    </td>
                    <td style={{ width: "300px" }}>
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

export default SpecificRiskApproach;
