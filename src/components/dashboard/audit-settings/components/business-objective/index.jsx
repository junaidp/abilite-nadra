import React from "react";
import NotFinancially from "./components/no";
import Financially from "./components/yes";

const BusinessObjective = ({
  userHierarchy,
  userRole,
  currentSettingOption,
}) => {
  const [check, setCheck] = React.useState(true);

  React.useEffect(() => {
    setCheck(true);
  }, [currentSettingOption]);

  return (
    <div
      className="tab-business fade"
      id="nav-business-objective"
      role="tabpanel"
      aria-labelledby="nav-business-objective-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Business Objective</div>
          <label className="fw-light">
            Click to add a new business objective
          </label>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <label className="form-label">Financially Quantifiable</label>
        <div className="form-check form-switch ml-12">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={check}
            onChange={(event) => setCheck(event.target.checked)}
          />
        </div>
      </div>
      {check ? (
        <Financially
          userHierarchy={userHierarchy}
          userRole={userRole}
          currentSettingOption={currentSettingOption}
          setCheck={setCheck}
        />
      ) : (
        <NotFinancially
          userHierarchy={userHierarchy}
          userRole={userRole}
          currentSettingOption={currentSettingOption}
          setCheck={setCheck}
        />
      )}
    </div>
  );
};

export default BusinessObjective;
