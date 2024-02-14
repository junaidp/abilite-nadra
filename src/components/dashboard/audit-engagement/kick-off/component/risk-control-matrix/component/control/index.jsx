import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateRiskControlMatrixControl } from "../../../../../../../../global-redux/reducers/audit-engagement/slice";
import { toast } from "react-toastify";

const Control = ({
  setShowKickOffControlDialog,
  currentAuditEngagement,
  loading,
  setCurrentAuditEngagement,
  auditEngagementId,
}) => {
  const dispatch = useDispatch();
  const { auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const [currentButtonDescription, setCurrentButtonDescription] =
    React.useState("");
  function handleChangeControl(event, objectiveId, riskId, controlId) {
    setCurrentAuditEngagement((pre) => {
      return {
        ...pre,
        riskControlMatrix: {
          ...pre?.riskControlMatrix,
          objectives: pre?.riskControlMatrix?.objectives?.map(
            (singleObjective) =>
              Number(singleObjective?.id) === Number(objectiveId)
                ? {
                    ...singleObjective,
                    riskRatingList: singleObjective?.riskRatingList?.map(
                      (singleRisk) =>
                        Number(singleRisk?.id) === Number(riskId)
                          ? {
                              ...singleRisk,
                              controlRiskList: singleRisk?.controlRiskList?.map(
                                (singleControl) =>
                                  Number(singleControl?.id) ===
                                  Number(controlId)
                                    ? {
                                        ...singleControl,
                                        [event?.target?.name]:
                                          event?.target?.value,
                                      }
                                    : singleControl
                              ),
                            }
                          : singleRisk
                    ),
                  }
                : singleObjective
          ),
        },
      };
    });
  }

  function handleSave(control) {
    if (!loading) {
      setCurrentButtonDescription(control?.description);
      if (control?.description === "" || control?.rating === "") {
        toast.error("provide all values");
      } else {
        dispatch(
          setupUpdateRiskControlMatrixControl({
            id: control?.id,
            rcmLibraryControlRisk_id: control?.rcmLibraryControlRisk_id,
            description: control?.description,
            rating: Number(control?.rating),
            engagementId: Number(auditEngagementId),
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setCurrentButtonDescription("");
    }
  }, [auditEngagementAddSuccess]);
  return (
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

      {currentAuditEngagement?.riskControlMatrix?.objectives?.map((objective) =>
        objective?.riskRatingList?.map((risk) =>
          risk?.controlRiskList?.map((control, index) => {
            return (
              <div className="card p-3 mb-3 w-100 shadow-sm border" key={index}>
                <div className="d-flex mb-2 justify-content-between align-items-center">
                  <span className="fw-bold">Control Risk</span>
                  <div className="d-flex align-items-center">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={control?.rating}
                      onChange={(event) =>
                        handleChangeControl(
                          event,
                          objective?.id,
                          risk?.id,
                          control?.id
                        )
                      }
                      name="rating"
                    >
                      <option value="">Select One</option>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>
                </div>
                <div className="my-2">
                  <p>
                    {`${objective?.description.slice(
                      0,
                      12
                    )} --> ${risk?.description.slice(
                      0,
                      12
                    )} -->${control?.description.slice(0, 12)}`}
                  </p>
                </div>

                <textarea
                  className="form-control"
                  placeholder="Enter Reason"
                  id="exampleFormControlTextarea222"
                  value={control?.description || ""}
                  onChange={(event) =>
                    handleChangeControl(
                      event,
                      objective?.id,
                      risk?.id,
                      control?.id
                    )
                  }
                  name="description"
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 1500 words
                </label>
                <button
                  className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                    loading &&
                    control?.description === currentButtonDescription &&
                    "disabled"
                  }`}
                  onClick={() => handleSave(control)}
                >
                  {loading && control?.description === currentButtonDescription
                    ? "Loading..."
                    : "Update"}
                </button>
              </div>
            );
          })
        )
      )}
    </div>
  );
};

export default Control;
