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
  const {
    performRiskAssessmentObject,
    riskAssessmentSuccess,
    loading,
    initialLoading,
  } = useSelector((state) => state?.planningRiskAssessment);
  const [scoreSum, setScoreSum] = React.useState(0);
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
            ? { ...item, [event?.target?.name]: event?.target?.value }
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

  function handleSaveRiskAssessment() {
    if (!loading) {
      dispatch(
        setupUpdateRiskAssessment({
          ...performRiskAssessmentObject,
          riskAssessmentList: data?.riskAssessmentList.map((singleItem) => {
            return {
              ...singleItem,
              score:
                Number(singleItem?.likelihood) * Number(singleItem?.impact),
            };
          }),
          score: scoreSum,
          riskAssessments: {
            ...performRiskAssessmentObject?.riskAssessments,
            riskAsssessmentCriteriaForRiskManagementCPList:
              data?.riskAsssessmentCriteriaForRiskManagementCPList,
          },
        })
      );
    }
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
          performRiskAssessmentObject?.riskAssessmentList || [],
        riskAsssessmentCriteriaForRiskManagementCPList:
          performRiskAssessmentObject?.riskAssessments
            ?.riskAsssessmentCriteriaForRiskManagementCPList || [],
      };
    });
  }, [performRiskAssessmentObject]);

  React.useEffect(() => {
    let value = 0;
    data?.riskAssessmentList?.forEach((element) => {
      value = value + Number(element?.likelihood) * Number(element?.impact);
    });
    setScoreSum(value);
  }, [data]);

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
            />
          </div>
        </div>
      )}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : performRiskAssessmentObject[0]?.error === "Not Found" ? (
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
                          <th>Likelihood</th>
                          <th>Impact</th>
                          <th>Score</th>
                          <th>Comments</th>
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
                            />
                          );
                        })}
                        <tr>
                          <td colSpan="4">Total Score</td>
                          <td className="bold width-50">{scoreSum}</td>
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
                      Low(L) = 0 to 32
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow text-white label-text  label-text  label-text bg-yellow">
                      Moderate(M) = 33 to 45
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow  text-white label-text bg-orange">
                      High(H) = 46 to 59
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="px-3 py-2 border-0 card shadow bg-danger text-white label-text">
                      Extreme = 60
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
                      </tr>
                    </thead>
                    <tbody>
                      {data?.riskAsssessmentCriteriaForRiskManagementCPList?.map(
                        (cpItem, index) => {
                          return (
                            <CPListRows
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
                    Number(
                      performRiskAssessmentObject?.riskAssessments?.riskRating
                    ) > 0 && (
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
