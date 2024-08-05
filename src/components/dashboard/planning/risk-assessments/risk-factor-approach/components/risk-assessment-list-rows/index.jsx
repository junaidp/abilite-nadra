import React from "react";
import { useSelector } from "react-redux";

const RiskAssessmentListRows = ({
  item,
  handleChangeSingleRiskAssessmentItem,
  performRiskAssessmentObject,
  index,
}) => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <p>{item?.description || ""}</p>
      </td>
      <td className="w-80">
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
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </td>
      <td className="w-80">
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
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </td>
      <td className="bold width-50">
        {Number(item?.likelihood) + Number(item?.impact)}
      </td>
      <td>
        <textarea
          className="form-control"
          placeholder="Enter Reason"
          id="exampleFormControlTextarea1"
          rows="3"
          name="comments"
          value={item?.comments || ""}
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
          maxLength="500"
        ></textarea>
        <p className="word-limit-info label-text mb-2">
          Maximum 500 characters
        </p>
      </td>
    </tr>
  );
};

export default RiskAssessmentListRows;
