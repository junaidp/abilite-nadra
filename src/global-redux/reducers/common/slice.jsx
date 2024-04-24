import { createSlice } from "@reduxjs/toolkit";

let menuItems = [
  {
    id: "li-dashboard",
    label: "Dashboard",
    icon: "bi bi-house-gear-fill",
    route: "/audit/dashboard",
    active: true,
  },
  {
    id: "li-audit",
    label: "Audit Planning & Scheduling",
    icon: "fa fa-calendar-check me-1",
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-business-objective",
        label: "Engagement",
        icon: "bi bi-meta",
        route: "/audit/business-objective",
        active: false,
      },
      {
        id: "li-risk-assessments",
        label: "Risk Assessments",
        icon: "bi bi-code-slash",
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
    icon: "bi bi-messenger",
    route: "/audit/audit-engagement",
    active: false,
  },
  {
    id: "li-reporting-and-followup",
    label: "Reporting & Followup",
    icon: "bi bi-file-code",
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
        id: "li-consolidation-report",
        label: "Consolidation Report",
        icon: "fa fa-file-code pe-2",
        route: "/audit/internal-audit-consolidation-report",
        active: false,
      },
      {
        id: "li-internal-audit-report",
        label: "Internal Audit Report",
        icon: "fa fa-file-code pe-2",
        route: "/audit/internal-audit-report",
        active: false,
      },
      {
        id: "li-internal-audit-planing-report",
        label: "Planing Report",
        icon: "fa fa-file-code pe-2",
        route: "/audit/planning-report",
        active: false,
      },
      // {
      //   id: "li-job-time-allocation-report",
      //   label: "Job Time Allocation",
      //   icon: "fa fa-file-code pe-2",
      //   route: "/audit/job-time-allocation-report",
      //   active: false,
      // },
      // {
      //   id: "li-audit-planning-summary-report",
      //   label: "Audit Planing Summary",
      //   icon: "fa fa-file-code pe-2",
      //   route: "/audit/audit-planning-summary-report",
      //   active: false,
      // },
      // {
      //   id: "li-audit-exception-report",
      //   label: "Audit Exception",
      //   icon: "fa fa-file-code pe-2",
      //   route: "/audit/audit-exception-report",
      //   active: false,
      // },
    ],
  },

  {
    id: "li-audit-settings",
    label: "Settings",
    icon: "fa fa-gear",
    route: "/audit/audit-settings",
    active: false,
  },
  {
    id: "li-audit-information-request",
    label: "Information Request",
    icon: "fa fa-paper-plane",
    route: "/audit/information-request",
    active: false,
  },
  {
    id: "li-audit-tasks-management",
    label: "Tasks Management",
    icon: "fa fa-tasks",
    route: "/audit/task-management",
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
  company: localStorage.getItem("company") || "",
  year: localStorage.getItem("year") || "",
  allCompanies: [],
  allUsers: [],
  resetRichTextFieldState: false,
};

export const slice = createSlice({
  name: "common",
  initialState,
  reducers: {
    changeShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    changeCommonRichTextFieldState: (state, action) => {
      state.resetRichTextFieldState = action.payload;
    },
    changeCompany: (state, action) => {
      state.company = action.payload;
    },
    changeYear: (state, action) => {
      state.year = action.payload;
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
});

export const {
  changeShowSidebar,
  changeActiveLink,
  showBusinessObjectiveDialog,
  changeExpanded,
  changeKickOffRequest,
  InitialLoadSidebarActiveLink,
  changeCompany,
  changeYear,
  changeCommonRichTextFieldState,
} = slice.actions;

export default slice.reducer;
