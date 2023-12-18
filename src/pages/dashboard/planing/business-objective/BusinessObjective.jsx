import React from "react";
import BusinessObjective from "../../../../components/admin/dashboard/planing/business-objective/index";
import { Helmet } from "react-helmet-async";

const BusinessObjectivePage = () => {
  return (
    <div>
      <Helmet>
        <title>Business Objective</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <BusinessObjective />
    </div>
  );
};

export default BusinessObjectivePage;
