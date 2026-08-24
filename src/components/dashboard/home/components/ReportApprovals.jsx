import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { encryptAndEncode } from '../../../../config/helper';
import { DashboardTabs } from './DashboardTabs';

const reportTabs = ['Internal Audit Report Approvals', 'Detailed Audit Report Approvals', 'Summarized Report Approval'];

const ConfirmApproveDialog = ({ loading, onApprove, onClose }) => (
  <div className='model-parent'>
    <div className='model-wrap' style={{ maxWidth: 420 }}>
      <div className='p-4 bg-white'>
        <p>Are You Sure You Want To Approve Report?</p>
        <div className='d-flex justify-content-between'>
          <button className={'btn btn-secondary ' + (loading ? 'disabled' : '')} onClick={onApprove}>{loading ? 'Loading...' : 'Approve'}</button>
          <button className='btn btn-danger' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

const ReportTable = ({ rows, emptyMessage, viewRoute, onApprove, loading }) => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = React.useState(null);
  return (
    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <table className='table table-bordered table-hover rounded mb-0 relative z-0'>
        <thead className='bg-secondary text-white sticky-top'>
          <tr>
            <th className='px-3 py-3'>Sr No.</th>
            <th className='px-3 py-3'>Job Name</th>
            <th className='px-3 py-3'>Report Name</th>
            <th className='px-3 py-3'>Report Date</th>
            <th className='px-3 py-3'>Prepared By</th>
            <th className='px-3 py-3'>Status</th>
            <th className='px-3 py-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(rows || []).map((item, index) => (
            <tr key={item?.id || index}>
              <td className='px-3 py-3'>{index + 1}</td>
              <td className='px-3 py-3'>{item?.jobName || ''}</td>
              <td className='px-3 py-3'>{item?.reportName || ''}</td>
              <td className='px-3 py-3'>{item?.reportDate ? moment(item.reportDate).format('DD-MM-YYYY') : ''}</td>
              <td className='px-3 py-3'>{item?.preparedBy || ''}</td>
              <td className='px-3 py-3'>{item?.submitted ? 'Submitted' : ''}</td>
              <td className='px-3 py-3'>
                <div className='d-flex align-items-center gap-3 flex-wrap'>
                  <i className='fa-eye fa f-18' style={{ cursor: 'pointer' }} onClick={() => navigate(viewRoute + '/' + encryptAndEncode(item?.id?.toString()))}></i>
                  <button className={'btn btn-primary shadow-sm ' + (loading ? 'disabled' : '')} onClick={() => setCurrentItem(item)}>Approve</button>
                </div>
              </td>
            </tr>
          ))}
          {!(rows || []).length && <tr><td colSpan={7} className='text-center py-4 text-muted'>{emptyMessage}</td></tr>}
        </tbody>
      </table>
      {currentItem && (
        <ConfirmApproveDialog
          loading={loading}
          onClose={() => setCurrentItem(null)}
          onApprove={async () => {
            await onApprove(currentItem?.id);
            setCurrentItem(null);
          }}
        />
      )}
    </div>
  );
};

const ReportApprovals = ({ internalReports, consolidatedReports, summarizedReports, approvingReport, onApproveInternal, onApproveConsolidated, onApproveSummarized }) => {
  const [activeTab, setActiveTab] = React.useState(reportTabs[0]);
  return (
    <>
      <DashboardTabs tabs={reportTabs} activeTab={activeTab} onChange={setActiveTab} subtle />
      <div className='mt-3'>
        {activeTab === reportTabs[0] && (
          <ReportTable rows={internalReports} emptyMessage='No Internal Audit Reports To Show.' viewRoute='/audit/view-internal-audit-report' onApprove={onApproveInternal} loading={approvingReport} />
        )}
        {activeTab === reportTabs[1] && (
          <ReportTable rows={consolidatedReports} emptyMessage='No Detailed Audit Reports To Show.' viewRoute='/audit/view-internal-audit-consolidation-report' onApprove={onApproveConsolidated} loading={approvingReport} />
        )}
        {activeTab === reportTabs[2] && (
          <ReportTable rows={summarizedReports} emptyMessage='No Summarized Reports To Show.' viewRoute='/audit/view-summarized-report' onApprove={onApproveSummarized} loading={approvingReport} />
        )}
      </div>
    </>
  );
};

export default ReportApprovals;
