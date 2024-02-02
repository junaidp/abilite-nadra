import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { changeCompany } from "./global-redux/reducers/common/slice";
import "./App.css";
import logo from "./assets/favicon.ico";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/auth/forget-password/ForgetPassword";
import DashboardHomePage from "./pages/dashboard/home/DashboardHome";
import BusinessObjectivePage from "./pages/dashboard/planing/business-objective/BusinessObjective";
import RiskAssessmentsPage from "./pages/dashboard/planing/risk-assessments/RiskAssessments";
import AuditableUnitsPage from "./pages/dashboard/planing/auditable-units/AuditableUnits";
import JobPrioritizationPage from "./pages/dashboard/planing/job-prioritization/JobPrioritization";
import JobSechedulingPage from "./pages/dashboard/planing/job-scheduling/JobSecheduling";
import AuditPlanSummaryPage from "./pages/dashboard/planing/audit-plan-summary/AuditPlanSummary";
import AuditEngagementPage from "./pages/dashboard/audit-engagement/AuditEngagement";
import ViewRiskAssessmentPage from "./pages/dashboard/planing/risk-assessments/view-risk-assessment/ViewRiskAssessment";
import PlaningReportPage from "./pages/dashboard/report/planing-report/PlaningReport";
import ViewJobschedulePage from "./pages/dashboard/planing/job-scheduling/view-job-schedule/ViewJobschedule";
import ViewResourcePage from "./pages/dashboard/planing/job-scheduling/view-resource/ViewResource";
import GeneratePlanningReportPage from "./pages/dashboard/report/planing-report/generate-planing-report/GeneratePlanningReport";
import StartSchedulingPage from "./pages/dashboard/planing/job-scheduling/start-scheduling/StartScheduling";
import BusinessObjectiveRedirectPage from "./pages/dashboard/planing/business-objective/business-objectives-redirect/BusinessObjectiveRedirect";
import InformationRequestPage from "./pages/dashboard/information-request/InformationRequest";
import BusinessProcessPage from "./pages/dashboard/planing/business-objective/business-process/Business-Process";
import TaskManagementPage from "./pages/dashboard/task-management/TaskManagement";
import SpecialProjectAuditPage from "./pages/dashboard/planing/business-objective/special-project-audit/SpecialProjectAudit";
import ComplianceCheckListCardPage from "./pages/dashboard/planing/business-objective/compliance-checklist-card/ComplianceCheckListCard";
import UserProfile from "./components/user/user-profile/UserProfile";
import KickOffPage from "./pages/dashboard/audit-engagement/kick-off/KickOff";
import SpecificRiskApproachPage from "./pages/dashboard/planing/risk-assessments/specific-risk-approach/SpecificRiskApproach";
import RiskFactorApproachPage from "./pages/dashboard/planing/risk-assessments/risk-factor-approach/RiskFactorApproach";
import RegisterPage from "./pages/auth/register/Register";
import ReportingPage from "./pages/dashboard/reporting-follow-up/reporting/Reporting";
import FollowUpPage from "./pages/dashboard/reporting-follow-up/follow-up/FollowUp";
import ResetPassword from "./components/auth/reset-password/ResetPassword";
import AuditParticularsPage from "./pages/dashboard/reporting-follow-up/reporting/audit-particulars/AuditParticulars";
import FollowUpParticularsPage from "./pages/dashboard/reporting-follow-up/follow-up/follow-up-particulars/FollowUpParticulars";
import AuditSettingsPage from "./pages/dashboard/audit-settings/AuditSettings";
import InternalAuditReportPage from "./pages/dashboard/report/internal-audit-report/InternalAuditReport";
import Layout from "./components/common/layout/Layout";
import GenerateInternalAuditReportPage from "./pages/dashboard/report/internal-audit-report/generate-internal-audit-report/GenerateInternalAuditReport";
import { changeAuthUser } from "./global-redux/reducers/auth/slice";

import { useDispatch, useSelector } from "react-redux";
import { changeYear } from "./global-redux/reducers/common/slice";
import "react-toastify/dist/ReactToastify.css";
import {
  InitialLoadSidebarActiveLink,
  changeActiveLink,
} from "./global-redux/reducers/common/slice";

