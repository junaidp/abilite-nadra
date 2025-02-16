import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllProcess,
  setupGetAllSubProcess,
  resetAllValues,
} from "../../../../../global-redux/reducers/settings/process/slice";
import { CircularProgress } from "@mui/material";
import RiskAssessment from "./risk-assessment";

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
  const [risks, setRisks] = React.useState([]);
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
      setRisks(selectedItem?.riskAssessments);
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
              <div className="d-flex justify-content-between mb-4 w-100">
                <div className="heading">Business Objective</div>
                <button
                  className="btn-close f-22"
                  type="button"
                  onClick={() => {
                    setShowViewDialog(false);
                    setData({ jobType: "", reason: "" });
                    setProcessId("");
                    setSubProcessId("");
                    dispatch(resetAllValues());
                  }}
                ></button>
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
                  <label className="mb-1">Selected Risks</label>
                  <RiskAssessment riskAssessments={risks} />
                  <div className="row my-3">
                    <div className="col-lg-12">
                      <label>Audit Job</label>
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
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label>Job Type</label>
                      <input
                        value={data?.jobType}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  {data?.jobType === "Previous Observation" ? (
                    <div className="row">
                      <div className="col-lg-6">
                        <label>Process</label>
                        <input
                          value="Previous Observation Process"
                          className="form-control"
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="col-lg-6">
                        <label>Sub Process</label>
                        <input
                          value="Previous Observation Sub Process"
                          className="form-control"
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-lg-6">
                        <label>Process</label>
                        <input
                          value={
                            allProcess?.find(
                              (process) => process?.id === processId
                            )?.description
                          }
                          className="form-control"
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="col-lg-6 mb-3">
                        <label>Sub Process</label>
                        <input
                          value={
                            allSubProcess?.find(
                              (subProcess) => subProcess?.id === subProcessId
                            )?.description
                          }
                          className="form-control"
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                  )}
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
