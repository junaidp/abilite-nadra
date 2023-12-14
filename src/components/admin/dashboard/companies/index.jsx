import React from "react";
import TopBar from "../../../common/top-bar/TopBar";
import Sidebar from "../../../common/sidebar/Sidebar";
import "./index.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  setupGetCompanies,
  setupRegisterCompany,
  changeCompanyRegisterSuccess,
  changeCompanyErrorState,
} from "../../../../global-redux/reducers/company/slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const AuditSettings = () => {
  let [data, setData] = React.useState({
    companyname: "",
    companypackage: "",
    usersAllowed: "",
  });
  let { showSidebar } = useSelector((state) => state.common);
  let { companies, registerCompanySuccess, error } = useSelector(
    (state) => state.company
  );
  let [activeTab, setActiveTab] = React.useState("supportingDoc");
  let dispatch = useDispatch();

  function handleChange(e) {
    setData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit() {
    if (!data?.companyname || !data?.companypackage || !data?.usersAllowed) {
      toast.error("Provide all the fields");
    }
    if (data?.companyname && data?.companypackage && data?.usersAllowed) {
      dispatch(setupRegisterCompany(data));
    }
  }

  React.useEffect(() => {
    if (registerCompanySuccess) {
      toast.success("Company Registered Successfully");
      setData({
        companyname: "",
        companypackage: "",
        usersAllowed: "",
      });
    }

    setTimeout(() => {
      dispatch(changeCompanyRegisterSuccess(false));
    }, 3000);
  }, [registerCompanySuccess]);
  React.useEffect(() => {
    if (error) {
      toast.success("An Error Occured");
    }

    setTimeout(() => {
      dispatch(changeCompanyErrorState(false));
    }, 3000);
  }, [error]);

  React.useEffect(() => {
    dispatch(setupGetCompanies());
  }, [registerCompanySuccess]);

  console.log(companies);
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="row"
          id={showSidebar ? "SideComponents" : "SideComponentsFullWidth"}
        >
          <div className="card p-3 shadow-sm setting-tab">
            <h2 className="text-center heading p-3">Company Details</h2>
            <nav style={{ borderBottom: "1px solid #c7c7c7", padding: "10px" }}>
              <div
                className="nav settings-nav-tabs glass-effect border-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`nav-link active shadow-sm  rounded-0 me-3 ${
                    activeTab === "supportingDoc" && "active-settings-btn"
                  }`}
                  id="nav-home-tab"
                  style={{ width: "200px" }}
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={() => setActiveTab("supportingDoc")}
                >
                  Add Company
                </button>
                <button
                  className={`nav-link shadow-sm  rounded-0 ${
                    activeTab === "location" && "active-settings-btn"
                  }`}
                  id="nav-profile-tab"
                  style={{ width: "200px" }}
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={() => setActiveTab("location")}
                >
                  See Companies
                </button>
              </div>
            </nav>
            <div
              className="tab-content p-3 mt-4 border bg-light"
              id="nav-tabContent"
            >
              {activeTab === "supportingDoc" && (
                <div className="accordion-body">
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <div className="d-flex justify-content-between">
                        <label>Company Name</label>
                      </div>
                      <textarea
                        className="form-control w-100"
                        placeholder="Enter update"
                        type="textarea"
                        name="companyname"
                        value={data?.companyname}
                        onChange={(event) => handleChange(event)}
                      ></textarea>
                      <p className="word-limit-info mb-0">Maximum 100 words</p>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex justify-content-between">
                        <label>Company Package</label>
                      </div>
                      <textarea
                        className="form-control w-100"
                        placeholder="Enter update"
                        type="textarea"
                        value={data?.companypackage}
                        name="companypackage"
                        onChange={(event) => handleChange(event)}
                      ></textarea>
                      <p className="word-limit-info mb-0">Maximum 200 words</p>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="d-flex justify-content-between">
                      <label>usersAllowed</label>
                    </div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={data?.usersAllowed}
                      name="usersAllowed"
                      onChange={(event) => handleChange(event)}
                    >
                      <option selected>No Of UserAllowed</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                      <option value={4}>Four</option>
                      <option value={5}>Five</option>
                      <option value={6}>Six</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-labeled btn-primary px-3 mb-2 mt-4 shadow"
                    onClick={handleSubmit}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-check-circle"></i>
                    </span>
                    Save
                  </button>
                </div>
              )}
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {activeTab === "location" && (
                  <>
                    <div className="accordion-body">
                      <div className="container upload-table">
                        <div className="file-upload float-end mb-3">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input hidden "
                                id="inputGroupFile01"
                                style={{ visibility: "hidden" }}
                              />
                            </div>
                          </div>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Company Name</th>
                              <th scope="col">company Package</th>
                              <th>Users Allowed</th>
                              <th>Creation Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {companies?.map((item) => {
                              return (
                                <tr>
                                  <td>{item?.companyName}</td>
                                  <td>
                                    <a href="#">{item?.companyPackage}</a>
                                  </td>
                                  <td>{item?.usersAllowed}</td>
                                  <td>
                                    {new Date(
                                      item?.createdDate
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSettings;
