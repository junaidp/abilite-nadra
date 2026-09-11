export const buildInternalAuditReportSavePayload = (reportObject = {}) => ({
  id: reportObject?.id,
  reportName: reportObject?.reportName,
  reportDate: reportObject?.reportDate,
  annexure: reportObject?.annexure,
  executiveSummary: reportObject?.executiveSummary,
  auditPurpose: reportObject?.auditPurpose,
  keyFindings: reportObject?.keyFindings,
});
