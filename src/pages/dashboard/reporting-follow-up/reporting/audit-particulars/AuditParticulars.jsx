import React from "react";
import AuditParticulars from "../../../../../components/admin/dashboard/reporting-follow-up/reporting/reporting-particulars/index";
import { Helmet } from "react-helmet";

const AuditParticularsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Audit Particulars</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <AuditParticulars />
    </div>
  );
};

export default AuditParticularsPage;
