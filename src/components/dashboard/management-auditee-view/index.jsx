import React from "react";
import FollowUp from "./components/FollowUp";
import Reporting from "./components/Reporting";
import UserInfo from "./components/UserInfo";
import TFA from "./components/TFA";
import SupportingDocs from "./components/SupportingDocs";
import { useDispatch } from "react-redux";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";

const ManagementAuditeeView = () => {
  const [tab, setTab] = React.useState("doc");
  const dispatch = useDispatch();
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
                  className="nav-link active  border-0 shadow-sm mb-3  rounded-0 me-3 "
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  onClick={() => setTab("doc")}
                >
                  Supporting Docs
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-reporting-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-reporting"
                  type="button"
                  role="tab"
                  aria-controls="nav-reporting"
                  onClick={() => setTab("reporting")}
                >
                  Reporting
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-follow-up-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-follow-up"
                  type="button"
                  role="tab"
                  aria-controls="nav-follow-up"
                  onClick={() => setTab("followUp")}
                >
                  Follow Up
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-task-management-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-user"
                  type="button"
                  role="tab"
                  aria-controls="nav-user"
                  onClick={() => setTab("user")}
                >
                  User Details
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-tfa-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-tfa"
                  type="button"
                  role="tab"
                  aria-controls="nav-tfa"
                  onClick={() => setTab("tfa")}
                >
                  Two Factor Authentication
                </button>
              </div>
            </nav>
          </div>

          <div className="col-lg-10 min-w-500">
            <div
              className="tab-content p-3 mt-4 border bg-light"
              id="nav-tabContent"
            >
              <SupportingDocs tab={tab} />
              <Reporting tab={tab} />
              <FollowUp tab={tab} />
              <UserInfo tab={tab} />
              <TFA tab={tab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementAuditeeView;
