import React from "react";
import BusinessObjectiveRedirect from "../../../../../components/dashboard/planing/business-objective/business-objective-redirect/index";
import { Helmet } from "react-helmet-async";

const BusinessObjectiveRedirectPage = () => {
  return (
    <div>
      <Helmet>
        <title>Business Objective Redirect</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <BusinessObjectiveRedirect />
    </div>
  );
};

export default BusinessObjectiveRedirectPage;
