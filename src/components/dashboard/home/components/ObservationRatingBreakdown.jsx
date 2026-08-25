import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { encryptAndEncode } from '../../../../config/helper';
import { buildObservationRows, summarizeRatings } from './dashboardHelpers';

const colors = {
  High: '#dc3545',
  Medium: '#ff7f11',
  Low: '#0d6efd',
};

const ObservationRatingBreakdown = ({ dashboardReporting, users, locations }) => {
  const navigate = useNavigate();
  const [openRating, setOpenRating] = React.useState('Medium');
  const [isRatingOpen, setIsRatingOpen] = React.useState(false);
  const rows = React.useMemo(() => buildObservationRows(dashboardReporting, users, locations), [dashboardReporting, users, locations]);
  const ratingData = React.useMemo(() => summarizeRatings(rows), [rows]);
  const ratedTotal = ratingData.reduce((sum, item) => sum + item.count, 0);
  const selectedRows = rows.filter((item) => item.rating === openRating);
  const activeRatingCount = ratingData.find((item) => item.name === openRating)?.count || 0;

  React.useEffect(() => {
    if (ratingData.some((item) => item.name === openRating && item.count > 0)) return;
    setOpenRating(ratingData.find((item) => item.count > 0)?.name || 'Medium');
  }, [openRating, ratingData]);

  const setActiveFromHover = (rating) => setOpenRating(rating);
  const handleRowClick = (row) => {
    if (!row?.jobId) return;
    navigate('/audit/follow-up-particulars/' + encryptAndEncode(row.jobId.toString()));
  };

  return (
    <div className='card border-0 shadow-sm h-100'>
      <div className='card-body dashboard-chart-card'>
        <h6 className='mb-3 fw-semibold'>Observations Rating</h6>
        <div className='text-muted mb-3'>{ratedTotal} rated observations</div>
        <div className='dashboard-rating-chart'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie data={ratingData} dataKey='count' nameKey='name' innerRadius={65} outerRadius={90} paddingAngle={2} onMouseEnter={(data) => setActiveFromHover(data?.name || openRating)}>
                {ratingData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={colors[entry.name]}
                    cursor='pointer'
                  />
                ))}
              </Pie>
              <Tooltip cursor={false} formatter={(value, name, item) => [value + ' observations (' + item.payload.percentage + '%)', item.payload.name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='dashboard-chart-legend mb-4'>
          {ratingData.map((item) => (
            <button
              key={item.name}
              type='button'
              className={'dashboard-legend-button ' + (openRating === item.name ? 'dashboard-legend-button-active' : '')}
              onMouseEnter={() => setActiveFromHover(item.name)}
              onClick={() => setOpenRating(item.name)}
            >
              <span className='dashboard-legend-dot' style={{ background: colors[item.name] }} />
              {item.name}
            </button>
          ))}
        </div>
        <div className='dashboard-accordion-list'>
          <div className='dashboard-accordion-item dashboard-accordion-item-active'>
            <button type='button' className='dashboard-accordion-header' onClick={() => setIsRatingOpen((value) => !value)}>
              <span>{openRating}</span>
              <span className='badge bg-light text-dark border'>{activeRatingCount}</span>
              <i className={'bi ' + (isRatingOpen ? 'bi-chevron-up' : 'bi-chevron-down')}></i>
            </button>
            <div className={'dashboard-accordion-body dashboard-accordion-collapse ' + (isRatingOpen ? 'dashboard-accordion-collapse-open' : '')}>
              {selectedRows.length ? selectedRows.map((row) => (
                <button key={row.jobId + '-' + row.id} type='button' className='dashboard-small-row dashboard-clickable-row' onClick={() => handleRowClick(row)}>
                  <div className='dashboard-row-title text-truncate'>{row.observationName}</div>
                  <div className='dashboard-row-subtitle text-truncate'>{row.jobName} - {row.locationName}</div>
                </button>
              )) : <div className='text-muted small p-2'>No observations found.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationRatingBreakdown;








