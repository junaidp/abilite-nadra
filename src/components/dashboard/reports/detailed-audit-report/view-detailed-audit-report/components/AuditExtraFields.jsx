
const AuditExtraFields = ({ singleInternalAuditReport }) => {
  // ✅ Extract extra fields list for clarity
  const extraFields = singleInternalAuditReport?.intAuditExtraFieldsList || [];

  return (
    <div>
      {/* Section Heading */}
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading fw-bold">Additional Fields</div>
        </div>
      </div>

      {extraFields.length === 0 ? (
        // ✅ No data case
        <p>No data to show</p>
      ) : (
        // ✅ Render each extra field block
        extraFields.map((item, index) => (
          <div className="border px-3 py-2 mt-3 rounded" key={index}>
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Heading</label>
                <textarea
                  className="form-control"
                  placeholder="Enter heading"
                  rows="3"
                  value={item?.heading || ""}
                  name="heading"
                  disabled
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Data</label>
                <textarea
                  className="form-control"
                  placeholder="Enter data"
                  rows="3"
                  value={item?.data || ""}
                  name="data"
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
