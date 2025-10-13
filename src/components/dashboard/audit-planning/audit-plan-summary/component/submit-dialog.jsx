import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitAuditPlanSummary } from "../../../../../global-redux/reducers/planing/audit-plan-summary/slice";

const SubmitDialog = ({ item, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { auditPlanSummaryAddSuccess, loading, allAuditPlanSummary } =
    useSelector((state) => state?.planningAuditPlanSummary);

  function handleSubmit() {
    if (!loading) {
      const object = allAuditPlanSummary.find(
        (singleItem) => singleItem?.id === item?.id
      );
      dispatch(
        setupSubmitAuditPlanSummary({
          ...object,
          submitted: true,
          completed: true,
        })
      );
    }
  }

  React.useEffect(() => {
    if (auditPlanSummaryAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [auditPlanSummaryAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Audit Plan Summary?</p>
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
