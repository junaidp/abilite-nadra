import React from "react";
import { toast } from "react-toastify";
import {
  setupAuditStepSamplingFileUpload,
  setupAuditStepSamplingFileDelete,
  setupAuditStepSamplingFileUpdate,
} from "../../../../global-redux/reducers/audit-engagement/slice";
import { useSelector, useDispatch } from "react-redux";
import { handleDownload } from "../../../../constants/index";

const SamplingFileUpload = ({ currentAuditStep, handleAllowEdit }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const updatedFileInputRef = React.useRef(null);
  const { loading, auditEngagementObservationAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = React.useState(null);

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

  const handleUpdateFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (validTypes.includes(fileType)) {
        setSelectedUpdateFile(file);
      } else {
        toast.error(
          "Invalid file type. Only Pdf and Excel files are acceptable"
        );
      }
    }
  };

  const onApiCall = async (file) => {
    if (!loading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        setupAuditStepSamplingFileUpload({
          formData: formData,
          id: currentAuditStep?.id,
        })
      );
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  const updateFileApiCal = async (file, id) => {
    if (!loading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        setupAuditStepSamplingFileUpdate({ formData: formData, id: id })
      );
    }
  };

  const handleFileUpdate = (id) => {
    if (selectedUpdateFile) {
      updateFileApiCal(selectedUpdateFile, id);
    } else {
      toast.error("No file selected.");
    }
  };

  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      setSelectedFile(null);
      setSelectedUpdateFile(null);
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      if (updatedFileInputRef?.current) {
        updatedFileInputRef.current.value = "";
      }
    }
  }, [auditEngagementObservationAddSuccess]);

  return (
    <div className="my-4">
      <hr />

      <h1 className="heading">Sampling File Uploads</h1>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label me-3 mb-3">Attach files</label>
          {handleAllowEdit() === true && (
            <div className="row mb-3">
              <div className="col-lg-12 row">
                <div className="col-lg-2">
                  <input
                    type="file"
                    id="fileInpu"
                    className="f-10"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-lg-2">
                  <button
                    className={`btn btn-labeled btn-primary  shadow ${
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

          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="sr-col">Sr No.</th>
                  <th>Attach Files </th>
                  <th>Action</th>
                  {handleAllowEdit() === true && <th>Update</th>}
                </tr>
              </thead>
              <tbody>
                {!currentAuditStep?.samplingFileAuditStep ||
                !currentAuditStep?.samplingFileAuditStep?.fileName ? (
                  <tr>
                    <td className="w-200">No Sampling File Added Yet!</td>
                  </tr>
                ) : (
                  <tr>
                    <td>1</td>
                    <td>
                      <a>{currentAuditStep?.samplingFileAuditStep?.fileName}</a>
                    </td>
                    <td className="w-130">
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() =>
                          handleDownload({
                            base64String:
                              currentAuditStep?.samplingFileAuditStep?.fileData,
                            fileName:
                              currentAuditStep?.samplingFileAuditStep?.fileName,
                          })
                        }
                      ></i>
                      {handleAllowEdit() === true && (
                        <i
                          className="fa fa-trash text-danger f-18 mx-2 cursor-pointer"
                          onClick={() => {
                            dispatch(
                              setupAuditStepSamplingFileDelete({
                                fileId:
                                  currentAuditStep?.samplingFileAuditStep?.id,
                                stepId: currentAuditStep?.id,
                              })
                            );
                          }}
                        ></i>
                      )}
                    </td>
                    {handleAllowEdit() === true && (
                      <td className="w-200">
                        <div>
                          <input
                            type="file"
                            id="fileInpu"
                            className="f-10"
                            ref={updatedFileInputRef}
                            onChange={handleUpdateFileChange}
                          />
                        </div>
                        <div>
                          <button
                            className={`btn btn-labeled btn-primary mt-2  shadow ${
                              loading && "disabled"
                            }`}
                            onClick={() =>
                              handleFileUpdate(
                                currentAuditStep?.samplingFileAuditStep?.id
                              )
                            }
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-save"></i>
                            </span>
                            {loading ? "Loading..." : "Update"}
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SamplingFileUpload;
