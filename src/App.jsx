import React, { useEffect, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { changeCompany } from "./global-redux/reducers/common/slice";
import { changeAuthUser } from "./global-redux/reducers/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { changeYear } from "./global-redux/reducers/common/slice";
import "react-toastify/dist/ReactToastify.css";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "./global-redux/reducers/common/slice";
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import ForgetPassword from "./pages/auth/forget-password/ForgetPassword";
import DashboardHome from "./pages/dashboard/home/DashboardHome";
import BusinessObjective from "./pages/dashboard/planning/business-objective/BusinessObjective";
import RiskAssessments from "./pages/dashboard/planning/risk-assessments/RiskAssessments";
import AuditableUnits from "./pages/dashboard/planning/auditable-units/AuditableUnits";
import JobPrioritization from "./pages/dashboard/planning/job-prioritization/JobPrioritization";
import JobSecheduling from "./pages/dashboard/planning/job-scheduling/JobSeheduling";
import AuditPlanSummary from "./pages/dashboard/planning/audit-plan-summary/AuditPlanSummary";
import AuditEngagement from "./pages/dashboard/audit-engagement/AuditEngagement";
import PreviousObservation from "./pages/dashboard/planning/business-objective/previous-observation/PreviousObservation";
import ViewRiskAssessment from "./pages/dashboard/planning/risk-assessments/view-risk-assessment/ViewRiskAssessment";
import PlanningReport from "./pages/dashboard/reports/planning-report/PlanningReport";
import ViewJobschedule from "./pages/dashboard/planning/job-scheduling/view-job-schedule/ViewJobschedule";
import ViewResource from "./pages/dashboard/planning/job-scheduling/view-resource/ViewResource";
import GeneratePlanningReport from "./pages/dashboard/reports/planning-report/generate-planning-report/GeneratePlanningReport";
import UpdatePlanningReport from "./pages/dashboard/reports/planning-report/update-planning-report/UpdatePlanningReport";
import ViewPlanningReport from "./pages/dashboard/reports/planning-report/view-planning-report/ViewPlanningReport";
import StartScheduling from "./pages/dashboard/planning/job-scheduling/start-scheduling/StartScheduling";
import BusinessObjectiveRedirect from "./pages/dashboard/planning/business-objective/business-objectives-redirect/BusinessObjectiveRedirect";
import InformationRequest from "./pages/dashboard/tasks/information-request/InformationRequest";
import TaskManagement from "./pages/dashboard/tasks/task-management/TaskManagement";
import SpecialProjectAudit from "./pages/dashboard/planning/business-objective/special-project-audit/SpecialProjectAudit";
import ComplianceCheckListCard from "./pages/dashboard/planning/business-objective/compliance-checklist-card/ComplianceCheckListCard";
import UserProfile from "./components/user/user-profile/UserProfile";
import KickOff from "./pages/dashboard/audit-engagement/kick-off/KickOff";
import RiskFactorApproach from "./pages/dashboard/planning/risk-assessments/risk-factor-approach/RiskFactorApproach";
import Reporting from "./pages/dashboard/reporting-follow-up/reporting/Reporting";
import FollowUp from "./pages/dashboard/reporting-follow-up/follow-up/FollowUp";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import AuditParticulars from "./pages/dashboard/reporting-follow-up/reporting/reporting-particulars/ReportingParticulars";
import FollowUpParticulars from "./pages/dashboard/reporting-follow-up/follow-up/follow-up-particulars/FollowUpParticulars";
import AuditSettings from "./pages/dashboard/audit-settings/AuditSettings";
import InternalAuditReport from "./pages/dashboard/reports/internal-audit-report/InternalAuditReport";
import ViewInternalAuditReport from "./pages/dashboard/reports/internal-audit-report/view-internal-audit-report/ViewInternalAuditReport";
import UpdateInternalAuditReport from "./pages/dashboard/reports/internal-audit-report/update-internal-audit-report/UpdateInternalAuditReport";
import Layout from "./components/common/layout/Layout";
import GenerateInternalAuditReport from "./pages/dashboard/reports/internal-audit-report/generate-internal-audit-report/GenerateInternalAuditReport";
import JobTimeAllocation from "./pages/dashboard/reports/job-time-allocation/JobTimeAllocation";
import AuditPlaningSummary from "./pages/dashboard/reports/audit-planing-summary/AuditPlaningSummary";
import AuditException from "./pages/dashboard/reports/audit-exception/AuditException";
import InternalAuditConsolidationReport from "./pages/dashboard/reports/internal-audit-consolidation-report/InternalAuditConsolidationReport";
import GenerateInternalAuditConsolidationReport from "./pages/dashboard/reports/internal-audit-consolidation-report/generate-internal-audit-consolidation-report/GenerateInternalAuditConsolidationReport";
import ViewInternalAuditConsolidationReport from "./pages/dashboard/reports/internal-audit-consolidation-report/view-internal-audit-consolidation-report/ViewInternalAuditConsolidationReport";
import UpdateInternalAuditConsolidationReport from "./pages/dashboard/reports/internal-audit-consolidation-report/update-internal-audit-consolidation-report/UpdateInternalAuditConsolidationReport";
import ProtectedRoute from "./components/common/layout/ProtectedRoute";
import NotFound from "./components/common/not-found/index";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route
            path="/audit"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="business-objective" element={<BusinessObjective />} />
            <Route path="risk-assessment" element={<RiskAssessments />} />
            <Route path="auditable-unit" element={<AuditableUnits />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route
              path="prioritization-and-finalization"
              element={<JobPrioritization />}
            />
            <Route path="job-scheduling" element={<JobSecheduling />} />
            <Route path="audit-plan-summary" element={<AuditPlanSummary />} />
            <Route path="audit-engagement" element={<AuditEngagement />} />
            <Route
              path="previous-observation"
              element={<PreviousObservation />}
            />
            <Route path="planning-report" element={<PlanningReport />} />
            <Route
              path="view-risk-assesment"
              element={<ViewRiskAssessment />}
            />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="view-job-scheduling" element={<ViewJobschedule />} />
            <Route path="view-resource" element={<ViewResource />} />
            <Route
              path="generate-planning-report"
              element={<GeneratePlanningReport />}
            />
            <Route
              path="update-planning-report"
              element={<UpdatePlanningReport />}
            />
            <Route
              path="view-planning-report"
              element={<ViewPlanningReport />}
            />
            <Route
              path="information-request"
              element={<InformationRequest />}
            />
            <Route path="start-scheduling" element={<StartScheduling />} />
            <Route
              path="business-objectives-redirect"
              element={<BusinessObjectiveRedirect />}
            />

            <Route
              path="special-project-audit"
              element={<SpecialProjectAudit />}
            />
            <Route
              path="compliance-checklist-card"
              element={<ComplianceCheckListCard />}
            />
            <Route path="kick-off" element={<KickOff />} />

            <Route
              path="risk-factor-approach"
              element={<RiskFactorApproach />}
            />
            <Route
              path="reporting-particulars"
              element={<AuditParticulars />}
            />
            <Route path="follow-up" element={<FollowUp />} />
            <Route path="reportings" element={<Reporting />} />
            <Route
              path="follow-up-particulars"
              element={<FollowUpParticulars />}
            />
            <Route path="audit-settings" element={<AuditSettings />} />
            <Route
              path="internal-audit-report"
              element={<InternalAuditReport />}
            />
            <Route
              path="generate-internal-audit-report"
              element={<GenerateInternalAuditReport />}
            />
            <Route
              path="view-internal-audit-report"
              element={<ViewInternalAuditReport />}
            />
            <Route
              path="update-internal-audit-report"
              element={<UpdateInternalAuditReport />}
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
              element={<JobTimeAllocation />}
            />
            <Route
              path="audit-planning-summary-report"
              element={<AuditPlaningSummary />}
            />
            <Route path="audit-exception-report" element={<AuditException />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
