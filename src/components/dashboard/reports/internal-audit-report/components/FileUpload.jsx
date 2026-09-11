import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setupIahFileDelete,
  setupIahFileUpload,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { handleDownload, validateFile } from "../../../../../config/helper";
import "../../detailed-audit-report/components/ReportFileAttachments.css";

const FileInput = React.memo(({ onChange, inputRef }) => (
  <input
    type="file"
    className="f-10"
    ref={inputRef}
    onChange={onChange}
    accept=".xlsx, .xls, .pdf, .txt"
  />
));

const FileUpload = ({
  item,
  readOnly = false,
  onAttachmentsChange,
}) => {
  const dispatch = useDispatch();
  const { fileActionLoading } = useSelector(
    (state) => state?.internalAuditReport
  );
  const { user } = useSelector((state) => state?.auth);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const uploads = item?.annexureUploads || [];
  const panelId = `iar-report-attachments-${item?.id || "report"}`;

  const clearSelectedFile = useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const isValid = await validateFile(file, toast);
      if (isValid) {
        setSelectedFile(file);
      } else {
        clearSelectedFile();
      }
    },
    [clearSelectedFile]
  );

  const handleFileUpload = useCallback(async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    const isValid = await validateFile(selectedFile, toast);
    if (!isValid) {
      clearSelectedFile();
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await dispatch(
        setupIahFileUpload({ formData, id: item?.id })
      ).unwrap();

      if (
        response?.status &&
        Array.isArray(response?.data?.annexureUploads)
      ) {
        onAttachmentsChange?.(response.data.annexureUploads);
        clearSelectedFile();
      }
    } catch {
      // The rejected thunk displays the API error.
    }
  }, [
    clearSelectedFile,
    dispatch,
    item?.id,
    onAttachmentsChange,
    selectedFile,
  ]);

  const handleDelete = useCallback(
    async (fileId) => {
      if (fileActionLoading) return;

      if (user?.[0]?.userId?.employeeid?.userHierarchy !== "IAH") {
        toast.error("Only the Head of Internal Audit can delete a file.");
        return;
      }

      try {
        const response = await dispatch(
          setupIahFileDelete({
            fileId: Number(fileId),
            id: Number(item?.id),
          })
        ).unwrap();

        if (response?.status) {
          onAttachmentsChange?.(
            uploads.filter((file) => Number(file?.id) !== Number(fileId))
          );
        }
      } catch {
        // The rejected thunk displays the API error.
      }
    },
    [
      dispatch,
      fileActionLoading,
      item?.id,
      onAttachmentsChange,
      uploads,
      user,
    ]
  );

  return (
    <section className={`dar-report-attachments${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="dar-report-attachments__trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="dar-report-attachments__title">
          Report File Attachments
        </span>
        <span className="dar-report-attachments__summary">
          <span className="dar-report-attachments__count">{uploads.length}</span>
          <i
            className="fa fa-chevron-down dar-report-attachments__chevron"
            aria-hidden="true"
          />
        </span>
      </button>

      <div
        id={panelId}
        className="dar-report-attachments__panel"
        aria-hidden={!isOpen}
      >
        <div className="dar-report-attachments__panel-inner">
          <div className="dar-report-attachments__body">
            {!readOnly && (
              <div className="dar-report-attachments__upload">
                <FileInput
                  inputRef={fileInputRef}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="btn btn-labeled btn-primary shadow"
                  disabled={fileActionLoading}
                  onClick={handleFileUpload}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-save" aria-hidden="true" />
                  </span>
                  {fileActionLoading ? "Loading..." : "Upload"}
                </button>
              </div>
            )}

            {uploads.length === 0 ? (
              <div className="dar-report-attachments__empty">
                No Files Added Yet!
              </div>
            ) : (
              <div className="dar-report-attachments__list">
                {uploads.map((fileItem) => (
                  <div
                    className="dar-report-attachments__file"
                    key={fileItem?.id}
                  >
                    <span
                      className="dar-report-attachments__filename"
                      title={fileItem?.fileName}
                    >
                      {fileItem?.fileName}
                    </span>
                    <div className="dar-report-attachments__actions">
                      <button
                        type="button"
                        className="dar-report-attachments__action"
                        onClick={() =>
                          handleDownload({
                            base64String: fileItem?.fileData,
                            fileName: fileItem?.fileName,
                          })
                        }
                        aria-label={`Download ${fileItem?.fileName}`}
                        title="Download"
                      >
                        <i className="fa fa-download" aria-hidden="true" />
                      </button>

                      {!readOnly && (
                        <button
                          type="button"
                          className="dar-report-attachments__action is-delete"
                          disabled={fileActionLoading}
                          onClick={() => handleDelete(fileItem?.id)}
                          aria-label={`Delete ${fileItem?.fileName}`}
                          title="Delete"
                        >
                          <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FileUpload;
