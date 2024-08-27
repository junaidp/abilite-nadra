import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setupGetAllAuditEngagement } from "../../../global-redux/reducers/audit-engagement/slice";
import { Chip, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AuditEngagement = () => {
  const isInitialRender = React.useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { kickOffRequest, company, year } = useSelector(
    (state) => state.common
  );
  const { allAuditEngagement, loading, totalNoOfRecords } = useSelector(
    (state) => state?.auditEngagement
  );
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllAuditEngagement({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
          year,
        })
      );
    }
  }

  React.useEffect(() => {
    if (kickOffRequest === "Kick-Off") {
      navigate("/audit/kick-off");
    }
  }, [kickOffRequest]);

  React.useEffect(() => {
    if (user[0]?.token) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllAuditEngagement({
            companyId,
            page,
            itemsPerPage,
            year,
          })
        );
      }
    }
  }, [dispatch, page]);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip the initial render
    }

    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;

    if (companyId) {
      setPage(1);
      setItemsPerPage(10);
      dispatch(
        setupGetAllAuditEngagement({
          companyId,
          page: 1,
          itemsPerPage: 10,
          year,
        })
      );
    }
  }, [year]);

  return (
    <div>
      <div>
        <section className="faq-section ">
          <div data-aos="fade-up">
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Audit Engagement</div>
            </header>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="w-80">Sr No.</th>
                        <th>Job Name</th>
                        <th>Planned Start Date </th>
                        <th>Planned End Date </th>
                        <th>Job Type </th>
                        <th>Sub Location </th>
                        <th>Status </th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td className="w-300">
                            <CircularProgress />
                          </td>
                        </tr>
                      ) : allAuditEngagement?.length === 0 ? (
                        <tr>
                          <td className="w-300">No Audit Engagements To Show.</td>
                        </tr>
                      ) : (
                        allAuditEngagement?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item?.title}</td>
                              <td>
                                {item?.plannedStartDate
                                  ? moment
                                      .utc(item?.plannedStartDate)
                                      .format("DD-MM-YYYY")
                                  : "null"}
                              </td>
                              <td>
                                {item?.plannedEndDate
                                  ? moment
                                      .utc(item?.item?.plannedEndDate)
                                      .format("DD-MM-YYYY")
                                  : "null"}
                              </td>
                              <td>{item?.jobType ? item?.jobType : "null"}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  {item?.subLocationList?.map(
                                    (location, index) => {
                                      return (
                                        <Chip
                                          label={location?.description}
                                          key={index}
                                        />
                                      );
                                    }
                                  )}
                                </div>
                              </td>
                              <td className="kink-off">
                                <Link
                                  to={`/audit/kick-off?auditEngagementId=${item?.id}`}
                                  className="kink-off"
                                >
                                  {item?.status}
                                </Link>
                              </td>
                              <td>
                                <i
                                  className="fa-eye fa f-18 cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/audit/kick-off?auditEngagementId=${item?.id}`
                                    )
                                  }
                                ></i>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        {allAuditEngagement?.length > 0 && (
          <div className="row">
            <div className="col-lg-6 mb-4">
              <Pagination
                count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                page={page}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 mb-4 d-flex justify-content-end">
              <div>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Items Per Page
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Age"
                    value={itemsPerPage}
                    onChange={(event) => handleChangeItemsPerPage(event)}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditEngagement;
