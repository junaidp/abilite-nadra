import React from "react";
import BusinessProcess from "../../../../../components/admin/dashboard/planing/business-objective/business-process/index";
import { Helmet } from "react-helmet";

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
