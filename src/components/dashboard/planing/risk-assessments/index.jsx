import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../common/pagination/Pagination";
import RiskAssessmentModal from "../../../../components/modals/perform-risk-assessment-dialog/index";
const RiskAssessments = () => {
  const [performRiskAssessmentModal, setPerformRiskAssessmentModal] =
    React.useState(false);
  const navigate = useNavigate();
  const data = [
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
            className="fa fa-info-circle ps-3 text-secondary cursor-pointer"
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
                className="border-bottom"
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr. #</th>
                  <th>Business Objective</th>
                  <th>Risk Approach</th>
                  <th>Risk Rating</th>
                  <th>Perform Risk Assessment</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr className="h-40" key={index}>
                      <td>{item?.no}</td>
                      <td>{item?.objective}</td>
                      <td>{item?.approach}</td>
                      <td>{item?.rating}</td>
                      <td className="text-center w-200">
                        <div
                          className="btn btn-outline-light text-primary shadow h-32 w-180"
                          onClick={() => setPerformRiskAssessmentModal(true)}
                        >
                          <span className="btn-label me-2">
                            <i className="fa fa-play"></i>
                          </span>
                          Perform Risk
                        </div>
                      </td>
                      <td className="text-center pt-3">
                        <i
                          className="fa fa-trash text-danger f-18"
                        ></i>
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
