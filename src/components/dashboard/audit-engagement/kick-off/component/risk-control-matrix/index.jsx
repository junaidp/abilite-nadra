import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Objective from "./component/objective";
import Rating from "./component/rating";
import Control from "./component/control";
import { setupUpdateRiskControlMatrixApproval } from "../../../../../../global-redux/reducers/audit-engagement/slice";
const RiskControlMatrix = ({
  setShowViewLibrary,
  currentAuditEngagement,
  setCurrentAuditEngagement,
  setShowKickOffObjectiveDialog,
  setShowKickOffRatingDialog,
  setShowKickOffControlDialog,
  auditEngagementId,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.auditEngagement);
  const { user } = useSelector((state) => state?.auth);
  function handleApprove() {
    if (!loading) {
      dispatch(
        setupUpdateRiskControlMatrixApproval({
          ...currentAuditEngagement?.riskControlMatrix,
          approved: true,
        })
      );
    }
  }

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupUpdateRiskControlMatrixApproval({
          ...currentAuditEngagement?.riskControlMatrix,
          submitted: true,
        })
      );
    }
  }
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFour"
          aria-expanded="false"
          aria-controls="flush-collapseFour"
        >
          {currentAuditEngagement?.riskControlMatrix !== null &&
            currentAuditEngagement?.riskControlMatrix?.objectives?.length !==
              0 && (
              <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
            )}
          Risk Control Matrix
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-2">
              <div className="col-lg-12">
                <button
                  className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow"
                  onClick={() => setShowViewLibrary(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-eye"></i>
                  </span>
                  View Library
                </button>
              </div>
            </div>

            {currentAuditEngagement?.riskControlMatrix === null && (
              <div className="row">
                <div className="col-lg-4">
                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                    <span>Objective</span>
                    <a
                      className="text-white add-btn"
                      onClick={() => setShowKickOffObjectiveDialog(true)}
                    >
                      <span className="float-end f-10">
                        <i className="fa fa-plus me-2"></i>Add Objective
                      </span>
                    </a>
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                    <span>Risk</span>
                    <a
                      onClick={() => setShowKickOffRatingDialog(true)}
                      className="text-white add-btn"
                    >
                      <span className="float-end f-10">
                        <i className="fa fa-plus me-2"></i>Add Risk
                      </span>
                    </a>
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                    <span>Controls</span>
                    <a
                      onClick={() => setShowKickOffControlDialog(true)}
                      className="text-white add-btn"
                    >
                      <span className="float-end f-10">
                        <i className="fa fa-plus me-2"></i>Add Control
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            )}

            {currentAuditEngagement?.riskControlMatrix?.objectives?.map(
              (singleAuditEngagement, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-lg-4">
                      {index === 0 && (
                        <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                          <span>Objective</span>
                          <a
                            className="text-white add-btn"
                            onClick={() =>
                              currentAuditEngagement?.riskControlMatrix
                                ?.approved !== true &&
                              setShowKickOffObjectiveDialog(true)
                            }
                          >
                            <span className="float-end f-10">
                              <i className="fa fa-plus me-2"></i>Add Objective
                            </span>
                          </a>
                        </p>
                      )}
                      <Objective
                        loading={loading}
                        setCurrentAuditEngagement={setCurrentAuditEngagement}
                        singleAuditEngagement={singleAuditEngagement}
                        index={index}
                        currentAuditEngagement={currentAuditEngagement}
                      />
                    </div>
                    <div className="col-lg-8">
                      {index === 0 &&
                        singleAuditEngagement?.riskRatingList?.length === 0 && (
                          <div className="row">
                            <div className="col-lg-6">
                              <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                                <span>Risk</span>
                                <a
                                  onClick={() =>
                                    currentAuditEngagement?.riskControlMatrix
                                      ?.approved !== true &&
                                    setShowKickOffRatingDialog(true)
                                  }
                                  className="text-white add-btn"
                                >
                                  <span className="float-end f-10">
                                    <i className="fa fa-plus me-2"></i>Add Risk
                                  </span>
                                </a>
                              </p>
                            </div>
                            <div className="col-lg-6">
                              <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                                <span>Controls</span>
                                <a
                                  onClick={() =>
                                    currentAuditEngagement?.riskControlMatrix
                                      ?.approved !== true &&
                                    setShowKickOffControlDialog(true)
                                  }
                                  className="text-white add-btn"
                                >
                                  <span className="float-end f-10">
                                    <i className="fa fa-plus me-2"></i>Add
                                    Control
                                  </span>
                                </a>
                              </p>
                            </div>
                          </div>
                        )}
                      {singleAuditEngagement?.riskRatingList?.map(
                        (risk, riskIndex) => {
                          return (
                            <div key={riskIndex} className="row">
                              <div className="col-lg-6">
                                {index === 0 && riskIndex === 0 && (
                                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                                    <span>Risk</span>
                                    <a
                                      onClick={() =>
                                        currentAuditEngagement
                                          ?.riskControlMatrix?.approved !==
                                          true &&
                                        setShowKickOffRatingDialog(true)
                                      }
                                      className="text-white add-btn"
                                    >
                                      <span className="float-end f-10">
                                        <i className="fa fa-plus me-2"></i>Add
                                        Risk
                                      </span>
                                    </a>
                                  </p>
                                )}
                                <Rating
                                  setCurrentAuditEngagement={
                                    setCurrentAuditEngagement
                                  }
                                  loading={loading}
                                  singleAuditEngagement={singleAuditEngagement}
                                  risk={risk}
                                  riskIndex={riskIndex}
                                  index={index}
                                  currentAuditEngagement={
                                    currentAuditEngagement
                                  }
                                />
                              </div>

                              <div className="col-lg-6">
                                {index === 0 && riskIndex === 0 && (
                                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                                    <span>Controls</span>
                                    <a
                                      onClick={() =>
                                        currentAuditEngagement
                                          ?.riskControlMatrix?.approved !==
                                          true &&
                                        setShowKickOffControlDialog(true)
                                      }
                                      className="text-white add-btn"
                                    >
                                      <span className="float-end f-10">
                                        <i className="fa fa-plus me-2"></i>Add
                                        Control
                                      </span>
                                    </a>
                                  </p>
                                )}

                                <Control
                                  setCurrentAuditEngagement={
                                    setCurrentAuditEngagement
                                  }
                                  loading={loading}
                                  auditEngagementId={auditEngagementId}
                                  singleAuditEngagement={singleAuditEngagement}
                                  risk={risk}
                                  riskIndex={riskIndex}
                                  index={index}
                                  currentAuditEngagement={
                                    currentAuditEngagement
                                  }
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    {currentAuditEngagement?.riskControlMatrix?.objectives
                      ?.length -
                      1 !==
                      index && <hr />}
                  </div>
                );
              }
            )}
            <div className="mt-3">
              {currentAuditEngagement?.riskControlMatrix?.submitted ===
                false && (
                <div onClick={handleSubmit}>
                  <div className="justify-content-end text-end">
                    <div
                      className={`btn btn-labeled btn-primary px-3 shadow ${
                        loading && "disabled"
                      }`}
                    >
                      {loading ? "Loading..." : "Submit"}
                    </div>
                  </div>
                </div>
              )}
              {currentAuditEngagement?.riskControlMatrix?.submitted === true &&
                currentAuditEngagement?.riskControlMatrix?.approved === false &&
                (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      currentAuditEngagement?.resourceAllocation
                        ?.backupHeadOfInternalAudit?.id
                    ) ||
                  Number(user[0]?.userId?.id) ===
                    Number(
                      currentAuditEngagement?.resourceAllocation
                        ?.proposedJobApprover?.id
                    )) && (
                  <div onClick={handleApprove}>
                    <div className="justify-content-end text-end">
                      <div
                        className={`btn btn-labeled btn-primary px-3 shadow ${
                          loading && "disabled"
                        }`}
                      >
                        {loading ? "Loading" : "Approve"}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskControlMatrix;
