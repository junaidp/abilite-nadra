import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllProcess,
  setupGetAllSubProcess,
  resetAllValues,
} from "../../../../../global-redux/reducers/settings/process/slice";
import { CircularProgress } from "@mui/material";

const AuditableUnitRatingDialog = ({
  setShowViewDialog,
  selectedAuditableUnitId,
  selectedAuditableSubUnitId,
}) => {
  const dispatch = useDispatch();
  const { allAuditableUnits } = useSelector(
    (state) => state?.planningAuditableUnit
  );
  const {
    allProcess,
    allSubProcess,
    loading: processLoading,
  } = useSelector((state) => state?.settingsProcess);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [auditableUnitName, setAuditableUnitName] = React.useState("");
  const [processId, setProcessId] = React.useState("");
  const [subProcessId, setSubProcessId] = React.useState("");
  const [data, setData] = React.useState({
    reason: "",
    jobType: "",
  });

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
      setProcessId(selectedItem?.processid);
      setSubProcessId(selectedItem?.subProcessid);
      const selectedSingleItem = allAuditableUnits?.find(
        (all) => all?.id === selectedAuditableUnitId
      );
      setAuditableUnitName(selectedSingleItem?.jobName);
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
              <div className="col-lg-9 sub-heading">{auditableUnitName}</div>
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
                        disabled
                        readOnly
                        maxLength="500"
                      ></textarea>
                      <p className="word-limit-info label-text mb-2">
                        Maximum 500 characters
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label>Job Type</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="jobType"
                        disabled
                        readOnly
                      >
                        <option value="Compliance Checklist">
                          Compliance Checklist
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label>Process</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={processId}
                        disabled
                        readOnly
                      >
                        <option value="">Select Process</option>
                        {allProcess?.map((item, index) => {
                          return (
                            <option value={item?.id} key={index}>
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
                        value={subProcessId}
                        disabled
                        readOnly
                      >
                        <option value="">Select SubProcess</option>
                        {allSubProcess?.map((item, index) => {
                          return (
                            <option key={index} value={item?.id}>
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
        <div>
          <div className="d-flex float-right">
            <div
              className="text-white bg-danger float-end  px-2 py-3 rounded shadow risk-rating-btn cursor-pointer"
              onClick={() => {
                setShowViewDialog(false);
                setData({ jobType: "", reason: "" });
                setProcessId("");
                setSubProcessId("");
                dispatch(resetAllValues());
              }}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditableUnitRatingDialog;
