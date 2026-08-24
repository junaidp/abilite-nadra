import React from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthValues } from '../../../global-redux/reducers/auth/slice';
import {
  resetDashboardReportApprovals,
  setupGetAuditEngagementDashboard,
  setupGetAuditPlanSummaryDashboard,
  setupGetCompletedReportingByRole,
  setupGetDashboardReporting,
  setupGetLightUsersDashboard,
  setupGetLocationsDashboard,
} from '../../../global-redux/reducers/dashboard/slice';
import DashboardKpiCards from './components/DashboardKpiCards';
import DashboardTableSection from './components/DashboardTableSection';
import ObservationImplementationTrend from './components/ObservationImplementationTrend';
import ObservationRatingBreakdown from './components/ObservationRatingBreakdown';
import OverallStatusModal from './components/OverallStatusModal';
import { ChartSkeleton, KpiSkeleton, TableSkeleton } from './components/Skeletons';
import { DASHBOARD_ROLE, calculateKpis, getCurrentUserInfo, getSelectedCompanyId, isIAHUser } from './components/dashboardHelpers';

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { year, company } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);
  const {
    auditEngagements,
    auditPlanSummaryApprovals,
    completedByRoleLoading,
    completedByRoleReporting,
    dashboardReporting,
    locations,
    users,
  } = useSelector((state) => state.dashboard);

  const [initialLoading, setInitialLoading] = React.useState(false);
  const [overallOpen, setOverallOpen] = React.useState(false);
  const [completedLoaded, setCompletedLoaded] = React.useState(false);
  const currentUser = React.useMemo(() => getCurrentUserInfo(user), [user]);
  const companyId = getSelectedCompanyId(user, company);
  const isIAH = isIAHUser(user);

  React.useEffect(() => {
    if (!user?.[0]?.token || !companyId || !year || !currentUser.id) return;

    let active = true;
    const loadDashboard = async () => {
      setInitialLoading(true);
      setCompletedLoaded(false);
      dispatch(resetAuthValues());
      dispatch(resetDashboardReportApprovals());
      try {
        await dispatch(setupGetDashboardReporting({ role: DASHBOARD_ROLE })).unwrap();
        await dispatch(setupGetAuditEngagementDashboard()).unwrap();
        await dispatch(setupGetLightUsersDashboard()).unwrap();
        await dispatch(setupGetLocationsDashboard()).unwrap();
        if (isIAH) await dispatch(setupGetAuditPlanSummaryDashboard()).unwrap();
      } finally {
        if (active) setInitialLoading(false);
      }
    };

    loadDashboard();
    return () => {
      active = false;
    };
  }, [companyId, currentUser.id, dispatch, isIAH, user, year]);

  const kpis = React.useMemo(() => calculateKpis(dashboardReporting, auditEngagements), [dashboardReporting, auditEngagements]);

  const openOverallStatus = async () => {
    setOverallOpen(true);
    if (completedLoaded) return;
    try {
      await dispatch(setupGetCompletedReportingByRole({ role: DASHBOARD_ROLE })).unwrap();
      setCompletedLoaded(true);
    } catch (error) {
      setCompletedLoaded(false);
    }
  };

  return (
    <div className='dashboard-page'>
      <div className='section-header my-3 text-start d-flex align-items-center justify-content-between'>
        <div className='mb-0 heading'>Dashboard</div>
      </div>

      {initialLoading ? <KpiSkeleton /> : <DashboardKpiCards kpis={kpis} />}

      <div className='dashboard-main-panel mt-4'>
        {initialLoading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : (
          <DashboardTableSection
            dashboardReporting={dashboardReporting}
            auditEngagements={auditEngagements}
            auditPlanSummaryApprovals={auditPlanSummaryApprovals}
            users={users}
            locations={locations}
          />
        )}
      </div>

      <div className='row g-4 mt-3 dashboard-analytics-row'>
        <div className='col-xl-8 dashboard-analytics-col'>
          {initialLoading ? <ChartSkeleton height={470} /> : (
            <div className='position-relative dashboard-chart-shell'>
              <button className='btn btn-primary dashboard-overall-button' type='button' onClick={openOverallStatus}>Overall Status</button>
              <ObservationImplementationTrend dashboardReporting={dashboardReporting} users={users} locations={locations} />
            </div>
          )}
        </div>
        <div className='col-xl-4 dashboard-analytics-col'>
          {initialLoading ? <ChartSkeleton height={470} /> : <ObservationRatingBreakdown dashboardReporting={dashboardReporting} users={users} locations={locations} />}
        </div>
      </div>

      <OverallStatusModal
        open={overallOpen}
        onClose={() => setOverallOpen(false)}
        loading={completedByRoleLoading}
        dashboardReporting={completedByRoleReporting}
        users={users}
        locations={locations}
      />
    </div>
  );
};

export default DashboardHome;

