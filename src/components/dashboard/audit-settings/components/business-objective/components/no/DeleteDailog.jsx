import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteFinancialQuantifiableNo } from "../../../../../../../global-redux/reducers/settings/business-objective/slice";

const DeleteDialog = ({ setShowDeleteObjectiveDialog, currentObjectiveId }) => {
  const dispatch = useDispatch();
  const { noLoading, noAddSuccess } = useSelector(
    (state) => state?.settingsBusinessObjective
  );

  function handleDeleteObjective() {
    if (!noLoading) {
      dispatch(setupDeleteFinancialQuantifiableNo({ id: currentObjectiveId }));
    }
  }

  React.useEffect(() => {
    if (noAddSuccess) {
      setShowDeleteObjectiveDialog(false);
    }
  }, [noAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Delete Business Objective?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${noLoading && "disabled"} `}
          onClick={handleDeleteObjective}
        >
          {noLoading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowDeleteObjectiveDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteDialog;
