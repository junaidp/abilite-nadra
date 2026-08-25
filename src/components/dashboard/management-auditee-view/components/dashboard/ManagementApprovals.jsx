import React from 'react';
import { useNavigate } from 'react-router-dom';
import { encryptAndEncode } from '../../../../../config/helper';
import { DashboardTabs } from '../../../home/components/DashboardTabs';
import { buildLocationMap, getReportingItems, resolveLocationName } from '../../../home/components/dashboardHelpers';

const APPROVAL_TABS = ['Reporting Approval', 'Follow Up Approval'];

const buildRows = ({ dashboardReporting, locations, stepNo, route, actionLabel }) => {
  const locationMap = buildLocationMap(locations);
  const rows = [];

  (dashboardReporting || []).forEach((job) => {
    getReportingItems(job).forEach((item) => {
      if (Number(item?.stepNo) !== stepNo) return;
      rows.push({
        id: route + '-' + job?.id + '-' + item?.id,
        reportingId: job?.id,
        jobName: job?.title || '-',
        observationName: item?.observationTitle || '-',
        locationName: resolveLocationName(item, locationMap),
        route,
        actionLabel,
      });
    });
  });

  return rows;
};

const ApprovalTable = ({ rows }) => {
  const navigate = useNavigate();

  const openRow = (row) => {
    if (!row?.reportingId) return;
    navigate(row.route + '/' + encryptAndEncode(row.reportingId.toString()));
  };

  return (
    <div style={{ maxHeight: 420, overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-4 py-3'>Job Name</th>
            <th className='px-4 py-3'>Observation Name</th>
            <th className='px-4 py-3'>Location</th>
            <th className='px-4 py-3 text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className='px-4 py-3 fw-medium'>{row.jobName}</td>
              <td className='px-4 py-3'>{row.observationName}</td>
              <td className='px-4 py-3'>{row.locationName}</td>
              <td className='px-4 py-3 text-end'>
                <button type='button' className='btn btn-sm btn-primary' onClick={() => openRow(row)}>
                  {row.actionLabel}
                </button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td className='text-center py-4 text-muted' colSpan={4}>No pending items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ManagementApprovals = ({ dashboardReporting, locations }) => {
  const [activeTab, setActiveTab] = React.useState(APPROVAL_TABS[0]);

  const reportingRows = React.useMemo(
    () => buildRows({
      dashboardReporting,
      locations,
      stepNo: 2,
      route: '/audit/reporting-particulars',
      actionLabel: 'Submit',
    }),
    [dashboardReporting, locations]
  );

  const followUpRows = React.useMemo(
    () => buildRows({
      dashboardReporting,
      locations,
      stepNo: 5,
      route: '/audit/follow-up-particulars',
      actionLabel: 'Submit',
    }),
    [dashboardReporting, locations]
  );

  return (
    <div className='card border-0 shadow-sm'>
      <div className='card-body p-0'>
        <DashboardTabs tabs={['Approvals']} activeTab='Approvals' onChange={() => {}} />
        <div className='mt-3'>
          <DashboardTabs tabs={APPROVAL_TABS} activeTab={activeTab} onChange={setActiveTab} subtle />
          <div className='mt-3'>
            <ApprovalTable rows={activeTab === APPROVAL_TABS[0] ? reportingRows : followUpRows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementApprovals;
