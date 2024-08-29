import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setupGetAllCheckLists } from "../../../global-redux/reducers/settings/check-list/slice";
import { setupGetAllLocations } from "../../../global-redux/reducers/settings/location/slice";
import { setupGetAllProcess } from "../../../global-redux/reducers/settings/process/slice";
import { setupGetAllUsers } from "../../../global-redux/reducers/settings/user-management/slice";
import { setupGetAllCPList } from "../../../global-redux/reducers/settings/cp-list/slice";
import { setupGetAllRiskFactors } from "../../../global-redux/reducers/settings/risk-factor/slice";
import AddCheckListManagementDialog from "../../modals/add-checklist-management-dialog/index";
import { setupGetAllFiles } from "../../../global-redux/reducers/settings/supporting-docs/slice";
import { handleReset } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";
import { resetAuthValues } from "../../../global-redux/reducers/auth/slice";
import UserManagementDialog from "../../modals/add-user-dialog/index";
import { setupGetAllPreviousObservations } from "../../../global-redux/reducers/settings/previous-observation/slice.jsx";
import UpdateUserDialog from "../.././modals/update-user-dialog";
import TFA from "./components/tfa/index.jsx";
import CheckList from "./components/checklist";
import CPList from "./components/cp-list/index";
import SupportingDocs from "./components/supporting-docs/index";
import UserInfo from "./components/user-info/UserInfo.jsx";
import Location from "./components/location";
import RiskFactor from "./components/risk-factor";
import UserManagement from "./components/user";
import RCMLibrary from "./components/rcm-library";
import PreviousObservation from "./components/previous-observation/index.jsx";
import Process from "./components/process";
// import Notification from "./components/notification";
const AuditSettings = () => {
  const dispatch = useDispatch();
  const [checkListManagementDialog, setCheckListManagementDialog] =
    React.useState(false);
  const [currentSettingOption, setCurrentSettingOption] =
    React.useState("docs");
  const { user } = useSelector((state) => state.auth);
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
      if (currentSettingOption === "previousObservations") {
        dispatch(setupGetAllPreviousObservations({ companyId: companyId }));
      }
    }
  }, [currentSettingOption]);

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
                  >
                    User Details
                  </button>
                )}
                {/* {userRole !== "ADMIN" && (
                  <button
                    className="nav-link shadow-sm  border-0 mb-3  rounded-0 me-3 "
                    id="nav-notification-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-notification"
                    type="button"
                    role="tab"
                    aria-controls="nav-notification"
                  >
                    Notification
                  </button>
                )} */}
                {/* {(userRole === "ADMIN" || userHierarchy === "IAH") && (
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
                )} */}
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
              <CPList
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
              {/* {userRole !== "ADMIN" && <Notification />} */}
              {/* {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                <PreviousObservation
                  currentSettingOption={currentSettingOption}
                />
              )} */}
              {userRole === "ADMIN" && (
                <UserManagement
                  setUserManagementDialog={setUserManagementDialog}
                  setUpdateUserDialog={setUpdateUserDialog}
                  setUpdateUserObject={setUpdateUserObject}
                  currentSettingOption={currentSettingOption}
                />
              )}

              <Process
                userHierarchy={userHierarchy}
                userRole={userRole}
                currentSettingOption={currentSettingOption}
              />

              {userRole === "ADMIN" && <UserInfo />}
              <TFA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
