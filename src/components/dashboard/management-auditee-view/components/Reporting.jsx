import React from "react";
import ReportingPage from "../../reporting-follow-up/reporting/index";

const Reporting = ({ tab }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-reporting"
      role="tabpanel"
      aria-labelledby="nav-reporting-tab"
    >
      {tab === "reporting" && <ReportingPage />}
    </div>
  );
};

export default Reporting;
