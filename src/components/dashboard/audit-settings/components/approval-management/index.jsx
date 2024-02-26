import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetCompanyRegisterSuccess,
  setupUpdateApprovalManagement,
} from "../../../../../global-redux/reducers/settings/company-management/slice";
import { CircularProgress } from "@mui/material";
import { setupGetAllCompanies } from "../../../../../global-redux/reducers/settings/company-management/slice";

const ResidualRisk = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const { companyAddSuccess, loading } = useSelector(
    (state) => state?.settingsCompanyManagement
  );
  const { allCompanies, loading: companyLoading } = useSelector(
    (state) => state?.settingsCompanyManagement
  );
  const [currentCompany, setCurrentCompany] = React.useState({});

  function handleChange(event, role) {
    if (role === "iah") {
      setCurrentCompany((pre) => {
        return {
          ...pre,
          iah: {
            ...pre?.iah,
            [event?.target?.name]: event?.target?.checked,
          },
        };
      });
    }
    if (role === "team_LEAD") {
      setCurrentCompany((pre) => {
        return {
          ...pre,
          team_LEAD: {
            ...pre?.team_LEAD,
            [event?.target?.name]: event?.target?.checked,
          },
        };
      });
    }
  }

  function handleSave() {
    if (!loading) {
      dispatch(setupUpdateApprovalManagement(currentCompany));
    }
  }

  React.useEffect(() => {
    if (companyAddSuccess) {
      dispatch(setupGetAllCompanies());
      dispatch(resetCompanyRegisterSuccess());
    }
  }, [companyAddSuccess]);
  React.useEffect(() => {
    if (user[0]?.token && allCompanies?.length !== 0) {
      const companyItem = allCompanies?.find(
        (singleCompanyItem) => singleCompanyItem?.companyName === company
      );
      setCurrentCompany(companyItem?.approvalsManagement);
    }
  }, [user, company, allCompanies]);
  return (
    <div
      className="tab-pane fade"
      id="nav-approval-management"
      role="tabpanel"
      aria-labelledby="nav-approval-management-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Approval Management</div>
          <label className="fw-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            {companyLoading ? (
              <CircularProgress />
            ) : (
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Approval Points</th>
                    <th>Inernal Audit Head</th>
                    <th>Team Lead</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCompany?.iah &&
                    currentCompany?.team_LEAD &&
                    Object.entries(currentCompany?.iah).map(
                      ([key, value], index) => (
                        <tr key={index}>
                          {typeof value === "boolean" && <td>{key}</td>}
                          {typeof value === "boolean" && (
                            <td>
                              <input
                                className="form-check-input p-2 cursor-pointer"
                                type="checkbox"
                                value=""
                                id="flex"
                                name={key}
                                checked={Boolean(value)}
                                onChange={(event) =>
                                  key !== "auditPlanSummary" &&
                                  key !== "riskControlMatrix" &&
                                  key !== "auditProgram" &&
                                  handleChange(event, "iah")
                                }
                              
                              />
                            </td>
                          )}
                          {typeof Object.entries(currentCompany?.team_LEAD)[
                            index
                          ][1] === "boolean" && (
                            <td>
                              <input
                                className="form-check-input p-2 cursor-pointer"
                                type="checkbox"
                                value=""
                                id="flex"
                                name={key}
                                checked={Boolean(
                                  Object.entries(currentCompany?.team_LEAD)[
                                    index
                                  ][1]
                                )}
                                onChange={(event) =>
                                  handleChange(event, "team_LEAD")
                                }
                              />
                            </td>
                          )}
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            )}
          </div>
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="col-lg-6 text-end float-end align-self-end">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow ${
                    loading && "disabled"
                  }`}
                  onClick={handleSave}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-save"></i>
                  </span>
                  {loading ? "Loading..." : "Save"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidualRisk;
