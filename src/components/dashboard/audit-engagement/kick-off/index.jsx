import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeKickOffRequest,
  changeActiveLink,
} from "../../../../global-redux/reducers/common/slice";
import AddKickOffObjectiveDialog from "../../../modals/add-kickoff-objective-dialog";
import AddKickOffRatingDialog from "../../../modals/add-kickoff-rating-dialog";
import AddKickOffControlDialog from "../../../modals/add-kickoff-control-dialog";
import ViewRiskLibraryDialog from "../../../modals/view-risk-control-matrix-library-dialog/index";
import ViewAuditProgramLibraryDialog from "../../../modals/view-audit-program-library-dialog/index";
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
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  setupGetAllAuditEngagement,
  resetAuditEngagementAddSuccess,
} from "../../../../global-redux/reducers/audit-engagement/slice";

const KickOff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const auditEngagementId = searchParams.get("auditEngagementId");
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { allAuditEngagement, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const [currentAuditEngagement, setCurrentAuditEngagement] = React.useState(
    {}
  );
  const [showViewLibrary, setShowViewLibrary] = React.useState(false);
  let [showComplianceCheckListDialog, setShowComplianceCheckListDialog] =
    React.useState(false);
  const [viewAuditProgramLibraryDialog, setViewAuditProgramLibraryDialog] =
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

  React.useEffect(() => {
    dispatch(changeActiveLink("li-audit-engagement"));
  }, []);

  React.useEffect(() => {
    dispatch(changeKickOffRequest(""));
  }, []);
  React.useEffect(() => {
    if (!auditEngagementId) {
      navigate("/audit/audit-engagement");
    }
  }, [auditEngagementId]);

  React.useEffect(() => {
    if (allAuditEngagement?.length !== 0) {
      const currentItem = allAuditEngagement?.find(
        (all) => Number(all?.id) === Number(auditEngagementId)
      );
      setCurrentAuditEngagement(currentItem);
    }
  }, [allAuditEngagement]);

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllAuditEngagement(
            `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
          )
        );
      }
      dispatch(resetAuditEngagementAddSuccess());
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    if (user[0]?.token) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllAuditEngagement(
            `?companyId=${companyId}&currentYear=2024&userId=${user[0]?.userId?.id}`
          )
        );
      }
    }
  }, [user]);

  return (
    <div>
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
      {viewAuditProgramLibraryDialog && (
        <div className="modal-objective-audit-library">
          <div className="model-wrap-audit-library">
            <ViewAuditProgramLibraryDialog
              setViewAuditProgramLibraryDialog={
                setViewAuditProgramLibraryDialog
              }
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

          <h2 className="mx-2 m-2 heading">{currentAuditEngagement?.title}</h2>
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
            <RaiseInformationRequest />
            <RiskControlMatrix
              setShowViewLibrary={setShowViewLibrary}
              currentAuditEngagement={currentAuditEngagement}
              setCurrentAuditEngagement={setCurrentAuditEngagement}
              setShowKickOffObjectiveDialog={setShowKickOffObjectiveDialog}
              setShowKickOffRatingDialog={setShowKickOffRatingDialog}
              setShowKickOffControlDialog={setShowKickOffControlDialog}
              auditEngagementId={auditEngagementId}
            />
            <AuditProgram
              currentAuditEngagement={currentAuditEngagement}
              setCurrentAuditEngagement={setCurrentAuditEngagement}
              setShowAddAuditProgramDialog={setShowAddAuditProgramDialog}
              auditEngagementId={auditEngagementId}
            />
            <AuditSteps
              setShowAuditStepsDialog={setShowAuditStepsDialog}
              currentAuditEngagement={currentAuditEngagement}
              setAuditStepId={setAuditStepId}
            />
            <ComplianceCheckList
              setShowComplianceCheckListDialog={
                setShowComplianceCheckListDialog
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickOff;
