import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  resetAddEngagementSuccess,
  setupGetSingleCheckListObjective,
  setupSaveCheckListObjective,
  setupGetCheckListItems,
} from "../../../../../global-redux/reducers/planing/engagement/slice";

const ComplianceCheckListCard = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    selectedCheckListItems,
  } = useSelector((state) => state.planingEngagements);
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      // dispatch(setupGetSingleCheckListObjective(engagementId));
    }
  }, [engagementAddSuccess]);

  function handleSelectCheckList(item) {
    if (!loading) {
      dispatch(setupSaveCheckListObjective(item));
    }
  }

  React.useEffect(() => {
    if (engagementId && user[0]?.token) {
      dispatch(setupGetSingleCheckListObjective(engagementId));
    }
  }, [engagementId, user]);

  return (
    <div>
      <div>
        <section className="faq-section">
          <div className="container" data-aos="fade-up">
            <header className="section-header my-3 align-items-center  text-start d-flex ">
              <a
                className="text-primary"
                onClick={() => navigate("/audit/business-objective")}
              >
                <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
              </a>
              <h3 className="mb-0 fw-bold">Compliance Check List</h3>
            </header>
          </div>
          <div className="accordion" id="accordionCheckListExample">
            {Array.isArray(planingEngagementSingleObject) &&
            planingEngagementSingleObject?.length !== 0 ? (
              planingEngagementSingleObject?.map((item, index) => {
                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                        onClick={() => {
                          dispatch(
                            setupGetCheckListItems(
                              `?userEmailId=${user[0]?.email}&checklistId=${item?.checklist_id}`
                            )
                          );
                        }}
                      >
                        <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                          <div className=" d-flex align-items-center">
                            {item?.description || "null"}
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionCheckListExample"
                    >
                      <div className="accordion-body">
                        <div className="row mt-3">
                          <div
                            className={`btn btn-labeled btn-primary px-3 shadow col-lg-2 mb-4 ${
                              loading && "disabled"
                            }`}
                            onClick={() => handleSelectCheckList(item)}
                          >
                            {!loading ? "Select Check List" : "Loading..."}
                          </div>
                          <div className="col-lg-12">
                            <div className="table-responsive">
                              <table className="table table-bordered  table-hover rounded">
                                <thead className="bg-secondary text-white">
                                  <tr>
                                    <th className="w-80">Sr No.</th>
                                    <th>Area</th>
                                    <th>Subject</th>
                                    <th>Particulars</th>
                                    <th>Observation</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {loading ? (
                                    <CircularProgress />
                                  ) : selectedCheckListItems ? (
                                    selectedCheckListItems?.map(
                                      (checkItem, i) => {
                                        return (
                                          <tr>
                                            <td>{i + 1}</td>
                                            <td>{checkItem?.area}</td>
                                            <td>{checkItem?.subject}</td>
                                            <td>{checkItem?.particulars}</td>
                                            <td>{checkItem?.observation}</td>
                                          </tr>
                                        );
                                      }
                                    )
                                  ) : (
                                    <p className="w-300">
                                      No CheckListItem to show
                                    </p>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseOne`}
                    aria-expanded="false"
                    aria-controls={`flush-collapseOne`}
                    onClick={() => {
                      if (planingEngagementSingleObject?.checklist_id) {
                        dispatch(
                          setupGetCheckListItems(
                            `?userEmailId=${user[0]?.email}&checklistId=${planingEngagementSingleObject?.checklist_id}`
                          )
                        );
                      }
                    }}
                  >
                    <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                      <div className=" d-flex align-items-center">
                        {planingEngagementSingleObject?.description || "null"}
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapseOne`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionCheckListExample"
                >
                  <div className="accordion-body">
                    <div className="row mt-3">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="w-80">Sr No.</th>
                                <th>Area</th>
                                <th>Subject</th>
                                <th>Particulars</th>
                                <th>Observation</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <CircularProgress />
                              ) : selectedCheckListItems ? (
                                selectedCheckListItems?.map((checkItem, i) => {
                                  return (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>{checkItem?.area}</td>
                                      <td>{checkItem?.subject}</td>
                                      <td>{checkItem?.particulars}</td>
                                      <td>{checkItem?.observation}</td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <p className="w-300">
                                  No CheckListItem to show
                                </p>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComplianceCheckListCard;
