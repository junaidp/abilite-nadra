import React from "react";
import "./index.css";
import {
  setupGetAllJobPrioritization,
  setupUpdateJobPrioritization,
  resetJobPrioritizationSuccess,
  setupGetInitialAllJobPrioritization,
} from "../../../../global-redux/reducers/planing/job-prioritization/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const JobPrioritization = () => {
  const dispatch = useDispatch();
  const {
    loading,
    allJobPrioritization,
    jobPrioritizationAddSuccess,
    initialLoading,
    totalNoOfRecords,
  } = useSelector((state) => state?.planningJobPrioritization);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [currentId, setCurrentId] = React.useState("");
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleUpdate(id) {
    setCurrentId(id);
    let object = data?.find((item) => item?.id === id);
    object = {
      ...object,
      year: Number(object?.year),
    };
    if (!loading) {
      dispatch(setupUpdateJobPrioritization(object));
    }
  }
  function handleSubmit(id) {
    setCurrentId(id);
    let object = data?.find((item) => item?.id === id);
    object = {
      ...object,
      year: Number(object?.year),
      completed: true,
    };
    if (!loading) {
      dispatch(setupUpdateJobPrioritization(object));
    }
  }

  function handleChangeYearValue(event, id) {
    if (event?.target?.value) {
      setData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? { ...item, [event?.target?.name]: event?.target?.value }
            : item
        )
      );
    }
  }
  function handleChangeValue(event, id) {
    setData((pre) =>
      pre?.map((item) =>
        item?.id === id
          ? { ...item, [event?.target?.name]: event?.target?.value }
          : item
      )
    );
  }
  function handleChangeCheckValue(event, id) {
    setData((pre) =>
      pre?.map((item) =>
        item?.id === id
          ? { ...item, [event?.target?.name]: event?.target?.checked }
          : item
      )
    );
  }
  function handleEditable(id) {
    setData((pre) =>
      pre?.map((item) =>
        Number(item?.id) === Number(id) ? { ...item, editable: true } : item
      )
    );
  }

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetInitialAllJobPrioritization({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
        })
      );
    }
  }

  React.useEffect(() => {
    if (jobPrioritizationAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllJobPrioritization({ companyId, page, itemsPerPage })
        );
        dispatch(resetJobPrioritizationSuccess());
      }
    }
  }, [jobPrioritizationAddSuccess]);

  React.useEffect(() => {
    setData(
      allJobPrioritization.map((singleItem) => {
        return {
          ...singleItem,
          editable: false,
        };
      })
    );
  }, [allJobPrioritization]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetInitialAllJobPrioritization({ companyId, page, itemsPerPage })
      );
    }
  }, [dispatch, page]);

  return (
    <div>
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : (
        <>
          <header className="section-header my-3 align-items-center justify-content-between text-start d-flex ">
            <div className="mb-0 heading">Job Prioritization</div>
          </header>

          <div className="table-responsive overflow-x-hidden">
            <table className="table table-bordered table-hover rounded equal-columns">
              <thead>
                <tr>
                  <th className="sr-col">Sr. #</th>
                  <th>Auditable Unit</th>
                  <th>Business Objective</th>
                  <th>Risk Rating</th>
                  <th>Select for Audit</th>
                  <th>Comments</th>
                  <th>Select Year</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {allJobPrioritization?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Job Prioritization to show</td>
                  </tr>
                ) : (
                  data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.id}</td>
                        <td className="w-200">{item?.auditableUnitTitle}</td>
                        <td className="w-200">
                          {item?.businessObjectiveTitle}
                        </td>
                        <td className="moderate">{item?.riskRating}</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              checked={item?.selectedForAudit}
                              name="selectedForAudit"
                              onChange={(event) =>
                                handleChangeCheckValue(event, item?.id)
                              }
                              disabled={item?.editable === true ? false : true}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <textarea
                            className="form-control"
                            placeholder="Enter Reason"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={item?.comments || ""}
                            onChange={(event) =>
                              handleChangeValue(event, item?.id)
                            }
                            disabled={item?.editable === true ? false : true}
                            name="comments"
                            maxLength="500"
                          ></textarea>
                          <p className="word-limit-info label-text mb-2">
                            Maximum 500 characters
                          </p>
                        </td>
                        <td className="width-100">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={item?.year || new Date()}
                            onChange={(event) =>
                              handleChangeYearValue(event, item?.id)
                            }
                            disabled={item?.editable === true ? false : true}
                            name="year"
                          >
                            <option value="">Select Year</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                            <option value={2027}>2027</option>
                            <option value={2028}>2028</option>
                          </select>
                        </td>
                        <td>
                          {(allJobPrioritization[index]?.completed === false ||
                            (allJobPrioritization[index]?.completed === true &&
                              allJobPrioritization[index]?.locked === false &&
                              user[0]?.userId?.employeeid?.userHierarchy ===
                                "IAH")) && (
                            <div>
                              {item?.editable === false && (
                                <i
                                  className="fa fa-edit  px-3 f-18 cursor-pointer"
                                  onClick={() => handleEditable(item?.id)}
                                ></i>
                              )}
                              {item?.editable === true && (
                                <div
                                  className={`btn btn-labeled btn-primary px-3 shadow ${
                                    loading &&
                                    currentId === item?.id &&
                                    "disabled"
                                  }`}
                                  onClick={() => handleUpdate(item?.id)}
                                >
                                  {loading && currentId === item?.id
                                    ? "Loading..."
                                    : "Save"}
                                </div>
                              )}
                            </div>
                          )}

                          <div>
                            {allJobPrioritization[index]?.completed === false &&
                              allJobPrioritization[index]?.comments &&
                              allJobPrioritization[index]?.comments !== "" &&
                              allJobPrioritization[index]?.year &&
                              allJobPrioritization[index]?.year !== 0 &&
                              allJobPrioritization[index]?.year !== "" && (
                                <div
                                  className={`btn btn-labeled btn-primary px-3 mt-2 shadow ${
                                    loading &&
                                    currentId === item?.id &&
                                    "disabled"
                                  }`}
                                  onClick={() => handleSubmit(item?.id)}
                                >
                                  {loading && currentId === item?.id
                                    ? "Loading..."
                                    : "Submit"}
                                </div>
                              )}
                          </div>
                          {allJobPrioritization[index]?.locked === true && (
                            <div className="px-3 mt-2">
                              <button
                                className={`btn btn-labeled btn-primary px-3  shadow disabled`}
                              >
                                Approved
                              </button>
                            </div>
                          )}
                          {allJobPrioritization[index]?.locked === false &&
                            allJobPrioritization[index]?.completed === true && (
                              <div className="px-3 mt-2">
                                <button
                                  className={`btn btn-labeled btn-primary px-3  shadow disabled`}
                                >
                                  Submitted
                                </button>
                              </div>
                            )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {allJobPrioritization?.length > 0 && (
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
        </>
      )}
    </div>
  );
};

export default JobPrioritization;
