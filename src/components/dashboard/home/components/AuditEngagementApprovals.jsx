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
  return list.flatMap((item) => {
    if (!item || item.checklistCompleted !== true) return [];
    if (!item.submitted && canSubmit) {
      return [{ id: item.id, label: 'Checklist', actionLabel: 'Submit', subLocationDescription: item.subLocationDescription }];
    }
    if (item.submitted && !item.approved && canApprove) {
      return [{ id: item.id, label: 'Checklist', actionLabel: 'Approve', subLocationDescription: item.subLocationDescription }];
    }
    return [];
  });
};

const getPendingActions = (job, userInfo) => {
  const allocation = job?.resourceAllocation;
  const canApprove = userInfo.hierarchy === 'IAH' || getReviewerIds(allocation).includes(userInfo.id);
  const canSubmit = canApprove || getAllocationUserIds(allocation).includes(userInfo.id) || getResourceIds(allocation).includes(userInfo.id);
  const rows = [];

  statusItems.forEach((item) => {
    const value = job?.[item.key];
    if (!value) return;
    if (!value.submitted && value.submissionReady === true && canSubmit) rows.push({ id: value.id, label: item.label, actionLabel: 'Submit' });
    if (value.submitted && !value.approved && canApprove) rows.push({ id: value.id, label: item.label, actionLabel: 'Approve' });
  });

  return rows.concat(getChecklistPending(job, canApprove, canSubmit));
};

const AuditEngagementApprovals = ({ auditEngagements, user }) => {
  const navigate = useNavigate();
  const userInfo = React.useMemo(() => getCurrentUserInfo(user), [user]);
  const rows = React.useMemo(
    () =>
      (auditEngagements || []).flatMap((job) =>
        getPendingActions(job, userInfo).map((action) => ({ job, action }))
      ),
    [auditEngagements, userInfo]
  );

  return (
    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-4 py-3'>Job Name</th>
            <th className='px-4 py-3'>Job Type</th>
            <th className='px-4 py-3'>Sub Location</th>
            <th className='px-4 py-3'>Approval Of</th>
            <th className='px-4 py-3 text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ job, action }) => (
            <tr key={`${job?.id}-${action.label}-${action.id}`}>
              <td className='px-4 py-3 fw-medium'>{job?.aetitle || '-'}</td>
              <td className='px-4 py-3'>{job?.jobType || '-'}</td>
              <td className='px-4 py-3'>
                <div className='d-flex flex-wrap gap-2'>
                  {action.subLocationDescription ? (
                    <span className='badge rounded-pill bg-light text-dark border'>
                      {action.subLocationDescription}
                    </span>
                  ) : (job?.subLocations || []).length ? (
                    job.subLocations.map((subLocation) => (
                      <span key={subLocation?.id || subLocation?.description} className='badge rounded-pill bg-light text-dark border'>
                        {subLocation?.description || '-'}
                      </span>
                    ))
                  ) : (
                    '-'
                  )}
                </div>
              </td>
              <td className='px-4 py-3'>{action.label}</td>
              <td className='px-4 py-3 text-end'>
                <button
                  className='btn btn-sm btn-primary'
                  onClick={() =>
                    navigate('/audit/kick-off/' + encryptAndEncode(job?.id?.toString()), {
                      state: { jobType: job?.jobType },
                    })
                  }
                >
                  {action.actionLabel}
                </button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr><td colSpan={5} className='text-center py-4 text-muted'>No tasks pending approval.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditEngagementApprovals;
