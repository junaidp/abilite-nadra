import React from "react";

const AuditExtraFields = ({ singleInternalAuditReport }) => {
  return (
    <div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Additional Fields</div>
        </div>
      </div>
      {!singleInternalAuditReport?.intAuditExtraFieldsList ||
        (singleInternalAuditReport?.intAuditExtraFieldsList?.length === 0 ? (
          <p>No data to show</p>
        ) : (
          singleInternalAuditReport?.intAuditExtraFieldsList?.map(
            (item, index) => {
              return (
                <div className="border px-3 py-2  mt-3 rounded" key={index}>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label>Heading</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter heading"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={item?.heading || ""}
                        name="heading"
                        disabled
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label>Data</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter heading"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={item?.data || ""}
                        name="data"
                        disabled
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ))}
    </div>
  );
};

export default AuditExtraFields;
