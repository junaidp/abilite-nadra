import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setupSaveRiskControlMatrixRating } from "../../../global-redux/reducers/audit-engagement/slice";

const AddKickOffRatingDialog = ({
  setShowKickOffRatingDialog,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const { auditEngagementAddSuccess, loading } = useSelector(
    (state) => state?.auditEngagement
  );
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [objectiveId, setObjectiveId] = React.useState("");

  function handleClose() {
    setShowKickOffRatingDialog(false);
    setRating("");
    setDescription("");
    setObjectiveId("");
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowKickOffRatingDialog(false);
      setRating("");
      setDescription("");
      setObjectiveId("");
    }
  }, [auditEngagementAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (rating === "" || description === "" || objectiveId === "") {
        toast.error("Please provide all values");
      } else {
        dispatch(
          setupSaveRiskControlMatrixRating({
            objective_id: Number(objectiveId),
            description: description,
            rating: Number(rating),
            rcmLibraryObjectives_id: 0,
          })
        );
      }
    }
  }

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">Add Risk Control Rating</h2>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Objective</div>
        <div className="col-lg-8">
          <select
            className="form-select "
            aria-label="Default select example"
            value={objectiveId}
            onChange={(event) => setObjectiveId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {currentAuditEngagement?.riskControlMatrix?.objectives?.map(
              (objective, index) => {
                return (
                  <option value={objective?.id} key={index}>
                    {objective?.description}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Rating</div>
        <div className="col-lg-8">
          <select
            className="form-select "
            aria-label="Default select example"
            value={rating}
            onChange={(event) => setRating(event?.target?.value)}
          >
            <option value="">Select One</option>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Description</div>
        <div className="col-lg-8">
          <div className="form-group">
            <textarea
              type="text"
              id="fname"
              name="fname"
              placeholder="Add detail here"
              required="required"
              value={description}
              onChange={(event) => setDescription(event?.target?.value)}
              maxLength="500"
              className={`form-control h-400 ${
                description?.length >= 500 && "error-border"
              }`}
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 500 characters
            </label>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-6 text-end">
          <button
            className={`btn btn-primary float-start ${loading && "disabled"}`}
            onClick={handleAdd}
          >
            {loading ? "Loading..." : "Add"}
          </button>
        </div>
        <div className="col-lg-6 text-end">
          <button className="btn btn-danger float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddKickOffRatingDialog;
