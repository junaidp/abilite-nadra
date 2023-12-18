import React from "react";
import JobScheduling from "../../../../components/admin/dashboard/planing/job-scheduling/index";
import { Helmet } from "react-helmet-async";

const JobSehedulingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Job Scheduling</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <JobScheduling />
    </div>
  );
};

export default JobSehedulingPage;
