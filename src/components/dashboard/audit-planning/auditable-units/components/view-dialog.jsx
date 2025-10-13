import React from "react";
import { useSelector } from "react-redux";
import RiskAssessment from "./risk-assessment";
import { Chip } from "@mui/material";

const ViewAuditJobDialog = ({
  setShowViewDialog,
  selectedAuditableUnitId,
  selectedAuditableSubUnitId,
}) => {
  const { allAuditableUnits, processess } = useSelector(
    (state) => state?.planningAuditableUnit
  );
  const [auditableUnitName, setAuditableUnitName] = React.useState("");
  const [risks, setRisks] = React.useState([]);
  const [data, setData] = React.useState({
    reason: "",
    jobType: "",
    processes: [],
    subProcessess: []
  });


  React.useEffect(() => {
    const selectedItem = allAuditableUnits
      ?.find((all) => all?.id === selectedAuditableUnitId)
      ?.unitList.filter((unit) => unit.id === selectedAuditableSubUnitId)[0];
    const SubProcesses = processess.flatMap(
      (proc) => proc.subProcesses || []
    );
    setData({ reason: selectedItem?.reason, jobType: selectedItem?.jobType, processes: processess.filter((process) => selectedItem.processids.includes(process.id)), subProcessess: SubProcesses.filter((subProcess) => selectedItem.subProcessids.includes(subProcess.id)) });

    const selectedSingleItem = allAuditableUnits?.find(
      (all) => all?.id === selectedAuditableUnitId
    );
    setAuditableUnitName(selectedSingleItem?.jobName);
    setRisks(selectedItem?.riskAssessments);
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
                  }}
                ></button>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-9 sub-heading">{auditableUnitName}</div>
            </div>
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
                    <label className="mb-2 flex-wrap">Process</label>
                    <div className="d-flex gap-4">
                      {
                        data?.processes.map((process, index) => {
                          return <Chip label={process?.description} key={index} />
                        })
                      }
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <label className="mb-2">Sub Process</label>
                    <div className="d-flex gap-4 flex-wrap">
                      {
                        data?.subProcessess.map((subProcess, index) => {
                          return <Chip label={subProcess?.description} key={index} />
                        })
                      }
                    </div>
                  </div>


                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex float-right">
            <div
              className="text-white bg-danger float-end  px-2 py-3 rounded shadow risk-rating-btn cursor-pointer"
              onClick={() => {
                setShowViewDialog(false);
                setData({ jobType: "", reason: "" });
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

export default ViewAuditJobDialog;
