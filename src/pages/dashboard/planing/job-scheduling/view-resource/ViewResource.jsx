import React from "react";
import ViewResource from "../../../../../components/admin/dashboard/planing/job-scheduling/view-resource/index";
import { Helmet } from "react-helmet-async";

const ViewResourcePage = () => {
  return (
    <div>
      <Helmet>
        <title>View Resource</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <ViewResource />
    </div>
  );
};

export default ViewResourcePage;
