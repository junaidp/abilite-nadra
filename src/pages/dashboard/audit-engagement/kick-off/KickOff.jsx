import React from "react";
import KinkOff from "../../../../components/admin/dashboard/audit-engagement/kick-off/index";
import { Helmet } from "react-helmet";
const KickOffPage = () => {
  return (
    <div>
      <Helmet>
        <title>Kick Off</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <KinkOff />
    </div>
  );
};

export default KickOffPage;
