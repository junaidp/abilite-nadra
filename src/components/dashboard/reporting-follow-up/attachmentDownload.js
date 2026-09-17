import axios from "axios";
import { baseUrl } from "../../../config/constants";
import { handleDownload } from "../../../config/helper";

const DOWNLOAD_PATHS = {
  CHECKLIST_OBSERVATION:
    "/auditEngagement/auditStep/auditStepChecklist/ObservationDataAttachments/download",
  REPORTING_ATTACHMENT:
    "/reportingAndFollowUp/reporting/reportingFileAttachments/download",
};

const saveBlob = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName || "attachment");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadReportingAttachment = async ({
  attachment,
  token,
  fallbackSource,
}) => {
  if (attachment?.fileData) {
    handleDownload({
      base64String: attachment.fileData,
      fileName: attachment.fileName,
    });
    return;
  }

  const source = attachment?.source || fallbackSource;
  const path = DOWNLOAD_PATHS[source];
  if (!path || !attachment?.id) {
    throw new Error("Attachment download information is incomplete");
  }

  const response = await axios.get(
    `${baseUrl}${path}?fileId=${Number(attachment.id)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    }
  );
  saveBlob(response.data, attachment.fileName);
};
