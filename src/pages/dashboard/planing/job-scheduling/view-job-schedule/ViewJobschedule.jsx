import React from "react";
import ViewJobSchedule from "../../../../../components/dashboard/planing/job-scheduling/view-job-schedule/index";
import { Helmet } from "react-helmet-async";

const ViewJobSchedulePage = () => {
  return (
    <div>
      <Helmet>
        <title>View Job Schedule</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <ViewJobSchedule />;
    </div>
  );
};

export default ViewJobSchedulePage;
