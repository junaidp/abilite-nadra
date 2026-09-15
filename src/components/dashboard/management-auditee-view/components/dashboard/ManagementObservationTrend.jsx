import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { encryptAndEncode } from '../../../../../config/helper';
import { buildObservationRows, summarizeImplementation, uniqueFilterOptions } from '../../../home/components/dashboardHelpers';

const colors = {
  Implemented: '#0d6efd',
  Overdue: '#dc3545',
  'Within Target Timeline': '#ff7f11',
};

const emptyFilters = {
  jobName: [],
  observationName: [],
  locationId: [],
};

const filterMatches = (selectedValues, value) => {
  if (!selectedValues?.length) return true;
  return selectedValues.includes(String(value));
};

const applyFilters = (rows, filters) => rows.filter((item) => {
  if (!filterMatches(filters.jobName, item.jobName)) return false;
  if (!filterMatches(filters.observationName, item.observationName)) return false;
  if (!filterMatches(filters.locationId, item.locationId)) return false;
  return true;
});

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

const TrendRows = ({ rows, activeStatus, isOpen, setIsOpen, onRowClick }) => {
  const statusRows = rows.filter((item) => item.status === activeStatus);

  return (
    <div className='dashboard-accordion-list dashboard-trend-records'>
      <div className='dashboard-accordion-item dashboard-accordion-item-active'>
        <button type='button' className='dashboard-accordion-header' onClick={() => setIsOpen((value) => !value)}>
          <span>{activeStatus}</span>
          <span className='badge bg-light text-dark border'>{statusRows.length}</span>
          <i className={'bi ' + (isOpen ? 'bi-chevron-up' : 'bi-chevron-down')}></i>
        </button>
        <div className={'dashboard-accordion-body dashboard-accordion-collapse ' + (isOpen ? 'dashboard-accordion-collapse-open' : '')}>
          {statusRows.length ? statusRows.map((row) => (
            <button key={row.jobId + '-' + row.id} type='button' className='dashboard-small-row dashboard-clickable-row' onClick={() => onRowClick(row)}>
              <div className='dashboard-row-title text-truncate'>{row.observationName}</div>
              <div className='dashboard-row-subtitle text-truncate'>{row.jobName} - {row.locationName}</div>
            </button>
          )) : <div className='text-muted small p-2'>No observations found.</div>}
        </div>
      </div>
    </div>
  );
};

const ManagementObservationTrend = ({ dashboardReporting, locations, onOverallStatus }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState(emptyFilters);
  const [activeStatus, setActiveStatus] = React.useState('Implemented');
  const [isStatusOpen, setIsStatusOpen] = React.useState(false);
  const rows = React.useMemo(() => buildObservationRows(dashboardReporting, [], locations), [dashboardReporting, locations]);
  const filteredRows = React.useMemo(() => applyFilters(rows, filters), [rows, filters]);
  const chartData = React.useMemo(() => summarizeImplementation(filteredRows), [filteredRows]);
  const hasFilters = Object.values(filters).some((value) => value.length);

  React.useEffect(() => {
    if (filteredRows.some((item) => item.status === activeStatus)) return;
    const firstStatusWithRows = chartData.find((item) => item.count > 0)?.name || 'Implemented';
    setActiveStatus(firstStatusWithRows);
  }, [activeStatus, chartData, filteredRows]);

  const updateFilter = (key, value) => setFilters((previous) => ({ ...previous, [key]: value }));
  const setActiveFromHover = (status) => setActiveStatus(status);
  const handleRowClick = (row) => {
    if (!row?.jobId) return;
    navigate('/audit/follow-up-particulars/' + encryptAndEncode(row.jobId.toString()));
  };

  return (
    <div className='card border-0 shadow-sm h-100'>
      <div className='card-body dashboard-chart-card'>
        <div className='dashboard-chart-header mb-3'>
          <h6 className='mb-0 fw-semibold'>Observations Implementation Trend</h6>
          <span className='text-muted dashboard-observation-count'>{filteredRows.length} total observations</span>
        </div>
        <div className='row g-2 mb-3'>
          <div className='col-md-6'><MultiSelectFilter label='Job Name' value={filters.jobName} options={uniqueFilterOptions(rows, 'jobName', 'jobName')} onChange={(value) => updateFilter('jobName', value)} /></div>
          <div className='col-md-6'><MultiSelectFilter label='Observation Name' value={filters.observationName} options={uniqueFilterOptions(rows, 'observationName', 'observationName')} onChange={(value) => updateFilter('observationName', value)} /></div>
          <div className='col-md-6'><MultiSelectFilter label='Sub Location' value={filters.locationId} options={uniqueFilterOptions(rows, 'locationId', 'locationName')} onChange={(value) => updateFilter('locationId', value)} /></div>
          <div className='col-md-3'><button className='btn btn-outline-secondary w-100' disabled={!hasFilters} onClick={() => setFilters(emptyFilters)}>Reset</button></div>
          <div className='col-md-3'><button className='btn btn-primary dashboard-management-overall-button w-100' type='button' onClick={onOverallStatus}>Overall Status</button></div>
        </div>
        <div className='dashboard-trend-chart'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData} margin={{ top: 28, right: 18, left: 8, bottom: 8 }} barCategoryGap='38%' onMouseMove={(state) => state?.activeLabel && setActiveFromHover(state.activeLabel)}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='name' tick={{ fontSize: 11, fill: '#4b5563', fontFamily: 'Poppins' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#4b5563', fontFamily: 'Poppins' }} />
              <Tooltip cursor={{ fill: 'rgba(15, 23, 42, 0.08)' }} formatter={(value, name, item) => [value + ' observations (' + item.payload.percentage + '%)', item.payload.name]} />
              <Bar dataKey='count' radius={[6, 6, 0, 0]} maxBarSize={86} onMouseEnter={(data) => (data?.name || data?.payload?.name) && setActiveFromHover(data.name || data.payload.name)}>
                <LabelList dataKey='percentage' position='top' formatter={(value) => value ? value + '%' : ''} />
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={colors[entry.name]} cursor='pointer' onMouseEnter={() => setActiveFromHover(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='dashboard-chart-legend'>
          {chartData.map((item) => (
            <button key={item.name} type='button' className={'dashboard-legend-button ' + (activeStatus === item.name ? 'dashboard-legend-button-active' : '')} onMouseEnter={() => setActiveFromHover(item.name)} onClick={() => setActiveStatus(item.name)}>
              <span className='dashboard-legend-dot' style={{ background: colors[item.name] }} />
              {item.name} ({item.percentage}%)
            </button>
          ))}
        </div>
        <TrendRows rows={filteredRows} activeStatus={activeStatus} isOpen={isStatusOpen} setIsOpen={setIsStatusOpen} onRowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default ManagementObservationTrend;
