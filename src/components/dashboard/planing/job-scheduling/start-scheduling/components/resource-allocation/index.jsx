import React from "react";
import Select from "../Select";
import MultiSelect from "../select/MultiSelect";
import { useSelector, useDispatch } from "react-redux";
import { setUpupdateJobSchedulingResourcesAllocation } from "../../../../../../../global-redux/reducers/planing/job-scheduling/slice";
import TextField from "@mui/material/TextField";
const ResourceAllocation = ({
  currentJobSchedulingObject,
  setCurrentJobScheduling,
  initialUserList,
  handleSaveMainJobScheduling,
  allUsers,
}) => {
  const dispatch = useDispatch();
  const { loading, singleJobSchedulingObject } = useSelector(
    (state) => state?.planingJobScheduling
  );
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const { user } = useSelector((state) => state?.auth);
  function handleSave() {
    if (!loading) {
      dispatch(
        setUpupdateJobSchedulingResourcesAllocation(
          currentJobSchedulingObject?.resourceAllocation
        )
      );
    }
    setTimeout(() => {
      handleSaveMainJobScheduling();
    }, 2000);
  }

  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleJobSchedulingObject).length === 0 &&
      singleJobSchedulingObject.constructor === Object;
    if (!isEmptyObject && user[0]?.token && allUsers?.length !== 0) {
      let array = [];
      if (singleJobSchedulingObject?.numberOfResourcesRequired?.finance > 0) {
        array = [...array, "Finance"];
      }
      if (singleJobSchedulingObject?.numberOfResourcesRequired?.business > 0) {
        array = [...array, "Business"];
      }
      if (singleJobSchedulingObject?.numberOfResourcesRequired?.fraud > 0) {
        array = [...array, "Fraud"];
      }
      if (
        singleJobSchedulingObject?.numberOfResourcesRequired?.operations > 0
      ) {
        array = [...array, "Operations"];
      }
      if (singleJobSchedulingObject?.numberOfResourcesRequired?.other > 0) {
        array = [...array, "Other"];
      }
      if (singleJobSchedulingObject?.numberOfResourcesRequired?.it > 0) {
        array = [...array, "IT"];
      }

      let filteredUser = allUsers.filter((item) =>
        array.includes(item?.employeeid?.skillSet)
      );
      filteredUser = filteredUser?.filter(
        (singleItem) =>
          singleItem?.employeeid?.userHierarchy !== "Management_Auditee"
      );
      setSelectedUsers(filteredUser);
    }
  }, [singleJobSchedulingObject, user, allUsers]);

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
          {singleJobSchedulingObject?.resourceAllocation
            ?.backupHeadOfInternalAudit &&
            singleJobSchedulingObject?.resourceAllocation
              ?.proposedJobApprover &&
            singleJobSchedulingObject?.resourceAllocation?.resourcesList &&
            singleJobSchedulingObject?.resourceAllocation?.resourcesList
              ?.length !== 0 && (
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
                  singleJobSchedulingObject={singleJobSchedulingObject}
                  setCurrentJobScheduling={setCurrentJobScheduling}
                  name="backupHeadOfInternalAudit"
                  list={allUsers
                    ?.filter(
                      (singleItem) =>
                        singleItem?.employeeid?.userHierarchy !==
                        "Management_Auditee"
                    )
                    ?.map((all) => all?.name)}
                  allUsers={allUsers?.filter(
                    (singleItem) =>
                      singleItem?.employeeid?.userHierarchy !==
                      "Management_Auditee"
                  )}
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
                      (singleItem) =>
                        singleItem?.employeeid?.userHierarchy !==
                        "Management_Auditee"
                    )
                    ?.map((all) => all?.name)}
                  allUsers={allUsers?.filter(
                    (singleItem) =>
                      singleItem?.employeeid?.userHierarchy !==
                      "Management_Auditee"
                  )}
                  singleJobSchedulingObject={singleJobSchedulingObject}
                />
              </div>

              <div className="col-lg-6">
                {selectedUsers?.length === 0 ? (
                  <p>Please add users in resources required</p>
                ) : (
                  <MultiSelect
                    title="Resources List"
                    names={selectedUsers?.map((all) => all?.name)}
                    initialPersonalArray={initialUserList}
                    name="resourcesList"
                    setCurrentJobScheduling={setCurrentJobScheduling}
                    section="resourceAllocation"
                    allUsers={selectedUsers}
                    singleJobSchedulingObject={singleJobSchedulingObject}
                  />
                )}
              </div>
            </div>
            {singleJobSchedulingObject?.complete !== true && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
