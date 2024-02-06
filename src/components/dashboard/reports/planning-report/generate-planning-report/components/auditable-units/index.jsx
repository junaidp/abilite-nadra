import React from "react";

const AuditableUnits = () => {
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Analyses (or summary) of inherent and/or residual risk levels of
          auditable units.
        </label>

        <table className="table table-bordered table-hover rounded">
          <thead>
            <tr>
              <th>Sr. #</th>
              <th className="w-220">Business Objective</th>
              <th>Inherent Level of Risk</th>
              <th>Control Effectiveness</th>
              <th>Residual Level of Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td>Moderate</td>
              <td>Needs Improvement</td>
              <td>Moderate</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditableUnits;
