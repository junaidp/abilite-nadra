import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../reducers/common/slice";
import authReducer from "../reducers/auth/slice";
import companyReducer from "../reducers/company/slice";
import settingsCheckListReducer from "../reducers/settings/check-list/slice";
import settingsLocationReducer from "../reducers/settings/location/slice";
import planingEngagementsReducers from "../reducers/planing/engagement/slice";
import planingRiskAssessmentReducer from "../reducers/planing/risk-assessment/slice";
export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    company: companyReducer,
    // settings
    setttingsCheckList: settingsCheckListReducer,
    setttingsLocation: settingsLocationReducer,
    // planing
    planingEngagements: planingEngagementsReducers,
    planingRiskAssessments: planingRiskAssessmentReducer,
  },
});
