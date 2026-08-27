import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { encryptAndEncode } from '../../../../config/helper';
import { buildObservationRows, summarizeImplementation, uniqueFilterOptions } from './dashboardHelpers';
import { ChartSkeleton } from './Skeletons';

const statusColors = {
  Open: '#ffb000',
  Closed: '#0d6efd',
};

const emptyFilters = { locationId: [], auditeeId: [] };

const filterMatches = (selectedValues, value) => {
  if (!selectedValues?.length) return true;
  return selectedValues.includes(String(value));
};

const getSelectedLabel = (label, options, selectedValues) => {
  if (!selectedValues.length) return label;
  if (selectedValues.length === 1) return options.find((item) => String(item.value) === selectedValues[0])?.label || label;
  return selectedValues.length + ' selected';
};

const MultiSelectFilter = ({ value, label, options, onChange }) => {
  const wrapperRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const selectedValues = React.useMemo(() => (Array.isArray(value) ? value.map(String) : []), [value]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleValue = (nextValue) => {
    const normalizedValue = String(nextValue);
    if (selectedValues.includes(normalizedValue)) {
      onChange(selectedValues.filter((item) => item !== normalizedValue));
      return;
    }
    onChange([...selectedValues, normalizedValue]);
  };

  return (
    <div className='dashboard-multiselect' ref={wrapperRef}>
      <button type='button' className={'dashboard-multiselect-toggle ' + (open ? 'dashboard-multiselect-toggle-open' : '')} onClick={() => setOpen((value) => !value)}>
        <span className='text-truncate'>{getSelectedLabel(label, options, selectedValues)}</span>
        <i className={'bi ' + (open ? 'bi-chevron-up' : 'bi-chevron-down')}></i>
      </button>
      {open && (
        <div className='dashboard-multiselect-menu'>
          {options.length ? options.map((item) => {
            const normalizedValue = String(item.value);
            return (
              <label key={normalizedValue} className='dashboard-multiselect-option'>
                <input type='checkbox' checked={selectedValues.includes(normalizedValue)} onChange={() => toggleValue(normalizedValue)} />
                <span className='text-truncate'>{item.label}</span>
              </label>
            );
          }) : <div className='dashboard-multiselect-empty'>No options found</div>}
        </div>
      )}
    </div>
  );
};

const filterRows = (rows, filters) => rows.filter((item) => {
  if (!filterMatches(filters.locationId, item.locationId)) return false;
  if (!filterMatches(filters.auditeeId, item.auditeeId)) return false;
  return true;
});

const getJobChartLabel = (item) => item.year ? item.jobName + ' (' + item.year + ')' : item.jobName;

const buildJobChartData = (rows) => {
  const map = new Map();
  rows.forEach((item) => {
    const key = getJobChartLabel(item);
    const current = map.get(key) || { chartKey: key, jobName: item.jobName, year: item.year, label: key, Open: 0, Closed: 0 };
    if (item.status === 'Implemented') current.Closed += 1;
    else current.Open += 1;
    map.set(key, current);
  });
  return Array.from(map.values());
};

const OverallStatusTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className='dashboard-tooltip-box'>
      <div className='dashboard-tooltip-title'>{label}</div>
      {payload.map((item) => (
        <div key={item.dataKey} className='dashboard-tooltip-line' style={{ color: item.color }}>
          {item.dataKey}: {item.value}
        </div>
      ))}
    </div>
  );
};

