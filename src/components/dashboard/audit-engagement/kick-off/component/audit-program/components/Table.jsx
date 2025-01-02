import React from "react";

const Table = ({
  currentAuditEngagement,
  getDescription,
  handleChange,
  handleUpdate,
  handleEditable,
  loading,
  currentButtonId,
  handleAllowEdit,
}) => {
  return (
    <table className="table table-bordered  table-hover rounded">
      <thead>
        <tr>
          <th>Sr. #</th>
          <th>Control</th>
          <th>Rating</th>
          <th>Audit Program</th>
          {handleAllowEdit() === true && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {currentAuditEngagement?.auditProgram?.programList?.length === 0 ||
        currentAuditEngagement?.auditProgram === null ? (
          <tr>
            <td className="w-300">No program list to show</td>
          </tr>
        ) : (
          currentAuditEngagement?.auditProgram?.programList?.map(
            (item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <textarea
                      className="form-control"
                      id="exampleFormControlT"
                      rows="3"
                      value={getDescription(item?.controlRisk_id) || "null"}
                      readOnly
                      disabled
                    ></textarea>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={item?.rating}
                        name="rating"
                        onChange={(event) => handleChange(event, item?.id)}
                        disabled={item?.editable === true ? false : true}
                      >
                        <option value="">Select One</option>
                        <option value={1}>High</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Low</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <textarea
                      id="exampleFormControlT"
                      rows="3"
                      value={item?.description || ""}
                      name="description"
                      onChange={(event) => handleChange(event, item?.id)}
                      disabled={item?.editable === true ? false : true}
                      maxLength="500"
                      className={`form-control  ${
                        item?.description?.length >= 500 && "error-border"
                      }`}
                    ></textarea>
                    <p className="word-limit-info label-text mb-2">
                      Maximum 500 characters
                    </p>
                  </td>
                  {handleAllowEdit() === true && (
                    <td>
                      {item?.editable === false && (
                        <i
                          className="fa fa-edit f-18 cursor-pointer"
                          onClick={() => handleEditable(item)}
                        ></i>
                      )}
                      {item?.editable === true && (
                        <button
                          className={`btn btn-labeled mt-2 btn-primary shadow ${
                            loading &&
                            item?.id === currentButtonId &&
                            "disabled"
                          }`}
                          onClick={() => handleUpdate(item)}
                        >
                          {loading && item?.id === currentButtonId
                            ? "Loading..."
                            : "Save"}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            }
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
