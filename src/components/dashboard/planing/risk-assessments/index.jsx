import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../common/pagination/Pagination";
import RiskAssessmentModal from "../../../../components/modals/perform-risk-assessment-dialog/index";
const RiskAssessments = () => {
  let [performRiskAssessmentModal, setPerformRiskAssessmentModal] =
    React.useState(false);
  let navigate = useNavigate();
  let data = [
    {
      no: "1",
      objective: "Lorem Ipsum...",
      approach: "Risk factor",
      rating: "53",
    },
    {
      no: "1",
      objective: "Lorem Ipsum...",
      approach: "Risk factor",
      rating: "48",
    },
    {
      no: "1",
      objective: "Lorem Ipsum...",
      approach: "Risk factor",
      rating: "51",
    },
    {
      no: "1",
      objective: "Lorem Ipsum...",
      approach: "Risk factor",
      rating: "52",
    },
  ];
  return (
    <div>
      {performRiskAssessmentModal && (
        <div className="modal-objective-assessment">
          <div className="model-wrap-assessment">
            <RiskAssessmentModal
              setPerformRiskAssessmentModal={setPerformRiskAssessmentModal}
            />
          </div>
        </div>
      )}

      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Risk Assessment</div>
        <div className="">
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => navigate("/audit/view-risk-assesment")}
          >
            <span className="btn-label me-2">
              <i className="fa fa-eye"></i>
            </span>
            View Risk Assessment
          </div>
          <i
            className="fa fa-info-circle ps-3 text-secondary"
            style={{ cursor: "pointer" }}
            title="Info"
          ></i>
        </div>
      </header>

      <div className="row">
        <div className="col-lg-12">
          <div className="example-header">
            <div className="mb-2 w-100">
              <input
                placeholder="Filter"
                id="inputField"
                style={{ borderBottom: "1px solid black" }}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th style={{ width: "80px" }}>Sr. #</th>
                  <th>Business Objective</th>
                  <th>Risk Approach</th>
                  <th>Risk Rating</th>
                  <th>Risk Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr style={{ height: "40px" }} key={index}>
                      <td>{item?.no}</td>
                      <td>{item?.objective}</td>
                      <td>{item?.approach}</td>
                      <td>{item?.rating}</td>
                      <td className="text-center pt-3">
                        <i
                          className="fa fa-eye text-primary"
                          style={{ fontSize: "16px" }}
                        ></i>
                        <i
                          className="fa fa-edit mx-3 text-secondary"
                          style={{ fontSize: "16px" }}
                        ></i>
                        <i
                          className="fa fa-trash text-danger"
                          style={{ fontSize: "16px" }}
                        ></i>
                      </td>
                      <td className="text-center" style={{ width: "200px" }}>
                        <div
                          className="btn btn-outline-light text-primary shadow"
                          style={{ height: "32px", width: "180px" }}
                          onClick={() => setPerformRiskAssessmentModal(true)}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-play"></i>
                          </span>
                          Perform Risk
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default RiskAssessments;
