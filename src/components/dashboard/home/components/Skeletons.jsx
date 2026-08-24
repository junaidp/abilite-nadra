import React from 'react';

export const KpiSkeleton = () => (
  <div className='row g-3 mb-4 placeholder-glow'>
    {[1, 2, 3, 4].map((item) => (
      <div className='col-6 col-md-3' key={item}>
        <div className='bg-white p-4 rounded shadow-sm border text-center'>
          <span className='placeholder col-3 d-block mx-auto mb-3' style={{ height: 28 }} />
          <span className='placeholder col-6 d-block mx-auto' style={{ height: 14 }} />
        </div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 6, cols = 4 }) => (
  <div className='card border-0 shadow-sm placeholder-glow'>
    <div className='card-body'>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className='d-flex gap-3 mb-3'>
          {[...Array(cols)].map((__, colIndex) => (
            <div key={colIndex} className='placeholder col' style={{ height: 18 }} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className='card border-0 shadow-sm placeholder-glow'>
    <div className='card-body'>
      <span className='placeholder col-4 mb-4' style={{ height: 18 }} />
      <div className='d-flex align-items-end gap-4' style={{ height: 260 }}>
        {[80, 150, 110, 190, 95].map((height, index) => (
          <span key={index} className='placeholder col' style={{ height }} />
        ))}
      </div>
    </div>
  </div>
);
