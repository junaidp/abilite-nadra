import React from "react";
import InformationRequest from "../../../components/dashboard/information-request/index";
import { Helmet } from "react-helmet-async";

const InformationRequestPage = () => {
  return (
    <div>
      <Helmet>
        <title>Information Request</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <InformationRequest />
    </div>
  );
};

export default InformationRequestPage;
