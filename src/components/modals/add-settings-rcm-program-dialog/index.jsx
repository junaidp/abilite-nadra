import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupCreateProgram } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
const AddSettingsProgramRCMDialog = ({ setShowRCMProgramDialog }) => {
  const dispatch = useDispatch();
  const { rcmAddSuccess, loading, allRCM } = useSelector(
    (state) => state?.setttingsRiskControlMatrix
  );
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [controlId, setControlId] = React.useState("");

  function handleClose() {
    setShowRCMProgramDialog(false);
    setDescription("");
    setRating("");
    setControlId("");
  }

  React.useEffect(() => {
    if (rcmAddSuccess) {
      setShowRCMProgramDialog(false);
      setDescription("");
      setRating("");
      setControlId("");
    }
  }, [rcmAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (description === "" || rating === "" || controlId === "") {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupCreateProgram({
            description: description,
            rating: Number(rating),
            rcmlibraryControlRisk_id: Number(controlId),
          })
        );
      }
    }
  }

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">Add Program</h2>
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
            value={controlId}
            onChange={(event) => setControlId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allRCM?.map((item) =>
              item?.rcmLibraryObjectives?.map((objective) =>
                objective?.rcmLibraryRiskRating?.map((risk) =>
                  risk?.rcmLibraryControlRisk?.map((control, index) => {
                    return (
                      <option value={control?.id} key={index}>
                        {control?.description}
                      </option>
                    );
                  })
                )
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

export default AddSettingsProgramRCMDialog;
