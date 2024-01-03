import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let menuItems = [
  {
    id: "li-dashboard",
    label: "Dashboard",
    icon: "fa fa-home me-1",
    route: "/audit/dashboard",
    active: true,
  },
  {
    id: "li-audit",
    label: "Audit Planning & Scheduling",
    icon: "fa fa-calendar-check me-1",
    route: "/audit/report-audit-planning-and-scheduling",
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-company-details",
        label: "Company Details",
        icon: "fa fa-bullseye pe-2",
        route: "/audit/companies",
        active: false,
      },
      {
        id: "li-business-objective",
        label: "Engagement",
        icon: "fa fa-bullseye pe-2",
        route: "/audit/business-objective",
        active: false,
      },
      {
        id: "li-risk-assessments",
        label: "Risk Assessments",
        icon: "fa fa-chart-line pe-2",
        route: "/audit/risk-assessment",
        active: false,
      },
      {
        id: "li-auditable",
        label: "Auditable Units",
        icon: "fa fa-file-alt pe-2",
        route: "/audit/auditable-unit",
        active: false,
      },
      {
        id: "li-prioritization",
        label: "Job Prioritization",
        icon: "fa fa-tasks pe-2",
        route: "/audit/prioritization-and-finalization",
        active: false,
      },
      {
        id: "li-job-scheduling",
        label: "Job Scheduling",
        icon: "fa fa-calendar-check pe-2",
        route: "/audit/job-scheduling",
        active: false,
      },
      {
        id: "li-audit-plan-summary",
        label: "Audit Plan Summary",
        icon: "fa fa-file-alt pe-2",
        route: "/audit/audit-plan-summary",
        active: false,
      },
    ],
  },
  {
    id: "li-audit-engagement",
    label: "Audit Engagement",
    icon: "bi bi-chat-dots-fill",
    route: "/audit/audit-engagement",
    active: false,
  },
  {
    id: "li-reporting-and-followup",
    label: "Reporting & Followup",
    icon: "fa fa-comments",
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-reporting",
        label: "Reporting",
        icon: "bi bi-file-earmark-code",
        route: "/audit/reportings",
        active: false,
      },
      {
        id: "li-followup",
        label: "Follow Up",
        icon: "bi bi-file-earmark-code",
        route: "/audit/follow-up",
        active: false,
      },
    ],
  },
  {
    id: "li-reports",
    label: "Reports",
    icon: "fa fa-file-alt me-1",
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-internal-audit-planing-report",
        label: "Planing Report",
        icon: "fa fa-file-code pe-2",
        route: "/audit/planning-report",
        active: false,
      },
      {
        id: "li-internal-audit-report",
        label: "Internal Audit Report",
        icon: "fa fa-file-code pe-2",
        route: "/audit/internal-audit-report",
        active: false,
      },
    ],
  },

  {
    id: "li-audit-settings",
    label: "Settings",
    icon: "fa fa-gear",
    route: "/audit/audit-settings",
    active: false,
  },
];

const initialState = {
  showSidebar: true,
  activeLink: "li-dashboard",
  businessObjectiveDialog: false,
  activeExpandId: "li-audit",
  isExpandedAuditOpen: false,
  isExpandedReportsOpen: false,
  menuItems: menuItems,
  kickOffRequest: "",
};

export const slice = createSlice({
  name: "common",
  initialState,
  reducers: {
    changeShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    changeActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
    showBusinessObjectiveDialog: (state, action) => {
      state.businessObjectiveDialog = action.payload;
    },
    changeKickOffRequest: (state, action) => {
      state.kickOffRequest = action.payload;
    },
    InitialLoadSidebarActiveLink: (state, action) => {
      state.menuItems = state.menuItems.map((item) =>
        item?.id === action.payload ? { ...item, open: true } : item
      );
    },
    changeExpanded: (state, action) => {
      state.activeExpandId = action.payload;
      if (action.payload === "li-audit") {
        state.menuItems = state.menuItems.map((all) => {
          return all?.id === "li-audit" ? { ...all, open: !all?.open } : all;
        });
      }
      if (action.payload === "li-reports") {
        state.menuItems = state.menuItems.map((all) => {
          return all?.id === "li-reports" ? { ...all, open: !all?.open } : all;
        });
      }
      if (action.payload === "li-reporting-and-followup") {
        state.menuItems = state.menuItems.map((all) => {
          return all?.id === "li-reporting-and-followup"
            ? { ...all, open: !all?.open }
            : all;
        });
      }
    },
  },
  extraReducers: {},
});

export const {
  changeShowSidebar,
  changeActiveLink,
  showBusinessObjectiveDialog,
  changeExpanded,
  changeKickOffRequest,
  InitialLoadSidebarActiveLink,
} = slice.actions;

export default slice.reducer;
