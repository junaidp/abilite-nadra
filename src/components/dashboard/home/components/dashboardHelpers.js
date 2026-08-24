export const DASHBOARD_ROLE = 'non-management';

export const getReportingItems = (job) =>
  Array.isArray(job?.reportingList) ? job.reportingList : [];

export const getNumberId = (value) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
};

export const getCurrentUserInfo = (user) => {
  const current = user?.[0] || {};
  return {
    id: getNumberId(current?.id || current?.userId?.id),
    hierarchy:
      current?.employeeid?.userHierarchy ||
      current?.userId?.employeeid?.userHierarchy ||
      '',
  };
};

export const isIAHUser = (user) => getCurrentUserInfo(user).hierarchy === 'IAH';

export const getSelectedCompanyId = (user, company) => {
  const current = user?.[0] || {};
  return (
    current?.company?.find((item) => item?.companyName === company)?.id ||
    current?.company?.[0]?.id ||
    null
  );
};

export const buildAuditEngagementMap = (auditEngagements) => {
  const map = new Map();
  (auditEngagements || []).forEach((job) => {
    const id = getNumberId(job?.id);
    if (id !== null) map.set(id, job);
  });
  return map;
};

export const buildActiveUserMap = (users) => {
  const map = new Map();
  (users || [])
    .filter((user) => Number(user?.accountStatus) === 1)
    .forEach((user) => {
      const id = getNumberId(user?.id || user?.userId);
      if (id !== null) map.set(id, user?.name || 'User ' + id);
    });
  return map;
};

export const buildLocationMap = (locations) => {
  const map = new Map();
  (locations || []).forEach((location) => {
    (location?.subLocations || []).forEach((subLocation) => {
      const id = getNumberId(subLocation?.id);
      if (id !== null) map.set(id, subLocation?.description || subLocation?.name || '');
    });
  });
  return map;
};

export const resolveLocationName = (item, locationMap) => {
  const id = getNumberId(item?.subLocation);
  return item?.subLocationName || locationMap.get(id) || 'Previous Observation Location';
};

export const isPreviousObservationJob = (job, auditEngagementMap) => {
  const auditEngagementId = getNumberId(job?.auditEngagement);
  return !auditEngagementMap.has(auditEngagementId) && getReportingItems(job).some((item) => item?.auditee || item?.auditeeId);
};

export const getResourceAllocationForJob = (job, auditEngagementMap) => {
  const auditEngagementId = getNumberId(job?.auditEngagement);
  const auditEngagement = auditEngagementMap.get(auditEngagementId);
  return auditEngagement?.resourceAllocation || job?.resourceAllocation || null;
};

const pushNumberId = (ids, value) => {
  const id = getNumberId(value?.id ?? value);
  if (id !== null) ids.push(id);
};

export const getReviewerIds = (resourceAllocation) => {
  const ids = [];
  pushNumberId(ids, resourceAllocation?.backupHeadOfInternalAudit);
  pushNumberId(ids, resourceAllocation?.proposedJobApprover);
  pushNumberId(ids, resourceAllocation?.backupHeadOfInternalAuditId);
  pushNumberId(ids, resourceAllocation?.proposedJobApproverId);
  return ids;
};

export const getAllocationUserIds = (resourceAllocation) => {
  const ids = [];
  pushNumberId(ids, resourceAllocation?.headOfInternalAudit);
  pushNumberId(ids, resourceAllocation?.backupHeadOfInternalAudit);
  pushNumberId(ids, resourceAllocation?.proposedJobApprover);
  pushNumberId(ids, resourceAllocation?.headOfInternalAuditId);
  pushNumberId(ids, resourceAllocation?.backupHeadOfInternalAuditId);
  pushNumberId(ids, resourceAllocation?.proposedJobApproverId);
  return ids;
};

export const getResourceIds = (resourceAllocation) => {
  const ids = [];
  (resourceAllocation?.resourcesList || []).forEach((item) => pushNumberId(ids, item));
  (resourceAllocation?.resourceIds || []).forEach((item) => pushNumberId(ids, item));
  return ids;
};

export const isResourceReviewer = (resourceAllocation, userInfo) =>
  userInfo?.hierarchy === 'IAH' || getReviewerIds(resourceAllocation).includes(userInfo?.id);

export const isResourceUser = (resourceAllocation, userInfo) =>
  isResourceReviewer(resourceAllocation, userInfo) ||
  getAllocationUserIds(resourceAllocation).includes(userInfo?.id) ||
  getResourceIds(resourceAllocation).includes(userInfo?.id);

export const isReportingJobCompleteForKpi = (job) => {
  const items = getReportingItems(job);
  return items.length > 0 && items.every((item) => Number(item?.stepNo) >= 5);
};

export const calculateKpis = (dashboardReporting, auditEngagements) => {
  const auditEngagementMap = buildAuditEngagementMap(auditEngagements);
  const reportingByAuditEngagementId = new Map();
  const previousJobs = [];

  (dashboardReporting || []).forEach((job) => {
    const auditEngagementId = getNumberId(job?.auditEngagement);
    if (isPreviousObservationJob(job, auditEngagementMap)) {
      previousJobs.push(job);
      return;
    }
    if (auditEngagementId === null || !auditEngagementMap.has(auditEngagementId)) return;
    const list = reportingByAuditEngagementId.get(auditEngagementId) || [];
    reportingByAuditEngagementId.set(auditEngagementId, [...list, job]);
  });

  let jobsInProgress = 0;
  let completedJobs = 0;

  (auditEngagements || []).forEach((job) => {
    const reportingJobs = reportingByAuditEngagementId.get(getNumberId(job?.id)) || [];
    if (reportingJobs.length > 0 && reportingJobs.every(isReportingJobCompleteForKpi)) {
      completedJobs += 1;
    } else {
      jobsInProgress += 1;
    }
  });

  previousJobs.forEach((job) => {
    if (isReportingJobCompleteForKpi(job)) completedJobs += 1;
    else jobsInProgress += 1;
  });

  let followUpObservations = 0;
  let implementedObservations = 0;
  (dashboardReporting || []).forEach((job) => {
    getReportingItems(job).forEach((item) => {
      if (Number(item?.stepNo) < 5) return;
      followUpObservations += 1;
      if (Number(item?.stepNo) >= 7) implementedObservations += 1;
    });
  });

  return {
    totalJobs: jobsInProgress + completedJobs,
    jobsInProgress,
    completedJobs,
    exceptionPercentage: followUpObservations
      ? Math.round((implementedObservations / followUpObservations) * 100)
      : 0,
  };
};

