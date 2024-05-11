import React from "react";
import UserDetails from "../../../user/user-profile/UserProfile";

const TaskManagement = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-user"
      role="tabpanel"
      aria-labelledby="nav-user-tab"
    >
      <UserDetails />
    </div>
  );
};

export default TaskManagement;
