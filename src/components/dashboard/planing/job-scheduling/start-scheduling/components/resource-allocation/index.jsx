import React from "react";
import Select from "../Select";
import MultiSelect from "../select/MultiSelect";

const ResourceAllocation = ({
  currentJobSchedulingObject,
  allUsers,
  setCurrentJobScheduling,
  initialUserList,
}) => {
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
                <Select
                  label="Head Of Internal Audit"
                  value={
                    currentJobSchedulingObject?.headOfInternalAudit?.name || ""
                  }
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="headOfInternalAudit"
                  list={allUsers?.map((all) => all?.name)}
                />
              </div>
              <div className="col-lg-6">
                <Select
                  label="Backup Head Of InternalAudit"
                  value={
                    currentJobSchedulingObject?.backupHeadOfInternalAudit
                      ?.name || ""
                  }
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="backupHeadOfInternalAudit"
                  list={allUsers?.map((all) => all?.name)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <Select
                  label="Proposed Job Approver"
                  value={
                    currentJobSchedulingObject?.proposedJobApprover?.name || ""
                  }
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="proposedJobApprover"
                  list={allUsers?.map((all) => all?.name)}
                />
              </div>
              <div className="col-lg-6">
                <MultiSelect
                  title="Resources List"
                  names={allUsers?.map((all) => all?.name)}
                  initialPersonalArray={initialUserList}
                  name="resourcesList"
                  setCurrentJobScheduling={setCurrentJobScheduling}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
