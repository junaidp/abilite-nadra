import React from "react";
import {
  setupGetAllCompanies,
  resetCompanyRegisterSuccess,
} from "../../../../../global-redux/reducers/settings/company-management/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import moment from "moment";

const Company = ({
  setAddCompantDialog,
  setCurrentCompanyId,
  setShowUpdateCompanyDialog,
}) => {
  const dispatch = useDispatch();
  const { allCompanies, loading, companyAddSuccess } = useSelector(
    (state) => state?.settingsCompanyManagement
  );
  const { user } = useSelector((state) => state?.auth);
  const [companySearch, setCompanySearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllCompanies());
    }
  }, [user]);

  React.useEffect(() => {
    if (companyAddSuccess) {
      dispatch(resetCompanyRegisterSuccess());
      dispatch(setupGetAllCompanies());
    }
  }, [companyAddSuccess]);

  return (
    <div
      className="tab-pane fade"
      id="nav-com"
      role="tabpanel"
      aria-labelledby="nav-com-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Company Management</div>
          <label className="fw-light">Super user setting</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Search Company:</label>
          <input
            className="form-control w-100"
            placeholder="Search Company here"
            type="text"
            onChange={(e) => setCompanySearch(e?.target?.value)}
          />
        </div>
        <div className="col-lg-6 text-end float-end align-self-end">
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => setAddCompantDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            Add New
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive overflow-x-auto">
            <table className="table table-bordered overflow-x-auto table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Sr No.</th>
                  <th>Company Name</th>
                  <th>Legal Name</th>
                  <th>Company ID</th>
                  <th>Fiscal Year From:</th>
                  <th>Fiscal Year To:</th>
                  <th>Package</th>
                  <th className="w-150">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="w-300">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allCompanies?.length === 0 ? (
                  <tr>
                    <td className="w-300">No company to show!</td>
                  </tr>
                ) : (
                  allCompanies
                    ?.filter((all) =>
                      all?.companyName
                        ?.toLowerCase()
                        .includes(companySearch?.toLowerCase())
                    )
                    ?.slice((page - 1) * 5, page * 5)
                    ?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item?.companyName}</td>
                          <td>{item?.legalName}</td>
                          <td>{item?.id}</td>
                          <td>
                            {moment(item?.fiscalYearForm).format("MM-DD-YYYY")}
                          </td>
                          <td>
                            {moment(item?.fiscalYearTo).format("MM-DD-YYYY")}
                          </td>
                          <td>{item?.clientId?.clientpackage}</td>
                          <td>
                            <div>
                              <i
                                className="fa fa-edit  px-3 f-18 cursor-pointer"
                                onClick={() => {
                                  setCurrentCompanyId(item?.id);
                                  setShowUpdateCompanyDialog(true);
                                }}
                              ></i>

                              <i className="fa fa-trash text-danger f-18 cursor-pointer"></i>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(allCompanies?.length / 5)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
