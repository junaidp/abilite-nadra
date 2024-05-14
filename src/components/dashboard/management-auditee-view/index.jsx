import React from "react";
import FollowUp from "./components/FollowUp";
import Reporting from "./components/Reporting";
import InformationRequest from "./components/InformationRequest";
import TaskManagement from "./components/TaskManagement";
import UserInfo from "./components/UserInfo";
import TFA from "./components/TFA";
import SupportingDocs from "./components/SupportingDocs";
import { useDispatch } from "react-redux";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";

const ManagementAuditeeView = () => {
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
                >
                  Follow Up
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-information-request-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-information-request"
                  type="button"
                  role="tab"
                  aria-controls="nav-information-request"
                >
                  Information Request
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-task-management-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-task-management"
                  type="button"
                  role="tab"
                  aria-controls="nav-task-management"
                >
                  Task Management
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-task-management-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-user"
                  type="button"
                  role="tab"
                  aria-controls="nav-user"
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
              <SupportingDocs />
              <FollowUp />
              <Reporting />
              <InformationRequest />
              <TaskManagement />
              <UserInfo />
              <TFA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementAuditeeView;
