import React from "react";
import ReportingPage from "../../reporting-follow-up/reporting/index";

const Reporting = () => {
  return (
    <div
      className="tab-pane fade"
      id="nav-reporting"
      role="tabpanel"
      aria-labelledby="nav-reporting-tab"
    >
      <ReportingPage />
    </div>
  );
};

export default Reporting;
