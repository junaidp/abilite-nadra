import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteCheckList } from "../../../../../../global-redux/reducers/settings/check-list/slice";

const DeleteCheckListDialog = ({ setShowDeleteCheckListDialog }) => {
  const dispatch = useDispatch();
  const { checkListAddSuccess, editLoading, checkListId } = useSelector(
    (state) => state.setttingsCheckList
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
        <p>Are you sure you want to delete this CheckList?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${
              editLoading && "disabled"
            } `}
            onClick={handleDeleteCheckList}
          >
            {editLoading ? "editLoading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteCheckListDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCheckListDialog;
