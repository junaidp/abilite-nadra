import React from "react";
import UserDetails from "../../../../user/user-profile/UserProfile";

const UserInfo = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-user-info"
      role="tabpanel"
      aria-labelledby="nav-user-info-tab"
    >
      <UserDetails />
    </div>
  );
};

export default UserInfo;
