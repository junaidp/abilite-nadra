import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setupConsolidationFileDelete,
  setupConsolidationFileUpload,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { handleDownload, validateFile } from "../../../../../config/helper";
import "./ReportFileAttachments.css";

const FileInput = React.memo(({ onChange, inputRef, accept }) => (
  <input
    type="file"
    className="f-10"
    ref={inputRef}
    onChange={onChange}
    accept={accept}
  />
));

const ActionIcons = ({
  fileItem,
  subLoading,
  user,
  onDelete,
  readOnly,
}) => (
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
        disabled={subLoading}
        onClick={() => {
          if (user?.[0]?.userId?.employeeid?.userHierarchy !== "IAH") {
            toast.error("Only the Head of Internal Audit can delete a file.");
            return;
          }
          onDelete(fileItem?.id);
        }}
        aria-label={`Delete ${fileItem?.fileName}`}
        title="Delete"
      >
        <i className="fa fa-trash" aria-hidden="true" />
      </button>
    )}
  </div>
);

const ConsolidationFileUpload = ({ item, readOnly = false }) => {
  const dispatch = useDispatch();
  const { subLoading } = useSelector(
    (state) => state?.consolidationReport
  );
  const { user } = useSelector((state) => state?.auth);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const uploads = item?.annexureUploads || [];
  const panelId = `dar-report-attachments-${item?.id || "report"}`;

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
        setupConsolidationFileUpload({ formData, id: item?.id })
      ).unwrap();

      if (response?.status) {
        clearSelectedFile();
      }
    } catch {
      // The rejected thunk displays the API error.
    }
  }, [clearSelectedFile, dispatch, item?.id, selectedFile]);

  const handleDelete = useCallback(
    (fileId) => {
      if (subLoading) return;

      dispatch(
        setupConsolidationFileDelete({
          fileId: Number(fileId),
          id: Number(item?.id),
        })
      );
    },
    [dispatch, item?.id, subLoading]
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
          <span className="dar-report-attachments__count">
            {uploads.length}
          </span>
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
                  accept=".xlsx, .xls, .pdf, .txt"
                />
                <button
                  type="button"
                  className="btn btn-labeled btn-primary shadow"
                  disabled={subLoading}
                  onClick={handleFileUpload}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-save" aria-hidden="true" />
                  </span>
                  {subLoading ? "Loading..." : "Upload"}
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
                    <ActionIcons
                      fileItem={fileItem}
                      subLoading={subLoading}
                      user={user}
                      onDelete={handleDelete}
                      readOnly={readOnly}
                    />
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

export default ConsolidationFileUpload;
