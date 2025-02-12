import React from "react";
import {
  resetProcessAddSuccess,
  setupAddProcess,
  setupGetAllProcess,
  setupSaveSubProcess,
  setupGetAllSubProcess,
  resetSubProcessAddSuccess,
} from "../../../../../global-redux/reducers/settings/process/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import AccordionItem from "./AccordionItem";
import EditSubProcessDialog from "./EditSubProcessDialog";
import ProcessDeleteDialog from "./DeleteDialog";
import EditProcessDialog from "./EditProcessDialog";

const Process = ({ userHierarchy, userRole, currentSettingOption }) => {
  const dispatch = useDispatch();
  const {
    loading,
    processAddSuccess,
    allProcess,
    allSubProcess,
    subLoading,
    subProcessAddSuccess,
  } = useSelector((state) => state?.settingsProcess);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [processText, setProcessText] = React.useState("");
  const [subProcessText, setSubProcessText] = React.useState("");
  const [subProcessId, setSubProcessId] = React.useState("");
  const [subProcessDialog, setShowSubProcessDialog] = React.useState(false);
  const [editProcessDialog, setEditProcessDialog] = React.useState("");
  const [processDeleteDialog, setShowProcessDeleteDialog] =
    React.useState(false);
  const [processId, setProcessId] = React.useState("");
  const [page, setPage] = React.useState(1);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleSaveProcess() {
    if (!loading) {
      if (processText === "") {
        toast.error("Provide the process");
      }
      if (!loading && processText !== "") {
        const selectedCompany = user[0]?.company?.find(
          (item) => item?.companyName === company
        );
        dispatch(
          setupAddProcess({
            description: processText,
            company: selectedCompany,
          })
        );
      }
    }
  }

  function handleAddSubProcess() {
    if (!subLoading) {
      if (subProcessText === "") {
        toast.error("Please Add Sub Process");
      }
      if (!subLoading && subProcessText !== "") {
        dispatch(
          setupSaveSubProcess({
            description: subProcessText,
            processId: processId,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (processId !== "") {
      dispatch(setupGetAllSubProcess(`?processId=${Number(processId)}`));
    }
  }, [processId]);

  React.useEffect(() => {
    if (processAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllProcess(companyId));
      }
      setProcessId("");
      setProcessText("");
      setSubProcessText("");
      setSubProcessId("");
      setPage(1);
      dispatch(resetProcessAddSuccess());
    }
  }, [processAddSuccess]);

  React.useEffect(() => {
    if (subProcessAddSuccess) {
      setSubProcessText("");
      if (processId !== "") {
        dispatch(setupGetAllSubProcess(`?processId=${Number(processId)}`));
      }
      dispatch(resetSubProcessAddSuccess());
    }
  }, [subProcessAddSuccess]);

  React.useEffect(() => {
    setPage(1);
    setProcessId("");
    setSubProcessId("");
    setProcessText("");
    setSubProcessText("");
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade"
      id="nav-process"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      {subProcessDialog && (
        <div className="model-parent d-flex items-center">
          <div className="model-wrap">
            <EditSubProcessDialog
              setShowSubProcessDialog={setShowSubProcessDialog}
              subProcessId={subProcessId}
            />
          </div>
        </div>
      )}
      {processDeleteDialog && (
        <div className="model-parent d-flex items-center">
          <div className="model-wrap">
            <ProcessDeleteDialog
              setShowProcessDeleteDialog={setShowProcessDeleteDialog}
              processId={processId}
            />
          </div>
        </div>
      )}
      {editProcessDialog && (
        <div className="model-parent d-flex items-center">
          <div className="model-wrap">
            <EditProcessDialog
              setEditProcessDialog={setEditProcessDialog}
              processId={processId}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">
            Process & Sub Process Management
          </div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation Process &
            Sub Process
          </label>
        </div>
      </div>
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div className="mt-3 d-flex flex-wrap gap-4">
          <div className="flex-1 w-100">
            <label>Add Process</label>
            <input
              className="form-control w-100"
              placeholder="Enter Text here"
              type="text"
              value={processText}
              onChange={(event) => setProcessText(event?.target?.value)}
            />
          </div>
          <div className="col-lg-6 text-end float-end align-self-end">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow ${
                loading && "disabled"
              }`}
              onClick={handleSaveProcess}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              {loading ? "Loading..." : "Add"}
            </div>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="accordion" id="accordionProcessExample">
            {loading ? (
              <CircularProgress />
            ) : allProcess?.length === 0 ? (
              <p>No Process To Show.</p>
            ) : (
              allProcess
                ?.slice((page - 1) * 10, page * 10)
                ?.map((item, index) => {
                  return (
                    <AccordionItem
                      item={item}
                      setEditProcessDialog={setEditProcessDialog}
                      key={index}
                      index={index}
                      setSubProcessText={setSubProcessText}
                      setProcessId={setProcessId}
                      userRole={userRole}
                      userHierarchy={userHierarchy}
                      subProcessText={subProcessText}
                      handleAddSubProcess={handleAddSubProcess}
                      subLoading={subLoading}
                      loading={loading}
                      allSubProcess={allSubProcess}
                      setSubProcessId={setSubProcessId}
                      setShowSubProcessDialog={setShowSubProcessDialog}
                      setShowProcessDeleteDialog={setShowProcessDeleteDialog}
                    />
                  );
                })
            )}
            {allProcess && allProcess?.length > 0 && (
              <Pagination
                count={Math.ceil(allProcess?.length / 10)}
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
