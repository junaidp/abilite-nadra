import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewInformationRequest = ({
  setShowViewInformationRequestDialog,
  updateTaskId,
}) => {
  const { auditEngagements, allTasks } = useSelector(
    (state) => state?.tasksManagement
  );

  // Initial form initialValues
  const defaultinitialValues = {
    dueDate: "",
    auditEngagement: "",
    userAssigned: "",
    detailedRequirement: "",
    response: "",
  };

  let [initialValues, setInitialValues] = React.useState(defaultinitialValues);

  React.useEffect(() => {
    let task = allTasks.find((singleTask) => singleTask?.id === updateTaskId);
    setInitialValues({
      dueDate: task ? moment.utc(task?.dueDate).format("YYYY-MM-DD") : "",
      auditEngagement: auditEngagements?.find(
        (singleEngagement) => singleEngagement?.id === task?.auditEngagement?.id
      )?.engagementName,
      userAssigned: task?.assignee?.name,
      detailedRequirement: task?.detailedRequirement,
      response: task?.yourResponse,
    });
  }, [updateTaskId]);

  return (
    <div className="px-4 py-4 information-request-dialog-main-wrap">
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="heading">View Information Request</h2>
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
          <label className="me-3">User Assigned</label>
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
            value={initialValues?.userAssigned || ""}
          ></textarea>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Assignee Response</label>
          <textarea
            className="form-control min-h-150"
            id="exampleFormControlTextarea1"
            rows="3"
            value={initialValues?.response || ""}
            disabled
          ></textarea>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-lg-12 ">
          <button
            type="submit"
            className="btn btn-danger float-end "
            onClick={() => {
              setShowViewInformationRequestDialog(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewInformationRequest;
