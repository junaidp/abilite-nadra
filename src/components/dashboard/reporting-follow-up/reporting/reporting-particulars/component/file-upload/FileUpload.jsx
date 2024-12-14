import React from "react";
import { toast } from "react-toastify";
import {
  setupReportingFileUpload,
  setupReportingFileDelete,
  setupReportingFileUpdate,
} from "../../../../../../../global-redux/reducers/reporting/slice";
import { useSelector, useDispatch } from "react-redux";
import { handleDownload } from "../../../../../../../config/helper";

const ReportingFileUpload = ({ item, setDeleteFileId }) => {
  const dispatch = useDispatch();
  const { loading, reportingFileUploadSuccess } = useSelector(
    (state) => state?.reporting
  );
  const { user } = useSelector((state) => state?.auth);
  const updatedFileInputRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

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
      dispatch(setupReportingFileUpload({ formData: formData, id: item?.id }));
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
        setupReportingFileUpdate({ formData: formData, id: Number(id) })
      );
    }
  };

  const handleFileUpdate = (id) => {
    if (selectedUpdateFile) {
      updateFileApiCal(selectedUpdateFile, id);
    } else {
      toast.error(
        "Please select update file from above in order to change the file."
      );
    }
  };

  React.useEffect(() => {
    if (reportingFileUploadSuccess) {
      setSelectedFile(null);
      setSelectedUpdateFile(null);
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      if (updatedFileInputRef?.current) {
        updatedFileInputRef.current.value = "";
      }
    }
  }, [reportingFileUploadSuccess]);
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>
        {Number(item?.stepNo) <= 1 && (
          <div className="row mb-3">
            <div className="col-lg-4 row">
              <div className="col-lg-7">
                <input
                  type="file"
                  id="fileInpu"
                  className="f-10"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-lg-5">
                <button
                  className={`btn btn-labeled btn-primary  shadow ${
                    loading && "disabled"
                  }`}
                  onClick={handleFileUpload}
                >
                  {loading ? "Loading..." : "Upload"}
                </button>
              </div>
            </div>

            <div className="col-lg-8 row flex flex-end">
              <div className="col-lg-3">
                <label>Updated File here:</label>
                <input
                  type="file"
                  id="fileInpu"
                  className="f-10"
                  ref={updatedFileInputRef}
                  onChange={handleUpdateFileChange}
                />
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered  table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!item?.reportingFileAttachmentsList ||
              item?.reportingFileAttachmentsList?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item?.reportingFileAttachmentsList?.map((fileItem, index) => {
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
                        {Number(item?.stepNo) <= 1 && (
                          <i
                            className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                            onClick={() => {
                              if (!loading) {
                                if (
                                  user[0]?.userId?.employeeid?.userHierarchy !==
                                  "IAH"
                                ) {
                                  toast.error(
                                    "Only the Head of Internal Audit can delete a file."
                                  );
                                }
                                if (
                                  user[0]?.userId?.employeeid?.userHierarchy ===
                                  "IAH"
                                ) {
                                  setDeleteFileId(fileItem?.id);
                                  dispatch(
                                    setupReportingFileDelete({
                                      fileId: Number(fileItem?.id),
                                      reportingId: Number(item?.id),
                                    })
                                  );
                                }
                              }
                            }}
                          ></i>
                        )}
                        {Number(item?.stepNo) <= 1 && (
                          <i
                            className="fa fa-edit px-2 f-18 cursor-pointer"
                            onClick={() => handleFileUpdate(fileItem?.id)}
                          ></i>
                        )}
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

export default ReportingFileUpload;
