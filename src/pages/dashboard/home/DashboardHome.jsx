import React from "react";
import DashboardHome from "../../../components/admin/dashboard/home/index";
import { Helmet } from "react-helmet";

const DashboardHomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard Home</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <DashboardHome />
    </div>
  );
};

export default DashboardHomePage;
