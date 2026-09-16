export const buildSummarizedReportSavePayload = (reportObject = {}) => ({
    id: reportObject?.id,
    reportName: reportObject?.reportName,
    reportDate: reportObject?.reportDate,
    overView: reportObject?.overView,
    executiveSummary: reportObject?.executiveSummary,
    auditPurpose: reportObject?.auditPurpose,
    previousAuditFollowUp: reportObject?.previousAuditFollowUp,
    operationalHighlight: reportObject?.operationalHighlight,
    annexure: reportObject?.annexure,
    consolidationItemsList: (reportObject?.consolidationItemsList || []).map((item) => ({
        id: item?.id,
        consolidatedObservations: (item?.consolidatedObservations || []).map(
            (observation) => ({
                id: observation?.id,
                summaryOfKeyFinding: observation?.summaryOfKeyFinding,
            })
        ),
    })),
});