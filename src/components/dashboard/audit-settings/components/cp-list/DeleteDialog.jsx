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
        <p>Are You Sure You Want To Delete Residual Risk?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteCpList}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowDeleteCpListDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteCPListDialog;
