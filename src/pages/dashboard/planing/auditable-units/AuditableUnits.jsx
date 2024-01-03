import React from "react";
import AuditableUnits from "../../../../components/dashboard/planing/auditable-units/index";
import { Helmet } from "react-helmet-async";

const AuditableUnitsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Auditable Units</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <AuditableUnits />
    </div>
  );
};

export default AuditableUnitsPage;
