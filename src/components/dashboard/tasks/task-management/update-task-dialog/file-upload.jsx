import React from "react";
import { toast } from "react-toastify";
import {
  setupTaskFileUpload,
  setupTaskFileDelete,
} from "../../../../../global-redux/reducers/tasks-management/slice";
import { useSelector, useDispatch } from "react-redux";
import { handleDownload } from "../../../../../constants";

const InformationRequestFileUpload = ({ updateTaskId }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const [files, setFiles] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const { loading, fileUploadSuccess, allTasks } = useSelector(
    (state) => state?.tasksManagement
  );

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
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        setupTaskFileUpload({
          formData: formData,
          planningReportId: updateTaskId,
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

  React.useEffect(() => {
    if (fileUploadSuccess) {
      setSelectedFile(null);
      fileInputRef.current.value = "";
    }
  }, [fileUploadSuccess]);

  React.useEffect(() => {
    let task = allTasks.find((singleTask) => singleTask?.id === updateTaskId);
    setFiles(task?.fileAttachments);
  }, [updateTaskId, allTasks]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>
        <div className="row mb-3">
          <div className="col-lg-4 row">
            <div className="col-lg-6">
              <input
                type="file"
                id="fileInpu"
                className="f-10"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="col-lg-6">
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

        <div className="table-responsive">
          <table className="table table-bordered  table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!files || files?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                files?.map((fileItem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a>{fileItem?.fileName}</a>
                      </td>
                      <td className="w-130">
                        <i
                          className="fa fa-download f-18 mx-2 cursor-pointer"
                          onClick={() =>
                            handleDownload({
                              base64String: fileItem?.fileData,
                              fileName: fileItem?.fileName,
                            })
                          }
                        ></i>
                        <i
                          className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                          onClick={() => {
                            if (!loading) {
                              dispatch(
                                setupTaskFileDelete({
                                  fileId: Number(fileItem?.id),
                                  informationRequestAndTaskManagementId:
                                    Number(updateTaskId),
                                })
                              );
                            }
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InformationRequestFileUpload;
