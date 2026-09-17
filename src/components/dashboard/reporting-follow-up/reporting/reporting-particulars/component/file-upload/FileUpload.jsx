import React, { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import {
  setupReportingFileUpload,
  setupReportingFileDelete,
} from "../../../../../../../global-redux/reducers/reporting/slice";
import { validateFile } from "../../../../../../../config/helper";
import { downloadReportingAttachment } from "../../../../attachmentDownload";

/**
 * ReportingFileUpload
 * Handles file upload and delete for a given reporting item.
 *
 * @param {Object} item - Reporting item containing file attachments.
 */
const ReportingFileUpload = ({ item }) => {
  const dispatch = useDispatch();

  const { loading, reportingFileUploadSuccess } = useSelector(
    (state) => state?.reporting
  );
  const { user } = useSelector((state) => state?.auth);

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  // 🔹 Helpers
  const canEdit = Number(item?.stepNo) <= 1;
  const isHeadOfInternalAudit =
    user?.[0]?.userId?.employeeid?.userHierarchy === "IAH";

  const clearSelectedFile = useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // 🔹 File Handlers
  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const isValid = await validateFile(file, toast);
      if (isValid) {
        setSelectedFile(file);
      } else {
        clearSelectedFile();
      }
    }
  }, [clearSelectedFile]);

  const uploadFile = useCallback(
    (file) => {
      if (!loading && file) {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(setupReportingFileUpload({ formData, id: item?.id }));
      }
    },
    [dispatch, item?.id, loading]
  );

  const handleFileUpload = useCallback(async () => {
    if (selectedFile) {
      const isValid = await validateFile(selectedFile, toast);
      if (!isValid) {
        clearSelectedFile();
        return;
      }
      uploadFile(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  }, [selectedFile, uploadFile, clearSelectedFile]);

  const handleFileDelete = useCallback(
    (fileId) => {
      if (!loading) {
        if (!isHeadOfInternalAudit) {
          return toast.error("Only the Head of Internal Audit can delete a file.");
        }
        dispatch(
          setupReportingFileDelete({
            fileId: Number(fileId),
            reportingId: Number(item?.id),
          })
        );
      }
    },
    [dispatch, item?.id, isHeadOfInternalAudit, loading]
  );

  const handleFileDownload = useCallback(
    async (fileItem) => {
      if (!fileItem?.id || downloadingFileId) return;

      try {
        setDownloadingFileId(fileItem.id);
        await downloadReportingAttachment({
          attachment: fileItem,
          token: user?.[0]?.token,
          fallbackSource: "REPORTING_ATTACHMENT",
        });
      } catch {
        toast.error("Unable to download the file.");
      } finally {
        setDownloadingFileId(null);
      }
    },
    [downloadingFileId, user]
  );

  // 🔹 Reset inputs on successful upload
  useEffect(() => {
    if (reportingFileUploadSuccess) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [reportingFileUploadSuccess]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>

        {/* Upload Section */}
        {canEdit && (
          <div className="row mb-3">
            {/* Upload File */}
            <div className="col-lg-4 row">
              <div className="col-lg-7">
                <input
                  type="file"
                  className="f-10"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx, .xls, .pdf, .txt"
                />
              </div>
              <div className="col-lg-5">
                <button
                  className={`btn btn-labeled btn-primary shadow ${loading ? "disabled" : ""
                    }`}
                  onClick={handleFileUpload}
                >
                  {loading ? "Loading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* File List */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!item?.reportingFileAttachmentsList?.length ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item.reportingFileAttachmentsList.map((fileItem, index) => (
                  <tr key={index}>
                    <td>
                      <a>{fileItem?.fileName}</a>
                    </td>
                    <td className="w-130">
                      {/* Download */}
                      <i
                        className={`fa ${
                          downloadingFileId === fileItem?.id
                            ? "fa-spinner fa-spin"
                            : "fa-download"
                        } f-18 mx-2 cursor-pointer`}
                        onClick={() => handleFileDownload(fileItem)}
                        title={
                          downloadingFileId === fileItem?.id
                            ? "Downloading"
                            : "Download"
                        }
                      ></i>

                      {/* Delete */}
                      {canEdit && (
                        <i
                          className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                          onClick={() => handleFileDelete(fileItem?.id)}
                        ></i>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportingFileUpload;
