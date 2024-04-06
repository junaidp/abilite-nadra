import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteCpList } from "../../../../../global-redux/reducers/settings/cp-list/slice";

const DeleteCPListDialog = ({ setShowDeleteCpListDialog, currentCpListId }) => {
  const dispatch = useDispatch();
  const { loading, cpListAddSuccess } = useSelector(
    (state) => state?.settingsCPList
  );

  function handleDeleteCpList() {
    if (!loading) {
      dispatch(setupDeleteCpList(currentCpListId));
    }
  }

  React.useEffect(() => {
    if (cpListAddSuccess) {
      setShowDeleteCpListDialog(false);
    }
  }, [cpListAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete this residual risk?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteCpList}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteCpListDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCPListDialog;
