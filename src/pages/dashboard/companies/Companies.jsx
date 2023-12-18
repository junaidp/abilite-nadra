import React from "react";
import Companies from "../../../components/admin/dashboard/companies/index";
import { Helmet } from "react-helmet-async";

const CompaniesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Comapanies</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <Companies />
    </div>
  );
};

export default CompaniesPage;
