import React from "react";
import { toast } from "react-toastify";
import {
  setupIahFileUpload,
  setupIahFileDelete,
  setupIahFileUpdate,
} from "../../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { useSelector, useDispatch } from "react-redux";
import { handleDownload } from "../../../../../../config/helper";

const IAHFileUpload = ({ item, setDeleteFileId }) => {
  const dispatch = useDispatch();
  const { addReportLoading, iahFileUploadSuccess } = useSelector(
    (state) => state?.internalAuditReport
  );
  const { user } = useSelector((state) => state?.auth);
  const updatedFileInputRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdateFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedUpdateFile(file);

    }
  };

  const onApiCall = async (file) => {
    if (!addReportLoading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupIahFileUpload({ formData: formData, id: item?.id }));
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
    if (!addReportLoading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupIahFileUpdate({ formData: formData, id: Number(id) }));
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
    if (iahFileUploadSuccess) {
      setSelectedFile(null);
      setSelectedUpdateFile(null);
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      if (updatedFileInputRef?.current) {
        updatedFileInputRef.current.value = "";
      }
    }
  }, [iahFileUploadSuccess]);
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
                accept=".xlsx, .xls, .pdf, .txt"
              />
            </div>
            <div className="col-lg-6">
              <button
                className={`btn btn-labeled btn-primary  shadow ${addReportLoading && "disabled"
                  }`}
                onClick={handleFileUpload}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                {addReportLoading ? "Loading..." : "Upload"}
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
                accept=".xlsx, .xls, .pdf, .txt"
              />
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
              {!item?.annexureUploads || item?.annexureUploads?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item?.annexureUploads?.map((fileItem, index) => {
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
                            if (!addReportLoading) {
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
                                  setupIahFileDelete({
                                    fileId: Number(fileItem?.id),
                                    id: Number(item?.id),
                                  })
                                );
                              }
                            }
                          }}
                        ></i>

                        <i
                          className="fa fa-edit px-2 f-18 cursor-pointer"
                          onClick={() => handleFileUpdate(fileItem?.id)}
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

export default IAHFileUpload;
