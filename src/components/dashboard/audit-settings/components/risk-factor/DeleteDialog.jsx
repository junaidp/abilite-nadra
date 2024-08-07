import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteRiskFactor } from "../../../../../global-redux/reducers/settings/risk-factor/slice";

const DeleteRiskFactorDialog = ({
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
        <p>Are You Sure You Want To Delete Risk Factor?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteRiskFactor}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowDeleteRiskFactorDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteRiskFactorDialog;
