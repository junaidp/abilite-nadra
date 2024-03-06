import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  changeKickOffRequest,
  changeActiveLink,
} from "../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleAuditEngagement,
  resetAuditEngagementAddSuccess,
  resetAuditEngagementObservationAddSuccess,
  handleCleanUp,
  setupGetInitialSingleAuditEngagement,
} from "../../../../global-redux/reducers/audit-engagement/slice";
import AddKickOffObjectiveDialog from "../../../modals/add-kickoff-objective-dialog";
import AddKickOffRatingDialog from "../../../modals/add-kickoff-rating-dialog";
import AddKickOffControlDialog from "../../../modals/add-kickoff-control-dialog";
import ViewRiskLibraryDialog from "../../../modals/view-risk-control-matrix-library-dialog/index";
import AuditStepsDialog from "../../../modals/audit-steps-dialog/index";
import ComplianceCheckListDialog from "../../../modals/compliance-checklist-dialog/index";
import AddAuditProgramDialog from "../../../modals/add-audit-program-dialog";
import JobName from "./component/job-name";
import AuditNotifications from "./component/audit-notifications";
import RaiseInformationRequest from "./component/raise-information-request";
import RiskControlMatrix from "./component/risk-control-matrix";
import AuditProgram from "./component/audit-program";
import AuditSteps from "./component/audit-steps";
import ComplianceCheckList from "./component/compliace-checklist";
import { CircularProgress } from "@mui/material";

