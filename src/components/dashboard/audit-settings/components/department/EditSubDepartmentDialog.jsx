import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateSubDepartment } from "../../../../../global-redux/reducers/settings/department/slice";

const EditSubDepartmentDialog = ({
  setShowEditSubDepartmentDialog,
  departmentId,
  subDepartmentId,
  allDepartments
}) => {
  const { subLoading, subDepartmentAddSuccess } = useSelector(
    (state) => state.settingsDepartment
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [DepartmentName, setSubDepartmentName] = React.useState("");
  const dispatch = useDispatch();
  function handleSubmit() {
    if (DepartmentName === "") {
      toast.error("Provide Sub Department Name");
    }
    if (DepartmentName && !subLoading) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      dispatch(
        setupUpdateSubDepartment({
          subDepartmentId: subDepartmentId,
          description: DepartmentName,
          departmentId: departmentId,
          companyId: companyId,
        })
      );
    }
  }

  React.useEffect(() => {
    if (subDepartmentAddSuccess) {
      setTimeout(() => {
        setSubDepartmentName("");
        setShowEditSubDepartmentDialog(false);
      }, 500);
    }
  }, [subDepartmentAddSuccess]);

  React.useEffect(() => {
    const selectedDepartment = allDepartments?.find((dep) => dep.id === departmentId)
    const selectedSubDepartment = selectedDepartment?.subDepartments?.find((subDep) => subDep.id === subDepartmentId)
    setSubDepartmentName(selectedSubDepartment?.description);
  }, [departmentId, subDepartmentId]);

  return (
    <div className="p-4 min-h-170">
      <h4 className="mb-4 heading">Update Sub Department</h4>
      <div className="row mb-4 flex items-center">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              type="description"
              id="description"
              name="description"
              className="form-control"
              value={DepartmentName}
              onChange={(e) => setSubDepartmentName(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className={`btn float-start btn-primary ${subLoading && "disabled"}`}
          onClick={handleSubmit}
        >
          {subLoading ? "Loading" : "Edit"}
        </button>
      </div>
      <div>
        <button
          className="btn btn-danger float-end"
          onClick={() => {
            setShowEditSubDepartmentDialog(false);
            setSubDepartmentName("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditSubDepartmentDialog;
