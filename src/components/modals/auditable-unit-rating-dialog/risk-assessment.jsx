import React from "react";

const RiskAssessment = ({ riskAssessments, setRisks, risks }) => {
  function handleCalculateProbability(item) {
    let num = 0;
    item?.riskFactorValues?.forEach((element) => {
      let internalNumber =
        Number(element?.value1 / 100) * Number(element?.value2);
      num = num + internalNumber;
    });
    return num.toFixed(2);
  }

  function handleCalculateRiskScore(item) {
    let num = 0;
    item?.riskFactorValues?.forEach((element) => {
      let internalNumber =
        (Number(element?.value1) / 100) * Number(element?.value2);
      num += internalNumber;
    });

    let result = num * (Number(item?.impact) / 100) * Number(item?.likelihood);

    return Number(result.toFixed(2));
  }

  function handleChange(id) {
    if (risks.includes(id)) {
      setRisks((pre) => pre?.filter((riskId) => riskId !== id));
    } else {
      setRisks([...risks, id]);
    }
  }


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
            <th>Selected</th>
          </tr>
        </thead>
        <tbody>
          {riskAssessments?.map((risk, index) => {
            return (
              <tr>
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
                <td>
                  <div className="row mt-4 mb-4">
                    <div className="form-check form-switch ml-12">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={() => handleChange(risk?.id)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RiskAssessment;
