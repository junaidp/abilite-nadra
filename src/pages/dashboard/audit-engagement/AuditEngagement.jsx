import React from "react";
import AuditEngagement from "../../../components/admin/dashboard/audit-engagement";
import { Helmet } from "react-helmet";

const AuditEngagementPage = () => {
  return (
    <div>
      <Helmet>
        <title>Audit Engagement</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <AuditEngagement />
    </div>
  );
};

export default AuditEngagementPage;
