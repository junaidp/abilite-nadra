import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitAuditableUnit } from "../../../../../global-redux/reducers/planing/auditable-units/slice";

const SubmitDialog = ({ object, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { auditableUnitAddSuccess, loading } = useSelector(
    (state) => state?.planningAuditableUnit
  );

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupSubmitAuditableUnit({
          ...object,
          completed: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (auditableUnitAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [auditableUnitAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Audit Job?</p>
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
