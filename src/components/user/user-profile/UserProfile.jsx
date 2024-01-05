import React from "react";
import UserProfileDialog from "../../modals/user-profile-dialog/index";
import "./UserProfile.css";

const UserProfile = () => {
  const [updateUserDialog, setUpdateUserDialog] = React.useState(false);
  return (
    <div>
      {updateUserDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <UserProfileDialog setUpdateUserDialog={setUpdateUserDialog} />
          </div>
        </div>
      )}
      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">Password:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="password"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="1526626266"
              required="required"
            />
          </div>
        </div>
      </div>
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
            />
          </div>
        </div>
      </div>
      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">2 Factor Authentication:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>
      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">User Timeout:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-labeled btn-primary px-3  shadow col-lg-2"
        onClick={() => setUpdateUserDialog(true)}
      >
        Update
      </button>
    </div>
  );
};

export default UserProfile;
