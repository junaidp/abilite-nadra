import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupSubmitJobScheduling } from "../../../../../../global-redux/reducers/planing/job-scheduling/slice";

const SubmitDialog = ({
  currentJobSchedulingObject,
  setShowSubmitDialog,
  allLocations,
  allSubLocations,
  allDepartments,
  selectedDepartments,
  selectedSubDepartments,
}) => {
  const dispatch = useDispatch();
  const { jobSchedulingAddSuccess, loading } = useSelector(
    (state) => state?.planningJobScheduling
  );

  function handleSubmit() {
    if (!loading) {
      const filteredLocationArray = allLocations.filter((item) =>
        currentJobSchedulingObject?.locationList.includes(item?.description)
      );
      const filteredSubLocationArray = allSubLocations.filter((item) =>
        currentJobSchedulingObject?.subLocation.includes(item?.description)
      );
      let object;
      object = {
        ...currentJobSchedulingObject,
        locationList: filteredLocationArray.map((list) => {
          return {
            id: list?.id,
            description: list?.description,
            companyid: list?.companyid,
          };
        }),
        subLocation: filteredSubLocationArray,
        complete: true,
      };

      // for the department
      const allDept = allDepartments?.filter((department) =>
        selectedDepartments.includes(department.id)
      );
      const departments = allDept?.map((dept) => {
        return {
          id: 0,
          subDepartment: 0,
          department: dept?.id,
        };
      });
      const allSubDepartments = allDepartments?.flatMap((dept) =>
        dept.subDepartments.map((subDept) => ({
          ...subDept,
        }))
      );

      const subDepartments = allSubDepartments.filter((subDept) =>
        selectedSubDepartments.includes(subDept.id)
      );
      const subDepartmentsList = subDepartments?.map((subDept) => {
        return {
          id: 0,
          subDepartment: subDept?.id,
          department: 0,
        };
      });
      dispatch(
        setupSubmitJobScheduling({
          ...object,
          departmentList: departments,
          subDepartmentList: subDepartmentsList,
        })
      );
    }
  }

  React.useEffect(() => {
    if (jobSchedulingAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [jobSchedulingAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Job Scheduling?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger  float-end mx-2`}
          onClick={() => setShowSubmitDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitDialog;
