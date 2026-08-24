import React from 'react';

const KpiCard = ({ title, value, color }) => (
  <div className='col-6 col-md-3'>
    <div className='bg-white p-4 rounded shadow-sm border text-center'>
      <p className='fs-4 fw-bold mb-1' style={{ color }}>{value}</p>
      <p className='small text-muted mb-0'>{title}</p>
    </div>
  </div>
);

const DashboardKpiCards = ({ kpis }) => (
  <div className='row g-3 mb-4'>
    <KpiCard title='Total Jobs' value={kpis.totalJobs} color='#198754' />
    <KpiCard title='Jobs In Progress' value={kpis.jobsInProgress} color='#FFC107' />
    <KpiCard title='Completed Jobs' value={kpis.completedJobs} color='#0D6EFD' />
    <KpiCard title='Exceptions Implemented' value={kpis.exceptionPercentage + '%'} color='#DC3545' />
  </div>
);

export default DashboardKpiCards;
