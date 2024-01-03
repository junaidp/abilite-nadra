import React from "react";
import DashboardHome from "../../../components/dashboard/home/index";
import { Helmet, HelmetProvider } from "react-helmet-async";

const DashboardHomePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard Home</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <DashboardHome />
    </HelmetProvider>
  );
};

export default DashboardHomePage;
