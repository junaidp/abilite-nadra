import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitAuditProgram } from "../../../../../../../global-redux/reducers/audit-engagement/slice";

const SubmitDialog = ({ object, setShowSubmitDialog, auditEngagementId }) => {
  const dispatch = useDispatch();
  const { auditEngagementAddSuccess, loading } = useSelector(
    (state) => state?.auditEngagement
  );

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupSubmitAuditProgram({
          auditProgram: {
            ...object?.auditProgram,
            submitted: true,
          },
          engagement_id: Number(auditEngagementId),
        })
      );
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [auditEngagementAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Audit Program?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
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
