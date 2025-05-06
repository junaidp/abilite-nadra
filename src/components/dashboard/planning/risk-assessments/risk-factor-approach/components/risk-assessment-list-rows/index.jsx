import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteResidualRisk } from "../../../../../../../global-redux/reducers/planing/risk-assessment/slice";

const RiskAssessmentListRows = ({
  item,
  handleChangeSingleRiskAssessmentItem,
  performRiskAssessmentObject,
  index,
  data,
  handleChangeRiskFactorValues,
  handleCalculateProbability,
  handleCalculateRiskScore,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { loading } = useSelector((state) => state?.planningRiskAssessment);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <p>{item?.description || ""}</p>
      </td>
      <td className="w-120">
        <select
          className="form-select"
          aria-label="Default select example"
          name="likelihood"
          value={item?.likelihood}
          onChange={(event) =>
            handleChangeSingleRiskAssessmentItem(event, item?.id)
          }
          disabled={
            performRiskAssessmentObject?.riskAssessments?.locked === true ||
              (performRiskAssessmentObject?.riskAssessments?.complete === true &&
                performRiskAssessmentObject?.riskAssessments?.locked === false &&
                user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
              ? true
              : false
          }
        >
          <option>select</option>
          <option value={0}>0 %</option>
          <option value={10}>10 %</option>
          <option value={20}>20 %</option>
          <option value={30}>30 %</option>
          <option value={40}>40 %</option>
          <option value={50}>50 %</option>
          <option value={60}>60 %</option>
          <option value={70}>70 %</option>
          <option value={80}>80 %</option>
          <option value={90}>90 %</option>
          <option value={100}>100 %</option>
        </select>
      </td>
      <td className="w-120">
        <select
          className="form-select"
          aria-label="Default select example"
          name="impact"
          value={item?.impact}
          onChange={(event) =>
            handleChangeSingleRiskAssessmentItem(event, item?.id)
          }
          disabled={
            performRiskAssessmentObject?.riskAssessments?.locked === true ||
              (performRiskAssessmentObject?.riskAssessments?.complete === true &&
                performRiskAssessmentObject?.riskAssessments?.locked === false &&
                user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
              ? true
              : false
          }
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </td>
      {item?.riskFactorValues?.map((riskFactor, index) => {
        return (
          <td key={index}>
            <div className="row gap-2">
              <div className="col-lg-12">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="value1"
                  disabled={
                    performRiskAssessmentObject?.riskAssessments?.locked ===
                      true ||
                      (performRiskAssessmentObject?.riskAssessments?.complete ===
                        true &&
                        performRiskAssessmentObject?.riskAssessments?.locked ===
                        false &&
                        user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                      ? true
                      : false
                  }
                  onChange={(event) =>
                    handleChangeRiskFactorValues(item?.id, riskFactor.id, event)
                  }
                  value={riskFactor?.value1}
                >
                  <option value={0}>0%</option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                  <option value={30}>30%</option>
                  <option value={40}>40%</option>
                  <option value={50}>50%</option>
                  <option value={60}>60%</option>
                  <option value={70}>70%</option>
                  <option value={80}>80%</option>
                  <option value={90}>90%</option>
                  <option value={100}>100%</option>
                </select>
              </div>
              <div className="col-lg-12">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="value2"
                  disabled={
                    performRiskAssessmentObject?.riskAssessments?.locked ===
                      true ||
                      (performRiskAssessmentObject?.riskAssessments?.complete ===
                        true &&
                        performRiskAssessmentObject?.riskAssessments?.locked ===
                        false &&
                        user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                      ? true
                      : false
                  }
                  onChange={(event) =>
                    handleChangeRiskFactorValues(item?.id, riskFactor.id, event)
                  }
                  value={riskFactor?.value2}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div>
                <textarea className="form-control" maxLength="300"
                  onChange={(event) =>
                    handleChangeRiskFactorValues(item?.id, riskFactor.id, event)
                  }
                  value={riskFactor?.comments}
                  name="comments"
                  disabled={
                    performRiskAssessmentObject?.riskAssessments?.locked ===
                      true ||
                      (performRiskAssessmentObject?.riskAssessments?.complete ===
                        true &&
                        performRiskAssessmentObject?.riskAssessments?.locked ===
                        false &&
                        user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                      ? true
                      : false
                  }
                ></textarea>
              </div>
            </div>
          </td>
        );
      })}
      <td>{handleCalculateProbability(item)}</td>
      <td>{handleCalculateRiskScore(item)}</td>
      {performRiskAssessmentObject?.riskAssessments?.complete === false &&
        data?.riskAssessmentList &&
        data?.riskAssessmentList?.length > 1 && (
          <td>
            <i
              className="fa fa-trash text-danger f-18 cursor-pointer"
              onClick={() => {
                !loading &&
                  dispatch(
                    setupDeleteResidualRisk({
                      riskAssessmentId: item?.id,
                      riskFactorApproachId: performRiskAssessmentObject?.id,
                    })
                  );
              }}
            ></i>
          </td>
        )}
    </tr>
  );
};

export default RiskAssessmentListRows;
