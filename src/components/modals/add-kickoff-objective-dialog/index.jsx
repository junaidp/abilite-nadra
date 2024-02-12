import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setupSaveRiskControlMatrixObjective } from "../../../global-redux/reducers/audit-engagement/slice";

const AddKickOffObjectiveDialog = ({
  setShowKickOffObjectiveDialog,
  auditEngagementId,
}) => {
  const dispatch = useDispatch();
  const { auditEngagementAddSuccess, loading } = useSelector(
    (state) => state?.auditEngagement
  );
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleClose() {
    setShowKickOffObjectiveDialog(false);
    setRating("");
    setDescription("");
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowKickOffObjectiveDialog(false);
      setRating("");
      setDescription("");
    }
  }, [auditEngagementAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (rating === "" || description === "") {
        toast.error("Please provide all values");
      } else {
        dispatch(
          setupSaveRiskControlMatrixObjective({
            auditEngagementId: auditEngagementId,
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
      <h2 className="pb-4 heading">Add Risk Control Objective</h2>
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
              className="form-control h-400"
              name="fname"
              placeholder="Add detail here"
              required="required"
              value={description}
              onChange={(event) => setDescription(event?.target?.value)}
            ></textarea>
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

export default AddKickOffObjectiveDialog;
