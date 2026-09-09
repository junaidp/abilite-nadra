import React, { useMemo, useState } from "react";
import { handleDownload } from "../../../../../../../config/helper";
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

  const attachments = useMemo(() => {
    const source =
      suppliedAttachments ??
      item?.checklistObservations?.observationsDataAttachmentsList ??
      [];

    return source.filter(
      (attachment) => attachment?.id && attachment?.fileName
    );
  }, [
    item?.checklistObservations?.observationsDataAttachmentsList,
    suppliedAttachments,
  ]);

  const isManagementAuditee =
    user?.[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee";
  const panelId = `${groupName}-attachments-${item?.id}`;

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
                  onClick={() =>
                    handleDownload({
                      base64String: attachment.fileData,
                      fileName: attachment.fileName,
                    })
                  }
                  aria-label={`Download ${attachment.fileName}`}
                  title="Download"
                >
                  <i className="fa fa-download" aria-hidden="true" />
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
