import React from "react";
import JobPrioritization from "../../../../components/dashboard/planing/job-prioritization";
import { Helmet } from "react-helmet-async";

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
