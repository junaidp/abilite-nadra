import React from "react";
import { useSelector } from "react-redux";
import Objective from "./component/objective";
import Rating from "./component/rating";
import Control from "./component/control";
import FeedBackDialog from "./component/feedback/FeedBackDialog";
import ViewFeedBackDialog from "./component/feedback/ViewFeedBackDialog";
import ApproveDialog from "./component/approve/ApproveDialog";
import SubmitDialog from "./component/submit-dialog";

const RiskControlMatrix = ({
  currentAuditEngagement,
  setCurrentAuditEngagement,
  setShowKickOffObjectiveDialog,
  setShowKickOffRatingDialog,
  setShowKickOffControlDialog,
  auditEngagementId,
}) => {
  const { loading, singleAuditEngagementObject } = useSelector(
    (state) => state?.auditEngagement
  );
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const { user } = useSelector((state) => state?.auth);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);

  function handleApprove() {
    setShowApproveDialog(true);
  }

  function handleSubmit() {
    setShowSubmitDialog(true);
  }

  function handleAllowEdit() {
    let allowEdit = false;
    if (singleAuditEngagementObject?.riskControlMatrix?.submitted === false) {
      allowEdit = true;
    }

    if (
      singleAuditEngagementObject?.riskControlMatrix?.submitted === true &&
      singleAuditEngagementObject?.riskControlMatrix?.approved === false &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) ===
          Number(
            singleAuditEngagementObject?.resourceAllocation
              ?.backupHeadOfInternalAudit?.id
          ) ||
        Number(user[0]?.userId?.id) ===
          Number(
            singleAuditEngagementObject?.resourceAllocation?.proposedJobApprover
              ?.id
          ))
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }

  return (
    <div className="accordion-item">
      {showSubmitDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <SubmitDialog
              object={currentAuditEngagement}
              setShowSubmitDialog={setShowSubmitDialog}
            />
          </div>
        </div>
      )}
      {feedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <FeedBackDialog
              setFeedBackDialog={setFeedBackDialog}
              currentAuditEngagement={currentAuditEngagement}
            />
          </div>
        </div>
      )}
      {viewFeedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ViewFeedBackDialog
              setViewFeedBackDialog={setViewFeedBackDialog}
              currentAuditEngagement={currentAuditEngagement}
            />
          </div>
        </div>
      )}
      {showApproveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ApproveDialog
              setShowApproveDialog={setShowApproveDialog}
              currentAuditEngagement={currentAuditEngagement}
            />
          </div>
        </div>
      )}
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
              0 &&
            currentAuditEngagement?.riskControlMatrix?.approved == true && (
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
                              handleAllowEdit() === true &&
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
                        handleAllowEdit={handleAllowEdit}
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
                                    handleAllowEdit() === true &&
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
                                    handleAllowEdit() === true &&
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
                                        handleAllowEdit() === true &&
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
                                  handleAllowEdit={handleAllowEdit}
                                />
                              </div>

                              <div className="col-lg-6">
                                {index === 0 && riskIndex === 0 && (
                                  <p className="px-3 py-1 bg-secondary d-flex align-items-center rounded justify-content-between text-white">
                                    <span>Controls</span>
                                    <a
                                      onClick={() =>
                                        handleAllowEdit() === true &&
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
                                  handleAllowEdit={handleAllowEdit}
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
            <div className="mt-3 d-flex gap-4 flex-end">
              {currentAuditEngagement?.riskControlMatrix?.submitted ===
                false && (
                <div onClick={handleSubmit} className="mt-3">
                  <div className="justify-content-end text-end">
                    <div
                      className={`btn btn-labeled btn-primary  shadow ${
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
                  <div onClick={handleApprove} className="mt-3">
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
                  <div onClick={() => setFeedBackDialog(true)} className="mt-3">
                    <div className="justify-content-end text-end">
                      <div className={`btn btn-labeled btn-primary  shadow `}>
                        FeedBack
                      </div>
                    </div>
                  </div>
                )}
              {currentAuditEngagement?.riskControlMatrix?.feedback &&
                currentAuditEngagement?.riskControlMatrix?.feedback?.id && (
                  <div className="mt-3">
                    <div className="justify-content-end text-end">
                      <div
                        className={`btn btn-labeled btn-primary  shadow `}
                        onClick={() => {
                          setViewFeedBackDialog(true);
                        }}
                      >
                        View FeedBack
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
