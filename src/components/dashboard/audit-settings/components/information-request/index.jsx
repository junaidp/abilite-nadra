import React from "react";
import InformationRequestPage from "../../../tasks/information-request/index";

const InformationRequest = ({ currentSettingOption }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-information-request"
      role="tabpanel"
      aria-labelledby="nav-information-request-tab"
    >
      {currentSettingOption === "information-request" && <InformationRequestPage />}
    </div>
  );
};

export default InformationRequest;
