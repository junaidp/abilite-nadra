import React from "react";
import { setupUpdateRiskControlMatrixObjective } from "../../../../../../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Objective = ({
  loading,
  setCurrentAuditEngagement,
  singleAuditEngagement,
  index,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const [currentButtonDescription, setCurrentButtonDescription] =
    React.useState("");
  const { auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );

  function handleAddEditable(objectiveId) {
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
                    editable: true,
                  }
                : singleObjective
          ),
        },
      };
    });
  }

  function handleChangeObjective(event, id) {
    setCurrentAuditEngagement((pre) => {
      return {
        ...pre,
        riskControlMatrix: {
          ...pre?.riskControlMatrix,
          objectives: pre?.riskControlMatrix?.objectives?.map(
            (singleObjective) =>
              Number(singleObjective?.id) === Number(id)
                ? {
                    ...singleObjective,
                    [event?.target?.name]: event?.target?.value,
                  }
                : singleObjective
          ),
        },
      };
    });
  }

  function handleSave(item) {
    if (!loading) {
      setCurrentButtonDescription(item?.description);
      if (item?.description === "" || item?.rating === "") {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupUpdateRiskControlMatrixObjective({
            id: item?.id,
            rcmLibraryObjectives_id: item?.rcmLibraryObjectives_id,
            description: item?.description,
            rating: item?.rating,
            riskRatingList: item?.riskRatingList,
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
      <div className="card p-3 w-100 shadow-sm border">
        <div className="d-flex mb-2 justify-content-between align-items-center">
          <span className="fw-bold">{index + 1} Objective</span>
          <div className="d-flex align-items-center">
            <select
              className="form-select "
              aria-label="Default select example"
              value={singleAuditEngagement?.rating}
              onChange={(event) =>
                handleChangeObjective(event, singleAuditEngagement?.id)
              }
              name="rating"
              disabled={singleAuditEngagement?.editable ? false : true}
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
        </div>
        <textarea
          className="form-control"
          placeholder="Enter Reason"
          id="exampleFormControlTextarea1"
          value={singleAuditEngagement?.description || ""}
          onChange={(event) =>
            handleChangeObjective(event, singleAuditEngagement?.id)
          }
          name="description"
          disabled={singleAuditEngagement?.editable ? false : true}
        ></textarea>
        <label className="word-limit-info label-text">Maximum 1500 words</label>
        {!singleAuditEngagement?.editable &&
          currentAuditEngagement?.riskControlMatrix?.approved !== true && (
            <i
              className="fa fa-edit   f-18 cursor-pointer  mt-3"
              onClick={() => handleAddEditable(singleAuditEngagement?.id)}
            ></i>
          )}
        {singleAuditEngagement?.editable &&
          currentAuditEngagement?.riskControlMatrix?.approved !== true && (
            <button
              className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                loading &&
                singleAuditEngagement?.description ===
                  currentButtonDescription &&
                "disabled"
              }`}
              onClick={() => handleSave(singleAuditEngagement)}
            >
              {loading &&
              singleAuditEngagement?.description === currentButtonDescription
                ? "Loading..."
                : "Save"}
            </button>
          )}
      </div>
    </div>
  );
};

export default Objective;
