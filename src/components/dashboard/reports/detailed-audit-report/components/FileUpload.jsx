import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  setupConsolidationFileUpload,
  setupConsolidationFileDelete,
  setupConsolidationFileUpdate,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useSelector, useDispatch } from "react-redux";
import { handleDownload } from "../../../../../config/helper";

/**
 * ConsolidationFileUpload
 * -----------------------
 * Handles uploading, updating, downloading, and deleting consolidation files.
 * Developers: Keep in mind only IAH role users are allowed to delete files.
 */

const FileInput = React.memo(({ onChange, inputRef, accept, label }) => (
  <div className="col-lg-6">
    {label && <label>{label}</label>}
    <input
      type="file"
      className="f-10"
      ref={inputRef}
      onChange={onChange}
      accept={accept}
    />
  </div>
));

const ActionIcons = ({ fileItem, subLoading, user, onDelete, onUpdate }) => (
  <td className="w-130">
    {/* Download Icon */}
    <i
      className="fa fa-download f-18 mx-2 cursor-pointer"
      onClick={() =>
        handleDownload({
          base64String: fileItem?.fileData,
          fileName: fileItem?.fileName,
        })
      }
    />
    {/* Delete Icon */}
    <i
      className="fa fa-trash text-danger f-18 cursor-pointer px-2"
      onClick={() => {
        if (subLoading) return;
        if (user[0]?.userId?.employeeid?.userHierarchy !== "IAH") {
          toast.error("Only the Head of Internal Audit can delete a file.");
          return;
        }
        onDelete(fileItem?.id);
      }}
    />
    {/* Update Icon */}
    <i
      className="fa fa-edit px-2 f-18 cursor-pointer"
      onClick={() => onUpdate(fileItem?.id)}
    />
  </td>
);

const ConsolidationFileUpload = ({ item, setDeleteFileId }) => {
  const dispatch = useDispatch();
  const { subLoading, consolidationFileUploadAddSuccess } = useSelector(
    (state) => state?.consolidationReport
  );
  const { user } = useSelector((state) => state?.auth);

  const updatedFileInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // File select handlers
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleUpdateFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) setSelectedUpdateFile(file);
  }, []);

  // Upload API
  const onApiCall = useCallback(
    (file) => {
      if (!subLoading && file) {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(setupConsolidationFileUpload({ formData, id: item?.id }));
      }
    },
    [dispatch, item?.id, subLoading]
  );

  const handleFileUpload = useCallback(() => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  }, [onApiCall, selectedFile]);

  // Update API
  const updateFileApiCal = useCallback(
    (file, id) => {
      if (!subLoading && file) {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(setupConsolidationFileUpdate({ formData, id: Number(id) }));
      }
    },
    [dispatch, subLoading]
  );

  const handleFileUpdate = useCallback(
    (id) => {
      if (selectedUpdateFile) {
        updateFileApiCal(selectedUpdateFile, id);
      } else {
        toast.error("Please select update file first.");
      }
    },
    [selectedUpdateFile, updateFileApiCal]
  );

  // Delete handler
  const handleDelete = useCallback(
    (fileId) => {
      setDeleteFileId(fileId);
      dispatch(
        setupConsolidationFileDelete({
          fileId: Number(fileId),
          id: Number(item?.id),
        })
      );
    },
    [dispatch, item?.id, setDeleteFileId]
  );

  // Reset inputs after successful upload
  useEffect(() => {
    if (consolidationFileUploadAddSuccess) {
      setSelectedFile(null);
      setSelectedUpdateFile(null);
      if (fileInputRef?.current) fileInputRef.current.value = "";
      if (updatedFileInputRef?.current) updatedFileInputRef.current.value = "";
    }
  }, [consolidationFileUploadAddSuccess]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>

        {/* Upload Section */}
        <div className="row mb-3">
          <div className="col-lg-4 row">
            <FileInput
              inputRef={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx, .xls, .pdf, .txt"
            />
            <div className="col-lg-6">
              <button
                className={`btn btn-labeled btn-primary shadow ${subLoading ? "disabled" : ""
                  }`}
                onClick={handleFileUpload}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                {subLoading ? "Loading..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Update File Section */}
          <div className="col-lg-8 row flex flex-end">
            <div className="col-lg-3">
              <FileInput
                label="Updated File here:"
                inputRef={updatedFileInputRef}
                onChange={handleUpdateFileChange}
                accept=".xlsx, .xls, .pdf, .txt"
              />
            </div>
          </div>
        </div>

        {/* File List Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!item?.annexureUploads?.length ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item?.annexureUploads?.map((fileItem) => (
                  <tr key={fileItem?.id}>
                    <td>
                      <a>{fileItem?.fileName}</a>
                    </td>
                    <ActionIcons
                      fileItem={fileItem}
                      subLoading={subLoading}
                      user={user}
                      onDelete={handleDelete}
                      onUpdate={handleFileUpdate}
                    />
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

export default ConsolidationFileUpload;
