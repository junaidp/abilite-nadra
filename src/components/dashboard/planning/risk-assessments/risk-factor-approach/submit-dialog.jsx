import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitRiskAssessment } from "../../../../../global-redux/reducers/planing/risk-assessment/slice";
import { toast } from "react-toastify";

const SubmitDialog = ({
  object,
  setShowSubmitDialog,
  data,
  handleCalculateRiskScore,
  handleCalculateProbability,
}) => {
  const dispatch = useDispatch();
  const { riskAssessmentSuccess, loading } = useSelector(
    (state) => state?.planningRiskAssessment
  );

  function handleSubmit() {
    if (!loading) {
      let weight = 0;
      data?.riskAssessmentList?.forEach((risk) => {
        weight = weight + Number(risk?.likelihood);
      });
      if (weight !== 100) {
        toast.error(
          "Total weight against the specific risks can not be less than 100%."
        );
        return;
      }
      dispatch(
        setupSubmitRiskAssessment({
          ...object,
          riskAssessmentList: data?.riskAssessmentList.map((singleItem) => {
            return {
              ...singleItem,
              riskFactorValues: singleItem?.riskFactorValues?.map(
                (riskFactor) => {
                  return {
                    name: riskFactor?.name,
                    value1: riskFactor?.value1,
                    value2: riskFactor?.value2,
                    comments:riskFactor?.comments
                  };
                }
              ),
              score: handleCalculateRiskScore(singleItem),
              comments: handleCalculateProbability(singleItem).toString(),
            };
          }),
          riskAssessments: {
            ...object?.riskAssessments,
            complete: true,
          },
        })
      );
    }
  }

  React.useEffect(() => {
    if (riskAssessmentSuccess) {
      setShowSubmitDialog(false);
    }
  }, [riskAssessmentSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Risk Assessment?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger  float-end mx-2`}
          onClick={() => setShowSubmitDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitDialog;
