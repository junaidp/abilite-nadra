# Dashboard Home

This dashboard replaces the older `/audit/dashboard` body with the lightweight dashboard flow.

## Scope

Only frontend dashboard code lives here. Backend APIs, schemas, and existing audit pages are not changed from this dashboard work.

## API Flow

Initial dashboard load runs sequentially for smoother load control:

1. `GET /reportingAndFollowUp/reporting/by-role-year?year={year}&role=non-management`
2. `GET /auditEngagement/dashboard/getAll?companyId={companyId}&year={year}&userId={userId}`
3. `GET /account/user/getAllUsersLight?companyId={companyId}`
4. `GET /configurations/location/getall?companyId={companyId}`
5. IAH only: `GET /auditPlanningAndScheduling/auditPlanSummary/getAllForDashboard?companyId={companyId}&year={year}`

Report approvals are lazy-loaded only when the `Report Approvals` tab is opened:

- `GET /internalauditreport/report/getAllForDashboard?companyId={companyId}&Year={year}`
- `GET /consolidatedReports/report/getAllForDashboard?companyId={companyId}&Year={year}`
- `GET /summarizedReport/report/getAllForDashboard?companyId={companyId}&Year={year}`

Overall Status is lazy-loaded only when the button is clicked:

- `GET /reportingAndFollowUp/reporting/completed-by-role?role=non-management`

## Component Map

- `index.jsx`: page orchestration and initial API loading.
- `DashboardKpiCards.jsx`: top summary widgets.
- `DashboardTableSection.jsx`: main Approvals / Jobs Status tabs.
- `AuditPlanAndJobStatus.jsx`: audit plan summary approvals and job status table.
- `AuditEngagementApprovals.jsx`: audit engagement approvals table.
- `ReportingFollowUpApprovals.jsx`: reporting and follow-up approval tables.
- `ReportApprovals.jsx`: internal, detailed/consolidated, and summarized report approvals.
- `ObservationImplementationTrend.jsx`: trend chart and filters.
- `ObservationRatingBreakdown.jsx`: rating chart and observation lists.
- `OverallStatusModal.jsx`: all-year open/closed status modal.
- `dashboardHelpers.js`: shared DTO adapters and business calculations.
- `Skeletons.jsx`: loading placeholders.

## Reporting Rules Used

- Reporting approvals: step `0` for submit, steps `1` and `3` for approve.
- Follow-up approvals: step `6` for approve.
- Follow-up/completed observations start at `stepNo >= 5`.
- Implemented observations use `stepNo >= 7`.
- Disabled users are hidden from Auditee filters by checking `accountStatus === 1`.
