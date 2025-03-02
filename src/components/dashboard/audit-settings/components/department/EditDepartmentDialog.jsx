import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateDepartment } from "../../../../../global-redux/reducers/settings/department/slice";

const EditDepartmentDialog = ({
  setShowEditDepartmentDialog,
  departmentId,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const { departmentAddSuccess, allDepartments, loading } = useSelector(
    (state) => state.settingsDepartment
  );
  const [DepartmentName, setDepartmentName] = React.useState("");
  const dispatch = useDispatch();
  function handleSubmit() {
    if (DepartmentName === "") {
      toast.error("Provide Department Name.");
    }
    if (DepartmentName && !loading) {
      const selectedCompany = user[0]?.company?.find(
        (item) => item?.companyName === company
      );

      dispatch(
        setupUpdateDepartment({
          description: DepartmentName,
          departmentId: departmentId,
          companyId: selectedCompany?.id,
        })
      );
    }
  }

  React.useEffect(() => {
    if (departmentAddSuccess) {
      setTimeout(() => {
        setDepartmentName("");
        setShowEditDepartmentDialog(false);
      }, 500);
    }
  }, [departmentAddSuccess]);

  React.useEffect(() => {
    const { description } = allDepartments.find(
      (item) => item?.id === departmentId
    );
    setDepartmentName(description);
  }, []);
  return (
    <div className="p-4 min-h-170">
      <h4 className="mb-4 heading">Update Department</h4>
      <div className="row mb-4 flex items-center">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              type="description"
              id="description"
              name="description"
              className="form-control"
              value={DepartmentName}
              onChange={(e) => setDepartmentName(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-100 mb-4">
        <button
          className={`btn float-start btn-primary ${loading && "disabled"}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading" : "Edit"}
        </button>
      </div>
      <div className="mb-4">
        <button
          className="btn btn-danger float-end"
          onClick={() => {
            setShowEditDepartmentDialog(false);
            setDepartmentName("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditDepartmentDialog;
