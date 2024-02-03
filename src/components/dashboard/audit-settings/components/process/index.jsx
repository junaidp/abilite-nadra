import React from "react";
import {
  resetProcessAddSuccess,
  setupAddProcess,
  setupGetAllProcess,
  setupSaveSubProcess,
  setupGetAllSubProcess,
} from "../../../../../global-redux/reducers/settings/process/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";

const Process = () => {
  const dispatch = useDispatch();
  const { loading, processAddSuccess, allProcess, allSubProcess } = useSelector(
    (state) => state?.setttingsProcess
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [processText, setProcessText] = React.useState("");
  const [subProcessText, setSubProcessText] = React.useState("");
  const [processId, setProcessId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  function handleSaveProcess() {
    if (processText === "") {
      toast.error("Provide the process");
    }
    if (!loading && processText !== "") {
      const selectedCompany = user[0]?.company?.find(
        (item) => item?.companyName === company
      );
      dispatch(
        setupAddProcess({ description: processText, company: selectedCompany })
      );
    }
  }

  function handleAddSubProcess() {
    if (subProcessText === "") {
      toast.error("Please Add Sub Process");
    }
    if (!loading && subProcessText !== "") {
      dispatch(
        setupSaveSubProcess({
          description: subProcessText,
          processId: processId,
        })
      );
    }
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllProcess(companyId));
    }
  }, [user]);

  React.useEffect(() => {
    if (processAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllProcess(companyId));
      }
      setProcessText("");
      setSubProcessText("");
      dispatch(resetProcessAddSuccess());
    }
  }, [processAddSuccess]);

  return (
    <div
      className="tab-pane fade"
      id="nav-process"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">
            Processs & Sub Process Management
          </div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation Process &
            Sub Process
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <label>Add Process</label>
          <input
            className="form-control w-100"
            placeholder="Enter Text here"
            type="text"
            value={processText}
            onChange={(event) => setProcessText(event?.target?.value)}
          />
        </div>
        <div className="col-lg-6 text-end float-end align-self-end">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow ${
              loading && "disabled"
            }`}
            onClick={handleSaveProcess}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            {loading ? "Loading..." : "Add"}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="accordion" id="accordionProcessExample">
            {loading ? (
              <CircularProgress />
            ) : allProcess?.length === 0 ? (
              <p>No Item To Show</p>
            ) : (
              allProcess
                ?.slice((page - 1) * 5, page * 5)
                ?.map((item, index) => {
                  return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={"c" + index}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${"c" + index}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${"c" + index}`}
                          onClick={() => {
                            setSubProcessText("");
                            setProcessId(item?.id);
                            dispatch(
                              setupGetAllSubProcess(
                                `?processId=${Number(item?.id)}`
                              )
                            );
                          }}
                        >
                          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                            <div className=" d-flex align-items-center">
                              {item?.description}
                            </div>
                          </div>
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse${"c" + index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionProcessExample"
                      >
                        <div className="accordion-body">
                          <div className="row mt-3 mb-3">
                            <div className="col-lg-6">
                              <label className="w-100 ">Add SubProcess:</label>
                              <input
                                className="form-control w-100"
                                placeholder="Enter"
                                type="text"
                                value={subProcessText}
                                onChange={(event) =>
                                  setSubProcessText(event?.target?.value)
                                }
                              />
                            </div>
                            <div className="col-lg-6 text-end float-end align-self-end">
                              <div
                                className={`btn btn-labeled btn-primary px-3 shadow ${
                                  loading && "disabled"
                                }`}
                                onClick={handleAddSubProcess}
                              >
                                <span className="btn-label me-2">
                                  <i className="fa fa-plus"></i>
                                </span>
                                {loading ? "Loading..." : "Add"}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="table-responsive">
                                <table className="table table-bordered  table-hover rounded">
                                  <thead className="bg-secondary text-white">
                                    <tr>
                                      <th className="w-80">Sr No.</th>
                                      <th>Particulars</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {allSubProcess?.length === 0 ? (
                                      <tr>
                                        <td className="w-300">
                                          No sub-process to show!
                                        </td>
                                      </tr>
                                    ) : (
                                      allSubProcess?.map((subItem, ind) => {
                                        return (
                                          <tr key={ind}>
                                            <td>{subItem?.id}</td>
                                            <td>{subItem?.description}</td>
                                            <td>
                                              <i className="fa fa-edit  px-3 f-18"></i>
                                              <i className="fa fa-trash text-danger f-18"></i>
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
                      </div>
                    </div>
                  );
                })
            )}
            <Pagination
              count={Math.ceil(allProcess?.length / 5)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
