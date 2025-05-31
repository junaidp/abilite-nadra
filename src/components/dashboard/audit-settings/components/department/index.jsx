import React from "react";
import {
  setupAddDepartment,
  setupGetAllDepartments,
  resetDepartmentAddSuccess,
  resetSubDepartmentAddSuccess,
  setupCreateSubDepartment,
  setupDeleteSubDepartment,
  setupUploadDepartment
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
  const fileInputRef = React.useRef(null);
  const dispatch = useDispatch();
  const {
    loading,
    subLoading,
    departmentAddSuccess,
    subDepartmentAddSuccess,
    allDepartments,
  } = useSelector((state) => state.settingsDepartment);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [departmentDescription, setDepartmentDescription] = React.useState("");
  const [deleteDepartmentDialog, setShowDeleteDepartmentDialog] =
    React.useState(false);
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

  // Upload Starts

  const handleDownload = () => {
    const fileUrl = "/sample-file-department.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "sample-file-department.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  const onApiCall = async (file) => {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupUploadDepartment({ formData, companyId }));
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };
  // Upload Ends

  function handleSaveDepartment() {
    if (!loading) {
      if (departmentDescription.trim() === "") {
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
      if (subDepartmentText.trim() === "") {
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
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [departmentAddSuccess]);

  React.useEffect(() => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (subDepartmentAddSuccess) {
      setSubDepartmentText("");
      dispatch(setupGetAllDepartments(`?companyId=${companyId}`));
      dispatch(resetSubDepartmentAddSuccess());
    }
  }, [subDepartmentAddSuccess]);


  React.useEffect(() => {
    setPage(1);
    setDepartmentDescription("");
    setSubDepartmentId("");
    setDepartmentId("");
    setSubDepartmentText("");
  }, [currentSettingOption, departmentAddSuccess, subDepartmentAddSuccess]);

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
              allDepartments={allDepartments}
            />
          </div>
        </div>
      )}
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div>
          <div className="row mb-3">
            <div className="col-lg-6">
              <div className="sub-heading mb-4 fw-bold">File Upload</div>
            </div>
            <div className="col-lg-6 d-flex h-40 flex-end">
              <button
                className="btn btn-labeled btn-primary shadow"
                onClick={handleDownload}
              >
                Download Sample Department/Sub-Department Upload File
              </button>
            </div>
          </div>
          <div className="row position-relative mx-1 pointer">
            <div className="col-lg-12 text-center settings-form">
              <form>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx, .xls, .pdf, .txt"
                />
                <p className="mb-0">Click in this area.</p>
              </form>
            </div>
          </div>
          <p className="my-2">
            {selectedFile?.name ? selectedFile?.name : "Select file"}
          </p>
          <div className="row my-3">
            <div className="col-lg-12 text-end">
              <button
                className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                  }`}
                onClick={handleFileUpload}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                {loading ? "Loading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <hr />
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
            className={`col-lg-6 text-end float-end align-self-end ${loading && "disabled"
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
