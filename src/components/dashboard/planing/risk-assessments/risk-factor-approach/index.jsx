import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AddRiskFactorDialog from "../../../../modals/add-risk-factor-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import {
  setupPerformRiskAssessment,
  resetRiskAssessment,
  setupUpdateRiskAssessment,
} from "../../../../../global-redux/reducers/planing/risk-assessment/slice";
import { useSearchParams } from "react-router-dom";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import CPListRows from "./components/cp-list-rows";
import RiskAssessmentListRows from "./components/risk-assessment-list-rows";

const RiskFactorApproach = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const riskAssessmentId = searchParams.get("riskAssessmentId");
  const { user } = useSelector((state) => state?.auth);
  const { performRiskAssessmentObject, riskAssessmentSuccess, loading } =
    useSelector((state) => state?.planingRiskAssessments);
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

  function handleSaveRiskAssessment() {
    if (!loading) {
      dispatch(
        setupUpdateRiskAssessment({
          ...performRiskAssessmentObject,
          riskAssessmentList: data?.riskAssessmentList.map((singleItem) => {
            return {
              ...singleItem,
              score:
                Number(singleItem?.likelihood) + Number(singleItem?.impact),
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
        setupPerformRiskAssessment({
          riskAssessmentsid: riskAssessmentId,
          approach: "Risk Factor Approach",
        })
      );
    }
  }, [riskAssessmentId, user]);

  React.useEffect(() => {
    let value = 0;
    data?.riskAssessmentList?.forEach((element) => {
      value = value + (Number(element?.likelihood) + Number(element?.impact));
    });
    setScoreSum(value);
  }, [data]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-risk-assessments"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
  }, []);

  React.useEffect(() => {
    if (!riskAssessmentId) {
      navigate("/audit/risk-assessment");
    }
  }, [riskAssessmentId]);

  return (
    <div>
      {showAddRiskFactorDialog && (
        <div className="add-risk-factor-dialog">
          <div className="modal-objective-factor ">
            <div className="model-wrap-factor">
              <AddRiskFactorDialog
                setShowAddRiskFactorDialog={setShowAddRiskFactorDialog}
              />
            </div>
          </div>
        </div>
      )}

      <div className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="align-items-center  text-start d-flex my-3">
          <a
            className="text-primary"
            onClick={() => navigate("/audit/risk-assessment")}
          >
            <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
          </a>
          <div className="mb-0 heading">Risk Factor Approach</div>
        </div>

        <div
          className="btn btn-labeled btn-primary px-3 shadow"
          onClick={() => setShowAddRiskFactorDialog(true)}
        >
          <span className="btn-label me-2">
            <i className="fa fa-plus-circle"></i>
          </span>
          Add Risk Factor
        </div>
      </div>
      <div className="ps-3 sub-heading mb-2">
        {performRiskAssessmentObject?.riskAssessments?.jobDescription}
      </div>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12">
            {data?.riskAssessmentList.length !== 0 ? (
              <div className="table-responsive">
                <table className="table w-100 table-bordered table-hover rounded equal-columns">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th>Risk factors</th>
                      <th>Likelihood</th>
                      <th>Impact</th>
                      <th>Score</th>
                      <th>Comments</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.riskAssessmentList?.map((item, index) => {
                      return (
                        <RiskAssessmentListRows
                          key={index}
                          item={item}
                          handleChangeSingleRiskAssessmentItem={
                            handleChangeSingleRiskAssessmentItem
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
                No Risk Assessment List To Show Right Now. Please add one from
                the top
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
            {data?.riskAsssessmentCriteriaForRiskManagementCPList?.length !==
            0 ? (
              <table className="table w-100 table-bordered table-hover rounded equal-columns">
                <thead>
                  <tr>
                    <th className="sr-col">Sr. #</th>
                    <th>Criteria for Risk Management and Control Processes</th>
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
                          handleChangeCpList={handleChangeCpList}
                          handleChangeCpListComments={
                            handleChangeCpListComments
                          }
                        />
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <h4>
                No Management List to Show Right Now. Please add see one from
                the top
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskFactorApproach;
