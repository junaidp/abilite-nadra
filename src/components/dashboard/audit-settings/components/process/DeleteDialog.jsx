import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteProcess } from "../../../../../global-redux/reducers/settings/process/slice";

const DeleteProcessDialog = ({ setShowProcessDeleteDialog, processId }) => {
  const dispatch = useDispatch();
  const { loading, processAddSuccess } = useSelector(
    (state) => state?.settingsProcess
  );

  function handleDeleteProcess() {
    if (!loading) {
      dispatch(setupDeleteProcess(processId));
    }
  }

  React.useEffect(() => {
    if (processAddSuccess) {
      setShowProcessDeleteDialog(false);
    }
  }, [processAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Delete Process?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteProcess}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowProcessDeleteDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteProcessDialog;
