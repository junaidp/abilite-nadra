import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupUpdateAuditStepChecklistStatus } from "../../../../../../../global-redux/reducers/audit-engagement/slice";

const SubmitDialog = ({ object, setShowSubmitDialog, onChecklistStatusUpdated }) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit() {
    if (submitting) return;

    try {
      setSubmitting(true);
      await dispatch(
        setupUpdateAuditStepChecklistStatus({
          id: object?.id,
          submitted: true,
        })
      ).unwrap();
      onChecklistStatusUpdated?.(object?.id, { submitted: true });
      setShowSubmitDialog(false);
      toast.success("Compliance checklist submitted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An Error has occurred"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Compliance CheckList?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${submitting && "disabled"}`}
          onClick={handleSubmit}
        >
          {submitting ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger  float-end mx-2`}
          onClick={() => setShowSubmitDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitDialog;
