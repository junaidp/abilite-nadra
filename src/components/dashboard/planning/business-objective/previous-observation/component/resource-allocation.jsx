import React from "react";
import Select from "../component/resource-allocation-select";
import MultiSelect from "../component/multi-select";
import TextField from "@mui/material/TextField";

const ResourceAllocation = ({ values, setValues, users }) => {
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  React.useEffect(() => {
    let array = [];
    if (values?.numberOfResourcesRequired?.finance > 0) {
      array = [...array, "Finance"];
    }
    if (values?.numberOfResourcesRequired?.business > 0) {
      array = [...array, "Business"];
    }
    if (values?.numberOfResourcesRequired?.fraud > 0) {
      array = [...array, "Fraud"];
    }
    if (values?.numberOfResourcesRequired?.operations > 0) {
      array = [...array, "Operations"];
    }
    if (values?.numberOfResourcesRequired?.other > 0) {
      array = [...array, "Other"];
    }
    if (values?.numberOfResourcesRequired?.it > 0) {
      array = [...array, "IT"];
    }

    let filteredUser = users.filter((item) =>
      array.includes(item?.employeeid?.skillSet)
    );
    filteredUser = filteredUser?.filter(
      (singleItem) =>
        singleItem?.employeeid?.userHierarchy !== "Management_Auditee" &&
        singleItem?.employeeid?.userHierarchy !== "IAH"
    );
    setSelectedUsers(filteredUser);
  }, [values]);

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
          {values?.resourceAllocation?.backupHeadOfInternalAudit &&
            values?.resourceAllocation?.proposedJobApprover &&
            values?.resourceAllocation?.resourcesList &&
            values?.resourceAllocation?.resourcesList?.length !== 0 && (
              <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
            )}
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
                <TextField
                  id="filled-basic"
                  label="Head Of Internal Audit"
                  variant="filled"
                  value={
                    users?.find(
                      (user) => user?.employeeid?.userHierarchy === "IAH"
                    )?.name
                  }
                  disabled
                  className="w-100"
                />
              </div>
              <div className="col-lg-6">
                <Select
                  label="Backup Head Of InternalAudit"
                  value={values?.resourceAllocation?.backupHeadOfInternalAudit}
                  setValues={setValues}
                  name="backupHeadOfInternalAudit"
                  users={users}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <Select
                  label="Proposed Job Approver"
                  value={values?.resourceAllocation?.proposedJobApprover}
                  setValues={setValues}
                  name="proposedJobApprover"
                  users={users}
                />
              </div>

              <div className="col-lg-6">
                {selectedUsers?.length === 0 ? (
                  <p>Please add users in resources required</p>
                ) : (
                  <MultiSelect
                    title="Resources List"
                    names={selectedUsers?.map((all) => all?.name)}
                    setValues={setValues}
                    users={selectedUsers}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
