import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { downloadReportingAttachment } from "../../../../attachmentDownload";
import "./AuditEngagementAttachments.css";

const AuditEngagementAttachments = ({
  item,
  user,
  attachments: suppliedAttachments,
  title = "Audit Engagement Attachments",
  groupName = "audit-engagement",
  hideForManagementAuditee = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  const attachments = useMemo(() => {
    const source =
      suppliedAttachments ??
      item?.auditEngagementAttachmentsList ??
      item?.checklistObservations?.observationsDataAttachmentsList ??
      [];

    return source.filter(
      (attachment) => attachment?.id && attachment?.fileName
    );
  }, [
    item?.auditEngagementAttachmentsList,
    item?.checklistObservations?.observationsDataAttachmentsList,
    suppliedAttachments,
  ]);

  const isManagementAuditee =
    user?.[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee";
  const panelId = `${groupName}-attachments-${item?.id}`;

  const handleDownload = async (attachment) => {
    if (!attachment?.id || downloadingFileId) return;

    try {
      setDownloadingFileId(attachment.id);
      await downloadReportingAttachment({
        attachment,
        token: user?.[0]?.token,
        fallbackSource:
          groupName === "reporting"
            ? "REPORTING_ATTACHMENT"
            : "CHECKLIST_OBSERVATION",
      });
    } catch {
      toast.error("Unable to download the file.");
    } finally {
      setDownloadingFileId(null);
    }
  };

  if (
    (hideForManagementAuditee && isManagementAuditee) ||
    attachments.length === 0
  ) {
    return null;
  }

  return (
    <section className={`audit-engagement-attachments${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="audit-engagement-attachments__trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="audit-engagement-attachments__title">
          {title}
        </span>

        <span className="audit-engagement-attachments__summary">
          <span className="audit-engagement-attachments__count">
            {attachments.length}
          </span>
          <i
            className="fa fa-chevron-down audit-engagement-attachments__chevron"
            aria-hidden="true"
          />
        </span>
      </button>

      <div
        id={panelId}
        className="audit-engagement-attachments__panel"
        aria-hidden={!isOpen}
      >
        <div className="audit-engagement-attachments__panel-inner">
          <div className="audit-engagement-attachments__list">
            {attachments.map((attachment) => (
              <div
                className="audit-engagement-attachments__file"
                key={attachment.id}
              >
                <span
                  className="audit-engagement-attachments__filename"
                  title={attachment.fileName}
                >
                  {attachment.fileName}
                </span>

                <button
                  type="button"
                  className="audit-engagement-attachments__download"
                  onClick={() => handleDownload(attachment)}
                  disabled={downloadingFileId !== null}
                  aria-label={`Download ${attachment.fileName}`}
                  title={
                    downloadingFileId === attachment.id
                      ? "Downloading"
                      : "Download"
                  }
                >
                  <i
                    className={`fa ${
                      downloadingFileId === attachment.id
                        ? "fa-spinner fa-spin"
                        : "fa-download"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AuditEngagementAttachments);
