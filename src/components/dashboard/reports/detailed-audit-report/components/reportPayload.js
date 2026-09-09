export const buildDetailedAuditReportSavePayload = (reportObject = {}) => ({
  id: reportObject?.id,
  reportName: reportObject?.reportName,
  reportDate: reportObject?.reportDate,
  executiveSummary: reportObject?.executiveSummary,
  auditPurpose: reportObject?.auditPurpose,
  annexure: reportObject?.annexure,
});
