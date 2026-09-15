import React from 'react';
import { useNavigate } from 'react-router-dom';
import { encryptAndEncode } from '../../../../config/helper';
import { buildFollowUpApprovalRows, buildLocationMap, buildReportingApprovalRows, getCurrentUserInfo } from './dashboardHelpers';
import { DashboardTabs } from './DashboardTabs';

const ApprovalTable = ({ rows, emptyMessage }) => {
  const navigate = useNavigate();
  return (
    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-4 py-3'>Job Name</th>
            <th className='px-4 py-3'>Observation Name</th>
            <th className='px-4 py-3'>Sub Location</th>
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
                <button
                  type='button'
                  className='btn btn-sm btn-primary'
                  onClick={() => navigate(row.route + '/' + encryptAndEncode(row.reportingId?.toString()))}
                >
                  {row.actionLabel}
                </button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={4} className='text-center py-4 text-muted'>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ReportingFollowUpApprovals = ({ dashboardReporting, auditEngagements, user, locations }) => {
  const tabs = ['Reporting Approval', 'Follow Up Approval'];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const userInfo = React.useMemo(() => getCurrentUserInfo(user), [user]);
  const locationMap = React.useMemo(() => buildLocationMap(locations), [locations]);
  const reportingRows = React.useMemo(
    () => buildReportingApprovalRows({ dashboardReporting, auditEngagements, userInfo, locationMap }),
    [auditEngagements, dashboardReporting, locationMap, userInfo]
  );
  const followUpRows = React.useMemo(
    () => buildFollowUpApprovalRows({ dashboardReporting, auditEngagements, userInfo, locationMap }),
    [auditEngagements, dashboardReporting, locationMap, userInfo]
  );

  return (
    <>
      <DashboardTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} subtle />
      <div className='mt-3'>
        {activeTab === tabs[0] ? (
          <ApprovalTable rows={reportingRows} emptyMessage='No reporting tasks pending approval.' />
        ) : (
          <ApprovalTable rows={followUpRows} emptyMessage='No follow up tasks pending approval.' />
        )}
      </div>
    </>
  );
};

export default ReportingFollowUpApprovals;
