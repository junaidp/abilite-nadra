import React from "react";
import FollowUpPage from "../../reporting-follow-up/follow-up/index";

const FollowUp = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-follow-up"
      role="tabpanel"
      aria-labelledby="nav-follow-up-tab"
    >
      <FollowUpPage />
    </div>
  );
};

export default FollowUp;
