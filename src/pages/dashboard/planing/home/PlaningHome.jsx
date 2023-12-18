import React from "react";
import PlaningHome from "../../../../components/admin/dashboard/planing/home/index";
import { Helmet } from "react-helmet-async";

const PlaningHomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Planing Home</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <PlaningHome />
    </div>
  );
};

export default PlaningHomePage;
