import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setupAddAuditProgram } from "../../../global-redux/reducers/audit-engagement/slice";

const AddAuditProgramDialog = ({
  setShowAddAuditProgramDialog,
  auditEngagementId,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const { auditEngagementAddSuccess, loading } = useSelector(
    (state) => state?.auditEngagement
  );
  const [rating, setRating] = React.useState("");
  const [control, setControl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [showControls, setShowControls] = React.useState(true);

  function handleClose() {
    setShowAddAuditProgramDialog(false);
    setRating("");
    setDescription("");
    setControl("");
    setShowControls(true);
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowAddAuditProgramDialog(false);
      setRating("");
      setDescription("");
      setControl("");
      setShowControls(true);
    }
  }, [auditEngagementAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (rating === "" || description === "" || control === "") {
        toast.error("Please provide all values");
      } else {
        dispatch(
          setupAddAuditProgram({
            auditEngagementId: Number(auditEngagementId),
            description: description,
            rating: Number(rating),
            controlRisk_id: Number(control),
          })
        );
      }
    }
  }

  React.useEffect(() => {
    let array = [];
    currentAuditEngagement?.riskControlMatrix?.objectives?.map((objective) =>
      objective?.riskRatingList?.map((risk) =>
        risk?.controlRiskList?.map((control) => (array = [...array, control]))
      )
    );
    if (array?.length === 0) {
      setShowControls(false);
      setControl("null");
    } else {
      setShowControls(true);
    }
  }, [currentAuditEngagement]);

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">Add Audit Program</h2>
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
      {showControls && (
        <div className="row mb-2">
          <div className="col-lg-2 label-text">Control</div>
          <div className="col-lg-8">
            <select
              className="form-select "
              aria-label="Default select example"
              value={control}
              onChange={(event) => setControl(event?.target?.value)}
            >
              <option value="">Select One</option>
              {currentAuditEngagement?.riskControlMatrix?.objectives?.map(
                (objective) =>
                  objective?.riskRatingList?.map((risk) =>
                    risk?.controlRiskList?.map((control, index) => {
                      return (
                        <option key={index} value={control?.id}>
                          {control?.description}
                        </option>
                      );
                    })
                  )
              )}
            </select>
          </div>
        </div>
      )}

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
              maxlength="2000"
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

export default AddAuditProgramDialog;
