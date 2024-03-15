import React from "react";
import InformationRequestPage from "../../information-request/index";

const InformationRequest = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-information-request"
      role="tabpanel"
      aria-labelledby="nav-information-request-tab"
    >
      <InformationRequestPage />
    </div>
  );
};

export default InformationRequest;
