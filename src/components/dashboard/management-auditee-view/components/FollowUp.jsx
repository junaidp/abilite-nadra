import React from "react";
import FollowUpPage from "../../reporting-follow-up/follow-up/index";

const FollowUp = ({ tab }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-follow-up"
      role="tabpanel"
      aria-labelledby="nav-follow-up-tab"
    >
      {tab === "followUp" && <FollowUpPage />}
    </div>
  );
};

export default FollowUp;
