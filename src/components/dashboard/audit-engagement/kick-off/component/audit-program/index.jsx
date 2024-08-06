import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setupUpdateAuditProgram } from "../../../../../../global-redux/reducers/audit-engagement/slice";
import Table from "./components/Table";
import FeedBackDialog from "./components/FeedBackDialog";
import ViewFeedBackDialog from "./components/ViewFeedBackDialog";
import ApproveDialog from "./components/ApproveDialog";
import SubmitDialog from "./components/submit-dialog";

const AuditProgram = ({
  currentAuditEngagement,
  setCurrentAuditEngagement,
  setShowAddAuditProgramDialog,
  auditEngagementId,
  singleAuditEngagementObject,
}) => {
  const dispatch = useDispatch();
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const { user } = useSelector((state) => state?.auth);
  const [controlList, setControlList] = React.useState([]);
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [viewFeedBackDialog, setViewFeedBackDialog] = React.useState(false);

  function handleEditable(item) {
    setCurrentAuditEngagement((pre) => {
      return {
        ...pre,
        auditProgram: {
          ...pre?.auditProgram,
          programList: pre?.auditProgram?.programList?.map((program) =>
            program?.id === item?.id ? { ...program, editable: true } : program
          ),
        },
      };
    });
  }

  function handleSubmit() {
    setShowSubmitDialog(true);
  }

  function handleApprove() {
    setShowApproveDialog(true);
  }

  function handleChange(event, id) {
    setCurrentAuditEngagement((pre) => {
      return {
        ...pre,
        auditProgram: {
          ...pre?.auditProgram,
          programList: pre?.auditProgram?.programList?.map((program) =>
            Number(program?.id) === Number(id)
              ? { ...program, [event?.target?.name]: event?.target?.value }
              : program
          ),
        },
      };
    });
  }

  function handleUpdate(item) {
    if (!loading) {
      setCurrentButtonId(item?.id);
      if (!item?.description || !item?.rating) {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupUpdateAuditProgram({
            program: {
              id: item?.id,
              description: item?.description,
              rating: Number(item?.rating),
              controlRisk_id: item?.controlRisk_id,
            },
            engagement_id: Number(auditEngagementId),
          })
        );
      }
    }
  }

  function getDescription(id) {
    if (controlList?.length !== 0) {
      return controlList?.find((all) => Number(all?.id) === Number(id))
        ?.description;
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setCurrentButtonId("");
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    let array = [];
    currentAuditEngagement?.riskControlMatrix?.objectives?.map((objective) =>
      objective?.riskRatingList?.map((risk) =>
        risk?.controlRiskList?.map((control) => (array = [...array, control]))
      )
    );
    setControlList(array);
  }, [currentAuditEngagement]);

  React.useEffect(() => {
    if (
      singleAuditEngagementObject?.auditProgram !== null &&
      singleAuditEngagementObject?.auditProgram?.programList?.length !== 0
    ) {
      let submit = true;
      singleAuditEngagementObject?.auditProgram?.programList?.forEach(
        (singleItem) => {
          if (!singleItem?.description || !singleItem?.rating) {
            submit = false;
          }
        }
      );
      setShowSubmitButton(submit);
    }
  }, [singleAuditEngagementObject]);

  function handleAllowEdit() {
    let allowEdit = false;
    if (singleAuditEngagementObject?.auditProgram?.submitted === false) {
      allowEdit = true;
    }

    if (
      singleAuditEngagementObject?.auditProgram?.submitted === true &&
      singleAuditEngagementObject?.auditProgram?.approved === false &&
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
  function handleAllowEditForAddProgram() {
    let allowEdit = false;
    if (
      singleAuditEngagementObject?.auditProgram?.submitted === false ||
      !singleAuditEngagementObject?.auditProgram
    ) {
      allowEdit = true;
    }

    if (
      singleAuditEngagementObject?.auditProgram?.submitted === true &&
      singleAuditEngagementObject?.auditProgram?.approved === false &&
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
              auditEngagementId={auditEngagementId}
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
              auditEngagementId={auditEngagementId}
            />
          </div>
        </div>
      )}
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed br-8"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFive"
          aria-expanded="false"
          aria-controls="flush-collapseFive"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {currentAuditEngagement?.auditProgram !== null &&
                currentAuditEngagement?.auditProgram?.programList?.length !==
                  0 &&
                showSubmitButton === true &&
                currentAuditEngagement?.auditProgram?.approved == true && (
                  <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                )}
              Audit Program
            </div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseFive"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-2">
              {handleAllowEditForAddProgram() === true && (
                <div className="col-lg-12">
                  <button
                    className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow"
                    onClick={() => setShowAddAuditProgramDialog(true)}
                  >
                    Add Audit Program
                  </button>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <Table
                    handleAllowEdit={handleAllowEdit}
                    currentAuditEngagement={currentAuditEngagement}
                    getDescription={getDescription}
                    handleChange={handleChange}
                    handleUpdate={handleUpdate}
                    handleEditable={handleEditable}
                    loading={loading}
                    currentButtonId={currentButtonId}
                  />
                </div>
                <div className="d-flex gap-4 flex-end">
                  {showSubmitButton &&
                    currentAuditEngagement?.auditProgram?.submitted ===
                      false && (
                      <div className="justify-content-end text-end mt-3">
                        <button
                          className={`btn btn-labeled  btn-primary shadow  ${
                            loading && "disabled"
                          }`}
                          onClick={() => handleSubmit()}
                        >
                          {loading ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    )}
                  {currentAuditEngagement?.auditProgram?.submitted === true &&
                    currentAuditEngagement?.auditProgram?.approved === false &&
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
                      <div className="justify-content-end text-end mt-3">
                        <button
                          className={`btn btn-labeled  btn-primary shadow  ${
                            loading && "disabled"
                          }`}
                          onClick={() => handleApprove()}
                        >
                          {loading ? "Loading..." : "Approve"}
                        </button>
                      </div>
                    )}
                  {currentAuditEngagement?.auditProgram?.submitted === true &&
                    currentAuditEngagement?.auditProgram?.approved === false &&
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
                      <div className="justify-content-end text-end mt-3">
                        <button
                          className={`btn btn-labeled  btn-primary shadow  `}
                          onClick={() => setFeedBackDialog(true)}
                        >
                          FeedBack
                        </button>
                      </div>
                    )}
                  {currentAuditEngagement?.auditProgram?.feedback &&
                    currentAuditEngagement?.auditProgram?.feedback?.id && (
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
      </div>
    </div>
  );
};

export default AuditProgram;
