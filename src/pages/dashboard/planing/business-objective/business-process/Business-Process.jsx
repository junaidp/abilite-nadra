import React from "react";
import BusinessProcess from "../../../../../components/dashboard/planing/business-objective/business-process/index";
import { Helmet } from "react-helmet-async";

const BusinessProcessPage = () => {
  return (
    <div>
      <Helmet>
        <title>Business Process</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <BusinessProcess />
    </div>
  );
};

export default BusinessProcessPage;
