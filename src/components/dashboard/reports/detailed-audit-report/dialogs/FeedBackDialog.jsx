import React from "react";
import { toast } from "react-toastify";
import { setupReportFeedBack } from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useDispatch, useSelector } from "react-redux";

const DetailedAuditReportFeedbackDialog = ({ setFeedBackDialog, Id }) => {
  const dispatch = useDispatch();
  const { loading, internalAuditReportAddSuccess } = useSelector(
    (state) => state?.consolidationReport
  );

  const [description, setDescription] = React.useState("");

  // --- Handlers ---
  const handleClose = React.useCallback(() => {
    setFeedBackDialog(false);
    setDescription("");
  }, [setFeedBackDialog]);

  const handleAdd = React.useCallback(() => {
    if (loading) return;

    if (!description.trim()) {
      toast.error("Provide description");
      return;
    }

    dispatch(
      setupReportFeedBack({
        consolidatedReportsId: Number(Id),
        description: description,
      })
    );
  }, [loading, description, dispatch, Id]);

  // --- Side effect: close dialog on success ---
  React.useEffect(() => {
    if (internalAuditReportAddSuccess) {
      setDescription("");
      setFeedBackDialog(false);
    }
  }, [internalAuditReportAddSuccess, setFeedBackDialog]);

  return (
    <div className="px-4 py-4">
      {/* Feedback Input */}
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Description:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <textarea
              id="feedback-description"
              className="form-control h-400"
              name="feedback"
              placeholder="Add feedback here"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={2000}
            />
            <label className="word-limit-info label-text">
              Maximum 2000 characters
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row py-3">
        <div className="col-lg-6 text-end">
          <button
            className={`btn btn-primary float-start ${loading ? "disabled" : ""}`}
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

export default DetailedAuditReportFeedbackDialog;
