import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteProcess } from "../../../../../global-redux/reducers/settings/process/slice";

const DeleteProcessDialog = ({ setShowProcessDeleteDialog, processId }) => {
  const dispatch = useDispatch();
  const { loading, processAddSuccess } = useSelector(
    (state) => state?.setttingsProcess
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
        <p>Are you sure you want to delete this process?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteProcess}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowProcessDeleteDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProcessDialog;
