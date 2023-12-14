import React from "react";
import ReportingFollowUp from "../../../components/admin/dashboard/reporting-follow-up/index";
import { Helmet } from "react-helmet";

const ReportingFollowUpPage = () => {
  return (
    <div>
      <Helmet>
        <title>Reporting Follow Up</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <ReportingFollowUp />
    </div>
  );
};

export default ReportingFollowUpPage;
