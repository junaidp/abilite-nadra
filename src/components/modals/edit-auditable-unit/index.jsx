import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupEditAuditableUnit } from "../../../global-redux/reducers/planing/auditable-units/slice";
import {
  setupGetAllProcess,
  setupGetAllSubProcess,
  resetAllValues,
} from "../../../global-redux/reducers/settings/process/slice";
import { CircularProgress } from "@mui/material";

const AuditableUnitRatingDialog = ({
  setShowEditAuditableUnit,
  selectedAuditableUnitId,
  selectedAuditableSubUnitId,
}) => {
  const dispatch = useDispatch();
  const { loading, auditableUnitAddSuccess, allAuditableUnits } = useSelector(
    (state) => state?.planingAuditableUnit
  );
  const {
    allProcess,
    allSubProcess,
    loading: processLoading,
  } = useSelector((state) => state?.setttingsProcess);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [auditableUnitName, setAuditableUnitName] = React.useState("");
  const [processId, setProcessId] = React.useState("");
  const [subProcessId, setSubProcessId] = React.useState("");
  const [process, setProcess] = React.useState("");
  const [subProcess, setSubProcess] = React.useState("");
  const [data, setData] = React.useState({
    reason: "",
    jobType: "",
  });

  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleEdit() {
    if (
      data?.jobType === "" ||
      data?.reason === "" ||
      process === "" ||
      subProcess === "" ||
      processId === "" ||
      subProcessId === ""
    ) {
      toast.error("Provide all value");
    } else {
      if (!loading) {
        const selectedProcess = allProcess?.find(
          (all) => Number(all?.id) === Number(processId)
        );
        const selectedSubProcess = allSubProcess?.find(
          (all) => Number(all?.id) === Number(subProcessId)
        );
        const currentAuditableUnit = allAuditableUnits?.find(
          (all) => all?.id === selectedAuditableUnitId
        );
        let filteredUnitList = currentAuditableUnit?.unitList?.filter(
          (all) => all?.id !== selectedAuditableSubUnitId
        );
        filteredUnitList = [
          ...filteredUnitList,
          {
            id: selectedAuditableSubUnitId,
            reason: data?.reason,
            jobType: data?.jobType,
            processid: selectedProcess,
            subProcessid: selectedSubProcess,
          },
        ];

        dispatch(
          setupEditAuditableUnit({
            ...currentAuditableUnit,
            unitList: filteredUnitList,
          })
        );
      }
    }
  }

  function handleChangeProcess(event) {
    if (event?.target?.value) {
      setProcess(event?.target?.value);
      const selectedProcess = allProcess?.find(
        (all) => all?.description === event?.target?.value
      );
      setProcessId(selectedProcess?.id);
      setSubProcess("");
      setSubProcessId("");
    }
  }

  React.useEffect(() => {
    if (auditableUnitAddSuccess) {
      setData({
        jobType: "",
        reason: "",
      });
      setShowEditAuditableUnit(false);
      setProcess("");
      setSubProcess("");
      setProcessId("");
      setSubProcessId("");
      dispatch(resetAllValues());
    }
  }, [auditableUnitAddSuccess]);

  React.useEffect(() => {
    if (subProcess && allSubProcess?.length !== 0) {
      setSubProcessId(
        allSubProcess?.find((all) => all?.description === subProcess)?.id
      );
    }
  }, [subProcess, allSubProcess]);

  React.useEffect(() => {
    if (processId !== "") {
      dispatch(setupGetAllSubProcess(`?processId=${Number(processId)}`));
    }
  }, [processId]);

  React.useEffect(() => {
    if (allProcess?.length !== 0) {
      const selectedItem = allAuditableUnits
        ?.find((all) => all?.id === selectedAuditableUnitId)
        ?.unitList.filter((unit) => unit.id === selectedAuditableSubUnitId)[0];
      setData({ reason: selectedItem?.reason, jobType: selectedItem?.jobType });
      setProcess(selectedItem?.processid?.description);
      setProcessId(selectedItem?.processid?.id);
      setSubProcess(selectedItem?.subProcessid?.description);
      const selectedSingleItem = allAuditableUnits?.find(
        (all) => all?.id === selectedAuditableUnitId
      );
      setAuditableUnitName(selectedSingleItem?.jobName);

      if (selectedItem?.engagement?.natureThrough === "Compliance Checklist") {
        setData((pre) => {
          return {
            ...pre,
            jobType: "Compliance Checklist",
          };
        });
      }
      if (selectedItem?.engagement?.natureThrough === "Special Project/Audit") {
        setData((pre) => {
          return {
            ...pre,
            jobType: "Special Audit",
          };
        });
      }
    }
  }, [allProcess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllProcess(companyId));
    }
  }, []);

  return (
    <div className="p-4">
      <div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="heading">Auditable Units</div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-9 sub-heading">
                <span className="me-2 fw-bold">1.</span>
                {auditableUnitName}
              </div>
              <div className=" col-lg-3 text-end">
                <div
                  className="text-white bg-danger float-end  px-2 py-3 rounded shadow risk-rating-btn cursor-pointer"
                  onClick={() => {
                    setShowEditAuditableUnit(false);
                    setData({ jobType: "", reason: "" });
                    setProcess("");
                    setSubProcess("");
                    setProcessId("");
                    setSubProcessId("");
                    dispatch(resetAllValues());
                  }}
                >
                  Close
                </div>
              </div>
            </div>

            {processLoading ? (
              <CircularProgress />
            ) : (
              allProcess?.length !== 0 &&
              allSubProcess?.length !== 0 && (
                <div className="min-h-400">
                  <div className="row my-3">
                    <div className="col-lg-12">
                      <label>Auditable Unit</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Reason"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="reason"
                        value={data?.reason}
                        onChange={handleChange}
                      ></textarea>
                      <label className="word-limit-info label-text">
                        Maximum 1500 words
                      </label>
                    </div>
                  </div>

                  <div className="row mb-3">
                    {allAuditableUnits?.find(
                      (all) => all?.id === selectedAuditableUnitId
                    )?.engagement?.natureThrough === "Compliance Checklist" && (
                      <div className="col-lg-12">
                        <label>Job Type</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="jobType"
                          defaultValue={data?.jobType}
                        >
                          <option value="Compliance Checklist">
                            Compliance Checklist
                          </option>
                        </select>
                      </div>
                    )}
                    {allAuditableUnits?.find(
                      (all) => all?.id === selectedAuditableUnitId
                    )?.engagement?.natureThrough ===
                      "Special Project/Audit" && (
                      <div className="col-lg-12">
                        <label>Job Type</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="jobType"
                          defaultValue={data?.jobType}
                        >
                          <option value="Special Audit">Special Audit </option>
                        </select>
                      </div>
                    )}
                    {allAuditableUnits?.find(
                      (all) => all?.id === selectedAuditableUnitId
                    )?.engagement?.natureThrough === "Business Objective" && (
                      <div className="col-lg-12">
                        <label>Job Type</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="jobType"
                          value={data?.jobType}
                          onChange={handleChange}
                        >
                          <option value="">Select Option</option>
                          <option value="Review">Review</option>
                          <option value="Fraud & Investigation">
                            Fraud & Investigation
                          </option>
                          <option value="Assurance and Compiance">
                            Assurance and Compiance
                          </option>
                          <option value="Advisory and consulting">
                            Advisory and consulting
                          </option>
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label>Process</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={process}
                        onChange={(event) => handleChangeProcess(event)}
                      >
                        <option value="">Select Process</option>
                        {allProcess?.map((item, index) => {
                          return (
                            <option value={item?.description} key={index}>
                              {item?.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-lg-6">
                      <label>Sub-Process</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={subProcess}
                        onChange={(event) => {
                          if (event?.target?.value) {
                            setSubProcess(event?.target?.value);
                          }
                        }}
                      >
                        <option value="">Select SubProcess</option>
                        {allSubProcess?.map((item, index) => {
                          return (
                            <option key={index} value={item?.description}>
                              {item?.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="pb-4">
          <button
            className={`btn btn-primary   float-end ${loading && "disabled"}`}
            onClick={handleEdit}
          >
            {loading ? "Loading..." : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditableUnitRatingDialog;
