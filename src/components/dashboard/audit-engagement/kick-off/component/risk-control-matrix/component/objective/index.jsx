import React from "react";
import { setupUpdateRiskControlMatrixObjective } from "../../../../../../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Objective = ({
  currentAuditEngagement,
  setShowKickOffObjectiveDialog,
  loading,
  setCurrentAuditEngagement,
}) => {
  const dispatch = useDispatch();

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
  return (
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

      {currentAuditEngagement?.riskControlMatrix?.objectives?.map(
        (item, index) => {
          return (
            <div className="card p-3 w-100 shadow-sm border" key={index}>
              <div className="d-flex mb-2 justify-content-between align-items-center">
                <span className="fw-bold">Objective</span>
                <div className="d-flex align-items-center">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    value={item?.rating}
                    onChange={(event) => handleChangeObjective(event, item?.id)}
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
                className="form-control"
                placeholder="Enter Reason"
                id="exampleFormControlTextarea1"
                value={item?.description || ""}
                onChange={(event) => handleChangeObjective(event, item?.id)}
                name="description"
              ></textarea>
              <label className="word-limit-info label-text">
                Maximum 1500 words
              </label>
              <button
                className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                  loading && "disabled"
                }`}
                onClick={() => handleSave(item)}
              >
                Update
              </button>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Objective;
