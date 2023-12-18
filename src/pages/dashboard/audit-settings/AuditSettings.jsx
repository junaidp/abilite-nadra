import React from "react";
import AuditSettings from "../../../components/admin/dashboard/audit-settings/index";
import { Helmet } from "react-helmet-async";

const AuditSettingsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Audit Settings</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <AuditSettings />
    </div>
  );
};

export default AuditSettingsPage;
