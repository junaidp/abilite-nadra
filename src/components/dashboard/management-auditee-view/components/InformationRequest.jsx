import React from "react";
import InformationRequestPage from "../../tasks/information-request/index";

const InformationRequest = ({ tab }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-information-request"
      role="tabpanel"
      aria-labelledby="nav-information-request-tab"
    >
      {tab === "informationRequest" && <InformationRequestPage />}
    </div>
  );
};

export default InformationRequest;
