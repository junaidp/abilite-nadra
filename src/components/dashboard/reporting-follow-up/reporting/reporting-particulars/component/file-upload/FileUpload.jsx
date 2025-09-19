import React, { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import {
  setupReportingFileUpload,
  setupReportingFileDelete,
  setupReportingFileUpdate,
} from "../../../../../../../global-redux/reducers/reporting/slice";
import { handleDownload } from "../../../../../../../config/helper";

/**
 * ReportingFileUpload
 * Handles file upload, update, and delete for a given reporting item.
 *
 * @param {Object} item - Reporting item containing file attachments.
 * @param {Function} setDeleteFileId - Setter for tracking file deletion.
 */
const ReportingFileUpload = ({ item, setDeleteFileId }) => {
  const dispatch = useDispatch();

  const { loading, reportingFileUploadSuccess } = useSelector(
    (state) => state?.reporting
  );
  const { user } = useSelector((state) => state?.auth);

  const fileInputRef = useRef(null);
  const updatedFileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = useState(null);

  // 🔹 Helpers
  const canEdit = Number(item?.stepNo) <= 1;
  const isHeadOfInternalAudit =
    user?.[0]?.userId?.employeeid?.userHierarchy === "IAH";

  // 🔹 File Handlers
  const handleFileChange = useCallback((e) => {
    setSelectedFile(e.target.files?.[0] || null);
  }, []);

  const handleUpdateFileChange = useCallback((e) => {
    setSelectedUpdateFile(e.target.files?.[0] || null);
  }, []);

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

  const updateFile = useCallback(
    (file, id) => {
      if (!loading && file) {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(setupReportingFileUpdate({ formData, id: Number(id) }));
      }
    },
    [dispatch, loading]
  );

  const handleFileUpload = useCallback(() => {
    selectedFile ? uploadFile(selectedFile) : toast.error("No file selected.");
  }, [selectedFile, uploadFile]);

  const handleFileUpdate = useCallback(
    (id) => {
      selectedUpdateFile
        ? updateFile(selectedUpdateFile, id)
        : toast.error("Please select update file first.");
    },
    [selectedUpdateFile, updateFile]
  );

  const handleFileDelete = useCallback(
    (fileId) => {
      if (!loading) {
        if (!isHeadOfInternalAudit) {
          return toast.error("Only the Head of Internal Audit can delete a file.");
        }
        setDeleteFileId(fileId);
        dispatch(
          setupReportingFileDelete({
            fileId: Number(fileId),
            reportingId: Number(item?.id),
          })
        );
      }
    },
    [dispatch, item?.id, isHeadOfInternalAudit, loading, setDeleteFileId]
  );

  // 🔹 Reset inputs on successful upload
  useEffect(() => {
    if (reportingFileUploadSuccess) {
      setSelectedFile(null);
      setSelectedUpdateFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (updatedFileInputRef.current) updatedFileInputRef.current.value = "";
    }
  }, [reportingFileUploadSuccess]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>

        {/* Upload & Update Section */}
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
                  className={`btn btn-labeled btn-primary shadow ${
                    loading ? "disabled" : ""
                  }`}
                  onClick={handleFileUpload}
                >
                  {loading ? "Loading..." : "Upload"}
                </button>
              </div>
            </div>

            {/* Update File */}
            <div className="col-lg-8 row flex flex-end">
              <div className="col-lg-3">
                <label>Updated File here:</label>
                <input
                  type="file"
                  className="f-10"
                  ref={updatedFileInputRef}
                  onChange={handleUpdateFileChange}
                  accept=".xlsx, .xls, .pdf, .txt"
                />
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
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() =>
                          handleDownload({
                            base64String: fileItem?.fileData,
                            fileName: fileItem?.fileName,
                          })
                        }
                      ></i>

                      {/* Delete */}
                      {canEdit && (
                        <i
                          className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                          onClick={() => handleFileDelete(fileItem?.id)}
                        ></i>
                      )}

                      {/* Update */}
                      {canEdit && (
                        <i
                          className="fa fa-edit px-2 f-18 cursor-pointer"
                          onClick={() => handleFileUpdate(fileItem?.id)}
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
