import React from "react";

const RiskFactorApproach = () => {
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Risk Factor Approach with Total Risk Score
        </label>

        <table className="table table-bordered table-hover rounded">
          <thead>
            <tr>
              <th className="bg-transparent"></th>
              <th className="bg-transparent"></th>
              <th className="bg-secondary text-white" colSpan="3">
                Impact-Related Risk Factors
              </th>
              <th className="bg-secondary text-white" colSpan="5">
                Impact-Related Risk Factors
              </th>
              <th className="bg-transparent"></th>
            </tr>
            <tr>
              <th>Sr. #</th>
              <th>Business Objective</th>
              <th>Loss/Material Exposure</th>
              <th>Strategic Risk</th>
              <th>Sub Total</th>
              <th>Control Environment</th>
              <th>Complexity</th>
              <th>Assurance Coverage</th>
              <th>Management Assurance</th>
              <th>Sub Total</th>
              <th>Total Risk Score</th>
            </tr>

            <tr>
              <th className="bg-transparent" colSpan="2">
                {" "}
                Weight
              </th>
              <th className="bg-transparent">2</th>
              <th className="bg-transparent">4</th>

              <th className="bg-transparent"></th>
              <th className="bg-transparent">5</th>
              <th className="bg-transparent">6</th>
              <th className="bg-transparent">8</th>
              <th className="bg-transparent">9</th>
              <th className="bg-transparent"></th>
              <th className="bg-transparent"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td>5</td>
              <td>5</td>
              <td>
                <div className="fw-bold">4</div>
              </td>
              <td>8</td>
              <td>6</td>
              <td>4</td>
              <td>3</td>
              <td className="fw-bold">3.45</td>
              <td className="fw-bold">6.45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskFactorApproach;
