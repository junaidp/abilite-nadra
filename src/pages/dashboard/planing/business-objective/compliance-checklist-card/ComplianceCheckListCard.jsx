import React from "react";
import ComplianceCheckListCard from "../../../../../components/admin/dashboard/planing/business-objective/compliance-checklist-card/index";
import { Helmet } from "react-helmet-async";

const ComplianceCheckListCardPage = () => {
  return (
    <div>
      <Helmet>
        <title>Compliance CheckList</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <ComplianceCheckListCard />
    </div>
  );
};

export default ComplianceCheckListCardPage;
