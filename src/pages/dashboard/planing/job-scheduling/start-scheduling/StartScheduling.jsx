import React from "react";
import StartScheduling from "../../../../../components/admin/dashboard/planing/job-scheduling/start-scheduling/index";
import { Helmet } from "react-helmet";

const StartSchedulingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Start Scheduling</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <StartScheduling />
    </div>
  );
};

export default StartSchedulingPage;
