import React from "react";
import {
  handleCalculateRiskScore,
  handleCalculateProbability,
} from "../../../config/helper"

const RiskAssessment = ({ riskAssessments }) => {
  return (
    <div>
      <table className="table w-100 table-bordered table-hover rounded equal-columns">
        <thead className="bg-secondary text-white">
          <tr>
            <th className="sr-col">Sr. #</th>
            <th>Specific Risk</th>
            <th>Weight</th>
            <th>Impact Score</th>
            <th>Probability</th>
            <th>Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {!riskAssessments || riskAssessments?.length === 0 ? (
            <tr>
              <td className="w-300">No Risks Selected</td>
            </tr>
          ) : (
            riskAssessments?.map((risk, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <p>{risk?.description || ""}</p>
                  </td>
                  <td className="w-120">
                    <p>{risk?.likelihood} %</p>
                  </td>
                  <td className="w-120">
                    <p>{risk?.impact}</p>
                  </td>

                  <td>{handleCalculateProbability(risk)}</td>
                  <td>{handleCalculateRiskScore(risk)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiskAssessment;
