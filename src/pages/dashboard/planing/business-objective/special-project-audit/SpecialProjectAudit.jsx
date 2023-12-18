import React from "react";
import SpecialProjectAudit from "../../../../../components/admin/dashboard/planing/business-objective/special-project-audit/index";
import { Helmet } from "react-helmet-async";

const SpecialProjectAuditPage = () => {
  return (
    <div>
      <Helmet>
        <title>Special Project Audit</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <SpecialProjectAudit />
    </div>
  );
};

export default SpecialProjectAuditPage;
