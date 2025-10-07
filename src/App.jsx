import React, { useEffect } from "react";
import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { changeCompany } from "./global-redux/reducers/common/slice";
import { changeAuthUser } from "./global-redux/reducers/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { changeYear } from "./global-redux/reducers/common/slice";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import DashboardHome from "./pages/dashboard/home/DashboardHome";
import BusinessObjective from "./pages/dashboard/planning/business-objective/BusinessObjective";
import RiskAssessments from "./pages/dashboard/planning/risk-assessments/RiskAssessments";
import AuditableUnits from "./pages/dashboard/planning/auditable-units/AuditableUnits";
import JobPrioritization from "./pages/dashboard/planning/job-prioritization/JobPrioritization";
import JobSecheduling from "./pages/dashboard/planning/job-scheduling/JobSeheduling";
import AuditPlanSummary from "./pages/dashboard/planning/audit-plan-summary/AuditPlanSummary";
import AuditEngagement from "./pages/dashboard/audit-engagement/AuditEngagement";
import PlanningReport from "./pages/dashboard/reports/planning-report/PlanningReport";
import ViewJobschedule from "./pages/dashboard/planning/job-scheduling/view-job-schedule/ViewJobschedule";
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
import AuditParticulars from "./pages/dashboard/reporting-follow-up/reporting/reporting-particulars/ReportingParticulars";
import FollowUpParticulars from "./pages/dashboard/reporting-follow-up/follow-up/follow-up-particulars/FollowUpParticulars";
import AuditSettings from "./pages/dashboard/audit-settings/AuditSettings";
import InternalAuditReport from "./pages/dashboard/reports/internal-audit-report/InternalAuditReport";
import ViewInternalAuditReport from "./pages/dashboard/reports/internal-audit-report/view-internal-audit-report/ViewInternalAuditReport";
import UpdateInternalAuditReport from "./pages/dashboard/reports/internal-audit-report/update-internal-audit-report/UpdateInternalAuditReport";
import Layout from "./components/common/layout/Layout";
import GenerateInternalAuditReport from "./pages/dashboard/reports/internal-audit-report/generate-internal-audit-report/GenerateInternalAuditReport";


import JobTimeAllocationReport from "./pages/dashboard/reports/job-time-allocation-report/JobTimeAllocationReport";
import AuditPlanSummaryReport from "./pages/dashboard/reports/audit-plan-summary-report/AuditPlanSummaryReport";
import AuditExceptionReport from "./pages/dashboard/reports/audit-exception-report/AuditExceptionReport";
import RiskAssessmentReport from "./pages/dashboard/reports/risk-assessment-report/RiskAssessmentReport"


import DetailedAuditReport from "./pages/dashboard/reports/detailed-audit-report/DetailedAuditReport";
import GenerateDetailedAuditReport from "./pages/dashboard/reports/detailed-audit-report/generate-detailed-audit-report/GenerateDetailedAuditReport";
import ViewDetailedAuditReport from "./pages/dashboard/reports/detailed-audit-report/view-detailed-audit-report/ViewDetailedAuditReport";
import UpdateDetailedAuditReport from "./pages/dashboard/reports/detailed-audit-report/update-detailed-audit-report/UpdateDetailedAuditReport";


import SummarizedReport from "./pages/dashboard/reports/summarized-report/SummarizedReport"
import ViewSummarizedReport from "./pages/dashboard/reports/summarized-report/view-summarized-report/ViewSummarizedReport"
import DownloadSummarizedReport from "./components/dashboard/reports/summarized-report/download-report";
import GenerateSummarizedReport from "./pages/dashboard/reports/summarized-report/generate-summarized-report/GenerateSummarizedReport"
import UpdateSummarizedReport from "./pages/dashboard/reports/summarized-report/update-summarized-report/UpdateSummarizedRReport"
import DownloadDetailedAuditReport from "./components/dashboard/reports/detailed-audit-report/download-report/index"
import DownloadInternalAuditReport from "./components/dashboard/reports/internal-audit-report/download-report/index"
import ProtectedRoute from "./components/common/layout/ProtectedRoute";
import NotFound from "./components/common/not-found/index";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("user"));
    if (authUser) {
      dispatch(changeAuthUser(authUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user[0]?.token && user[0]?.company[0]?.companyName) {
      dispatch(changeCompany(user[0]?.company[0]?.companyName));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const year = new Date().getFullYear();
    dispatch(changeYear(year.toString()));
  }, [dispatch]);

  return (
    <div className="main-wrap">
      <ToastContainer position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
            <Route path="planning-report" element={<PlanningReport />} />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="view-job-scheduling" element={<ViewJobschedule />} />
            <Route
              path="generate-planning-report"
              element={<GeneratePlanningReport />}
            />
            <Route
              path="update-planning-report/:id"
              element={<UpdatePlanningReport />}
            />
            <Route
              path="view-planning-report/:id"
              element={<ViewPlanningReport />}
            />
            <Route
              path="information-request"
              element={<InformationRequest />}
            />
            <Route path="start-scheduling/:id" element={<StartScheduling />} />
            <Route
              path="business-objectives-redirect/:id"
              element={<BusinessObjectiveRedirect />}
            />

            <Route
              path="special-project-audit/:id"
              element={<SpecialProjectAudit />}
            />
            <Route
              path="compliance-checklist/:id"
              element={<ComplianceCheckListCard />}
            />
            <Route path="kick-off/:id" element={<KickOff />} />

            <Route
              path="risk-factor-approach/:id"
              element={<RiskFactorApproach />}
            />
            <Route
              path="reporting-particulars/:id"
              element={<AuditParticulars />}
            />
            <Route path="follow-up" element={<FollowUp />} />
            <Route path="reportings" element={<Reporting />} />
            <Route
              path="follow-up-particulars/:id"
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
              path="view-internal-audit-report/:id"
              element={<ViewInternalAuditReport />}
            />
            <Route
              path="update-internal-audit-report/:id"
              element={<UpdateInternalAuditReport />}
            />
            {/*  */}
            <Route
              path="internal-audit-consolidation-report"
              element={<DetailedAuditReport />}
            />
            <Route
              path="generate-internal-audit-consolidation-report"
              element={<GenerateDetailedAuditReport />}
            />
            <Route
              path="view-internal-audit-consolidation-report/:id"
              element={<ViewDetailedAuditReport />}
            />
            <Route
              path="update-internal-audit-consolidation-report/:id"
              element={<UpdateDetailedAuditReport />}
            />
            {/*  */}
            <Route
              path="summarized-report"
              element={<SummarizedReport />}
            />
            <Route
              path="generate-summarized-report"
              element={<GenerateSummarizedReport />}
            />
            <Route
              path="update-summarized-report/:id"
              element={<UpdateSummarizedReport />}
            />
            <Route
              path="view-summarized-report/:id"
              element={<ViewSummarizedReport />}
            />
            <Route
              path="download-summarized-report/:id"
              element={<DownloadSummarizedReport />}
            />
            {/*  */}
            <Route
              path="job-time-allocation-report"
              element={<JobTimeAllocationReport />}
            />
            <Route path="audit-exception-report" element={<AuditExceptionReport />} />
            <Route path="risk-assessment-report" element={<RiskAssessmentReport />} />
            <Route
              path="audit-planning-summary-report"
              element={<AuditPlanSummaryReport />}
            />
            {/*  */}
            <Route path="download-detailed-audit-report/:id" element={<DownloadDetailedAuditReport />} />
            <Route path="download-internal-audit-report/:id" element={<DownloadInternalAuditReport />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
