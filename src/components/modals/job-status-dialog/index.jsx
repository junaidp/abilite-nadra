import axios from "axios";
import React from "react";
import { baseUrl } from "../../../constants";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const JobStatusDialog = ({ setShowJobStatusDialog, selectedJobId }) => {
  const { user } = useSelector((state) => state?.auth);
  const [loading, setLoading] = React.useState(false);
  const [job, setJob] = React.useState({});

  function PlanningStatus() {
    let number = 0;
    if (
      job.auditNotification &&
      job.auditNotification.body &&
      job.auditNotification.ccEmail &&
      job.auditNotification.subject &&
      job.auditNotification.toEmail
    ) {
      number = 1;
    }
    if (job.riskControlMatrix && job.riskControlMatrix.approved) {
      number = 2;
    }
    if (job.auditProgram && job.auditProgram.approved) {
      number = 3;
    }
    if (job.auditStep && job.auditStep.approved) {
      number = 4;
    }
    return number;
  }

  function FieldWorkStatus() {
    let number = 0;
    job?.auditStep?.stepList?.forEach((element) => {
      if (element?.auditStepObservationsList?.length) {
        number = number + 1;
      }
    });
    return number;
  }

  function CheckListStatus() {
    let number = 0;
    job?.auditStepChecklistList?.forEach((element) => {
      if (element?.approved) {
        number = number + 1;
      }
    });
    return number;
  }

  function handleFindApprover(id) {
    if (job?.resourceAllocation?.createdBy?.id === id) {
      return job?.resourceAllocation?.createdBy?.name;
    }
    if (job?.resourceAllocation?.headOfInternalAudit?.id === id) {
      return job?.resourceAllocation?.headOfInternalAudit?.name;
    }
    if (job?.resourceAllocation?.proposedJobApprover?.id === id) {
      return job?.resourceAllocation?.proposedJobApprover?.name;
    }
    if (job?.resourceAllocation?.backupHeadOfInternalAudit?.id === id) {
      return job?.resourceAllocation?.backupHeadOfInternalAudit?.name;
    }
  }

  React.useEffect(() => {
    const start = async () => {
      if (loading) return;
      setLoading(true);
      try {
        let { data } = await axios.get(
          `${baseUrl}/auditEngagement/get?auditEngagementId=${selectedJobId}`,
          {
            headers: {
              Authorization: `Bearer ${user[0]?.token}`,
            },
          }
        );
        setJob(data?.data);
        setLoading(false);
      } catch (error) {
        toast.error("An error has accoured. Please try again later.");
        setLoading(false);
      }
    };
    start();
  }, [selectedJobId]);

  return (
    <div className="container  p-3">
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="d-flex justify-content-end mb-4">
            <h4 className="heading flex-1">Job Status ({job?.aetitle} )</h4>
            <div className="modal-footer flex-1">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowJobStatusDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
          {job?.jobType !== "Compliance Checklist" && (
            <div className="row">
              <div className="col-lg-6">
                <p className="f-17">Planning</p>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <p className="f-17">
                  Work Steps Completed ({PlanningStatus()}/4)
                </p>
              </div>
            </div>
          )}
          {job?.jobType !== "Compliance Checklist" && (
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-200">Field Name</th>
                  <th className="w-200">Status</th>
                  <th className="w-200">Approver</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Audit Notification</td>
                  <td>{job?.auditNotification ? "Completed" : "Pending"}</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Risk Control Matrix</td>
                  <td>
                    {job?.riskControlMatrix?.approved ? "Completed" : "Pending"}
                  </td>
                  <td>{job?.riskControlMatrix?.approvedBy?.name || "---"}</td>
                </tr>
                <tr>
                  <td>Audit Program</td>
                  <td>
                    {job?.auditProgram?.approved ? "Completed" : "Pending"}
                  </td>
                  <td>
                    {handleFindApprover(job?.auditProgram?.aprrovedBy) || "---"}
                  </td>
                </tr>
                <tr>
                  <td>Audit Steps</td>
                  <td>{job?.auditStep?.approved ? "Completed" : "Pending"}</td>
                  <td>
                    {handleFindApprover(job?.auditStep?.approvedBy) || "---"}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {job?.jobType !== "Compliance Checklist" && (
            <div className="row">
              <div className="col-lg-6">
                <p className="f-17">Field Work</p>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <p className="f-17">
                  Work Steps Completed (
                  {job?.auditStep?.stepList?.length
                    ? job?.auditStep?.stepList?.length
                    : 0}
                  /{FieldWorkStatus()})
                </p>
              </div>
            </div>
          )}
          {job?.jobType !== "Compliance Checklist" && (
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-200">Field Name</th>
                  <th className="w-200">Status</th>
                  <th className="w-200">Approver</th>
                </tr>
              </thead>
              <tbody>
                {!job?.auditStep?.stepList ? (
                  <tr>
                    <td>No Step List Found.</td>
                  </tr>
                ) : (
                  job?.auditStep?.stepList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.program?.description}</td>
                        <td>
                          {item?.auditStepObservationsList?.length
                            ? "Completed"
                            : "Pending"}
                        </td>
                        <td>
                          {handleFindApprover(job?.auditStep?.approvedBy) ||
                            "---"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
          {job?.jobType === "Compliance Checklist" && (
            <div className="row">
              <div className="col-lg-6">
                <p className="f-17">Field Work</p>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <p className="f-17">
                  Work Steps Completed (
                  {job?.auditStepChecklistList?.length
                    ? job?.auditStepChecklistList?.length
                    : 0}
                  /{CheckListStatus()})
                </p>
              </div>
            </div>
          )}
          {job?.jobType === "Compliance Checklist" && (
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-200">Location</th>
                  <th className="w-200">Status</th>
                  <th className="w-200">No. Observations</th>
                </tr>
              </thead>
              <tbody>
                {!job?.auditStepChecklistList ? (
                  <tr>
                    <td>No CheckList Found.</td>
                  </tr>
                ) : (
                  job?.auditStepChecklistList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.subLocationDescription}</td>
                        <td>{item?.approved ? "Completed" : "Pending"}</td>
                        <td>{item?.checklistObservationsList?.length}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default JobStatusDialog;
