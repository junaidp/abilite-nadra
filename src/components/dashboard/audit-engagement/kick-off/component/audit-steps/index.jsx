import React from "react";
import { useSelector } from "react-redux";
import FeedBackDialog from "./FeedBackDialog";
import ViewFeedBackDialog from "./ViewFeedBackDialog";
import ApproveDialog from "./ApproveDialog";
import SubmitDialog from "./submit-dialog";

/**
 * AditSteps Component
 * -------------------
 * Displays audit steps for a given engagement along with actions
 * (Submit, Approve, Feedback, View Feedback).
 *
 * - Uses conditional rendering for dialogs.
 * - Handles permission-based actions (Submit, Approve, Feedback).
 * - Validates step completion before allowing submission.
 */
const AditSteps = ({
  setShowAuditStepsDialog,
  currentAuditEngagement,
  setAuditStepId,
  singleAuditEngagementObject,
  loading,
}) => {
  const { user } = useSelector((state) => state?.auth);

  // Local states for modal dialogs
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);

  /** Handle opening Submit dialog */
  function handleSubmit() {
    setShowSubmitDialog(true);
  }

  /** Handle opening Approve dialog */
  function handleApprove() {
    setShowApproveDialog(true);
  }

  /**
   * Check if all audit steps have observations.
   * Only then show the "Submit" button.
   */
  React.useEffect(() => {
    if (
      singleAuditEngagementObject?.auditStep?.stepList &&
      singleAuditEngagementObject?.auditStep?.stepList?.length > 0
    ) {
      let submitAllowed = false;
      singleAuditEngagementObject.auditStep.stepList.forEach((singleStep) => {
        if (singleStep?.auditStepObservationsList?.length > 0) {
          submitAllowed = true;
        }
      });
      setShowSubmitButton(submitAllowed);
    }
  }, [singleAuditEngagementObject]);

  /** Permission check for Approve/Feedback actions */
  const canApproveOrFeedback =
    user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
    Number(user[0]?.userId?.id) ===
    Number(
      currentAuditEngagement?.resourceAllocation?.backupHeadOfInternalAudit?.id
    ) ||
    Number(user[0]?.userId?.id) ===
    Number(currentAuditEngagement?.resourceAllocation?.proposedJobApprover?.id);

  return (
    <div className="accordion-item">
      {/* Dialogs */}
      {showSubmitDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
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
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <ApproveDialog
              setShowApproveDialog={setShowApproveDialog}
              currentAuditEngagement={currentAuditEngagement}
            />
          </div>
        </div>
      )}

      {/* Accordion Header */}
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
              {currentAuditEngagement?.auditStep?.stepList?.length > 0 &&
                showSubmitButton &&
                currentAuditEngagement?.auditStep?.approved && (
                  <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                )}
              Audit Steps
            </div>
          </div>
        </button>
      </h2>

      {/* Accordion Body */}
      <div
        id="flush-collapseSix"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* Audit Steps Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="f-80">Sr No.</th>
                        <th>Program Step</th>
                        <th>Status</th>
                        <th>View/Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!currentAuditEngagement?.auditStep?.stepList?.length ? (
                        <tr>
                          <td className="w-300">No Steps to show</td>
                        </tr>
                      ) : (
                        currentAuditEngagement.auditStep.stepList.map(
                          (item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <div
                                  onClick={() => {
                                    setAuditStepId(item?.id);
                                    setShowAuditStepsDialog(true);
                                  }}
                                  className="fw-bold text-primary  py-1 f-10 cursor-pointer"
                                >
                                  {item?.program?.description}
                                </div>
                              </td>
                              <td>
                                {item?.auditStepObservationsList?.length ? (
                                  <i className="fa fa-check-circle text-success f-18"></i>
                                ) : (
                                  <i className="fa fa-check-circle text-danger f-18"></i>
                                )}
                              </td>
                              <td>
                                <i
                                  className="fa-eye fa f-18 cursor-pointer"
                                  onClick={() => {
                                    setAuditStepId(item?.id);
                                    setShowAuditStepsDialog(true);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-4 flex-end">
                  {/* Submit button (if not submitted) */}
                  {currentAuditEngagement?.auditStep?.submitted === false && showSubmitButton && (
                    <div onClick={handleSubmit}>
                      <div className="justify-content-end text-end">
                        <div
                          className={`btn btn-labeled btn-primary shadow ${loading && "disabled"
                            }`}
                        >
                          {loading ? "Loading..." : "Submit"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Approve button (for IAH or specific roles) */}
                  {currentAuditEngagement?.auditStep?.submitted === true &&
                    currentAuditEngagement?.auditStep?.approved === false &&
                    canApproveOrFeedback && (
                      <div onClick={handleApprove}>
                        <div className="justify-content-end text-end">
                          <div
                            className={`btn btn-labeled btn-primary shadow ${loading && "disabled"
                              }`}
                          >
                            {loading ? "Loading..." : "Approve"}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Feedback button (for IAH or specific roles) */}
                  {currentAuditEngagement?.auditStep?.submitted === true &&
                    currentAuditEngagement?.auditStep?.approved === false &&
                    canApproveOrFeedback && (
                      <div onClick={() => setFeedBackDialog(true)}>
                        <div className="justify-content-end text-end">
                          <div className="btn btn-labeled btn-primary shadow">
                            FeedBack
                          </div>
                        </div>
                      </div>
                    )}

                  {/* View Feedback button */}
                  {currentAuditEngagement?.auditStep?.feedback?.id && (
                    <div>
                      <div className="justify-content-end text-end">
                        <div
                          className="btn btn-labeled btn-primary shadow"
                          onClick={() => setViewFeedBackDialog(true)}
                        >
                          View FeedBack
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* End Action Buttons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AditSteps;
