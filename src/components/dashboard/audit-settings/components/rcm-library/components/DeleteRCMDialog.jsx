import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteRCM } from "../../../../../../global-redux/reducers/settings/risk-control-matrix/slice";

const DeleteRCMDialog = ({ setShowDeleteRCMDialog, updatedRCMId }) => {
  const dispatch = useDispatch();
  const { rcmAddSuccess, loading } = useSelector(
    (state) => state?.settingsRiskControlMatrix
  );

  function handleDeleteRCM() {
    if (!loading) {
      dispatch(setupDeleteRCM(updatedRCMId));
    }
  }

  React.useEffect(() => {
    if (rcmAddSuccess) {
      setShowDeleteRCMDialog(false);
    }
  }, [rcmAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete this risk control matrix?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteRCM}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteRCMDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRCMDialog;
