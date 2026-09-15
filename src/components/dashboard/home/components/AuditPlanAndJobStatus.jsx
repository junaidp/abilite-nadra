import React from 'react';
import { useNavigate } from 'react-router-dom';
import { encryptAndEncode } from '../../../../config/helper';
import { getResourceIds, buildActiveUserMap } from './dashboardHelpers';

export const AuditPlanSummaryApprovals = ({ items, users }) => {
  const navigate = useNavigate();
  const userMap = React.useMemo(() => buildActiveUserMap(users), [users]);
  const rows = Array.isArray(items) ? items : [];
  return (
    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-3 py-3'>Job Name</th>
            <th className='px-3 py-3'>Priority</th>
            <th className='px-3 py-3 text-center'>Total Hours</th>
            <th className='px-3 py-3 text-center'>Submitted By</th>
            <th className='px-3 py-3 text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr key={item?.id}>
              <td className='px-3 py-3 fw-medium'>{item?.title || ''}</td>
              <td className='px-3 py-3'>{item?.priority || ''}</td>
              <td className='px-3 py-3 text-center'>{item?.total ?? ''}</td>
              <td className='px-3 py-3 text-center'>{userMap.get(Number(item?.initiatorUB)) || ''}</td>
              <td className='px-3 py-3 text-end'>
                <button className='btn btn-sm btn-primary' onClick={() => navigate('/audit/audit-plan-summary')}>Approve</button>
              </td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan={5} className='text-center py-4 text-muted'>No Audit Plan Summary To Show.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

const getStatusBadgeClass = (status) => {
  if (status === 'Complete') return 'bg-success text-white';
  if (status === 'In Progress') return 'bg-warning text-dark';
  return 'bg-secondary text-white';
};

export const JobStatus = ({ auditEngagements, users }) => {
  const navigate = useNavigate();
  const userMap = React.useMemo(() => buildActiveUserMap(users), [users]);
  const rows = Array.isArray(auditEngagements) ? auditEngagements : [];
  return (
    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-4 py-3'>Job Name</th>
            <th className='px-4 py-3'>Job Type</th>
            <th className='px-4 py-3'>Responsibles</th>
            <th className='px-4 py-3 text-end'>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((job) => {
            const names = getResourceIds(job?.resourceAllocation).map((id) => userMap.get(id) || '').filter(Boolean).join(', ');
            return (
              <tr
                key={job?.id}
                className='cursor-pointer'
                onClick={() =>
                  navigate('/audit/kick-off/' + encryptAndEncode(job?.id?.toString()), {
                    state: { jobType: job?.jobType },
                  })
                }
              >
                <td className='px-4 py-3 fw-medium'>{job?.aetitle || '-'}</td>
                <td className='px-4 py-3'>{job?.jobType || '-'}</td>
                <td className='px-4 py-3'>{names}</td>
                <td className='px-4 py-3 text-end'><span className={'px-2 py-1 rounded small fw-medium ' + getStatusBadgeClass(job?.status)}>{job?.status || '-'}</span></td>
              </tr>
            );
          })}
          {!rows.length && <tr><td colSpan={4} className='text-center py-4 text-muted'>No jobs found</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

