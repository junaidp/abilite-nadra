import React from "react";
import FollowUp from "../../../../components/dashboard/reporting-follow-up/follow-up/index";
import { Helmet } from "react-helmet-async";

const FollowUpPage = () => {
  return (
    <div>
      <Helmet>
        <title>Follow Up</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <FollowUp />
    </div>
  );
};

export default FollowUpPage;
