import React from "react";
import Reporting from "../../../../components/dashboard/reporting-follow-up/reporting/index";
import { Helmet } from "react-helmet-async";

const ReportingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Reporting</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <Reporting />
    </div>
  );
};

export default ReportingPage;
