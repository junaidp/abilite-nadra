import { getNavigation, getData } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  faGauge,
  faFile,
  faHourglassStart,
  faArrowsToEye,
  faBriefcase,
  faFolderOpen,
  faListCheck,
  faFolderTree,
  faFilePen,
  faFileCircleQuestion,
  faLayerGroup,
  faFileZipper,
  faFileContract,
  faFileSignature,
  faGear,
  faChartBar,
  faChartSimple,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
let menuItems = [
  {
    id: "li-dashboard",
    label: "Dashboard",
    icon: faGauge,
    route: "/audit/dashboard",
    active: true,
  },
  {
    id: "li-audit",
    label: "Audit Planning & Scheduling",
    icon: faFile,
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-business-objective",
        label: "Audit Universe",
        icon: faHourglassStart,
        route: "/audit/business-objective",
        active: false,
      },
      {
        id: "li-risk-assessments",
        label: "Risk Assessments",
        icon: faArrowsToEye,
        route: "/audit/risk-assessment",
        active: false,
      },
      {
        id: "li-auditable",
        label: "Audit Jobs",
        icon: faBriefcase,
        route: "/audit/auditable-unit",
        active: false,
      },
      {
        id: "li-prioritization",
        label: "Job Prioritization",
        icon: faFolderOpen,
        route: "/audit/prioritization-and-finalization",
        active: false,
      },
      {
        id: "li-job-scheduling",
        label: "Job Scheduling",
        icon: faListCheck,
        route: "/audit/job-scheduling",
        active: false,
      },
      {
        id: "li-audit-plan-summary",
        label: "Audit Plan Summary",
        icon: faFolderTree,
        route: "/audit/audit-plan-summary",
        active: false,
      },
    ],
  },
  {
    id: "li-audit-engagement",
    label: "Audit Engagement",
    icon: faHourglassStart,
    route: "/audit/audit-engagement",
    active: false,
  },
  {
    id: "li-reporting-and-followup",
    label: "Reporting & Followup",
    icon: faFolderOpen,
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-reporting",
        label: "Reporting",
        icon: faFilePen,
        route: "/audit/reportings",
        active: false,
      },
      {
        id: "li-followup",
        label: "Follow Up",
        icon: faFileCircleQuestion,
        route: "/audit/follow-up",
        active: false,
      },
    ],
  },
  {
    id: "li-reports",
    label: "Reports",
    icon: faLayerGroup,
    active: false,
    open: false,
    subMenu: [
      {
        id: "li-consolidation-report",
        label: "Detailed Audit Report",
        icon: faFileZipper,
        route: "/audit/internal-audit-consolidation-report",
        active: false,
      },
      {
        id: "li-internal-audit-report",
        label: "Internal Audit Report",
        icon: faFileSignature,
        route: "/audit/internal-audit-report",
        active: false,
      },
      {
        id: "li-summarized-report",
        label: "Summarized Report",
        icon: faFileSignature,
        route: "/audit/summarized-report",
        active: false,
      },
      {
        id: "li-internal-audit-planing-report",
        label: "Planning Report",
        icon: faFileContract,
        route: "/audit/planning-report",
        active: false,
      },
      {
        id: "li-audit-exception-report",
        label: "Audit Exception Report",
        icon: faFileContract,
        route: "/audit/audit-exception-report",
        active: false,
      },
      {
        id: "li-job-time-allocation-report",
        label: "Job Time Allocation Report",
        icon: faFileContract,
        route: "/audit/job-time-allocation-report",
        active: false,
      },
      {
        id: "li-audit-plan-summary-report",
        label: "Audit Plan Summary Report",
        icon: faFileContract,
        route: "/audit/audit-planning-summary-report",
        active: false,
      },
    ],
  },
  {
    id: "li-ai",
    label: "Settings",
    icon: faGear,
    route: "/audit/audit-settings",
    active: false,
  },
  {
    id: "li-audit-tasks-management",
    label: "Tasks Management",
    icon: faChartBar,
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
  // API STATES
  loading: false,
  navigationInfo: {},
  dataInfo: {},
};

export const setupGetNavigation = createAsyncThunk(
  "common/getNavigation",
  async (data, thunkAPI) => {
    return getNavigation(data, thunkAPI);
  }
);
export const setupGetData = createAsyncThunk(
  "common/getData",
  async (data, thunkAPI) => {
    return getData(data, thunkAPI);
  }
);

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
          return all?.id === "li-audit" ? { ...all, open: !all?.open } : { ...all, open: false };
        });
      }
      if (action.payload === "li-reports") {
        state.menuItems = state.menuItems.map((all) => {
          return all?.id === "li-reports" ? { ...all, open: !all?.open } : { ...all, open: false };
        });
      }
      if (action.payload === "li-reporting-and-followup") {
        state.menuItems = state.menuItems.map((all) => {
          return all?.id === "li-reporting-and-followup"
            ? { ...all, open: !all?.open }
            : { ...all, open: false };
        });
      }
    },
  },
  extraReducers: (builder) => {
    // Get the navigation Info
    builder
      .addCase(setupGetNavigation.pending, (state) => {
        // state.loading = true;
      })
      .addCase(setupGetNavigation.fulfilled, (state, { payload }) => {
        // state.loading = false;
        state.navigationInfo = payload?.data || [];
      })
      .addCase(setupGetNavigation.rejected, (state, { payload }) => {
        // state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get the data Info
    builder
      .addCase(setupGetData.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dataInfo = payload?.data || [];
      })
      .addCase(setupGetData.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload?.response?.data?.message) {
          toast.error(payload?.response?.data?.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {
  changeShowSidebar,
  changeActiveLink,
  showBusinessObjectiveDialog,
  changeExpanded,
  changeKickOffRequest,
  changeCompany,
  changeYear,
  changeCommonRichTextFieldState,
  InitialLoadSidebarActiveLink,
} = slice.actions;

export default slice.reducer;
