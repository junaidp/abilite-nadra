/**
 * Renders the list of additional fields in an internal audit report.
 * Displays read-only text areas for each heading and corresponding data.
 */
const AuditExtraFields = ({ singleInternalAuditReport }) => {
  const extraFields = singleInternalAuditReport?.intAuditExtraFieldsList || [];

  return (
    <div>
      {/* Section Heading */}
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading fw-bold">Additional Fields</div>
        </div>
      </div>

      {/* Display Extra Fields */}
      {extraFields.length === 0 ? (
        <p>No additional fields available.</p>
      ) : (
        extraFields.map((item, index) => (
          <div className="border px-3 py-2 mt-3 rounded" key={index}>
            {/* Heading Field */}
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Heading</label>
                <textarea
                  className="form-control"
                  placeholder="Enter heading"
                  rows="3"
                  name="heading"
                  value={item?.heading || ""}
                  disabled
                  readOnly
                />
              </div>
            </div>

            {/* Data Field */}
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Data</label>
                <textarea
                  className="form-control"
                  placeholder="Enter data"
                  rows="3"
                  name="data"
                  value={item?.data || ""}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AuditExtraFields;
