import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../home/index.css';
import {
  setupGetCompletedReportingByRole,
  setupGetDashboardReporting,
  setupGetLocationsDashboard,
} from '../../../../../global-redux/reducers/dashboard/slice';
import DashboardKpiCards from '../../../home/components/DashboardKpiCards';
import ObservationRatingBreakdown from '../../../home/components/ObservationRatingBreakdown';
import { ChartSkeleton, KpiSkeleton, TableSkeleton } from '../../../home/components/Skeletons';
import { getReportingItems } from '../../../home/components/dashboardHelpers';
import ManagementApprovals from './ManagementApprovals';
import ManagementObservationTrend from './ManagementObservationTrend';
import ManagementOverallStatusModal from './ManagementOverallStatusModal';

const DASHBOARD_ROLE = 'management';

const isJobCompleted = (job) => {
  const items = getReportingItems(job).filter((item) => Number(item?.stepNo) >= 5);
  return items.length > 0 && items.every((item) => Number(item?.stepNo) >= 7);
};

const calculateManagementKpis = (dashboardReporting) => {
  const jobs = dashboardReporting || [];
  const completedJobs = jobs.filter(isJobCompleted).length;
  const jobsInProgress = jobs.length - completedJobs;
  let followUpObservations = 0;
  let implementedObservations = 0;

  jobs.forEach((job) => {
    getReportingItems(job).forEach((item) => {
      if (Number(item?.stepNo) < 5) return;
      followUpObservations += 1;
      if (Number(item?.stepNo) >= 7) implementedObservations += 1;
    });
  });

  return {
    totalJobs: jobs.length,
    jobsInProgress,
    completedJobs,
    exceptionPercentage: followUpObservations ? Math.round((implementedObservations / followUpObservations) * 100) : 0,
  };
};

const ManagementDashboard = ({ tab }) => {
  const dispatch = useDispatch();
  const { year, company } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);
  const {
    completedByRoleLoading,
    completedByRoleReporting,
    dashboardReporting,
    locations,
  } = useSelector((state) => state.dashboard);
  const [initialLoading, setInitialLoading] = React.useState(false);
  const [overallOpen, setOverallOpen] = React.useState(false);
  const [completedLoaded, setCompletedLoaded] = React.useState(false);

  const companyId = React.useMemo(() => {
    const currentUser = user?.[0] || {};
    return currentUser?.company?.find((item) => item?.companyName === company)?.id || currentUser?.company?.[0]?.id || null;
  }, [company, user]);

  React.useEffect(() => {
    if (tab !== 'dashboard') return;
    if (!user?.[0]?.token || !companyId || !year) return;

    let active = true;
    const loadDashboard = async () => {
      setInitialLoading(true);
      setCompletedLoaded(false);
      try {
        await dispatch(setupGetDashboardReporting({ role: DASHBOARD_ROLE })).unwrap();
        await dispatch(setupGetLocationsDashboard()).unwrap();
      } finally {
        if (active) setInitialLoading(false);
      }
    };

    loadDashboard();
    return () => {
      active = false;
    };
  }, [companyId, dispatch, tab, user, year]);

  const kpis = React.useMemo(() => calculateManagementKpis(dashboardReporting), [dashboardReporting]);

  const openOverallStatus = async () => {
    setOverallOpen(true);
    if (completedLoaded) return;
    try {
      await dispatch(setupGetCompletedReportingByRole({ role: DASHBOARD_ROLE })).unwrap();
      setCompletedLoaded(true);
    } catch {
      setCompletedLoaded(false);
    }
  };

  return (
    <div className={`tab-pane fade ${tab === 'dashboard' ? 'active show' : ''}`} id='nav-management-dashboard' role='tabpanel'>
      {tab === 'dashboard' && (
        <div className='dashboard-page management-dashboard-page'>
          {initialLoading ? <KpiSkeleton /> : <DashboardKpiCards kpis={kpis} />}

          <div className='dashboard-main-panel mt-4'>
            {initialLoading ? <TableSkeleton rows={5} cols={4} /> : <ManagementApprovals dashboardReporting={dashboardReporting} locations={locations} />}
          </div>

          <div className='row g-4 mt-3 dashboard-analytics-row'>
            <div className='col-xl-8 dashboard-analytics-col'>
              {initialLoading ? <ChartSkeleton height={470} /> : <ManagementObservationTrend dashboardReporting={dashboardReporting} locations={locations} onOverallStatus={openOverallStatus} />}
            </div>
            <div className='col-xl-4 dashboard-analytics-col'>
              {initialLoading ? <ChartSkeleton height={470} /> : <ObservationRatingBreakdown dashboardReporting={dashboardReporting} users={[]} locations={locations} />}
            </div>
          </div>

          <ManagementOverallStatusModal
            open={overallOpen}
            onClose={() => setOverallOpen(false)}
            loading={completedByRoleLoading}
            dashboardReporting={completedByRoleReporting}
            locations={locations}
          />
        </div>
      )}
    </div>
  );
};

export default ManagementDashboard;
