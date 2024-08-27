import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUploadFile,
  resetFileAddSuccess,
  setupGetAllFiles,
} from "../../../../../global-redux/reducers/settings/supporting-docs/slice";
import { toast } from "react-toastify";
import Table from "./components/Table";

const SupportingDocs = ({ userHierarchy, userRole, currentSettingOption }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const { allFiles, loading, fileAddSuccess } = useSelector(
    (state) => state?.settingsDocs
  );
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const [page, setPage] = React.useState(1);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (validTypes.includes(fileType)) {
        setSelectedFile(file);
      } else {
        toast.error(
          "Invalid file type. Only Pdf and Excel files are acceptable"
        );
      }
    }
  };

  const onApiCall = async (file) => {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("companyId", Number(companyId));
      dispatch(setupUploadFile(formData));
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  React.useEffect(() => {
    if (fileAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(setupGetAllFiles(`?companyId=${companyId}`));
      setSelectedFile(null);
      fileInputRef.current.value = "";
      setPage(1);
      setSearchValue("");
      dispatch(resetFileAddSuccess());
    }
  }, [fileAddSuccess]);

  React.useEffect(() => {
    setPage(1);
    setSearchValue("");
    setSelectedFile(null);
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade active show"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div>
          <div className="row my-3">
            <div className="col-lg-12">
              <div className="sub-heading  fw-bold">Supporting Documents</div>
            </div>
          </div>
          <div className="row position-relative">
            <div className="col-lg-12 text-center settings-form">
              <form>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <p className="mb-0">Click in this area.</p>
              </form>
            </div>
            <p className="my-2">
              {selectedFile?.name ? selectedFile?.name : "Select file"}
            </p>
          </div>
          <div className="row my-3">
            <div className="col-lg-12 text-end">
              <button
                className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                  loading && "disabled"
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

      <div className="my-3">
        <div className="flex">
          <div className="row position-relative">
            <div className="col-lg-12 text-center settings-form h-0 border-none">
              <form>
                <input type="file" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="w-100">Search File Name:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
          />
        </div>
      </div>

      <Table
        userRole={userRole}
        userHierarchy={userHierarchy}
        allFiles={allFiles}
        loading={loading}
        searchValue={searchValue}
        handleChangePage={handleChangePage}
        page={page}
      />
    </div>
  );
};

export default SupportingDocs;
