import React from "react";
import "./index.css";
import {
  setupGetAllAuditPlanSummary,
  setupUpdateAuditPlanSummary,
  resetAuditPlanSummarySuccess,
} from "../../../../global-redux/reducers/planing/audit-plan-summary/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const AuditPlanSummary = () => {
  const { loading, allAuditPlanSummary, auditPlanSummaryAddSuccess } =
    useSelector((state) => state?.planingAuditPlanSummary);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [totals, setTotals] = React.useState({
    serviceProvider: 0,
    iaa: 0,
    total: 0,
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  function handleChangePriority(event, id) {
    setData((pre) =>
      pre?.map((item) =>
        Number(item?.id) === Number(id)
          ? { ...item, priority: event?.target?.value }
          : item
      )
    );
  }

  function handleChangeYear(event, id) {
    setData((pre) =>
      pre.map((item) =>
        Number(item?.id) === Number(id)
          ? {
              ...item,
              threeYearsAgo: false,
              twoYearsAgo: false,
              lastYear: false,
              [event?.target?.name]: event?.target?.checked,
            }
          : item
      )
    );
  }

  function handleEdit(item) {
    dispatch(setupUpdateAuditPlanSummary({ ...item, approved: true }));
  }

  React.useEffect(() => {
    if (allAuditPlanSummary?.length !== 0) {
      allAuditPlanSummary?.forEach((element) => {
        setTotals((pre) => {
          return {
            serviceProvider:
              Number(pre.serviceProvider) + Number(element.serviceProvider),
            iaa: Number(pre.iaa) + Number(element.iaa),
            total: Number(pre.total) + Number(element.total),
            q1: Number(pre.q1) + Number(element.q1),
            q2: Number(pre.q2) + Number(element.q2),
            q3: Number(pre.q3) + Number(element.q3),
            q4: Number(pre.q4) + Number(element.q4),
          };
        });
      });
      setData(allAuditPlanSummary);
    }
  }, [allAuditPlanSummary]);

  React.useEffect(() => {
    if (auditPlanSummaryAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllAuditPlanSummary(`?companyId=${companyId}&year=${year}`)
        );
      }
      dispatch(resetAuditPlanSummarySuccess());
    }
  }, [auditPlanSummaryAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetAllAuditPlanSummary(
          `?companyId=${companyId}&year=${Number(year)}`
        )
      );
    }
  }, [user, year, company]);

  return (
    <div>
      <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Audit Plan Summary</div>
      </header>

      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            {loading ? (
              <CircularProgress />
            ) : data?.length === 0 ? (
              <p>No data to show!</p>
            ) : (
              <table className="table table-bordered table-hover rounded equal-columns">
                <thead>
                  <tr>
                    <th className="text-center" colSpan="4">
                      Current Risk Assessment
                    </th>
                    <th className="text-center" colSpan="3">
                      Year of Recent Reviews
                    </th>
                    <th className="text-center" colSpan="3">
                      Proposed Staff Hours Current Year
                    </th>
                    <th className="text-center" colSpan="4">
                      Proposed schedule current year
                    </th>
                    <th>Total Annual Effort</th>
                    <th colSpan="3">Edit</th>
                  </tr>
                </thead>

                <thead>
                  <tr className="bg-white">
                    <th className="bg-white">Rank</th>
                    <th className="bg-white">Auditable Unit</th>
                    <th className="bg-white ">Residual Risk Rating</th>
                    <th className="bg-white">Priority</th>
                    <th className="bg-white">Three Years Ago</th>
                    <th className="bg-white">Two Years Ago</th>
                    <th className="bg-white">Last Year</th>
                    <th className="bg-white">Service Provider</th>
                    <th className="bg-white">IAA</th>
                    <th className="bg-white">Total</th>
                    <th className="bg-white">Q1</th>
                    <th className="bg-white">Q2</th>
                    <th className="bg-white">Q3</th>
                    <th className="bg-white">Q4</th>
                    <th className="bg-white"></th>
                  </tr>
                </thead>
                {data?.slice((page - 1) * 5, page * 5)?.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{item?.id}</td>
                        <td className="min-w-300">{item?.title}</td>
                        <td className="normal-text">
                          {item?.residualRiskRating}
                        </td>
                        <td>
                          <select
                            className="form-select w-80"
                            aria-label="Default select example"
                            name="priority"
                            value={item?.priority || ""}
                            onChange={(event) =>
                              handleChangePriority(event, item?.id)
                            }
                          >
                            <option>Select One</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td className="normal-text">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              checked={item?.threeYearsAgo || false}
                              name="threeYearsAgo"
                              onChange={(event) =>
                                handleChangeYear(event, item?.id)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            ></label>
                          </div>
                        </td>
                        <td className="normal-text">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flex"
                              checked={item?.twoYearsAgo || false}
                              name="twoYearsAgo"
                              onChange={(event) =>
                                handleChangeYear(event, item?.id)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            ></label>
                          </div>
                        </td>
                        <td className="normal-text">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={item?.lastYear || false}
                              id="lastYear"
                              name="lastYear"
                              onChange={(event) =>
                                handleChangeYear(event, item?.id)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            ></label>
                          </div>
                        </td>
                        <td className="normal-text">{item?.serviceProvider}</td>
                        <td className="normal-text">{item?.iaa}</td>
                        <td className="normal-text">{item?.total}</td>
                        <td className="normal-text">{item?.q1}</td>
                        <td className="normal-text">{item?.q2}</td>
                        <td className="normal-text">{item?.q3}</td>
                        <td className="normal-text">{item?.q4}</td>
                        <td className="normal-text"></td>
                        <td className="normal-text ">
                          <div className="row mt-3">
                            <div className="col-lg-12 justify-content-end text-end">
                              <div
                                className="btn btn-labeled btn-primary px-3 shadow"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
                <tbody>
                  <tr>
                    <td colSpan="7"></td>
                    <td className="fw-bold">{totals?.serviceProvider}</td>
                    <td className="fw-bold">{totals?.iaa}</td>
                    <td className="fw-bold">{totals?.total}</td>
                    <td className="fw-bold">{totals?.q1}</td>
                    <td className="fw-bold">{totals?.q2}</td>
                    <td className="fw-bold">{totals?.q3}</td>
                    <td className="fw-bold">{totals?.q4}</td>
                    <td className="fw-bold">
                      {totals?.serviceProvider +
                        totals?.iaa +
                        totals?.total +
                        totals?.q1 +
                        totals?.q2 +
                        totals?.q3 +
                        totals?.q4}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <div className="mb-4">
              <Pagination
                count={Math.ceil(allAuditPlanSummary?.length / 5)}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPlanSummary;