const OverallStatusRows = ({ rows, activeJobName, onRowClick }) => {
  const visibleRows = rows.filter((item) => getJobChartLabel(item) === activeJobName);

  if (!activeJobName || visibleRows.length === 0) return null;

  return (
    <div className='dashboard-overall-records mt-3'>
      <div className='dashboard-overall-records-header'>
        <span>{activeJobName}</span>
        <span className='badge bg-light text-dark border'>{visibleRows.length}</span>
      </div>
      <div className='dashboard-overall-records-body'>
        {visibleRows.map((row) => (
          <button
            key={row.jobId + '-' + row.id}
            type='button'
            className='dashboard-small-row dashboard-clickable-row'
            onClick={() => onRowClick(row)}
          >
            <div className='dashboard-row-title text-truncate'>{row.observationName}</div>
            <div className='dashboard-row-subtitle text-truncate'>{row.status} - {row.locationName}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

const OverallStatusModal = ({ open, onClose, loading, dashboardReporting, users, locations }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState(emptyFilters);
  const rows = React.useMemo(() => buildObservationRows(dashboardReporting, users, locations), [dashboardReporting, users, locations]);
  const filteredRows = React.useMemo(() => filterRows(rows, filters), [rows, filters]);
  const chartData = React.useMemo(() => buildJobChartData(filteredRows), [filteredRows]);
  const summary = React.useMemo(() => summarizeImplementation(filteredRows), [filteredRows]);
  const [activeJobName, setActiveJobName] = React.useState('');
  const closed = summary.find((item) => item.name === 'Implemented')?.count || 0;
  const openCount = filteredRows.length - closed;
  const hasFilters = Object.values(filters).some((value) => value.length);
  const chartWidth = Math.max(980, chartData.length * 130);

  React.useEffect(() => {
    if (!open) {
      setFilters(emptyFilters);
      setActiveJobName('');
      return;
    }
    setActiveJobName((previous) => previous && chartData.some((item) => item.chartKey === previous) ? previous : chartData[0]?.chartKey || '');
  }, [chartData, open]);

  const handleChartHover = (state) => {
    const jobName = state?.activeLabel;
    if (jobName) setActiveJobName(jobName);
  };

  const handleRowClick = (row) => {
    if (!row?.jobId) return;
    navigate('/audit/follow-up-particulars/' + encryptAndEncode(row.jobId.toString()));
  };

  if (!open) return null;

  return (
    <div className='model-parent dashboard-modal-parent'>
      <div className='model-wrap dashboard-overall-modal'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h5 className='mb-0 fw-semibold'>Overall Status</h5>
          <button type='button' className='dashboard-modal-close' onClick={onClose} aria-label='Close'><i className='bi bi-x-lg'></i></button>
        </div>
        {loading ? <ChartSkeleton height={420} /> : (
          <>
            <div className='row g-3 mb-4'>
              <div className='col-md-3'>
                <div className='dashboard-modal-stat'><div className='dashboard-stat-open'>{openCount}</div><div className='text-muted'>Open</div></div>
              </div>
              <div className='col-md-3'>
                <div className='dashboard-modal-stat'><div className='dashboard-stat-closed'>{closed}</div><div className='text-muted'>Closed</div></div>
              </div>
            </div>
            <div className='row g-2 mb-3'>
              <div className='col-md-5'><MultiSelectFilter label='Location' value={filters.locationId} options={uniqueFilterOptions(rows, 'locationId', 'locationName')} onChange={(value) => setFilters((previous) => ({ ...previous, locationId: value }))} /></div>
              <div className='col-md-5'><MultiSelectFilter label='Auditees' value={filters.auditeeId} options={uniqueFilterOptions(rows, 'auditeeId', 'auditeeName')} onChange={(value) => setFilters((previous) => ({ ...previous, auditeeId: value }))} /></div>
              <div className='col-md-2'><button className='btn btn-outline-secondary w-100' disabled={!hasFilters} onClick={() => setFilters(emptyFilters)}>Reset</button></div>
            </div>
            <div className='dashboard-overall-chart'>
              <div className='dashboard-overall-chart-canvas' style={{ width: chartWidth }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={chartData} margin={{ top: 22, right: 28, left: 6, bottom: 74 }} barCategoryGap='30%' onMouseMove={handleChartHover}>
                    <CartesianGrid strokeDasharray='3 3' vertical={false} />
                    <XAxis dataKey='label' interval={0} angle={-45} textAnchor='end' tick={{ fontSize: 11 }} height={96} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: 'rgba(15, 23, 42, 0.12)' }} content={<OverallStatusTooltip />} />
                    <Legend verticalAlign='bottom' height={30} />
                    <Bar dataKey='Open' fill={statusColors.Open} radius={[5, 5, 0, 0]} maxBarSize={46} minPointSize={8} />
                    <Bar dataKey='Closed' fill={statusColors.Closed} radius={[5, 5, 0, 0]} maxBarSize={46} minPointSize={8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <OverallStatusRows rows={filteredRows} activeJobName={activeJobName} onRowClick={handleRowClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default OverallStatusModal;



