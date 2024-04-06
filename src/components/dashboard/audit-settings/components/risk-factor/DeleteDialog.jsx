import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteRiskFactor } from "../../../../../global-redux/reducers/settings/risk-factor/slice";

const DeleteCPListDialog = ({
  setShowDeleteRiskFactorDialog,
  currentRiskFactorId,
}) => {
  const dispatch = useDispatch();
  const { loading, riskFactorAddSuccess } = useSelector(
    (state) => state?.settingsRiskFactor
  );

  function handleDeleteRiskFactor() {
    if (!loading) {
      dispatch(setupDeleteRiskFactor(currentRiskFactorId));
    }
  }

  React.useEffect(() => {
    if (riskFactorAddSuccess) {
      setShowDeleteRiskFactorDialog(false);
    }
  }, [riskFactorAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete this risk factor?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteRiskFactor}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteRiskFactorDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCPListDialog;
