import React from "react";
import AddSettingsRCMDialog from "../../../../modals/add-settings-rcm-dialog";
import UpdateSettinsRCMDialog from "../../../../modals/update-settings-rcm-dialog";
import { setupGetAllSubProcess } from "../../../../../global-redux/reducers/settings/process/slice";
import { useSelector, useDispatch } from "react-redux";
import GetRCM from "./components/GetRCM";
import {
  setupGetInitialAllRiskControlMatrix,
  resetRCMAddSuccess,
  setupGetAllRiskControlMatrix,
} from "../../../../../global-redux/reducers/settings/risk-control-matrix/slice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import AccordionItem from "./components/AccordionItem";
import AddSettingsObjectiveRCMDialog from "../../../../modals/add-settings-rcm-objective-dialog";
import AddSettingsRiskRCMDialog from "../../../../modals/add-settings-rcm-risk-dialog";
import AddSettingsControlRCMDialog from "../../../../modals/add-settings-rcm-control-dialog";
import AddSettingsProgramRCMDialog from "../../../../modals/add-settings-rcm-program-dialog";
import AddButtons from "./components/AddButtons";
import DeleteRCMDialog from "./components/DeleteRCMDialog";

const RCMLibraray = ({ userHierarchy, userRole }) => {
  const dispatch = useDispatch();
  let { allProcess, allSubProcess } = useSelector(
    (state) => state?.setttingsProcess
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const { rcmAddSuccess, loading, initialLoading, allRCM } = useSelector(
    (state) => state?.setttingsRiskControlMatrix
  );
  const [processId, setProcessId] = React.useState("");
  const [subProcessId, setSubProcessId] = React.useState("");
  const [riskControlMatrix, setRiskControlMatrix] = React.useState([]);
  const [showDeleteRCMDialog, setShowDeleteRCMDialog] = React.useState(false);
  const [showCreateRCMDialog, setShowCreateRCMDialog] = React.useState(false);
  const [showUpdateRCMDialog, setShowUpdateRCMDialog] = React.useState(false);
  const [showRCMObjectiveDialog, setShowRCMObjectiveDialog] =
    React.useState(false);
  const [showRCMRiskDialog, setShowRCMRiskDialog] = React.useState(false);
  const [showRCMControlDialog, setShowRCMControlDialog] = React.useState(false);
  const [showRCMProgramDialog, setShowRCMProgramDialog] = React.useState(false);
  const [updatedRCMId, setUpdatedRCMId] = React.useState("");

  function handleShowObjective() {
    if (allRCM?.length === 0 || riskControlMatrix?.length === 0) {
      toast.error("Select Risk Control Matrix First");
    } else {
      setShowRCMObjectiveDialog(true);
    }
  }
  function handleShowRisk() {
    if (allRCM?.length === 0 || riskControlMatrix?.length === 0) {
      toast.error("Select Risk Control Matrix First");
    } else {
      setShowRCMRiskDialog(true);
    }
  }
  function handleShowControl() {
    if (allRCM?.length === 0 || riskControlMatrix?.length === 0) {
      toast.error("Select Risk Control Matrix First");
    } else {
      setShowRCMControlDialog(true);
    }
  }
  function handleShowProgram() {
    if (allRCM?.length === 0 || riskControlMatrix?.length === 0) {
      toast.error("Select Risk Control Matrix First");
    } else {
      setShowRCMProgramDialog(true);
    }
  }

  function handleGetRCM() {
    if (!loading) {
      if (processId === "" || subProcessId === "") {
        toast.error("Provide both process and sub-process");
      } else {
        const companyId = user[0]?.company?.find(
          (item) => item?.companyName === company
        )?.id;
        if (companyId) {
          dispatch(
            setupGetInitialAllRiskControlMatrix(
              `?company_id=${Number(companyId)}&process_id=${Number(
                processId
              )}&subProcess_id=${Number(subProcessId)}`
            )
          );
        }
      }
    }
  }

  React.useEffect(() => {
    if (allRCM?.length !== 0) {
      setRiskControlMatrix(
        allRCM?.map((item) => {
          return {
            ...item,
            rcmLibraryObjectives: item?.rcmLibraryObjectives?.map(
              (objective) => {
                return {
                  ...objective,
                  editable: false,
                  rcmLibraryRiskRating: objective?.rcmLibraryRiskRating?.map(
                    (risk) => {
                      return {
                        ...risk,
                        editable: false,
                        rcmLibraryControlRisk: risk?.rcmLibraryControlRisk?.map(
                          (control) => {
                            return {
                              ...control,
                              editable: false,
                              rcmLibraryAuditProgramsList:
                                control?.rcmLibraryAuditProgramsList?.map(
                                  (program) => {
                                    return {
                                      ...program,
                                      editable: false,
                                    };
                                  }
                                ),
                            };
                          }
                        ),
                      };
                    }
                  ),
                };
              }
            ),
          };
        })
      );
    }
  }, [allRCM]);

  React.useEffect(() => {
    if (rcmAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId && processId !== "" && subProcessId !== "") {
        dispatch(
          setupGetAllRiskControlMatrix(
            `?company_id=${Number(companyId)}&process_id=${Number(
              processId
            )}&subProcess_id=${Number(subProcessId)}`
          )
        );
      }
      dispatch(resetRCMAddSuccess());
    }
  }, [rcmAddSuccess]);

  React.useEffect(() => {
    if (processId && processId !== "") {
      setSubProcessId("");
      dispatch(setupGetAllSubProcess(`?processId=${Number(processId)}`));
    }
  }, [processId]);

  return (
    <div
      className="tab-pane fade"
      id="nav-rcm-library"
      role="tabpanel"
      aria-labelledby="nav-rcm-library-tab"
    >
      {showCreateRCMDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <AddSettingsRCMDialog
              setShowCreateRCMDialog={setShowCreateRCMDialog}
            />
          </div>
        </div>
      )}
      {showUpdateRCMDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <UpdateSettinsRCMDialog
              setShowUpdateRCMDialog={setShowUpdateRCMDialog}
              updatedRCMId={updatedRCMId}
            />
          </div>
        </div>
      )}
      {showRCMObjectiveDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <AddSettingsObjectiveRCMDialog
              setShowRCMObjectiveDialog={setShowRCMObjectiveDialog}
            />
          </div>
        </div>
      )}
      {showRCMRiskDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <AddSettingsRiskRCMDialog
              setShowRCMRiskDialog={setShowRCMRiskDialog}
            />
          </div>
        </div>
      )}
      {showRCMControlDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <AddSettingsControlRCMDialog
              setShowRCMControlDialog={setShowRCMControlDialog}
            />
          </div>
        </div>
      )}
      {showRCMProgramDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <AddSettingsProgramRCMDialog
              setShowRCMProgramDialog={setShowRCMProgramDialog}
            />
          </div>
        </div>
      )}
      {showDeleteRCMDialog && (
        <div className="modal-compliance-check-list">
          <div className="model-wrap-compliance-check-list">
            <DeleteRCMDialog
              setShowDeleteRCMDialog={setShowDeleteRCMDialog}
              updatedRCMId={updatedRCMId}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">RCM Library</div>
          <label className="fw-light">Define risk control matrix library</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6 tab-pane">
          <GetRCM
            processId={processId}
            setProcessId={setProcessId}
            allProcess={allProcess}
            subProcessId={subProcessId}
            setSubProcessId={setSubProcessId}
            allSubProcess={allSubProcess}
            handleGetRCM={handleGetRCM}
          />
        </div>
        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
          <div className="col-lg-6 text-end float-end align-self-end">
            <div
              className="btn btn-labeled btn-primary px-3 shadow"
              onClick={() => setShowCreateRCMDialog(true)}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add
            </div>
          </div>
        )}
      </div>
      <AddButtons
        userRole={userRole}
        userHierarchy={userHierarchy}
        handleShowObjective={handleShowObjective}
        handleShowRisk={handleShowRisk}
        handleShowControl={handleShowControl}
        handleShowProgram={handleShowProgram}
      />

      {initialLoading ? (
        <CircularProgress />
      ) : allRCM?.length === 0 || allRCM[0]?.error === "Not Found" ? (
        "No RCM To Show"
      ) : (
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="accordion" id="accordionFlushExample">
              {riskControlMatrix?.map((item, index) => {
                return (
                  <AccordionItem
                    key={index}
                    item={item}
                    setUpdatedRCMId={setUpdatedRCMId}
                    setShowUpdateRCMDialog={setShowUpdateRCMDialog}
                    setRiskControlMatrix={setRiskControlMatrix}
                    loading={loading}
                    rcmAddSuccess={rcmAddSuccess}
                    userHierarchy={userHierarchy}
                    userRole={userRole}
                    setShowDeleteRCMDialog={setShowDeleteRCMDialog}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RCMLibraray;
