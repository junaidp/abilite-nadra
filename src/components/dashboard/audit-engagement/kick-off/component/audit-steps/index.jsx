import React from "react";
import { setupUpdateAuditStepApproval } from "../../../../../../global-redux/reducers/audit-engagement/slice";
import { useSelector, useDispatch } from "react-redux";
import FeedBackDialog from "./FeedBackDialog";
import ViewFeedBackDialog from "./ViewFeedBackDialog";
import ApproveDialog from "./ApproveDialog";

const AditSteps = ({
  setShowAuditStepsDialog,
  currentAuditEngagement,
  setAuditStepId,
  singleAuditEngagementObject,
  loading,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupUpdateAuditStepApproval({
          ...currentAuditEngagement?.auditStep,
          submitted: true,
        })
      );
    }
  }

  function handleApprove() {
    setShowApproveDialog(true);
  }

  React.useEffect(() => {
    if (
      singleAuditEngagementObject?.auditStep !== null &&
      singleAuditEngagementObject?.auditStep?.stepList?.length !== 0
    ) {
      let submit = true;
      singleAuditEngagementObject?.auditStep?.stepList?.forEach(
        (singleStep) => {
          if (singleStep?.auditStepObservationsList?.length === 0) {
            submit = false;
          }
        }
      );
      setShowSubmitButton(submit);
    }
  }, [singleAuditEngagementObject]);

  return (
    <div className="accordion-item">
      {feedBackDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <FeedBackDialog
              setFeedBackDialog={setFeedBackDialog}
              currentAuditEngagement={currentAuditEngagement}
            />
          </div>
        </div>
      )}
      {viewFeedBackDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewFeedBackDialog
              setViewFeedBackDialog={setViewFeedBackDialog}
              currentAuditEngagement={currentAuditEngagement}
            />
          </div>
        </div>
      )}
      {showApproveDialog && (
        <div className="modal-objective">
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
          data-bs-target="#flush-collapseSix"
          aria-expanded="false"
          aria-controls="flush-collapseSix"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {currentAuditEngagement?.auditStep !== null &&
                currentAuditEngagement?.auditStep?.stepList?.length !== 0 &&
                showSubmitButton &&
                currentAuditEngagement?.auditStep?.approved === true && (
                  <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                )}
              Audit Steps
            </div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseSix"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="f-80">Sr No.</th>
                        <th>Program Step</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAuditEngagement?.auditStep?.stepList?.length ===
                        0 || currentAuditEngagement?.auditStep == null ? (
                        <tr>
                          <td className="w-300">No Steps to show</td>
                        </tr>
                      ) : (
                        currentAuditEngagement?.auditStep?.stepList?.map(
                          (item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item?.id}</td>
                                <td>
                                  <a
                                    onClick={() => {
                                      if (
                                        currentAuditEngagement?.auditStep
                                          ?.approved !== true
                                      ) {
                                        setAuditStepId(item?.id);
                                        setShowAuditStepsDialog(true);
                                      }
                                    }}
                                    className="fw-bold  text-primary  px-3 py-1 f-10"
                                  >
                                    {item?.program?.description}
                                  </a>
                                </td>
                                <td>
                                  {item?.auditStepObservationsList?.length !==
                                  0 ? (
                                    <i className="fa fa-check-circle text-success f-18"></i>
                                  ) : (
                                    <i className="fa fa-check-circle text-danger  f-18"></i>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex gap-4 flex-end">
                  {currentAuditEngagement?.auditStep?.submitted === false &&
                    showSubmitButton && (
                      <div onClick={handleSubmit}>
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
                  {currentAuditEngagement?.auditStep?.submitted === true &&
                    currentAuditEngagement?.auditStep?.approved === false &&
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
                            className={`btn btn-labeled btn-primary  shadow ${
                              loading && "disabled"
                            }`}
                          >
                            {loading ? "Loading..." : "Approve"}
                          </div>
                        </div>
                      </div>
                    )}
                  {currentAuditEngagement?.auditStep?.submitted === true &&
                    currentAuditEngagement?.auditStep?.approved === false &&
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
                      <div onClick={() => setFeedBackDialog(true)}>
                        <div className="justify-content-end text-end">
                          <div
                            className={`btn btn-labeled btn-primary  shadow `}
                          >
                            FeedBack
                          </div>
                        </div>
                      </div>
                    )}
                  {currentAuditEngagement?.auditStep?.feedback &&
                    currentAuditEngagement?.auditStep?.feedback?.id && (
                      <div>
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
      </div>
    </div>
  );
};

export default AditSteps;
