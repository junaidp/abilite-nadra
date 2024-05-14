import React from "react";
import { setupGetAllCheckLists } from "../../../global-redux/reducers/settings/check-list/slice";
import { setupGetAllCompanies } from "../../../global-redux/reducers/settings/company-management/slice";
import { setupGetAllLocations } from "../../../global-redux/reducers/settings/location/slice";
import { setupGetAllProcess } from "../../../global-redux/reducers/settings/process/slice";
import { setupGetAllUsers } from "../../../global-redux/reducers/settings/user-management/slice";
import { setupGetAllCPList } from "../../../global-redux/reducers/settings/cp-list/slice";
import { setupGetAllRiskFactors } from "../../../global-redux/reducers/settings/risk-factor/slice";
import AddCheckListManagementDialog from "../../modals/add-checklist-management-dialog/index";
import { setupGetAllFiles } from "../../../global-redux/reducers/settings/supporting-docs/slice";
import { handleReset } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
import UserManagementDialog from "../../modals/add-user-dialog/index";
import UpdateCompanyDialog from "../../modals/update-company-dialog";
import UpdateUserDialog from "../.././modals/update-user-dialog";
import TFA from "./components/tfa/index.jsx";
import {
  resetAuthValues,
  setupGenerateQRCode,
} from "../../../global-redux/reducers/auth/slice";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import AddCompanyDialog from "../../modals/add-company-dialog/index";
import CheckList from "./components/checklist";
import CPList from "./components/cp-list/index";
import SupportingDocs from "./components/supporting-docs/index";
import InformationRequest from "./components/information-request";
import TaskManagement from "./components/task-management";
import UserInfo from "./components/user-info/UserInfo.jsx";
// import ApprovalManagement from "./components/approval-management/index";
import Location from "./components/location";
import Company from "./components/company";
// import { toast } from "react-toastify";
import RiskFactor from "./components/risk-factor";
// import EmailManagement from "./components/email";
// import ResidualRisk from "./components/residual-risk";
// import Notifications from "./components/notification";
import UserManagement from "./components/user";
// import Modules from "./components/modules";
import RCMLibrary from "./components/rcm-library";
import Process from "./components/process";
const AuditSettings = () => {
  const dispatch = useDispatch();
  // const [activeEmailTab, setActiveEmailTab] = React.useState("systemEmail");
  const [checkListManagementDialog, setCheckListManagementDialog] =
    React.useState(false);
  const [currentSettingOption, setCurrentSettingOption] =
    React.useState("docs");
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const [userManagementDialog, setUserManagementDialog] = React.useState(false);
  const [updateUserDialog, setUpdateUserDialog] = React.useState(false);
  const [addCompanyDialog, setAddCompantDialog] = React.useState(false);
  const [currentCompanyId, setCurrentCompanyId] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [userHierarchy, setUserHierarchy] = React.useState("");
  const [showUpdateCompanyDialog, setShowUpdateCompanyDialog] =
    React.useState("");
  const [updateUserObject, setUpdateUserObject] = React.useState({});

  // Calls
  React.useEffect(() => {
    let email = user[0]?.email;
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (email && companyId) {
      if (currentSettingOption === "checklist") {
        dispatch(
          setupGetAllCheckLists(`?userEmailId=${email}&companyId=${companyId}`)
        );
      }
      if (
        currentSettingOption === "company" ||
        currentSettingOption === "approval-management"
      ) {
        dispatch(setupGetAllCompanies());
      }
      if (currentSettingOption === "location") {
        dispatch(setupGetAllLocations(`?companyId=${companyId}`));
      }
      if (currentSettingOption === "cp-list") {
        dispatch(setupGetAllCPList(companyId));
      }
      if (currentSettingOption === "docs") {
        dispatch(setupGetAllFiles(`?companyId=${companyId}`));
      }
      if (currentSettingOption === "risk-factor") {
        dispatch(setupGetAllRiskFactors(`?company_id=${companyId}`));
      }
      if (
        currentSettingOption === "process" ||
        currentSettingOption === "rcm-library"
      ) {
        dispatch(setupGetAllProcess(companyId));
      }
      if (currentSettingOption === "users") {
        dispatch(setupGetAllUsers({ shareWith: true }));
      }
      if (currentSettingOption === "tfa") {
        dispatch(setupGenerateQRCode());
      }
    }
  }, [currentSettingOption, user, company]);

  React.useEffect(() => {
    if (user[0]?.token) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      setUserHierarchy(user[0]?.userId?.employeeid?.userHierarchy);
      setUserRole(user[0]?.userId?.authorities[0]);
      dispatch(setupGetAllFiles(`?companyId=${companyId}`));
    }
    return () => {
      dispatch(handleReset());
    };
  }, [user]);

  React.useEffect(() => {
    dispatch(resetAuthValues());
  }, []);
  return (
    <div>
      {checkListManagementDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <AddCheckListManagementDialog
              setCheckListManagementDialog={setCheckListManagementDialog}
            />
          </div>
        </div>
      )}
      {userManagementDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <UserManagementDialog
              setUserManagementDialog={setUserManagementDialog}
            />
          </div>
        </div>
      )}
      {addCompanyDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <AddCompanyDialog setAddCompantDialog={setAddCompantDialog} />
          </div>
        </div>
      )}
      {showUpdateCompanyDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <UpdateCompanyDialog
              setShowUpdateCompanyDialog={setShowUpdateCompanyDialog}
              currentCompanyId={currentCompanyId}
            />
          </div>
        </div>
      )}
      {updateUserDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <UpdateUserDialog
              setUpdateUserDialog={setUpdateUserDialog}
              updateUserObject={updateUserObject}
            />
          </div>
        </div>
      )}
      <div className="card p-3 shadow-sm setting-tab">
        <h2 className="text-center heading p-3 h-100">Settings</h2>

        <div className="d-flex overflow-x-auto">
          <div className="col-lg-2">
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
                  onClick={() => setCurrentSettingOption("docs")}
                >
                  Supporting Doc
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0  me-3 "
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  onClick={() => setCurrentSettingOption("location")}
                >
                  Location
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0  me-3 "
                  id="cp-list-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#cp-list"
                  type="button"
                  role="tab"
                  aria-controls="cp-list"
                  onClick={() => setCurrentSettingOption("cp-list")}
                >
                  Residual Risk
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0  me-3 "
                  id="nav-rcm-library-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-rcm-library"
                  type="button"
                  role="tab"
                  aria-controls="nav-rcm-library"
                  onClick={() => setCurrentSettingOption("rcm-library")}
                >
                  RCM Library
                </button>
                <button
                  className="nav-link shadow-sm border-0 mb-3  rounded-0 me-3 "
                  id="nav-risk-factor-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-risk-factor"
                  type="button"
                  role="tab"
                  aria-controls="nav-risk-factor"
                  onClick={() => setCurrentSettingOption("risk-factor")}
                >
                  Risk Factor
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-check-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-check"
                  type="button"
                  role="tab"
                  aria-controls="nav-check"
                  onClick={() => setCurrentSettingOption("checklist")}
                >
                  Checklist Management
                </button>
                {userRole === "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-user-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-user"
                    type="button"
                    role="tab"
                    aria-controls="nav-user"
                    onClick={() => setCurrentSettingOption("users")}
                  >
                    User Management
                  </button>
                )}

                {userRole !== "ADMIN" && userRole !== "USER" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-com-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-com"
                    type="button"
                    role="tab"
                    aria-controls="nav-com"
                    onClick={() => setCurrentSettingOption("company")}
                  >
                    Company Management
                  </button>
                )}
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-com-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-process"
                  type="button"
                  role="tab"
                  aria-controls="nav-com"
                  onClick={() => setCurrentSettingOption("process")}
                >
                  Process
                </button>

                {/* For Admins Only */}
                {userRole === "ADMIN" && (
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
                )}
                {userRole === "ADMIN" && (
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
                )}
                {userRole === "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-user-info-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-user-info"
                    type="button"
                    role="tab"
                    aria-controls="nav-user-info"
                  >
                    User Details
                  </button>
                )}
                {userRole !== "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-tfa-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-tfa"
                    type="button"
                    role="tab"
                    aria-controls="nav-tfa"
                    onClick={() => setCurrentSettingOption("tfa")}
                  >
                    Two Factor Authentication
                  </button>
                )}
              </div>
            </nav>
          </div>

          <div className="col-lg-10 min-h-120 min-w-500">
            <div
              className="tab-content p-3 mt-4 border bg-light"
              id="nav-tabContent"
            >
              <SupportingDocs
                userHierarchy={userHierarchy}
                userRole={userRole}
              />
              {/* <ApprovalManagement /> */}
              <Location userHierarchy={userHierarchy} userRole={userRole} />

              <CPList userHierarchy={userHierarchy} userRole={userRole} />

              {/* <ResidualRisk /> */}
              <RCMLibrary userHierarchy={userHierarchy} userRole={userRole} />

              <RiskFactor userHierarchy={userHierarchy} userRole={userRole} />
              {/* <EmailManagement
                activeEmailTab={activeEmailTab}
                setActiveEmailTab={setActiveEmailTab}
              /> */}

              <CheckList
                setCheckListManagementDialog={setCheckListManagementDialog}
                userHierarchy={userHierarchy}
                userRole={userRole}
              />

              {/* <Notifications />  */}
              {userRole === "ADMIN" && (
                <UserManagement
                  setUserManagementDialog={setUserManagementDialog}
                  setUpdateUserDialog={setUpdateUserDialog}
                  setUpdateUserObject={setUpdateUserObject}
                />
              )}

              {/* <Modules /> */}
              {userRole !== "ADMIN" && userRole !== "USER" && (
                <Company
                  setAddCompantDialog={setAddCompantDialog}
                  setCurrentCompanyId={setCurrentCompanyId}
                  setShowUpdateCompanyDialog={setShowUpdateCompanyDialog}
                />
              )}

              <Process userHierarchy={userHierarchy} userRole={userRole} />
              {userRole === "ADMIN" && <InformationRequest />}
              {userRole === "ADMIN" && <TaskManagement />}
              {userRole === "ADMIN" && <UserInfo />}
              {userRole !== "ADMIN" && <TFA />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
