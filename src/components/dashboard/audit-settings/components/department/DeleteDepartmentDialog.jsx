import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteDepartment } from "../../../../../global-redux/reducers/settings/department/slice";

const DeleteDepartmentDialog = ({
  setShowDeleteDepartmentDialog,
  departmentId,
}) => {
  const dispatch = useDispatch();
  const { loading, departmentAddSuccess } = useSelector(
    (state) => state.settingsDepartment
  );

  function handleDeleteDepartment() {
    if (!loading) {
      dispatch(setupDeleteDepartment(departmentId));
    }
  }

  React.useEffect(() => {
    if (departmentAddSuccess) {
      setShowDeleteDepartmentDialog(false);
    }
  }, [departmentAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are You Sure You Want To Delete Department?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteDepartment}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowDeleteDepartmentDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteDepartmentDialog;
