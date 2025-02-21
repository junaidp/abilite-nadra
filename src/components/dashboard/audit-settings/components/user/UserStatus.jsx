import React from "react";
import { useSelector } from "react-redux";
import {
  setupUpdateUser,
  resetAddUserSuccess,
} from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useDispatch } from "react-redux";

const UserAccountStatusDialog = ({
  text,
  setShowUserAccounStatus,
  updateUserObject,
}) => {
  const dispatch = useDispatch();
  const { addUserSuccess, loading, allUsers } = useSelector(
    (state) => state.settingsUserManagement
  );

  function handleSubmit() {
    const currentUserObject = allUsers?.find(
      (all) => Number(all?.id) === Number(updateUserObject?.id)
    );
    if (!loading) {
      dispatch(
        setupUpdateUser({
          ...currentUserObject,
          name: currentUserObject?.employeeid?.name,
          userDto: {
            userName: currentUserObject?.employeeid?.name,
            companyId: currentUserObject?.company[0]?.id,
            erp: updateUserObject?.erp,
          },
          employeeid: {
            ...currentUserObject?.employeeid,
            name: currentUserObject?.employeeid?.name,
          },
          accountStatus: updateUserObject?.accountStatus === 1 ? 0 : 1,
        })
      );
    }
  }

  React.useEffect(() => {
    if (addUserSuccess) {
      setTimeout(() => {
        dispatch(resetAddUserSuccess());
        setShowUserAccounStatus(false);
      }, 500);
    }
  }, [addUserSuccess]);

  return (
    <div className="px-4 py-4">
      <div>
        <p>{text}</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger float-start ${loading && "disabled"} `}
          onClick={handleSubmit}
        >
          {updateUserObject?.accountStatus === 1
            ? "Disable User"
            : "Enable User"}
        </button>
        <button
          type="button"
          className="btn btn-primary float-end"
          onClick={() => setShowUserAccounStatus(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserAccountStatusDialog;
