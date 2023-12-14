import React from "react";
import JobPrioritization from "../../../../components/admin/dashboard/planing/job-prioritization";
import { Helmet } from "react-helmet";

const JobPrioritizationPage = () => {
  return (
    <div>
      <Helmet>
        <title>Job Prioritization</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <JobPrioritization />
    </div>
  );
};

export default JobPrioritizationPage;
