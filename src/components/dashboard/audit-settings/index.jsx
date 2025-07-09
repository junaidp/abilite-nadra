import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setupGetAllCheckLists } from "../../../global-redux/reducers/settings/check-list/slice";
import { setupGetAllLocations } from "../../../global-redux/reducers/settings/location/slice";
import { setupGetAllProcess } from "../../../global-redux/reducers/settings/process/slice";
import { setupGetAllUsers } from "../../../global-redux/reducers/settings/user-management/slice";
import { setupGetNotifications } from "../../../global-redux/reducers/settings/notification/slice.jsx";
import { setupGetAllRiskFactors } from "../../../global-redux/reducers/settings/risk-factor/slice";
import { setupGetAllUser } from "../../../global-redux/reducers/settings/previous-observation/slice.jsx";
import AddCheckListManagementDialog from "../../modals/add-checklist-management-dialog/index";
import { setupGetAllFiles } from "../../../global-redux/reducers/settings/supporting-docs/slice";
import { handleReset } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";
import UserManagementDialog from "../../modals/add-user-dialog/index";
import {
  setupGetFinancialQuantifiableYesForCompany,
  setupGetFinancialQuantifiableNoForCompany,
} from "../../../global-redux/reducers/settings/business-objective/slice.jsx";
import { setupGetAllDepartments } from "../../../global-redux/reducers/settings/department/slice.jsx";
import UpdateUserDialog from "../.././modals/update-user-dialog";
import TFA from "./components/tfa/index.jsx";
import CheckList from "./components/checklist";
import SupportingDocs from "./components/supporting-docs/index";
import UserInfo from "./components/user-info/UserInfo.jsx";
import Location from "./components/location";
import Department from "./components/department/index.jsx";
import RiskFactor from "./components/risk-factor";
import UserManagement from "./components/user";
import RCMLibrary from "./components/rcm-library";
import BusinessObjective from "./components/business-objective/index.jsx";
import PreviousObservation from "./components/previous-observation/index.jsx";
import Process from "./components/process";
import Notification from "./components/notification";
import FiscalDuration from "./components/fiscal/index.jsx";
import EmailConfigurations from "./components/email-configuration/index.jsx";
const AuditSettings = () => {
  const dispatch = useDispatch();
  const [checkListManagementDialog, setCheckListManagementDialog] =
    React.useState(false);
  const [currentSettingOption, setCurrentSettingOption] =
    React.useState("docs");
  const { user, userCompany } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const [userManagementDialog, setUserManagementDialog] = React.useState(false);
  const [updateUserDialog, setUpdateUserDialog] = React.useState(false);
  const [userRole, setUserRole] = React.useState("");
  const [userHierarchy, setUserHierarchy] = React.useState("");
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
      if (currentSettingOption === "location") {
        dispatch(setupGetAllLocations(`?companyId=${companyId}`));
      }
      if (currentSettingOption === "department") {
        dispatch(setupGetAllDepartments(`?companyId=${companyId}`));
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
      if (currentSettingOption === "notification") {
        dispatch(setupGetNotifications({ userId: user[0]?.id }));
      }
      if (currentSettingOption === "users") {
        dispatch(setupGetAllUsers({ shareWith: true }));
      }
      if (currentSettingOption === "previousObservations") {
        dispatch(setupGetAllUser());
      }
      if (currentSettingOption === "business-objective") {
        dispatch(setupGetFinancialQuantifiableYesForCompany({ companyId }));
        dispatch(setupGetFinancialQuantifiableNoForCompany({ companyId }));
      }
    }
  }, [currentSettingOption, dispatch]);

  React.useEffect(() => {
    if (user[0]?.token) {
      setUserHierarchy(user[0]?.userId?.employeeid?.userHierarchy);
      setUserRole(user[0]?.userId?.authorities[0]);
    }
    return () => {
      dispatch(handleReset());
    };
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(resetAuthValues());
  }, []);

  return (
    <div>
      {checkListManagementDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <AddCheckListManagementDialog
              setCheckListManagementDialog={setCheckListManagementDialog}
            />
          </div>
        </div>
      )}
      {userManagementDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <UserManagementDialog
              setUserManagementDialog={setUserManagementDialog}
            />
          </div>
        </div>
      )}

      {updateUserDialog && (
        <div className="model-parent">
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

        <div className="d-flex  page-overflow-wrap">
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
                  id="nav-department-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-department"
                  type="button"
                  role="tab"
                  aria-controls="nav-department"
                  onClick={() => setCurrentSettingOption("department")}
                >
                  Department
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
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-fiscal-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-fiscal"
                  type="button"
                  role="tab"
                  aria-controls="nav-fiscal"
                >
                  Fiscal Duration
                </button>
                <button
                  className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                  id="nav-business-objective-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-business-objective"
                  type="button"
                  role="tab"
                  aria-controls="nav-business-objective"
                  onClick={() => setCurrentSettingOption("business-objective")}
                >
                  Business Objective
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
                {userRole === "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-email-configuration-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-email-configuration"
                    type="button"
                    role="tab"
                    aria-controls="nav-email-configuration"
                    onClick={() =>
                      setCurrentSettingOption("email-configuration")
                    }
                  >
                    Email Configuration
                  </button>
                )}

                {/* For Admins Only */}

                {userRole === "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-user-info-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-user-info"
                    type="button"
                    role="tab"
                    aria-controls="nav-user-info"
                    onClick={() => setCurrentSettingOption("user-details")}
                  >
                    User Details
                  </button>
                )}
                {userRole !== "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-notification-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-notification"
                    type="button"
                    role="tab"
                    aria-controls="nav-notification"
                    onClick={() => setCurrentSettingOption("notification")}
                  >
                    Notification
                  </button>
                )}
                {userRole === "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="previous-observation-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#previous-observation"
                    type="button"
                    role="tab"
                    aria-controls="previous-observation"
                    onClick={() =>
                      setCurrentSettingOption("previousObservations")
                    }
                  >
                    Previous Observations
                  </button>
                )}
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
                currentSettingOption={currentSettingOption}
              />
              <Location
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />
              <Department
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />
              <RCMLibrary
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />
              <RiskFactor
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />
              <CheckList
                setCheckListManagementDialog={setCheckListManagementDialog}
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />
              <FiscalDuration userCompany={userCompany}
                userRole={userRole} />
              {userRole !== "ADMIN" && <Notification />}
              {userRole === "ADMIN" && (
                <PreviousObservation
                  currentSettingOption={currentSettingOption}
                />
              )}
              {userRole === "ADMIN" && (
                <UserManagement
                  setUserManagementDialog={setUserManagementDialog}
                  setUpdateUserDialog={setUpdateUserDialog}
                  setUpdateUserObject={setUpdateUserObject}
                  currentSettingOption={currentSettingOption}
                  updateUserObject={updateUserObject}
                />
              )}

              <Process
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />

              {userRole === "ADMIN" && <UserInfo />}
              {userRole === "ADMIN" && <EmailConfigurations />}
              <TFA />
              <BusinessObjective
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
