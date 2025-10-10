import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * Renders a dropdown list of jobs for creating an internal audit report.
 * Allows selecting a job/sub-location and triggering report creation.
 */
const SelectJob = ({
  internalAuditReportObject,
  jobForInternalAuditReportId,
  handleChange,
  jobsForInternalAuditReports,
  handleGetInternalAuditReportObject,
  loading,
}) => {
  // Show dropdown only if no report object currently exists
  const isReportEmpty =
    Object.keys(internalAuditReportObject).length === 0 &&
    internalAuditReportObject.constructor === Object;

  return (
    <div>
      {isReportEmpty && (
        <div className="row pt-4">
          {/* Job Selection Dropdown */}
          <div className="col-lg-10">
            <FormControl fullWidth>
              <Select
                native
                id="grouped-native-select"
                value={jobForInternalAuditReportId}
                onChange={handleChange}
                fullWidth
              >
                <option aria-label="None" value="" />
                {jobsForInternalAuditReports?.map((job, index) => (
                  <optgroup label={job?.title} key={index}>
                    {/* Filter to ensure unique sub-locations per job */}
                    {job?.reportingList
                      ?.filter(
                        (item, idx, arr) =>
                          idx ===
                          arr.findIndex(
                            (t) => t.subLocation === item.subLocation
                          )
                      )
                      ?.map((observation, subIndex) => {
                        const subLocationDesc =
                          job?.subLocationList?.find(
                            (subLocation) =>
                              subLocation?.id === observation?.subLocation
                          )?.description || "Unnamed Sub-Location";

                        return (
                          <option
                            key={subIndex}
                            value={`${job?.id} ${observation?.subLocation}`}
                          >
                            {`${subLocationDesc} (${job?.title})`}
                          </option>
                        );
                      })}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Create Report Button */}
          <div className="col-lg-2">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow my-4 ${loading ? "disabled" : ""
                }`}
              onClick={handleGetInternalAuditReportObject}
            >
              {loading ? "Loading.." : "Create Report"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectJob;
