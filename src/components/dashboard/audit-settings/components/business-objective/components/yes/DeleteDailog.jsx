import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteFinancialQuantifiableYes } from "../../../../../../../global-redux/reducers/settings/business-objective/slice";

const DeleteDialog = ({
  setShowDeleteObjectiveDialog,
  currentObjectiveId,
}) => {
  const dispatch = useDispatch();
  const { yesLoading, yesAddSuccess } = useSelector(
    (state) => state?.settingsBusinessObjective
  );

  function handleDeleteObjective() {
    if (!yesLoading) {
      dispatch(setupDeleteFinancialQuantifiableYes({ id: currentObjectiveId }));
    }
  }

  React.useEffect(() => {
    if (yesAddSuccess) {
      setShowDeleteObjectiveDialog(false);
    }
  }, [yesAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Delete Business Objective?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${yesLoading && "disabled"} `}
          onClick={handleDeleteObjective}
        >
          {yesLoading ? "Loading..." : "Delete"}
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
