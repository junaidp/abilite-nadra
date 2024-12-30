import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setupUploadFile,
  resetPreviousObservationsAddSuccess,
} from "../../../../../global-redux/reducers/settings/previous-observation/slice";
import { CircularProgress } from "@mui/material";

const PreviousObservation = ({ currentSettingOption }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const { loading, previousObservationAddSuccess, users } = useSelector(
    (state) => state.settingsPreviousObservation
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      fileInputRef.current.value = "";
    }
  };

  const onApiCall = async (file) => {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupUploadFile({ formData, companyId }));
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  const handleDownload = () => {
    const fileUrl = "/sample-file.csv";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "sample-file.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    if (previousObservationAddSuccess) {
      setSelectedFile(null);
      fileInputRef.current.value = "";
      dispatch(resetPreviousObservationsAddSuccess());
    }
  }, [previousObservationAddSuccess]);

  React.useEffect(() => {
    setSelectedFile(null);
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade"
      id="previous-observation"
      role="tabpanel"
      aria-labelledby="previous-observation-tab"
    >
      <div className="row mb-3">
        <div className="col-lg-6">
          <div className="sub-heading mb-4 fw-bold">Previous Observations</div>
        </div>
        <div className="col-lg-6 d-flex h-40 flex-end">
          <button
            className="btn btn-labeled btn-primary shadow"
            onClick={handleDownload}
          >
            Download Sample Previous Observation File
          </button>
        </div>
      </div>

      <div>
        <div className="row position-relative mx-1">
          <div className="col-lg-12  settings-form">
            <form>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <p className="mb-0">Click in this area.</p>
            </form>
          </div>
        </div>
        <p className="my-2">
          {selectedFile?.name ? selectedFile?.name : "Select file"}
        </p>
      </div>
      <div className="row mb-4">
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
            {loading ? "Loading..." : "Upload File"}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-10">Sr No.</th>
                  <th>User Id</th>
                  <th>Username</th>
                  <th>User Hierarchy</th>
                  <th>Designation</th>
                  <th>Email ID</th>
                  <th>Skill Set</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : users?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Users To Show.</td>
                  </tr>
                ) : (
                  users?.map((userItem, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{userItem?.id}</td>
                        <td>{userItem?.name || ""}</td>
                        <td>{userItem?.employeeid?.userHierarchy || ""}</td>
                        <td>{userItem?.employeeid?.designation || ""}</td>
                        <td>{userItem?.email || ""}</td>
                        <td>{userItem?.employeeid?.skillSet || ""}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousObservation;
