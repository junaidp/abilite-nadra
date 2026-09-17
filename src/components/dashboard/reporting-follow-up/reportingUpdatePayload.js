export const REPORTING_UPDATE_SCOPE = {
  DETAILS: "REPORTING_DETAILS",
  MANAGEMENT: "MANAGEMENT_RESPONSE",
  TRANSITION: "TRANSITION_ONLY",
};

export const buildReportingDetailsUpdate = (item, stepNo = item?.stepNo) => ({
  id: item?.id,
  updateScope: REPORTING_UPDATE_SCOPE.DETAILS,
  stepNo: Number(stepNo),
  observationTitle: item?.observationTitle ?? "",
  observationName: item?.observationName ?? "",
  area: item?.area ?? "",
  implicationRating: Number(item?.implicationRating || 0),
  implication: item?.implication ?? "",
  recommendedActionStep: item?.recommendedActionStep ?? "",
  auditeeId: item?.auditee?.id ?? item?.auditeeId ?? null,
});

export const buildManagementResponseUpdate = (
  item,
  stepNo = item?.stepNo
) => ({
  id: item?.id,
  updateScope: REPORTING_UPDATE_SCOPE.MANAGEMENT,
  stepNo: Number(stepNo),
  managementComments: item?.managementComments ?? "",
  implementationDate: item?.implementationDate ?? null,
});

export const buildReportingTransition = (item, stepNo) => ({
  id: item?.id,
  updateScope: REPORTING_UPDATE_SCOPE.TRANSITION,
  stepNo: Number(stepNo),
});
