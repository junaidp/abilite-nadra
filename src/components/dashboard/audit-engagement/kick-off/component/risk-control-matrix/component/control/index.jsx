import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateRiskControlMatrixControl } from "../../../../../../../../global-redux/reducers/audit-engagement/slice";
import { toast } from "react-toastify";

const Control = ({
  loading,
  setCurrentAuditEngagement,
  auditEngagementId,
  singleAuditEngagement,
  risk,
  riskIndex,
  index,
  handleAllowEdit,
}) => {
  const dispatch = useDispatch();
  const { auditEngagementAddSuccess, singleAuditEngagementObject } =
    useSelector((state) => state?.auditEngagement);
  const [currentButtonDescription, setCurrentButtonDescription] =
    React.useState("");
  function handleAddEditable(objectiveId, riskId, controlId) {
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
                                        editable: true,
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
    <div>
      {risk?.controlRiskList?.map((control, controlIndex) => {
        return (
          <div
            className="card p-3 mb-3 w-100 shadow-sm border"
            key={controlIndex}
          >
            <div className="d-flex mb-2 justify-content-between align-items-center">
              <span className="fw-bold">
                {index + 1}.{riskIndex + 1}.{controlIndex + 1} Control Risk
              </span>
              <div className="d-flex align-items-center">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={control?.rating}
                  onChange={(event) =>
                    handleChangeControl(
                      event,
                      singleAuditEngagement?.id,
                      risk?.id,
                      control?.id
                    )
                  }
                  disabled={control?.editable ? false : true}
                  name="rating"
                >
                  <option value="">Select One</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>
            </div>

            <textarea
              placeholder="Enter Reason"
              id="exampleFormControlTextarea222"
              value={control?.description || ""}
              onChange={(event) =>
                handleChangeControl(
                  event,
                  singleAuditEngagement?.id,
                  risk?.id,
                  control?.id
                )
              }
              disabled={control?.editable ? false : true}
              name="description"
              maxLength="500"
              className={`form-control ${
                control?.description?.length >= 500 && "error-border"
              }`}
            ></textarea>
            <p className="word-limit-info label-text mb-2">
              Maximum 500 characters
            </p>
            {handleAllowEdit() === true && (
              <i
                className="fa fa-edit   f-18 cursor-pointer  mt-3"
                onClick={() =>
                  handleAddEditable(
                    singleAuditEngagement?.id,
                    risk?.id,
                    control?.id
                  )
                }
              ></i>
            )}
            {control?.editable &&
              singleAuditEngagementObject?.riskControlMatrix?.approved !==
                true && (
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
                    : "Save"}
                </button>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default Control;
