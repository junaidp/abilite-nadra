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
  setupGetAllRiskFactors,
} from "../../../../../global-redux/reducers/planing/risk-assessment/slice";
import { useSearchParams } from "react-router-dom";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import CPListRows from "./components/cp-list-rows";
import RiskAssessmentListRows from "./components/risk-assessment-list-rows";
import { CircularProgress } from "@mui/material";
import SubmitDialog from "./submit-dialog";

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
    setData((pre) => {
      return {
        ...pre,
        riskAssessmentList: pre?.riskAssessmentList?.map((item) =>
          item?.id === id
            ? { ...item, [event?.target?.name]: Number(event?.target?.value) }
            : item
        ),
      };
    });
  }

  function handleChangeCpList(event, id) {
    setData((pre) => {
      return {
        ...pre,
        riskAsssessmentCriteriaForRiskManagementCPList:
          data?.riskAsssessmentCriteriaForRiskManagementCPList?.map((item) =>
            item?.id === id
              ? {
                  ...item,
                  inadequate: false,
                  needsImprovement: false,
                  adequate: false,
                  [event?.target?.name]: event?.target?.checked,
                }
              : item
          ),
      };
    });
  }
  function handleChangeCpListComments(event, id) {
    setData((pre) => {
      return {
        ...pre,
        riskAsssessmentCriteriaForRiskManagementCPList:
          data?.riskAsssessmentCriteriaForRiskManagementCPList?.map((item) =>
            item?.id === id
              ? {
                  ...item,
                  [event?.target?.name]: event?.target?.value,
                }
              : item
          ),
      };
    });
  }

  function handleCalculateProbability(item) {
    let num = 1;
    item?.riskFactorValues?.forEach((element) => {
      let internalNumber = Number(element?.value1) + Number(element?.value2);
      num = num * internalNumber;
    });
    return num;
  }

  function handleCalculateRiskScore(item) {
    let num = 1;
    item?.riskFactorValues?.forEach((element) => {
      let internalNumber = Number(element?.value1) + Number(element?.value2);
      num = num * internalNumber;
    });
    return num * Number(item?.impact);
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
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(
        setupPerformInitialRiskAssessment({
          riskAssessmentsid: riskAssessmentId,
          approach: "Risk Factor Approach",
        })
      );
      setTimeout(() => {
        dispatch(setupGetAllRiskFactors(`?company_id=${companyId}`));
      }, 900);
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
                        <tr>
                          <th className="sr-col">Sr. #</th>
                          <th>Specific Risk</th>
                          <th>Weight</th>
                          <th>Impact Score</th>
                          {riskFactors?.map((riskFactor, index) => {
                            return (
                              <th key={index}>{riskFactor?.description}</th>
                            );
                          })}
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
                  <h4>
                    No Risk Assessment List To Show Right Now. Please add one
                    from the top
                  </h4>
                )}

                <div className="row my-3">
                  <div className="col-lg-12">
                    <h6>Rating of Score Ranges</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow bg-success text-white label-text ">
                      Low(L) = 1 to 4
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow text-white label-text  label-text  label-text bg-yellow">
                      Moderate(M) = 5 to 8
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow  text-white label-text bg-orange">
                      High(H) = 9 to 16
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow bg-danger text-white label-text">
                      Extreme = 17 to 25
                    </div>
                  </div>
                </div>
                {data?.riskAsssessmentCriteriaForRiskManagementCPList
                  ?.length !== 0 ? (
                  <table className="table w-100 table-bordered table-hover rounded equal-columns">
                    <thead>
                      <tr>
                        <th className="sr-col">Sr. #</th>
                        <th>
                          Criteria for Risk Management and Control Processes
                        </th>
                        <th className="width-100">Inadequate</th>
                        <th className="width-100">Needs Improvement</th>
                        <th className="width-100">Adequate</th>
                        <th className="width-100">Comments</th>
                        {performRiskAssessmentObject?.riskAssessments
                          ?.complete === false &&
                          data?.riskAsssessmentCriteriaForRiskManagementCPList &&
                          data?.riskAsssessmentCriteriaForRiskManagementCPList
                            ?.length > 1 && <th>Delete</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.riskAsssessmentCriteriaForRiskManagementCPList?.map(
                        (cpItem, index) => {
                          return (
                            <CPListRows
                              riskAssessmentId={riskAssessmentId}
                              cpItem={cpItem}
                              key={index}
                              index={index}
                              handleChangeCpList={handleChangeCpList}
                              handleChangeCpListComments={
                                handleChangeCpListComments
                              }
                              performRiskAssessmentObject={
                                performRiskAssessmentObject
                              }
                              data={data}
                            />
                          );
                        }
                      )}
                    </tbody>
                  </table>
                ) : (
                  <h4>
                    No Management List to Show Right Now. Please add see one
                    from the top
                  </h4>
                )}
                <div className="table-responsive overflow-x-hidden">
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="description" className="w-100">
                        Residual Level of Risk
                      </label>
                      <input
                        id="description"
                        type="text"
                        className="form-control w-100 h-40"
                        name="residualLevelOfRisk"
                        readOnly
                        value={data?.residualLevelOfRisk}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="description" className="w-100">
                        Control Effectiveness
                      </label>
                      <input
                        id="description"
                        type="text"
                        className="form-control w-100 h-40"
                        name="controlEffectiveness"
                        readOnly
                        value={data?.controlEffectiveness}
                      />
                    </div>
                  </div>
                  {(performRiskAssessmentObject?.riskAssessments?.complete ===
                    false ||
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
