import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteCheckList } from "../../../../../../global-redux/reducers/settings/check-list/slice";

const DeleteCheckListDialog = ({ setShowDeleteCheckListDialog }) => {
  const dispatch = useDispatch();
  const { checkListAddSuccess, editLoading, checkListId } = useSelector(
    (state) => state.settingsCheckList
  );

  function handleDeleteCheckList() {
    if (!editLoading) {
      dispatch(setupDeleteCheckList(checkListId));
    }
  }

  React.useEffect(() => {
    if (checkListAddSuccess) {
      setShowDeleteCheckListDialog(false);
    }
  }, [checkListAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Delete CheckList?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger float-start ${editLoading && "disabled"} `}
          onClick={handleDeleteCheckList}
        >
          {editLoading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary float-end"
          onClick={() => setShowDeleteCheckListDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteCheckListDialog;
