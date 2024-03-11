import React from "react";
import Select from "../Select";
import MultiSelect from "../select/MultiSelect";
import { useSelector, useDispatch } from "react-redux";
import { setUpupdateJobSchedulingResourcesAllocation } from "../../../../../../../global-redux/reducers/planing/job-scheduling/slice";
import TextField from "@mui/material/TextField";
const ResourceAllocation = ({
  currentJobSchedulingObject,
  allUsers,
  setCurrentJobScheduling,
  initialUserList,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.planingJobScheduling);
  const { user } = useSelector((state) => state?.auth);
  function handleSave() {
    if (!loading) {
      dispatch(
        setUpupdateJobSchedulingResourcesAllocation(
          currentJobSchedulingObject?.resourceAllocation
        )
      );
    }
  }
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree"
          aria-expanded="false"
          aria-controls="flush-collapseThree"
        >
          Resource Allocation
        </button>
      </h2>
      <div
        id="flush-collapseThree"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container overflow-x-auto">
            <div className="row mb-3">
              <div className="col-lg-6">
                {/* <Select
                  label="Head Of Internal Audit"
                  value={
                    currentJobSchedulingObject?.resourceAllocation
                      ?.headOfInternalAudit?.name || ""
                  }
                  disabled={true}
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="headOfInternalAudit"
                  list={allUsers
                    ?.filter(
                      (userItem) => Number(userItem?.id) !== user[0]?.userId?.id
                    )
                    ?.map((all) => all?.name)}
                  allUsers={allUsers}
                /> */}
                <TextField
                  id="filled-basic"
                  label="Head Of Internal Audit"
                  variant="filled"
                  value={
                    currentJobSchedulingObject?.resourceAllocation
                      ?.headOfInternalAudit?.name || ""
                  }
                  disabled
                  className="w-100"
                />
              </div>
              <div className="col-lg-6">
                <Select
                  label="Backup Head Of InternalAudit"
                  value={
                    currentJobSchedulingObject?.resourceAllocation
                      ?.backupHeadOfInternalAudit?.name || ""
                  }
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="backupHeadOfInternalAudit"
                  list={allUsers
                    ?.filter(
                      (userItem) => Number(userItem?.id) !== user[0]?.userId?.id
                    )
                    ?.map((all) => all?.name)}
                  allUsers={allUsers}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <Select
                  label="Proposed Job Approver"
                  value={
                    currentJobSchedulingObject?.resourceAllocation
                      ?.proposedJobApprover?.name || ""
                  }
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="proposedJobApprover"
                  list={allUsers
                    ?.filter(
                      (userItem) => Number(userItem?.id) !== user[0]?.userId?.id
                    )
                    ?.map((all) => all?.name)}
                  allUsers={allUsers}
                />
              </div>
              <div className="col-lg-6">
                <MultiSelect
                  title="Resources List"
                  names={allUsers
                    ?.filter(
                      (userItem) =>
                        Number(userItem?.id) !== Number(user[0]?.userId?.id)
                    )
                    ?.map((all) => all?.name)}
                  initialPersonalArray={initialUserList}
                  name="resourcesList"
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  section="resourceAllocation"
                  allUsers={allUsers}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12 justify-content-end text-end">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow ${
                    loading && "disabled"
                  }`}
                  onClick={handleSave}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle"></i>
                  </span>
                  {loading ? "Loading..." : "Save"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
