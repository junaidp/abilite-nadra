import React from "react";
import UserProfileDialog from "../../modals/user-profile-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import {
  resetUpdateUserNameSuccess,
  setupUpdateUserName,
  updateUserState,
} from "../../../global-redux/reducers/auth/slice";
import { toast } from "react-toastify";

const UserProfile = () => {
  let { user, userNameUpdateSuccess, loading } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = React.useState(user[0]?.name || "");
  const [updateUserDialog, setUpdateUserDialog] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userNameUpdateSuccess) {
      dispatch(resetUpdateUserNameSuccess());
      dispatch(updateUserState(name));
    }
  }, [userNameUpdateSuccess]);

  function handleUpdateUser() {
    if (name === "") {
      toast.error("Provide the name");
    }
    if (name && !loading) {
      dispatch(
        setupUpdateUserName(`?emailid=${user[0]?.userId?.email}&name=${name}`)
      );
    }
  }

  React.useEffect(() => {
    if (user[0]?.name) {
      setName(user[0]?.name);
    }
  }, [user]);

  return (
    <div>
      {updateUserDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <UserProfileDialog setUpdateUserDialog={setUpdateUserDialog} />
          </div>
        </div>
      )}

      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">Email:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="john@gmail.com"
              required="required"
              value={user[0]?.email}
            />
          </div>
        </div>
      </div>
      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">Name:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="john@gmail.com"
              required="required"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="rows">
        <button
          className="btn btn-labeled btn-primary px-3  shadow col-lg-2 mr-2"
          onClick={() => setUpdateUserDialog(true)}
        >
          Reset Password
        </button>
        <button
          className={`btn btn-labeled btn-primary px-3  shadow col-lg-2 mx-2 ${
            loading && "disabled"
          }`}
          onClick={handleUpdateUser}
        >
          {loading ? "Loading" : "Update Name"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
