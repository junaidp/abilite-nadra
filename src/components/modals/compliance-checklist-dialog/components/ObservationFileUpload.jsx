import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  setupUploadAuditStepCheckListFile,
  setupDeleteAuditStepCheckListFile,
} from "../../../../global-redux/reducers/audit-engagement/slice";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../../../config/constants";
import { validateFile } from "../../../../config/helper";
import "./index.css";

const ObservationFileUpload = ({
  item,
  allowEdit,
  setCurrentDeleteFileId,
  onFileUploaded,
  onFileDeleted,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [deletingFileId, setDeletingFileId] = React.useState(null);
  const [downloadingFileId, setDownloadingFileId] = React.useState(null);

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValid = await validateFile(file, toast);
      if (isValid) {
        setSelectedFile(file);
      } else {
        clearSelectedFile();
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    const isValid = await validateFile(selectedFile, toast);
    if (!isValid) {
      clearSelectedFile();
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await dispatch(
        setupUploadAuditStepCheckListFile({ formData: formData, id: item?.id })
      ).unwrap();

      if (response?.status === false) {
        return;
      }

      const uploadedFile = response?.data;
      if (uploadedFile?.id) {
        onFileUploaded?.(item?.id, {
          ...uploadedFile,
          fileName: uploadedFile?.fileName || uploadedFile?.name,
        });
      }
      clearSelectedFile();
    } catch {
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (fileItem) => {
    if (deletingFileId) return;

    if (user[0]?.userId?.employeeid?.userHierarchy !== "IAH") {
      toast.error("Only the Head of Internal Audit can delete a file.");
      return;
    }

    try {
      setCurrentDeleteFileId(fileItem?.id);
      setDeletingFileId(fileItem?.id);
      const response = await dispatch(
        setupDeleteAuditStepCheckListFile({
          fileId: Number(fileItem?.id),
          ChecklistObservationsId: Number(item?.id),
        })
      ).unwrap();

      if (response?.status === false) {
        return;
      }

      onFileDeleted?.(item?.id, response?.data || fileItem?.id);
    } catch {
    } finally {
      setDeletingFileId(null);
      setCurrentDeleteFileId("");
    }
  };

  const handleFileDownload = async (fileItem) => {
    if (!fileItem?.id || downloadingFileId) return;

    try {
      setDownloadingFileId(fileItem?.id);
      const response = await axios.get(
        `${baseUrl}/auditEngagement/auditStep/auditStepChecklist/ObservationDataAttachments/download?fileId=${fileItem?.id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${user[0]?.token}`,
          },
        }
      );

      const blobUrl = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileItem?.fileName || "attachment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Unable to download file.");
    } finally {
      setDownloadingFileId(null);
    }
  };

  return (
    <td className="fileObservationCol fileSubObservationColItem">
      <div className="compliance-attachment-cell">
          <label className="form-label me-3 mb-3">Attach files</label>
          {allowEdit === true && (
            <div className="compliance-attachment-upload mb-3">
                <div>
                  <input
                    type="file"
                    id="fileInpu"
                    className="f-10"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".xlsx, .xls, .pdf, .txt"
                  />
                </div>
                <div className="mt-3">
                  <button
                    className={`btn btn-labeled btn-primary  shadow ${uploading && "disabled"
                      }`}
                    onClick={handleFileUpload}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-save"></i>
                    </span>
                    {uploading ? "Loading..." : "Upload"}
                  </button>
                </div>
            </div>
          )}

          <div className="compliance-attachment-table-wrap">
            <table className="table table-bordered table-hover rounded mb-0 compliance-attachment-table">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Attach Files </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!item?.observationsDataAttachmentsList ||
                  item?.observationsDataAttachmentsList?.length == 0 ? (
                  <tr>
                    <td colSpan="2">No Files Added Yet!</td>
                  </tr>
                ) : (
                  item?.observationsDataAttachmentsList?.map(
                    (fileItem, index) => {
                      return (
                        <tr key={fileItem?.id || index}>
                          <td>
                            <a>{fileItem?.fileName}</a>
                          </td>
                          <td className="compliance-attachment-actions">
                            <i
                              className={`fa ${downloadingFileId === fileItem?.id
                                ? "fa-spinner fa-spin"
                                : "fa-download"
                                } f-18 mx-2 cursor-pointer`}
                              onClick={() => handleFileDownload(fileItem)}
                            ></i>
                            {allowEdit === true && (
                              <i
                                className={`fa ${deletingFileId === fileItem?.id
                                  ? "fa-spinner fa-spin"
                                  : "fa-trash"
                                  } text-danger f-18 cursor-pointer px-2`}
                                onClick={() => handleFileDelete(fileItem)}
                              ></i>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
      </div>
    </td>
  );
};

export default ObservationFileUpload;
