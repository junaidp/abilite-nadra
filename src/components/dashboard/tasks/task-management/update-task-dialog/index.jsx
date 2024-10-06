import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateTask } from "../../../../../global-redux/reducers/tasks-management/slice";
import FileUpload from "./file-upload";
import moment from "moment";
import { toast } from "react-toastify";

const UpdateTaskManagement = ({ setShowUpdateTaskDailog, updateTaskId }) => {
  const dispatch = useDispatch();
  const { loading, allTasks } = useSelector((state) => state?.tasksManagement);
  const [response, setResponse] = React.useState("");

  // Initial form initialValues
  const defaultinitialValues = {
    dueDate: "",
    auditEngagement: "",
    userAssigned: "",
    detailedRequirement: "",
  };

  let [initialValues, setInitialValues] = React.useState(defaultinitialValues);

  const handleSubmit = () => {
    if (!loading) {
      if (response?.trim() === "") {
        toast.error("Provide the Response");
      } else {
        let task = allTasks.find(
          (singleTask) => singleTask?.id === updateTaskId
        );
        dispatch(
          setupUpdateTask({
            id: updateTaskId,
            dueDate: task?.dueDate,
            status: "string",
            engagementId: Number(task?.engagement?.id),
            createdBy: Number(task?.assignedBy?.id),
            companyId: Number(task?.companyId),
            userAssigned: Number(task?.assignee?.id),
            yourResponse: response,
            uploads: task?.fileAttachments,
            detailedRequirement: task?.detailedRequirement,
          })
        );
      }
    }
  };

  React.useEffect(() => {
    let task = allTasks.find((singleTask) => singleTask?.id === updateTaskId);
    setInitialValues({
      dueDate: task ? moment.utc(task?.dueDate).format("YYYY-MM-DD") : "",
      auditEngagement: task?.engagement?.name || "",
      userAssigned: task?.assignee?.name,
      detailedRequirement: task?.detailedRequirement,
    });
    setResponse(task?.yourResponse);
  }, [updateTaskId]);

  return (
    <div className="px-4 py-4 information-request-dialog-main-wrap">
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="heading">Update Task</h2>
        </div>
      </header>
      <div className="row">
        <div className=" mb-3 col-lg-12">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control w-100"
            placeholder="DD/MM/YYYY"
            disabled
            value={initialValues?.dueDate}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="me-3">Selected Job</label>
          <input
            className="form-control w-100"
            disabled
            value={initialValues?.auditEngagement}
          />
        </div>
        <div className="col-lg-6">
          <label className="me-3">Selected Assignee</label>
          <input
            className="form-control w-100"
            disabled
            value={initialValues?.userAssigned}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Detailed Requirement</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            disabled
            rows="3"
            value={initialValues?.detailedRequirement || ""}
          ></textarea>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Your Response</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={response}
            onChange={(event) => setResponse(event?.target?.value)}
            maxLength="400"
          ></textarea>
          <label className="word-limit-info label-text">
            Maximum 400 words
          </label>
        </div>
      </div>
      <div className="d-flex justify-end">
        <button
          type="submit"
          className={`btn btn-primary ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>

      <FileUpload updateTaskId={updateTaskId} />

      <div className="row mb-2">
        <div className="col-lg-12 align-self-end">
          <button
            type="submit"
            className="btn btn-danger float-end"
            onClick={() => {
              setShowUpdateTaskDailog(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskManagement;
