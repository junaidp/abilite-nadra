import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { changeCompany } from "./global-redux/reducers/common/slice";
import { changeAuthUser } from "./global-redux/reducers/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { changeYear } from "./global-redux/reducers/common/slice";
import "react-toastify/dist/ReactToastify.css";
import { changeActiveLink } from "./global-redux/reducers/common/slice";
import { CircularProgress } from "@mui/material";

const Login = React.lazy(() => import("./pages/auth/login/Login"));
const ForgetPassword = React.lazy(() =>
  import("./pages/auth/forget-password/ForgetPassword")
);
const DashboardHomePage = React.lazy(() =>
  import("./pages/dashboard/home/DashboardHome")
);
const BusinessObjectivePage = React.lazy(() =>
  import("./pages/dashboard/planing/business-objective/BusinessObjective")
);
const RiskAssessmentsPage = React.lazy(() =>
  import("./pages/dashboard/planing/risk-assessments/RiskAssessments")
);
const AuditableUnitsPage = React.lazy(() =>
  import("./pages/dashboard/planing/auditable-units/AuditableUnits")
);
const JobPrioritizationPage = React.lazy(() =>
  import("./pages/dashboard/planing/job-prioritization/JobPrioritization")
);
const JobSechedulingPage = React.lazy(() =>
  import("./pages/dashboard/planing/job-scheduling/JobSecheduling")
);
const AuditPlanSummaryPage = React.lazy(() =>
  import("./pages/dashboard/planing/audit-plan-summary/AuditPlanSummary")
);
const AuditEngagementPage = React.lazy(() =>
  import("./pages/dashboard/audit-engagement/AuditEngagement")
);
const ViewRiskAssessmentPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/risk-assessments/view-risk-assessment/ViewRiskAssessment"
  )
);
const PlaningReportPage = React.lazy(() =>
  import("./pages/dashboard/report/planing-report/PlaningReport")
);
const ViewJobschedulePage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/job-scheduling/view-job-schedule/ViewJobschedule"
  )
);
const ViewResourcePage = React.lazy(() =>
  import("./pages/dashboard/planing/job-scheduling/view-resource/ViewResource")
);
const GeneratePlanningReportPage = React.lazy(() =>
  import(
    "./pages/dashboard/report/planing-report/generate-planing-report/GeneratePlanningReport"
  )
);
const StartSchedulingPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/job-scheduling/start-scheduling/StartScheduling"
  )
);
const BusinessObjectiveRedirectPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/business-objective/business-objectives-redirect/BusinessObjectiveRedirect"
  )
);
const InformationRequestPage = React.lazy(() =>
  import("./pages/dashboard/tasks/information-request/InformationRequest")
);
const BusinessProcessPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/business-objective/business-process/Business-Process"
  )
);
const TaskManagementPage = React.lazy(() =>
  import("./pages/dashboard/tasks/task-management/TaskManagement")
);
const SpecialProjectAuditPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/business-objective/special-project-audit/SpecialProjectAudit"
  )
);
const ComplianceCheckListCardPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/business-objective/compliance-checklist-card/ComplianceCheckListCard"
  )
);
const UserProfile = React.lazy(() =>
  import("./components/user/user-profile/UserProfile")
);
const KickOffPage = React.lazy(() =>
  import("./pages/dashboard/audit-engagement/kick-off/KickOff")
);
const SpecificRiskApproachPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/risk-assessments/specific-risk-approach/SpecificRiskApproach"
  )
);
const RiskFactorApproachPage = React.lazy(() =>
  import(
    "./pages/dashboard/planing/risk-assessments/risk-factor-approach/RiskFactorApproach"
  )
);
const ReportingPage = React.lazy(() =>
  import("./pages/dashboard/reporting-follow-up/reporting/Reporting")
);
const FollowUpPage = React.lazy(() =>
  import("./pages/dashboard/reporting-follow-up/follow-up/FollowUp")
);
const ResetPassword = React.lazy(() =>
  import("./components/auth/reset-password/ResetPassword")
);
const AuditParticularsPage = React.lazy(() =>
  import(
    "./pages/dashboard/reporting-follow-up/reporting/audit-particulars/AuditParticulars"
  )
);
const FollowUpParticularsPage = React.lazy(() =>
  import(
    "./pages/dashboard/reporting-follow-up/follow-up/follow-up-particulars/FollowUpParticulars"
  )
);
const AuditSettingsPage = React.lazy(() =>
  import("./pages/dashboard/audit-settings/AuditSettings")
);
const InternalAuditReportPage = React.lazy(() =>
  import("./pages/dashboard/report/internal-audit-report/InternalAuditReport")
);
const ViewInternalAuditReportPage = React.lazy(() =>
  import(
    "./components/dashboard/reports/internal-audit-report/view-internal-audit-report/index"
  )
);
const UpdateInternalAuditReportPage = React.lazy(() =>
  import(
    "./components/dashboard/reports/internal-audit-report/update-internal-audit-report/index"
  )
);
const Layout = React.lazy(() => import("./components/common/layout/Layout"));
const GenerateInternalAuditReportPage = React.lazy(() =>
  import(
    "./pages/dashboard/report/internal-audit-report/generate-internal-audit-report/GenerateInternalAuditReport"
  )
);
const JobTimeAllocationPage = React.lazy(() =>
  import("./pages/dashboard/report/job-time-allocation/JobTimeAllocation")
);
const AuditPlaningSummaryPage = React.lazy(() =>
  import("./pages/dashboard/report/audit-planing-summary/AuditPlaningSummary")
);
const AuditExceptionPage = React.lazy(() =>
  import("./pages/dashboard/report/audit-exception/AuditException")
);
const InternalAuditConsolidationReport = React.lazy(() =>
  import(
    "./components/dashboard/reports/internal-audit-consolidation-report/index"
  )
);
const GenerateInternalAuditConsolidationReport = React.lazy(() =>
  import(
    "./components/dashboard/reports/internal-audit-consolidation-report/generate-internal-audit-report"
  )
);
const ViewInternalAuditConsolidationReport = React.lazy(() =>
  import(
    "./components/dashboard/reports/internal-audit-consolidation-report/view-internal-audit-report"
  )
);
const UpdateInternalAuditConsolidationReport = React.lazy(() =>
  import(
    "./components/dashboard/reports/internal-audit-consolidation-report/update-internal-audit-report"
  )
);
const ProtectedRoute = React.lazy(() =>
  import("./components/common/layout/ProtectedRoute")
);
const NotFound = React.lazy(() =>
  import("./components/common/not-found/index")
);

