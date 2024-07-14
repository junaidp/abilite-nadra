import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteUser } from "../../../../../global-redux/reducers/settings/user-management/slice";

const DeleteUserDialog = ({ setUserDeleteDialog, currentUserId }) => {
  const dispatch = useDispatch();
  const { loading, addUserSuccess } = useSelector(
    (state) => state?.settingsUserManagement
  );

  function handleDeleteUser() {
    if (!loading) {
      dispatch(setupDeleteUser(Number(currentUserId)));
    }
  }

  React.useEffect(() => {
    if (addUserSuccess) {
      setUserDeleteDialog(false);
    }
  }, [addUserSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete this user?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteUser}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setUserDeleteDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserDialog;
