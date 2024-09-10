import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectJob = ({
  internalAuditReportObject,
  jobForInternalAuditReportId,
  handleChange,
  jobsForInternalAuditReports,
  handleGetInternalAuditReportObject,
  loading,
}) => {
  return (
    <div>
      {Object.keys(internalAuditReportObject).length === 0 &&
        internalAuditReportObject.constructor === Object && (
          <div className="row pt-4">
            <div className="col-lg-10">
              <FormControl fullWidth>
                <Select
                  native
                  value={jobForInternalAuditReportId}
                  onChange={handleChange}
                  id="grouped-native-select"
                  fullWidth
                >
                  <option aria-label="None" value="" />
                  {jobsForInternalAuditReports?.map((job, index) => {
                    return (
                      <optgroup label={job?.title} key={index}>
                        {job?.reportingList
                          .filter(
                            (job, index, self) =>
                              index ===
                              self.findIndex(
                                (t) => t.subLocation === job.subLocation
                              )
                          )
                          ?.map((observation, subIndex) => {
                            return (
                              <option
                                value={job?.id + " " + observation?.subLocation}
                                key={subIndex}
                              >
                                {job?.subLocationList?.find(
                                  (subLocation) =>
                                    subLocation?.id === observation?.subLocation
                                )?.description + `(${job?.title})`}
                              </option>
                            );
                          })}
                      </optgroup>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-2">
              <div
                className={`btn btn-labeled btn-primary px-3 shadow my-4 ${
                  loading && "disabled"
                }`}
                onClick={handleGetInternalAuditReportObject}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-check-circle f-18"></i>
                </span>
                {loading ? "Loading.." : "Create Report"}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default SelectJob;
