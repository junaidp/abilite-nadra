import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDashboardReportApprovalsLoadedKey,
  setupApproveConsolidatedReportDashboard,
  setupApproveInternalAuditReportDashboard,
  setupApproveSummarizedReportDashboard,
  setupGetConsolidatedReportsDashboard,
  setupGetInternalAuditReportsDashboard,
  setupGetSummarizedReportsDashboard,
} from '../../../../global-redux/reducers/dashboard/slice';
import { DashboardTabs } from './DashboardTabs';
import { TableSkeleton } from './Skeletons';
import AuditEngagementApprovals from './AuditEngagementApprovals';
import ReportingFollowUpApprovals from './ReportingFollowUpApprovals';
import ReportApprovals from './ReportApprovals';
import { AuditPlanSummaryApprovals, JobStatus } from './AuditPlanAndJobStatus';
import { getSelectedCompanyId, isIAHUser } from './dashboardHelpers';

const mainTabs = ['Approvals', 'Jobs Status'];
const approvalTabLabels = {
  plan: 'Audit Plan Summary Approvals',
  engagement: 'Audit Engagement Approvals',
  reporting: 'Reporting & Follow Up Approvals',
  reports: 'Report Approvals',
};

const DashboardTableSection = ({ dashboardReporting, auditEngagements, auditPlanSummaryApprovals, users, locations }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { company, year } = useSelector((state) => state.common);
  const {
    approvingReport,
    consolidatedReports,
    internalAuditReports,
    reportApprovalsLoadedKey,
    reportApprovalsLoading,
    summarizedReports,
  } = useSelector((state) => state.dashboard);

  const isIAH = isIAHUser(user);
  const companyId = getSelectedCompanyId(user, company);
  const reportsKey = companyId + '-' + year;
  const approvalTabs = React.useMemo(
    () => isIAH
      ? [approvalTabLabels.plan, approvalTabLabels.engagement, approvalTabLabels.reporting, approvalTabLabels.reports]
      : [approvalTabLabels.engagement, approvalTabLabels.reporting],
    [isIAH]
  );

  const [activeMainTab, setActiveMainTab] = React.useState(mainTabs[0]);
  const [activeApprovalTab, setActiveApprovalTab] = React.useState(approvalTabs[0]);

  React.useEffect(() => {
    if (!approvalTabs.includes(activeApprovalTab)) setActiveApprovalTab(approvalTabs[0]);
  }, [activeApprovalTab, approvalTabs]);

  React.useEffect(() => {
    if (!isIAH || activeApprovalTab !== approvalTabLabels.reports || reportApprovalsLoadedKey === reportsKey) return;
    const loadReports = async () => {
      await dispatch(setupGetInternalAuditReportsDashboard()).unwrap();
      await dispatch(setupGetConsolidatedReportsDashboard()).unwrap();
      await dispatch(setupGetSummarizedReportsDashboard()).unwrap();
      dispatch(setDashboardReportApprovalsLoadedKey(reportsKey));
    };
    loadReports();
  }, [activeApprovalTab, dispatch, isIAH, reportApprovalsLoadedKey, reportsKey]);

  const renderApprovals = () => (
    <>
      <DashboardTabs tabs={approvalTabs} activeTab={activeApprovalTab} onChange={setActiveApprovalTab} subtle />
      <div className='mt-3'>
        {activeApprovalTab === approvalTabLabels.plan && isIAH && <AuditPlanSummaryApprovals items={auditPlanSummaryApprovals} users={users} />}
        {activeApprovalTab === approvalTabLabels.engagement && <AuditEngagementApprovals auditEngagements={auditEngagements} user={user} />}
        {activeApprovalTab === approvalTabLabels.reporting && (
          <ReportingFollowUpApprovals dashboardReporting={dashboardReporting} auditEngagements={auditEngagements} user={user} locations={locations} />
        )}
        {activeApprovalTab === approvalTabLabels.reports && isIAH && (
          reportApprovalsLoading ? <TableSkeleton rows={6} cols={7} /> : (
            <ReportApprovals
              internalReports={internalAuditReports}
              consolidatedReports={consolidatedReports}
              summarizedReports={summarizedReports}
              approvingReport={approvingReport}
              onApproveInternal={(id) => dispatch(setupApproveInternalAuditReportDashboard(id)).unwrap()}
              onApproveConsolidated={(id) => dispatch(setupApproveConsolidatedReportDashboard(id)).unwrap()}
              onApproveSummarized={(id) => dispatch(setupApproveSummarizedReportDashboard(id)).unwrap()}
            />
          )
        )}
      </div>
    </>
  );

  return (
    <div className='card border-0 shadow-sm'>
      <div className='card-body p-0'>
        <DashboardTabs tabs={mainTabs} activeTab={activeMainTab} onChange={setActiveMainTab} />
        <div className='mt-3'>
          {activeMainTab === mainTabs[0] ? renderApprovals() : <JobStatus auditEngagements={auditEngagements} users={users} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardTableSection;
