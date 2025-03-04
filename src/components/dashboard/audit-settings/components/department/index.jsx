import React from "react";
import {
  setupAddDepartment,
  setupGetAllDepartments,
  resetDepartmentAddSuccess,
  resetSubDepartmentAddSuccess,
  setupCreateSubDepartment,
  setupDeleteSubDepartment,
  setupGetAllSubDepartments,
} from "../../../../../global-redux/reducers/settings/department/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import DepartmentAccordionItem from "./DepartmentAccordionItem";
import DeleteDepartmentDialog from "./DeleteDepartmentDialog";
import EditDepartmentDialog from "./EditDepartmentDialog";
import EditSubDepartmentDialog from "./EditSubDepartmentDialog";

const Department = ({ userHierarchy, userRole, currentSettingOption }) => {
  const dispatch = useDispatch();
  const {
    loading,
    subLoading,
    departmentAddSuccess,
    subDepartmentAddSuccess,
    allDepartments,
    allSubDepartments,
  } = useSelector((state) => state.settingsDepartment);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [departmentDescription, setDepartmentDescription] = React.useState("");
  const [deleteDepartmentDialog, setShowDeleteDepartmentDialog] =
    React.useState(false);
  const [subDepartments, setSubDepartments] = React.useState([]);
  const [subDepartmentText, setSubDepartmentText] = React.useState("");
  const [departmentId, setDepartmentId] = React.useState("");
  const [subDepartmentId, setSubDepartmentId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [showEditDepartmentDialog, setShowEditDepartmentDialog] =
    React.useState(false);
  const [showEditSubDepartmentDialog, setShowEditSubDepartmentDialog] =
    React.useState(false);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleSaveDepartment() {
    if (!loading) {
      if (departmentDescription === "") {
        toast.error("Provide the department");
      } else {
        const selectedCompany = user[0]?.company?.find(
          (item) => item?.companyName === company
        );
        dispatch(
          setupAddDepartment({
            description: departmentDescription,
            companyId: selectedCompany?.id,
          })
        );
      }
    }
  }

  function handleAddSubDepartment() {
    if (!subLoading) {
      if (subDepartmentText === "") {
        toast.error("Provide Sub Department");
      } else {
        let companyId = user[0]?.company.find(
          (all) => all?.companyName === company
        )?.id;
        dispatch(
          setupCreateSubDepartment({
            description: subDepartmentText,
            departmentId: departmentId,
            companyId: companyId,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (departmentAddSuccess) {
      setDepartmentDescription("");
      dispatch(setupGetAllDepartments(`?companyId=${companyId}`));
      dispatch(resetDepartmentAddSuccess());
      setPage(1);
    }
  }, [departmentAddSuccess]);

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (subDepartmentAddSuccess) {
      setSubDepartmentText("");
      dispatch(setupGetAllSubDepartments(`?companyId=${companyId}`));
      dispatch(resetSubDepartmentAddSuccess());
    }
  }, [subDepartmentAddSuccess]);

  React.useEffect(() => {
    if (allSubDepartments && allSubDepartments?.length) {
      const subItems = allSubDepartments?.filter(
        (item) => item?.departmentId === departmentId
      );
      setSubDepartments(subItems);
    }
  }, [allSubDepartments]);

  React.useEffect(() => {
    if (departmentId) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      dispatch(setupGetAllSubDepartments(`?companyId=${companyId}`));
    }
  }, [departmentId]);

  React.useEffect(() => {
    setPage(1);
    setDepartmentDescription("");
    setSubDepartmentId("");
    setDepartmentId("");
    setSubDepartmentText("");
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade"
      id="nav-department"
      role="tabpanel"
      aria-labelledby="nav-department-tab"
    >
      {deleteDepartmentDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <DeleteDepartmentDialog
              setShowDeleteDepartmentDialog={setShowDeleteDepartmentDialog}
              departmentId={departmentId}
            />
          </div>
        </div>
      )}
      {showEditDepartmentDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <EditDepartmentDialog
              setShowEditDepartmentDialog={setShowEditDepartmentDialog}
              departmentId={departmentId}
            />
          </div>
        </div>
      )}
      {showEditSubDepartmentDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <EditSubDepartmentDialog
              setShowEditSubDepartmentDialog={setShowEditSubDepartmentDialog}
              departmentId={departmentId}
              subDepartmentId={subDepartmentId}
              subDepartments={subDepartments}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Department Management</div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation
            Department
          </label>
        </div>
      </div>
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div className="mt-3 d-flex flex-wrap gap-4">
          <div className="flex-1 w-100">
            <label className="w-100">Add Department:</label>
            <input
              className="form-control w-100"
              placeholder="Enter"
              type="text"
              name="departmentDescription"
              value={departmentDescription}
              onChange={(e) => setDepartmentDescription(e?.target?.value)}
            />
          </div>
          <div
            className={`col-lg-6 text-end float-end align-self-end ${
              loading && "disabled"
            }`}
            onClick={handleSaveDepartment}
          >
            <div className="btn btn-labeled btn-primary px-3 shadow">
              {loading ? "Loading" : "Add"}
            </div>
          </div>
        </div>
      )}
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="accordion" id="accordionDepartmentExample">
            {loading ? (
              <CircularProgress />
            ) : allDepartments?.length === 0 ? (
              <p>No Department To Show.</p>
            ) : (
              allDepartments
                ?.slice((page - 1) * 10, page * 10)
                ?.map((item, index) => {
                  return (
                    <DepartmentAccordionItem
                      subDepartments={subDepartments}
                      subLoading={subLoading}
                      key={index}
                      index={index}
                      setDepartmentId={setDepartmentId}
                      setSubDepartmentText={setSubDepartmentText}
                      item={item}
                      subDepartmentText={subDepartmentText}
                      handleAddSubDepartment={handleAddSubDepartment}
                      setSubDepartmentId={setSubDepartmentId}
                      setShowEditDepartmentDialog={setShowEditDepartmentDialog}
                      setShowEditSubDepartmentDialog={
                        setShowEditSubDepartmentDialog
                      }
                      setupDeleteSubDepartment={setupDeleteSubDepartment}
                      userRole={userRole}
                      userHierarchy={userHierarchy}
                      setShowDeleteDepartmentDialog={
                        setShowDeleteDepartmentDialog
                      }
                    />
                  );
                })
            )}
            {allDepartments && allDepartments?.length > 0 && (
              <Pagination
                count={Math.ceil(allDepartments?.length / 10)}
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
