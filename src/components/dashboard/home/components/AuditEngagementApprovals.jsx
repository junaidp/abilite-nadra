import React from 'react';
import { useNavigate } from 'react-router-dom';
import { encryptAndEncode } from '../../../../config/helper';
import { getAllocationUserIds, getCurrentUserInfo, getResourceIds, getReviewerIds } from './dashboardHelpers';

const statusItems = [
  { key: 'riskControlMatrix', label: 'Risk Control Matrix' },
  { key: 'auditProgram', label: 'Audit Program' },
  { key: 'auditStep', label: 'Audit Step' },
];

const getChecklistPending = (job, canApprove, canSubmit) => {
  const list = job?.auditStepChecklistList || [];
  if (!list.length) return [];
  const hasSubmit = canSubmit && list.some((item) => item && !item.submitted);
  const hasApprove = canApprove && list.some((item) => item?.submitted && !item?.approved);
  if (!hasSubmit && !hasApprove) return [];
  return [{ label: 'Checklist', actionLabel: hasApprove ? 'Approve' : 'Submit' }];
};

const getPendingActions = (job, userInfo) => {
  const allocation = job?.resourceAllocation;
  const canApprove = userInfo.hierarchy === 'IAH' || getReviewerIds(allocation).includes(userInfo.id);
  const canSubmit = canApprove || getAllocationUserIds(allocation).includes(userInfo.id) || getResourceIds(allocation).includes(userInfo.id);
  const rows = [];

  statusItems.forEach((item) => {
    const value = job?.[item.key];
    if (!value) return;
    if (!value.submitted && canSubmit) rows.push({ label: item.label, actionLabel: 'Submit' });
    if (value.submitted && !value.approved && canApprove) rows.push({ label: item.label, actionLabel: 'Approve' });
  });

  return rows.concat(getChecklistPending(job, canApprove, canSubmit));
};

const AuditEngagementApprovals = ({ auditEngagements, user }) => {
  const navigate = useNavigate();
  const userInfo = React.useMemo(() => getCurrentUserInfo(user), [user]);
  const rows = React.useMemo(
    () =>
      (auditEngagements || [])
        .map((job) => ({ job, actions: getPendingActions(job, userInfo) }))
        .filter((item) => item.actions.length),
    [auditEngagements, userInfo]
  );

  return (
    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-4 py-3'>Job Name</th>
            <th className='px-4 py-3'>Job Type</th>
            <th className='px-4 py-3'>Approval Of</th>
            <th className='px-4 py-3 text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ job, actions }) => (
            <tr key={job?.id}>
              <td className='px-4 py-3 fw-medium'>{job?.aetitle || '-'}</td>
              <td className='px-4 py-3'>{job?.jobType || '-'}</td>
              <td className='px-4 py-3'>{actions.map((item) => item.label).join(', ')}</td>
              <td className='px-4 py-3 text-end'>
                <button className='btn btn-sm btn-primary' onClick={() => navigate('/audit/kick-off/' + encryptAndEncode(job?.id?.toString()))}>
                  {actions.some((item) => item.actionLabel === 'Approve') ? 'Approve' : 'Submit'}
                </button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr><td colSpan={4} className='text-center py-4 text-muted'>No tasks pending approval.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditEngagementApprovals;
