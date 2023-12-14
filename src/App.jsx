import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Register from "./pages/auth/register/Register";
import { Helmet } from "react-helmet";
import Login from "./pages/auth/login/Login";
import logo from "./assets/favicon.ico";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/auth/forget-password/ForgetPassword";
import DashboardHomePage from "./pages/dashboard/home/DashboardHome";
import PLaningHomePage from "./pages/dashboard/planing/home/PlaningHome";
import BusinessObjectivePage from "./pages/dashboard/planing/business-objective/BusinessObjective";
import RiskAssessmentsPage from "./pages/dashboard/planing/risk-assessments/RiskAssessments";
import AuditableUnitsPage from "./pages/dashboard/planing/auditable-units/AuditableUnits";
import JobPrioritizationPage from "./pages/dashboard/planing/job-prioritization/JobPrioritization";
import JobSechedulingPage from "./pages/dashboard/planing/job-scheduling/JobSecheduling";
import AuditPlanSummaryPage from "./pages/dashboard/planing/audit-plan-summary/AuditPlanSummary";
import AuditEngagementPage from "./pages/dashboard/audit-engagement/AuditEngagement";
import ReportingFollowUpPage from "./pages/dashboard/reporting-follow-up/Reporting";
import ViewRiskAssessmentPage from "./pages/dashboard/planing/risk-assessments/view-risk-assessment/ViewRiskAssessment";
import PlaningReportPage from "./pages/dashboard/report/planing-report/PlaningReport";
import ViewJobschedulePage from "./pages/dashboard/planing/job-scheduling/view-job-schedule/ViewJobschedule";
import ViewResourcePage from "./pages/dashboard/planing/job-scheduling/view-resource/ViewResource";
import GeneratePlanningReportPage from "./pages/dashboard/report/planing-report/generate-planing-report/GeneratePlanningReport";
import StartSchedulingPage from "./pages/dashboard/planing/job-scheduling/start-scheduling/StartScheduling";
import BusinessObjectiveRedirectPage from "./pages/dashboard/planing/business-objective/business-objectives-redirect/BusinessObjectiveRedirect";
import BusinessProcessPage from "./pages/dashboard/planing/business-objective/business-process/Business-Process";
import SpecialProjectAuditPage from "./pages/dashboard/planing/business-objective/special-project-audit/SpecialProjectAudit";
import ComplianceCheckListCardPage from "./pages/dashboard/planing/business-objective/compliance-checklist-card/ComplianceCheckListCard";
import KickOffPage from "./pages/dashboard/audit-engagement/kick-off/KickOff";
import SpecificRiskApproachPage from "./pages/dashboard/planing/risk-assessments/specific-risk-approach/SpecificRiskApproach";
import RiskFactorApproachPage from "./pages/dashboard/planing/risk-assessments/risk-factor-approach/RiskFactorApproach";
import ReportingPage from "./pages/dashboard/reporting-follow-up/reporting/Reporting";
import FollowUpPage from "./pages/dashboard/reporting-follow-up/follow-up/FollowUp";
import ResetPassword from "./components/auth/reset-password/ResetPassword";
import AuditParticularsPage from "./pages/dashboard/reporting-follow-up/reporting/audit-particulars/AuditParticulars";
import FollowUpParticularsPage from "./pages/dashboard/reporting-follow-up/follow-up/follow-up-particulars/FollowUpParticulars";
import AuditSettingsPage from "./pages/dashboard/audit-settings/AuditSettings";
import InternalAuditReportPage from "./pages/dashboard/report/internal-audit-report/InternalAuditReport";
import GenerateInternalAuditReportPage from "./pages/dashboard/report/internal-audit-report/generate-internal-audit-report/GenerateInternalAuditReport";
import CompaniesPage from "./pages/dashboard/companies/Companies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { changeAuthUser } from "./global-redux/reducers/auth/slice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  let { user } = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  React.useEffect(() => {
    let authUser = JSON.parse(localStorage.getItem("user"));
    if (authUser) {
      dispatch(changeAuthUser(authUser));
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>Abilite</title>
        <link rel="icon" href={logo} />
      </Helmet>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/audit/dashboard" element={<DashboardHomePage />} />
          <Route
            path="/audit/report-audit-planning-and-scheduling"
            element={<PLaningHomePage />}
          />
          <Route
            path="/audit/business-objective"
            element={<BusinessObjectivePage />}
          />
          <Route
            path="/audit/risk-assessment"
            element={<RiskAssessmentsPage />}
          />
          <Route
            path="/audit/auditable-unit"
            element={<AuditableUnitsPage />}
          />
          <Route
            path="/audit/prioritization-and-finalization"
            element={<JobPrioritizationPage />}
          />
          <Route
            path="/audit/job-scheduling"
            element={<JobSechedulingPage />}
          />
          <Route
            path="/audit/audit-plan-summary"
            element={<AuditPlanSummaryPage />}
          />
          <Route
            path="/audit/audit-engagement"
            element={<AuditEngagementPage />}
          />
          <Route
            path="/audit/reporting-and-followup"
            element={<ReportingFollowUpPage />}
          />
          <Route
            path="/audit/planning-report"
            element={<PlaningReportPage />}
          />
          <Route
            path="/audit/view-risk-assesment"
            element={<ViewRiskAssessmentPage />}
          />
          <Route
            path="/audit/view-job-scheduling"
            element={<ViewJobschedulePage />}
          />
          <Route path="/audit/view-resource" element={<ViewResourcePage />} />
          <Route
            path="/audit/generate-planning-report"
            element={<GeneratePlanningReportPage />}
          />
          <Route
            path="/audit/start-scheduling"
            element={<StartSchedulingPage />}
          />
          <Route
            path="/audit/business-objectives-redirect"
            element={<BusinessObjectiveRedirectPage />}
          />
          <Route
            path="/audit/business-process"
            element={<BusinessProcessPage />}
          />
          <Route
            path="/audit/special-project-audit"
            element={<SpecialProjectAuditPage />}
          />
          <Route
            path="/audit/compliance-checklist-card"
            element={<ComplianceCheckListCardPage />}
          />
          <Route path="/audit/kick-off" element={<KickOffPage />} />
          <Route
            path="/audit/specific-risk-approach"
            element={<SpecificRiskApproachPage />}
          />
          <Route
            path="/audit/risk-factor-approach"
            element={<RiskFactorApproachPage />}
          />
          <Route
            path="/audit/reporting-particulars"
            element={<AuditParticularsPage />}
          />
          <Route path="/audit/follow-up" element={<FollowUpPage />} />
          <Route path="/audit/reportings" element={<ReportingPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/audit/follow-up-particulars"
            element={<FollowUpParticularsPage />}
          />
          <Route path="/audit/audit-settings" element={<AuditSettingsPage />} />
          <Route path="/audit/companies" element={<CompaniesPage />} />
          <Route
            path="/audit/internal-audit-report"
            element={<InternalAuditReportPage />}
          />
          <Route
            path="/audit/generate-internal-audit-report"
            element={<GenerateInternalAuditReportPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
