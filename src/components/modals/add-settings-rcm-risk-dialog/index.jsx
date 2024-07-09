import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupCreateRisk } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
const AddSettingsRCMRiskDialog = ({ setShowRCMRiskDialog }) => {
  const dispatch = useDispatch();
  const { rcmAddSuccess, loading, allRCM } = useSelector(
    (state) => state?.setttingsRiskControlMatrix
  );
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [objectiveId, setObjectiveId] = React.useState("");

  function handleClose() {
    setShowRCMRiskDialog(false);
    setDescription("");
    setRating("");
    setObjectiveId("");
  }

  React.useEffect(() => {
    if (rcmAddSuccess) {
      setShowRCMRiskDialog(false);
      setDescription("");
      setRating("");
      setObjectiveId("");
    }
  }, [rcmAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (description === "" || rating === "" || objectiveId === "") {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupCreateRisk({
            description: description,
            rating: Number(rating),
            rcmlibraryObjective_id: Number(objectiveId),
          })
        );
      }
    }
  }

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">Add Risk</h2>
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
        <div className="col-lg-2 label-text">Risk Control Matrix</div>
        <div className="col-lg-8">
          <select
            className="form-select "
            aria-label="Default select example"
            value={objectiveId}
            onChange={(event) => setObjectiveId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allRCM?.map((item) =>
              item?.rcmLibraryObjectives?.map((objective, index) => {
                return (
                  <option value={objective?.id} key={index}>
                    {objective?.description}
                  </option>
                );
              })
            )}
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
              maxLength="2000"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 2000 characters
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

export default AddSettingsRCMRiskDialog;
