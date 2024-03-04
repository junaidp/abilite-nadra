import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupCreateControl } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
const AddSettingsControlRCMDialog = ({ setShowRCMControlDialog }) => {
  const dispatch = useDispatch();
  const { rcmAddSuccess, loading, allRCM } = useSelector(
    (state) => state?.setttingsRiskControlMatrix
  );
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [riskId, setRiskId] = React.useState("");

  function handleClose() {
    setShowRCMControlDialog(false);
    setDescription("");
    setRating("");
    setRiskId("");
  }

  React.useEffect(() => {
    if (rcmAddSuccess) {
      setShowRCMControlDialog(false);
      setDescription("");
      setRating("");
      setRiskId("");
    }
  }, [rcmAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (description === "" || rating === "" || riskId === "") {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupCreateControl({
            description: description,
            rating: Number(rating),
            rcmlibraryRiskRating_id: Number(riskId),
          })
        );
      }
    }
  }

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">Add Control</h2>
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
            value={riskId}
            onChange={(event) => setRiskId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allRCM?.map((item) =>
              item?.rcmLibraryObjectives?.map((objective) =>
                objective?.rcmLibraryRiskRating?.map((risk, index) => {
                  return (
                    <option value={risk?.id} key={index}>
                      {risk?.description}
                    </option>
                  );
                })
              )
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

export default AddSettingsControlRCMDialog;
