import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AddRiskFactorDialog from "../../../../modals/add-risk-factor-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import {
  setupPerformRiskAssessment,
  resetRiskAssessment,
  setupUpdateRiskAssessment,
  handleCleanUp,
  setupPerformInitialRiskAssessment,
} from "../../../../../global-redux/reducers/planing/risk-assessment/slice";
import { useSearchParams } from "react-router-dom";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import RiskAssessmentListRows from "./components/risk-assessment-list-rows";
import { CircularProgress } from "@mui/material";
import SubmitDialog from "./submit-dialog";
import { toast } from "react-toastify";

const RiskFactorApproach = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const riskAssessmentId = searchParams.get("riskAssessmentId");
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const {
    performRiskAssessmentObject,
    riskAssessmentSuccess,
    loading,
    initialLoading,
    riskFactors,
  } = useSelector((state) => state?.planningRiskAssessment);
  const [showAddRiskFactorDialog, setShowAddRiskFactorDialog] =
    React.useState(false);
  const [data, setData] = React.useState({
    residualLevelOfRisk: "",
    controlEffectiveness: "",
    riskAssessmentList: [],
    riskAsssessmentCriteriaForRiskManagementCPList: [],
  });

  function handleChangeSingleRiskAssessmentItem(event, id) {
    const { name, value } = event.target;
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (name === "likelihood") {
      const totalWeight = data?.riskAssessmentList?.reduce(
        (sum, item) =>
          sum + (item.id === id ? numericValue : Number(item?.likelihood)),
        0
      );

      if (totalWeight > 100) {
        toast.error("Total weight cannot exceed the value of 100");
        return;
      }
    }

    setData((prev) => ({
      ...prev,
      riskAssessmentList: prev?.riskAssessmentList?.map((item) =>
        item?.id === id ? { ...item, [name]: numericValue } : item
      ),
    }));
  }

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
        Number(element?.value1 / 100) * Number(element?.value2);
      num = num + internalNumber;
    });
    let result =
      num.toFixed(2) * (Number(item?.impact / 100) * Number(item?.likelihood));
    return result.toFixed(2);
  }

  function handleSaveRiskAssessment() {
    if (!loading) {
      dispatch(
        setupUpdateRiskAssessment({
          ...performRiskAssessmentObject,
          riskAssessmentList: data?.riskAssessmentList.map((singleItem) => {
            return {
              ...singleItem,
              riskFactorValues: singleItem?.riskFactorValues?.map(
                (riskFactor) => {
                  return {
                    name: riskFactor?.name,
                    value1: riskFactor?.value1,
                    value2: riskFactor?.value2,
                  };
                }
              ),
              score: handleCalculateRiskScore(singleItem),
              comments: handleCalculateProbability(singleItem).toString(),
            };
          }),
          riskAssessments: {
            ...performRiskAssessmentObject?.riskAssessments,
            riskAsssessmentCriteriaForRiskManagementCPList:
              data?.riskAsssessmentCriteriaForRiskManagementCPList,
          },
        })
      );
    }
  }

  function handleChangeRiskFactorValues(riskAssessmentId, riskFactorId, event) {
    setData((pre) => {
      return {
        ...pre,
        riskAssessmentList: pre?.riskAssessmentList?.map((riskAssessment) =>
          Number(riskAssessment?.id) === Number(riskAssessmentId)
            ? {
                ...riskAssessment,
                riskFactorValues: riskAssessment?.riskFactorValues?.map(
                  (riskFactor) =>
                    Number(riskFactor?.id) === Number(riskFactorId)
                      ? {
                          ...riskFactor,
                          [event.target.name]: Number(event.target.value),
                        }
                      : riskFactor
                ),
              }
            : riskAssessment
        ),
      };
    });
  }

  function handlCalculateEnterpriseValue() {
    let num = 0;
    data?.riskAssessmentList?.forEach((element) => {
      num += Number(element?.likelihood);
    });
    return num;
  }

  React.useEffect(() => {
    setData((pre) => {
      return {
        ...pre,
        residualLevelOfRisk:
          performRiskAssessmentObject?.riskAssessments?.residualLevelOfRisk ||
          "null",
        controlEffectiveness:
          performRiskAssessmentObject?.riskAssessments?.controlEffectiveness ||
          "null",
        riskAssessmentList:
          performRiskAssessmentObject?.riskAssessmentList?.map(
            (riskAssessment) => {
              return {
                ...riskAssessment,
                riskFactorValues:
                  riskAssessment?.riskFactorValues?.length > 0
                    ? riskAssessment?.riskFactorValues
                    : riskFactors?.map((item, index) => {
                        return {
                          id: index + 1,
                          name: item?.description,
                          value1: "",
                          value2: "",
                        };
                      }),
              };
            }
          ) || [],
        riskAsssessmentCriteriaForRiskManagementCPList:
          performRiskAssessmentObject?.riskAssessments
            ?.riskAsssessmentCriteriaForRiskManagementCPList || [],
      };
    });
  }, [performRiskAssessmentObject, riskFactors]);

  React.useEffect(() => {
    if (riskAssessmentSuccess) {
      dispatch(
        setupPerformRiskAssessment({
          riskAssessmentsid: riskAssessmentId,
          approach: "Risk Factor Approach",
        })
      );
      dispatch(resetRiskAssessment());
    }
  }, [riskAssessmentSuccess]);

  React.useEffect(() => {
    if (riskAssessmentId && user[0]?.token) {
      dispatch(
        setupPerformInitialRiskAssessment({
          riskAssessmentsid: riskAssessmentId,
          approach: "Risk Factor Approach",
        })
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!riskAssessmentId) {
      navigate("/audit/risk-assessment");
    }
  }, [riskAssessmentId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-risk-assessments"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {showSubmitDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <SubmitDialog
              object={performRiskAssessmentObject}
              setShowSubmitDialog={setShowSubmitDialog}
              data={data}
              handleCalculateRiskScore={handleCalculateRiskScore}
              handleCalculateProbability={handleCalculateProbability}
            />
          </div>
        </div>
      )}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : performRiskAssessmentObject?.length === 0 ||
        !performRiskAssessmentObject ? (
        "Risk Assessment Not Found"
      ) : (
        <>
          {showAddRiskFactorDialog && (
            <div className="model-parent">
              <div className="model-wrap">
                <AddRiskFactorDialog
                  setShowAddRiskFactorDialog={setShowAddRiskFactorDialog}
                />
              </div>
            </div>
          )}

          <div className="section-header my-3 row">
            <div className="align-items-center col-lg-10 text-start d-flex">
              <a
                className="text-primary"
                onClick={() => navigate("/audit/risk-assessment")}
              >
                <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
              </a>
              <div className="mb-0 heading">
                {performRiskAssessmentObject?.riskAssessments?.jobDescription}
              </div>
            </div>
            {(performRiskAssessmentObject?.riskAssessments?.complete ===
              false ||
              (performRiskAssessmentObject?.riskAssessments?.complete ===
                true &&
                performRiskAssessmentObject?.riskAssessments?.locked ===
                  false &&
                user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
              <div className="col-lg-2 float-end d-flex justify-content-end align-items-center">
                <div
                  className="btn btn-labeled btn-primary px-3 shadow"
                  onClick={() => setShowAddRiskFactorDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus-circle"></i>
                  </span>
                  Specific Risk
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="row mb-5">
              <div className="col-lg-12">
                {data?.riskAssessmentList.length !== 0 ? (
                  <div className="table-responsive">
                    <table className="table w-100 table-bordered table-hover rounded equal-columns">
                      <thead className="bg-secondary text-white">
                        {/* Additional Row for Extra Heading */}
                        <tr>
                          <th colSpan={4} className="bg-white"></th>{" "}
                          {/* Empty columns to align with previous columns */}
                          <th
                            colSpan={riskFactors?.length || 0}
                            className="text-center"
                          >
                            Controls (1 being the strongest - 5 the weakest)
                          </th>
                          <th colSpan={3} className="bg-white"></th>
                          {/* Empty columns for remaining columns */}
                        </tr>

                        {/* Original Header Row */}
                        <tr>
                          <th className="sr-col">Sr. #</th>
                          <th>Specific Risk</th>
                          <th>Weight</th>
                          <th>Impact Score</th>
                          {riskFactors?.map((riskFactor, index) => (
                            <th key={index}>{riskFactor?.description}</th>
                          ))}
                          <th>Probability</th>
                          <th>Risk Score</th>
                          {performRiskAssessmentObject?.riskAssessments
                            ?.complete === false &&
                            data?.riskAssessmentList &&
                            data?.riskAssessmentList?.length > 1 && (
                              <th>Delete</th>
                            )}
                        </tr>
                      </thead>

                      <tbody>
                        {data?.riskAssessmentList?.map((item, index) => {
                          return (
                            <RiskAssessmentListRows
                              key={index}
                              index={index}
                              item={item}
                              handleChangeSingleRiskAssessmentItem={
                                handleChangeSingleRiskAssessmentItem
                              }
                              performRiskAssessmentObject={
                                performRiskAssessmentObject
                              }
                              data={data}
                              handleChangeRiskFactorValues={
                                handleChangeRiskFactorValues
                              }
                              handleCalculateProbability={
                                handleCalculateProbability
                              }
                              handleCalculateRiskScore={
                                handleCalculateRiskScore
                              }
                            />
                          );
                        })}
                        <tr>
                          <td colSpan="2">Enterprise Value</td>
                          <td className="bold width-50">
                            {handlCalculateEnterpriseValue()} %
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>
                    No Risk Assessment List To Show Right Now. Please add one
                    from the top
                  </p>
                )}

                <div className="table-responsive overflow-x-hidden">
                  {((performRiskAssessmentObject?.riskAssessments?.complete ===
                    false &&
                    performRiskAssessmentObject?.riskAssessmentList?.length >
                      0) ||
                    (performRiskAssessmentObject?.riskAssessments?.complete ===
                      true &&
                      performRiskAssessmentObject?.riskAssessments?.locked ===
                        false &&
                      user[0]?.userId?.employeeid?.userHierarchy ===
                        "IAH")) && (
                    <div
                      className={`btn btn-labeled btn-primary px-3 shadow float-end my-4 ${
                        loading && "disabled"
                      }`}
                      onClick={handleSaveRiskAssessment}
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-check-circle f-18"></i>
                      </span>
                      {loading ? "Loading.." : "Save"}
                    </div>
                  )}

                  {performRiskAssessmentObject?.riskAssessments?.complete ===
                    false &&
                    performRiskAssessmentObject?.riskAssessmentList &&
                    performRiskAssessmentObject?.riskAssessmentList?.length >
                      0 && (
                      <div
                        className={`btn btn-labeled btn-primary px-3 shadow float-end my-4 mx-4 `}
                        onClick={() => setShowSubmitDialog(true)}
                      >
                        <span className="btn-label me-2">
                          <i className="fa fa-check-circle f-18"></i>
                        </span>
                        Submit
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RiskFactorApproach;