const KickOff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const auditEngagementId = searchParams.get("auditEngagementId");
  const { user } = useSelector((state) => state?.auth);
  const {
    auditEngagementAddSuccess,
    auditEngagementObservationAddSuccess,
    singleAuditEngagementObject,
    loading,
    initialLoading,
  } = useSelector((state) => state?.auditEngagement);

  const [currentAuditEngagement, setCurrentAuditEngagement] = React.useState(
    {}
  );
  const [showViewLibrary, setShowViewLibrary] = React.useState(false);
  let [showComplianceCheckListDialog, setShowComplianceCheckListDialog] =
    React.useState(false);
  const [showAuditStepsDialog, setShowAuditStepsDialog] = React.useState(false);
  const [showKickOffObjectiveDialog, setShowKickOffObjectiveDialog] =
    React.useState(false);
  const [showKickOffRatingDialog, setShowKickOffRatingDialog] =
    React.useState(false);
  const [showKickOffControlDialog, setShowKickOffControlDialog] =
    React.useState(false);
  const [showAddAuditProgramDialog, setShowAddAuditProgramDialog] =
    React.useState(false);
  const [auditStepId, setAuditStepId] = React.useState("");
  const [complianceCheckListMainId, setComplianceCheckListMainId] =
    React.useState("");

  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleAuditEngagementObject).length === 0 &&
      singleAuditEngagementObject.constructor === Object;
    if (!isEmptyObject) {
      let currentItem = singleAuditEngagementObject;
      if (currentItem?.riskControlMatrix !== null) {
        currentItem = {
          ...currentItem,
          riskControlMatrix: {
            ...currentItem?.riskControlMatrix,
            objectives: currentItem?.riskControlMatrix?.objectives?.map(
              (objective) => {
                return {
                  ...objective,
                  editable: false,
                  riskRatingList: objective?.riskRatingList?.map((rating) => {
                    return {
                      ...rating,
                      editable: false,
                      controlRiskList: rating?.controlRiskList?.map(
                        (control) => {
                          return {
                            ...control,
                            editable: false,
                          };
                        }
                      ),
                    };
                  }),
                };
              }
            ),
          },
        };
      }
      if (
        currentItem?.auditProgram !== null &&
        currentItem?.auditProgram?.programList?.length !== 0
      ) {
        currentItem = {
          ...currentItem,
          auditProgram: {
            ...currentItem?.auditProgram,
            programList: currentItem?.auditProgram?.programList?.map(
              (program) => {
                return {
                  ...program,
                  editable: false,
                };
              }
            ),
          },
        };
      }
      setCurrentAuditEngagement(currentItem);
    }
  }, [singleAuditEngagementObject]);

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      dispatch(setupGetSingleAuditEngagement(auditEngagementId));
      dispatch(resetAuditEngagementAddSuccess());
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      dispatch(setupGetSingleAuditEngagement(auditEngagementId));
      dispatch(resetAuditEngagementObservationAddSuccess());
    }
  }, [auditEngagementObservationAddSuccess]);

  React.useEffect(() => {
    if (user[0]?.token && auditEngagementId) {
      dispatch(setupGetInitialSingleAuditEngagement(auditEngagementId));
    }
  }, [user, auditEngagementId]);

  React.useEffect(() => {
    dispatch(changeKickOffRequest(""));
  }, []);

  React.useEffect(() => {
    if (!auditEngagementId) {
      navigate("/audit/audit-engagement");
    }
  }, [auditEngagementId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-audit-engagement"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : singleAuditEngagementObject[0]?.error === "Not Found" ? (
        "Audit Engagement Not Found"
      ) : (
        <>
          {showViewLibrary && (
            <div className="modal-objective-library">
              <div className="model-wrap-library">
                <ViewRiskLibraryDialog
                  setShowViewLibrary={setShowViewLibrary}
                  currentAuditEngagement={currentAuditEngagement}
                />
              </div>
            </div>
          )}

          {showAuditStepsDialog && (
            <div className="modal-objective-audit-steps-library">
              <div className="model-wrap-audit-steps-library">
                <AuditStepsDialog
                  setShowAuditStepsDialog={setShowAuditStepsDialog}
                  auditStepId={auditStepId}
                  currentAuditEngagement={currentAuditEngagement}
                />
              </div>
            </div>
          )}
          {showComplianceCheckListDialog && (
            <div className="modal-compliance-check-list">
              <div className="model-wrap-compliance-check-list">
                <ComplianceCheckListDialog
                  setShowComplianceCheckListDialog={
                    setShowComplianceCheckListDialog
                  }
                  currentAuditEngagement={currentAuditEngagement}
                  complianceCheckListMainId={complianceCheckListMainId}
                />
              </div>
            </div>
          )}
          {showAddAuditProgramDialog && (
            <div className="modal-compliance-check-list">
              <div className="model-wrap-compliance-check-list">
                <AddAuditProgramDialog
                  setShowAddAuditProgramDialog={setShowAddAuditProgramDialog}
                  auditEngagementId={auditEngagementId}
                  currentAuditEngagement={currentAuditEngagement}
                />
              </div>
            </div>
          )}
          {/* Risk Control Matrix Dialogs */}
          {showKickOffObjectiveDialog && (
            <div className="modal-compliance-check-list">
              <div className="model-wrap-compliance-check-list">
                <AddKickOffObjectiveDialog
                  setShowKickOffObjectiveDialog={setShowKickOffObjectiveDialog}
                  auditEngagementId={auditEngagementId}
                />
              </div>
            </div>
          )}
          {showKickOffRatingDialog && (
            <div className="modal-compliance-check-list">
              <div className="model-wrap-compliance-check-list">
                <AddKickOffRatingDialog
                  setShowKickOffRatingDialog={setShowKickOffRatingDialog}
                  currentAuditEngagement={currentAuditEngagement}
                />
              </div>
            </div>
          )}
          {showKickOffControlDialog && (
            <div className="modal-compliance-check-list">
              <div className="model-wrap-compliance-check-list">
                <AddKickOffControlDialog
                  setShowKickOffControlDialog={setShowKickOffControlDialog}
                  currentAuditEngagement={currentAuditEngagement}
                  auditEngagementId={auditEngagementId}
                />
              </div>
            </div>
          )}

          <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading d-flex align-items-center">
              <i
                onClick={() => navigate("/audit/audit-engagement")}
                className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
              ></i>

              <h2 className="mx-2 m-2 heading">
                {currentAuditEngagement?.title}
              </h2>
            </div>
          </header>

          <div className="row px-4">
            <div className="col-md-12">
              <div className="accordion" id="accordionFlushExample">
                <JobName currentAuditEngagement={currentAuditEngagement} />
                <AuditNotifications
                  currentAuditEngagement={currentAuditEngagement}
                  auditEngagementId={auditEngagementId}
                />
                {/* <RaiseInformationRequest /> */}
                {currentAuditEngagement?.auditStepChecklistList === null ||
                  (currentAuditEngagement?.auditStepChecklistList?.length ===
                    0 && (
                    <RiskControlMatrix
                      setShowViewLibrary={setShowViewLibrary}
                      currentAuditEngagement={currentAuditEngagement}
                      setCurrentAuditEngagement={setCurrentAuditEngagement}
                      setShowKickOffObjectiveDialog={
                        setShowKickOffObjectiveDialog
                      }
                      setShowKickOffRatingDialog={setShowKickOffRatingDialog}
                      setShowKickOffControlDialog={setShowKickOffControlDialog}
                      auditEngagementId={auditEngagementId}
                    />
                  ))}
                {currentAuditEngagement?.auditStepChecklistList === null ||
                  (currentAuditEngagement?.auditStepChecklistList?.length ===
                    0 && (
                    <AuditProgram
                      currentAuditEngagement={currentAuditEngagement}
                      setCurrentAuditEngagement={setCurrentAuditEngagement}
                      setShowAddAuditProgramDialog={
                        setShowAddAuditProgramDialog
                      }
                      auditEngagementId={auditEngagementId}
                      singleAuditEngagementObject={singleAuditEngagementObject}
                    />
                  ))}
                {currentAuditEngagement?.auditStepChecklistList === null ||
                  (currentAuditEngagement?.auditStepChecklistList?.length ===
                    0 && (
                    <AuditSteps
                      setShowAuditStepsDialog={setShowAuditStepsDialog}
                      currentAuditEngagement={currentAuditEngagement}
                      setAuditStepId={setAuditStepId}
                      singleAuditEngagementObject={singleAuditEngagementObject}
                      loading={loading}
                    />
                  ))}
                {currentAuditEngagement?.auditStepChecklistList &&
                  currentAuditEngagement?.auditStepChecklistList?.length !==
                    0 && (
                    <ComplianceCheckList
                      setShowComplianceCheckListDialog={
                        setShowComplianceCheckListDialog
                      }
                      currentAuditEngagement={currentAuditEngagement}
                      setComplianceCheckListMainId={
                        setComplianceCheckListMainId
                      }
                    />
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KickOff;
