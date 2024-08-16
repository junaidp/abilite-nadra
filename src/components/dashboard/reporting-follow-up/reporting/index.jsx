import React from "react";
import { useNavigate } from "react-router-dom";
import { setupGetAllReporting } from "../../../../global-redux/reducers/reporting/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Reporting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = React.useRef(true);
  const { user } = useSelector((state) => state?.auth);
  const { company, year } = useSelector((state) => state?.common);
  const { allReporting, loading, totalNoOfRecords } = useSelector(
    (state) => state?.reporting
  );
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleCalculateStatus(item) {
    if (
      item?.reportingList?.find(
        (singleReportingItem) =>
          Number(singleReportingItem?.stepNo) === 0 ||
          Number(singleReportingItem?.stepNo) === 1
      )
    ) {
      return "Exceptions To Be Sent To Management For Comments";
    }
    if (
      item?.reportingList?.find(
        (singleReportingItem) => Number(singleReportingItem?.stepNo) === 2
      )
    ) {
      return "Awaiting Management Comments";
    }
    if (
      item?.reportingList?.find(
        (singleReportingItem) => Number(singleReportingItem?.stepNo) === 3
      )
    ) {
      return user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee"
        ? "Management Comments Sent"
        : "Management Comments Received";
    }
    return "Exception To Be Implemented";
  }

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllReporting({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
          year,
        })
      );
    }
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllReporting({ companyId, page, itemsPerPage, year }));
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
        setupGetAllReporting({ companyId, page: 1, itemsPerPage: 10, year })
      );
    }
  }, [year]);

  return (
    <div>
      <div className="mx-3">
        <div className="row pt-4">
          <div className="col-lg-7">
            <h2 className="heading">Reporting</h2>
          </div>
        </div>

        <div className="row py-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              {loading ? (
                <CircularProgress />
              ) : allReporting?.length === 0 ||
                allReporting[0]?.error === "Not Found" ? (
                <p>No Reporting to Show</p>
              ) : (
                <table className="table table-bordered  table-hover rounded">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th>Particulars</th>
                      <th>Status</th>
                      <th>No. of Observations</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allReporting?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <label>{index + 1}</label>
                          </td>
                          <td>
                            <a
                              className=" text-primary  fw-bold f-12"
                              onClick={() =>
                                navigate(
                                  `/audit/reporting-particulars?reportingId=${item?.id}`
                                )
                              }
                            >
                              {item?.title}
                            </a>
                          </td>
                          <td>{handleCalculateStatus(item)}</td>
                          <td>{item?.reportingList?.length}</td>
                          <td>
                            <i
                              onClick={() =>
                                navigate(
                                  `/audit/reporting-particulars?reportingId=${item?.id}`
                                )
                              }
                              className="fa fa-eye f-18 cursor-pointer"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            {allReporting?.length > 0 && (
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
      </div>
    </div>
  );
};

export default Reporting;
