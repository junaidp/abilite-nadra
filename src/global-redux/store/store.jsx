import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../reducers/common/slice";
import authReducer from "../reducers/auth/slice";
import companyReducer from "../reducers/company/slice";
import settingsCheckListReducer from "../reducers/settings/check-list/slice";
import settingsCompanyReducer from "../reducers/settings/company-management/slice";
import settingsLocationReducer from "../reducers/settings/location/slice";
import settingsAddUserReducer from "../reducers/settings/user-management/slice";
import settingsProcessReducer from "../reducers/settings/process/slice";
import planingEngagementsReducers from "../reducers/planing/engagement/slice";
import planingRiskAssessmentReducer from "../reducers/planing/risk-assessment/slice";
import planingAuditableUnitReducer from "../reducers/planing/auditable-units/slice";
import planingJobPrioritizationReducer from "../reducers/planing/job-prioritization/slice";
import planingJobSchedulingReducer from "../reducers/planing/job-scheduling/slice";
export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    company: companyReducer,
    // settings
    setttingsCheckList: settingsCheckListReducer,
    setttingsLocation: settingsLocationReducer,
    setttingsProcess: settingsProcessReducer,
    setttingsUserManagement: settingsAddUserReducer,
    settingsCompanyManagement: settingsCompanyReducer,
    // planing
    planingEngagements: planingEngagementsReducers,
    planingRiskAssessments: planingRiskAssessmentReducer,
    planingAuditableUnit: planingAuditableUnitReducer,
    planingJobPrioritization: planingJobPrioritizationReducer,
    planingJobScheduling: planingJobSchedulingReducer,
  },
});