const App = () => {
  const dispatch = useDispatch();
  const { menuItems } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("user"));
    if (authUser) {
      dispatch(changeAuthUser(authUser));
    }
  }, [dispatch]);

  useEffect(() => {
    const mainActiveLink = menuItems?.find(
      (item) => item?.route === window.location.pathname
    );
    if (mainActiveLink) {
      dispatch(changeActiveLink(mainActiveLink?.id));
    }
    if (!mainActiveLink) {
      const filteredItems = menuItems?.filter((item) => item?.subMenu);
      filteredItems.forEach((element) => {
        element?.subMenu?.forEach((subItem) => {
          if (subItem.route === window.location.pathname) {
            dispatch(changeActiveLink(subItem.id));
            dispatch(InitialLoadSidebarActiveLink(element?.id));
          }
        });
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user[0]?.token && user[0]?.company[0]?.companyName) {
      dispatch(changeCompany(user[0]?.company[0]?.companyName));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(changeYear("2024"));
  }, [dispatch]);

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="py-2 px-2">
              <CircularProgress />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <div className="p-2">
                  <h2>Redirecting...</h2>
                  <Navigate to="/login" />
                </div>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route
              path="/audit"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
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
              <Route
                path="audit-engagement"
                element={<AuditEngagementPage />}
              />
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
              <Route
                path="start-scheduling"
                element={<StartSchedulingPage />}
              />
              <Route
                path="business-objectives-redirect"
                element={<BusinessObjectiveRedirectPage />}
              />
              <Route
                path="business-process"
                element={<BusinessProcessPage />}
              />
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
              <Route
                path="view-internal-audit-report"
                element={<ViewInternalAuditReportPage />}
              />
              <Route
                path="update-internal-audit-report"
                element={<UpdateInternalAuditReportPage />}
              />
              <Route
                path="internal-audit-consolidation-report"
                element={<InternalAuditConsolidationReport />}
              />
              <Route
                path="generate-internal-audit-consolidation-report"
                element={<GenerateInternalAuditConsolidationReport />}
              />
              <Route
                path="view-internal-audit-consolidation-report"
                element={<ViewInternalAuditConsolidationReport />}
              />
              <Route
                path="update-internal-audit-consolidation-report"
                element={<UpdateInternalAuditConsolidationReport />}
              />
              <Route
                path="job-time-allocation-report"
                element={<JobTimeAllocationPage />}
              />
              <Route
                path="audit-planning-summary-report"
                element={<AuditPlaningSummaryPage />}
              />
              <Route
                path="audit-exception-report"
                element={<AuditExceptionPage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