export const buildReportingApprovalRows = ({ dashboardReporting, auditEngagements, userInfo, locationMap }) => {
  const auditEngagementMap = buildAuditEngagementMap(auditEngagements);
  const rows = [];
  (dashboardReporting || []).forEach((job) => {
    const resourceAllocation = getResourceAllocationForJob(job, auditEngagementMap);
    getReportingItems(job).forEach((item) => {
      const stepNo = Number(item?.stepNo);
      let actionLabel = null;
      if (stepNo === 0 && isResourceUser(resourceAllocation, userInfo)) actionLabel = 'Submit';
      if ((stepNo === 1 || stepNo === 3) && isResourceReviewer(resourceAllocation, userInfo)) actionLabel = 'Approve';
      if (!actionLabel) return;
      rows.push({
        id: 'reporting-' + job?.id + '-' + item?.id + '-' + stepNo,
        reportingId: job?.id,
        jobName: job?.title || '-',
        observationName: item?.observationTitle || '-',
        locationName: resolveLocationName(item, locationMap),
        actionLabel,
        route: '/audit/reporting-particulars',
      });
    });
  });
  return rows;
};

export const buildFollowUpApprovalRows = ({ dashboardReporting, auditEngagements, userInfo, locationMap }) => {
  const auditEngagementMap = buildAuditEngagementMap(auditEngagements);
  const rows = [];
  (dashboardReporting || []).forEach((job) => {
    const resourceAllocation = getResourceAllocationForJob(job, auditEngagementMap);
    if (!isResourceReviewer(resourceAllocation, userInfo)) return;
    getReportingItems(job).forEach((item) => {
      if (Number(item?.stepNo) !== 6) return;
      rows.push({
        id: 'follow-up-' + job?.id + '-' + item?.id,
        reportingId: job?.id,
        jobName: job?.title || '-',
        observationName: item?.observationTitle || '-',
        locationName: resolveLocationName(item, locationMap),
        actionLabel: 'Approve',
        route: '/audit/follow-up-particulars',
      });
    });
  });
  return rows;
};

export const getDueDate = (item) => item?.followUp?.nextImplementationDate || item?.implementationDate;

export const classifyImplementationStatus = (item, today = new Date()) => {
  if (Number(item?.stepNo) >= 7) return 'Implemented';
  const dueDate = getDueDate(item);
  if (!dueDate) return 'Within Target Timeline';
  const date = new Date(dueDate);
  if (Number.isNaN(date.getTime())) return 'Within Target Timeline';
  date.setHours(0, 0, 0, 0);
  const startToday = new Date(today);
  startToday.setHours(0, 0, 0, 0);
  return date < startToday ? 'Overdue' : 'Within Target Timeline';
};

export const getRatingName = (rating) => {
  if (Number(rating) === 1) return 'High';
  if (Number(rating) === 2) return 'Medium';
  if (Number(rating) === 3) return 'Low';
  return null;
};

export const getObservationAuditeeId = (item) => getNumberId(item?.auditee?.id || item?.auditee?.userId || item?.auditeeId);

export const buildObservationRows = (dashboardReporting, users, locations) => {
  const userMap = buildActiveUserMap(users);
  const locationMap = buildLocationMap(locations);
  const rows = [];
  (dashboardReporting || []).forEach((job) => {
    getReportingItems(job).forEach((item) => {
      if (Number(item?.stepNo) < 5) return;
      const auditeeId = getObservationAuditeeId(item);
      rows.push({
        id: item?.id,
        jobId: job?.id,
        jobName: job?.title || '-',
        observationName: item?.observationTitle || '-',
        locationId: getNumberId(item?.subLocation),
        locationName: resolveLocationName(item, locationMap),
        auditeeId,
        auditeeName: userMap.get(auditeeId) || '',
        rating: getRatingName(item?.implicationRating),
        status: classifyImplementationStatus(item),
        stepNo: Number(item?.stepNo),
      });
    });
  });
  return rows;
};

export const summarizeImplementation = (rows) => {
  const labels = ['Implemented', 'Overdue', 'Within Target Timeline'];
  const total = rows.length;
  return labels.map((name) => {
    const count = rows.filter((item) => item.status === name).length;
    return {
      name,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    };
  });
};

export const summarizeRatings = (rows) => {
  const labels = ['High', 'Medium', 'Low'];
  const ratedRows = rows.filter((item) => labels.includes(item.rating));
  const total = ratedRows.length;
  return labels.map((name) => {
    const count = ratedRows.filter((item) => item.rating === name).length;
    return {
      name,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    };
  });
};

export const uniqueFilterOptions = (rows, field, labelField) => {
  const map = new Map();
  rows.forEach((item) => {
    const value = item?.[field];
    const label = item?.[labelField];
    if (value !== null && value !== undefined && label) map.set(value, label);
  });
  return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
};



