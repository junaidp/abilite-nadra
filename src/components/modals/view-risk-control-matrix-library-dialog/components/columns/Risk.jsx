import React from "react";

const Risk = ({ objective }) => {
  return (
    <td>
      {objective?.rcmLibraryRiskRating?.map((risk, riskIndex) => {
        return (
          <div key={riskIndex}>
            <div>
              <div className="col-lg-12 mb-2">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  value={risk?.rating}
                  disabled
                  readOnly
                  name="rating"
                >
                  <option value="">Select One</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>
              <textarea
                className="form-control mb-4"
                value={risk?.description}
                readOnly
                id="exampleFormCon"
                rows="3"
                name="description"
                disabled
              ></textarea>

              {/* Hidden  Only */}
              <div className="visibility-0">
                {risk?.rcmLibraryControlRisk
                  ?.slice(1)
                  ?.map((_, controlIndex) => {
                    return (
                      <div key={controlIndex}>
                        <div className="col-lg-12 mb-2">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={1}
                            readOnly
                            disabled
                          >
                            <option value="">Select One</option>
                            <option value={1}>High</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Low</option>
                          </select>
                        </div>
                        <textarea
                          className="form-control mb-4"
                          value="Some"
                          id="exampleFormCon"
                          rows="3"
                          readOnly
                          disabled
                        ></textarea>
                      </div>
                    );
                  })}
              </div>
              {/* Hidden  Only */}
            </div>
          </div>
        );
      })}
    </td>
  );
};

export default Risk;
