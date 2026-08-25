import React from "react";
import FollowUp from "./components/FollowUp";
import Reporting from "./components/Reporting";
import InformationRequest from "./components/InformationRequest";
import UserInfo from "./components/UserInfo";
import TFA from "./components/TFA";
import SupportingDocs from "./components/SupportingDocs";
import ManagementDashboard from "./components/dashboard/ManagementDashboard";
import { useDispatch } from "react-redux";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";
import { useSearchParams } from "react-router-dom";

const dashboardTabs = [
  "dashboard",
  "doc",
  "reporting",
  "followUp",
  "user",
  "tfa",
  "information-request",
];

const getValidDashboardTab = (tab) =>
  dashboardTabs.includes(tab) ? tab : "dashboard";

const ManagementAuditeeView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = React.useState(() =>
    getValidDashboardTab(searchParams.get("tab"))
  );
  const dispatch = useDispatch();

  const handleChangeTab = React.useCallback(
    (nextTab) => {
      setTab(nextTab);
      setSearchParams(nextTab === "dashboard" ? {} : { tab: nextTab }, {
        replace: true,
      });
    },
    [setSearchParams]
  );

  React.useEffect(() => {
    const nextTab = getValidDashboardTab(searchParams.get("tab"));
    setTab((prev) => (prev === nextTab ? prev : nextTab));
  }, [searchParams]);

  React.useEffect(() => {
    dispatch(resetAuthValues());
  }, []);

  return (
    <div>
      <div className="card p-3 shadow-sm setting-tab min-h-80">
        <h2 className="text-center heading p-3">
          Management Auditee Dashboard
        </h2>

        <div className="d-flex overflow-x-auto">
          <div className="col-lg-2 min-h-60">
            <nav className="mt-4 pb-10">
              <div
                className="nav d-grid nav-tabs glass-effect border-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`nav-link ${tab === "dashboard" ? "active" : ""
                    }  border-0 shadow-sm mb-3  rounded-0 me-3 `}
                  id="nav-management-dashboard-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-management-dashboard"
                  type="button"
                  role="tab"
                  aria-controls="nav-management-dashboard"
                  onClick={() => handleChangeTab("dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className={`nav-link ${tab === "doc" ? "active" : ""
                    }  border-0 shadow-sm mb-3  rounded-0 me-3 `}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  onClick={() => handleChangeTab("doc")}
                >
                  Supporting Docs
                </button>
                <button
                  className={`nav-link ${tab === "reporting" ? "active" : ""
                    } shadow-sm  border-0 mb-3  rounded-0 me-3 `}
                  id="nav-reporting-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-reporting"
                  type="button"
                  role="tab"
                  aria-controls="nav-reporting"
                  onClick={() => handleChangeTab("reporting")}
                >
                  Reporting
                </button>
                <button
                  className={`nav-link ${tab === "followUp" ? "active" : ""
                    } shadow-sm  border-0 mb-3  rounded-0 me-3 `}
                  id="nav-follow-up-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-follow-up"
                  type="button"
                  role="tab"
                  aria-controls="nav-follow-up"
                  onClick={() => handleChangeTab("followUp")}
                >
                  Follow Up
                </button>
                <button
                  className={`nav-link ${tab === "user" ? "active" : ""
                    } shadow-sm  border-0 mb-3  rounded-0 me-3 `}
                  id="nav-task-management-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-user"
                  type="button"
                  role="tab"
                  aria-controls="nav-user"
                  onClick={() => handleChangeTab("user")}
                >
                  User Details
                </button>
                <button
                  className={`nav-link ${tab === "tfa" ? "active" : ""
                    } shadow-sm  border-0 mb-3  rounded-0 me-3 `}
                  id="nav-tfa-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-tfa"
                  type="button"
                  role="tab"
                  aria-controls="nav-tfa"
                  onClick={() => handleChangeTab("tfa")}
                >
                  Two Factor Authentication
                </button>
                <button
                  className={`nav-link ${tab === "information-request" ? "active" : ""
                    } shadow-sm  border-0 mb-3  rounded-0 me-3 `}
                  id="nav-info-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-info"
                  type="button"
                  role="tab"
                  aria-controls="nav-info"
                  onClick={() => handleChangeTab("information-request")}
                >
                  Information Request
                </button>
              </div>
            </nav>
          </div>

          <div className="col-lg-10 min-w-500">
            <div
              className="tab-content p-3 mt-4 border bg-light"
              id="nav-tabContent"
            >
              <ManagementDashboard tab={tab} />
              <SupportingDocs tab={tab} />
              <Reporting tab={tab} />
              <FollowUp tab={tab} />
              <UserInfo tab={tab} />
              <TFA tab={tab} />
              <InformationRequest tab={tab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementAuditeeView;