const App = () => {
  let dispatch = useDispatch();
  let { menuItems, year } = useSelector((state) => state.common);
  let { user } = useSelector((state) => state.auth);
  let { company } = useSelector((state) => state.common);
  React.useEffect(() => {
    let authUser = JSON.parse(localStorage.getItem("user"));
    if (authUser) {
      dispatch(changeAuthUser(authUser));
    }
  }, []);

  React.useEffect(() => {
    let mainActiveLink = menuItems?.find(
      (item) => item?.route === window.location.pathname
    );
    if (mainActiveLink) {
      dispatch(changeActiveLink(mainActiveLink?.id));
    }
    if (!mainActiveLink) {
      let filteredItems = menuItems?.filter((item) => item?.subMenu);
      filteredItems.forEach((element) => {
        element?.subMenu?.map((subItem) => {
          if (subItem.route === window.location.pathname) {
            dispatch(changeActiveLink(subItem.id));
            dispatch(InitialLoadSidebarActiveLink(element?.id));
          }
        });
      });
    }
    dispatch(InitialLoadSidebarActiveLink());
  }, []);
  React.useEffect(() => {
    if (user[0]?.company[0]?.companyName) {
      dispatch(changeCompany(user[0]?.company[0]?.companyName));
    }
  }, [user]);

  React.useEffect(() => {
    if (year === "") {
      dispatch(changeYear("2024"));
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Abilite</title>
        <link rel="icon" href={logo} />
      </Helmet>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/audit" element={<Layout />}>
            <Route path="dashboard" element={<DashboardHomePage />} />
            <Route
              path="business-objective"
              element={<BusinessObjectivePage />}
            />
            <Route path="risk-assessment" element={<RiskAssessmentsPage />} />
            <Route path="auditable-unit" element={<AuditableUnitsPage />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route
              path="prioritization-and-finalization"
              element={<JobPrioritizationPage />}
            />
            <Route path="job-scheduling" element={<JobSechedulingPage />} />
            <Route
              path="audit-plan-summary"
              element={<AuditPlanSummaryPage />}
            />
            <Route path="audit-engagement" element={<AuditEngagementPage />} />
            <Route path="planning-report" element={<PlaningReportPage />} />
            <Route
              path="view-risk-assesment"
              element={<ViewRiskAssessmentPage />}
            />
            <Route path="task-management" element={<TaskManagementPage />} />
            <Route
              path="view-job-scheduling"
              element={<ViewJobschedulePage />}
            />
            <Route path="view-resource" element={<ViewResourcePage />} />
            <Route
              path="generate-planning-report"
              element={<GeneratePlanningReportPage />}
            />
            <Route
              path="information-request"
              element={<InformationRequestPage />}
            />
            <Route path="start-scheduling" element={<StartSchedulingPage />} />
            <Route
              path="business-objectives-redirect"
              element={<BusinessObjectiveRedirectPage />}
            />
            <Route path="business-process" element={<BusinessProcessPage />} />
            <Route
              path="special-project-audit"
              element={<SpecialProjectAuditPage />}
            />
            <Route
              path="compliance-checklist-card"
              element={<ComplianceCheckListCardPage />}
            />
            <Route path="kick-off" element={<KickOffPage />} />
            <Route
              path="specific-risk-approach"
              element={<SpecificRiskApproachPage />}
            />
            <Route
              path="risk-factor-approach"
              element={<RiskFactorApproachPage />}
            />
            <Route
              path="reporting-particulars"
              element={<AuditParticularsPage />}
            />
            <Route path="follow-up" element={<FollowUpPage />} />
            <Route path="reportings" element={<ReportingPage />} />
            <Route
              path="follow-up-particulars"
              element={<FollowUpParticularsPage />}
            />
            <Route path="audit-settings" element={<AuditSettingsPage />} />
            <Route
              path="internal-audit-report"
              element={<InternalAuditReportPage />}
            />
            <Route
              path="generate-internal-audit-report"
              element={<GenerateInternalAuditReportPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
