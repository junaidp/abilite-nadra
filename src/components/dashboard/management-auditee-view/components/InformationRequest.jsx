import React from "react";
import InformationRequestPage from "../../tasks/information-request";

const InformationRequest = ({ tab }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-info"
      role="tabpanel"
      aria-labelledby="nav-info-tab"
    >
      {tab === "information-request" && <InformationRequestPage />}
    </div>
  );
};

export default InformationRequest;
