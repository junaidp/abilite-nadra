import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitSpecialProjectAudit } from "../../../../../global-redux/reducers/planing/engagement/slice";

const SubmitDialog = ({ object, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { engagementAddSuccess, loading } = useSelector(
    (state) => state?.planningEngagement
  );

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupSubmitSpecialProjectAudit({
          ...object,
          complete: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [engagementAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Special Project Audit?</p>
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
