import React from "react";

const Table = ({
  index,
  item,
  handleChangePriority,
  handleChangeYear,
  handleEditEditable,
  handleEdit,
  handleSubmit,
  handleApprove,
  allAuditPlanSummary,
  user,
  currentId,
  loading,
  setDeletePlanSummaryDialog,
  setCurrentPlanSummaryId,
  setFeedBackDialog,
  setViewFeedBackDialog,
}) => {
  return (
    <tbody>
      <tr>
        <td>{item?.id}</td>
        <td className="min-w-300">{item?.title}</td>
        {/* <td className="normal-text">Low</td> */}
        <td>
          <select
            className="form-select w-80"
            aria-label="Default select example"
            name="priority"
            value={item?.priority || ""}
            onChange={(event) => handleChangePriority(event, item?.id)}
            disabled={item?.editable === false ? true : false}
          >
            <option value="">Select One</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </td>
        <td className="normal-text">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              disabled={item?.editable === false ? true : false}
              checked={item?.threeYearsAgo || false}
              name="threeYearsAgo"
              onChange={(event) => handleChangeYear(event, item?.id)}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault"
            ></label>
          </div>
        </td>
        <td className="normal-text">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flex"
              disabled={item?.editable === false ? true : false}
              checked={item?.twoYearsAgo || false}
              name="twoYearsAgo"
              onChange={(event) => handleChangeYear(event, item?.id)}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault"
            ></label>
          </div>
        </td>
        <td className="normal-text">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              checked={item?.lastYear || false}
              id="lastYear"
              name="lastYear"
              disabled={item?.editable === false ? true : false}
              onChange={(event) => handleChangeYear(event, item?.id)}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault"
            ></label>
          </div>
        </td>
        <td className="normal-text">{item?.serviceProvider}</td>
        <td className="normal-text">{item?.iaa}</td>
        <td className="normal-text">{item?.total}</td>
        <td className="normal-text">{item?.q1}</td>
        <td className="normal-text">{item?.q2}</td>
        <td className="normal-text">{item?.q3}</td>
        <td className="normal-text">{item?.q4}</td>
        <td className="normal-text"></td>
        <td className="w-300">
          <div className={`d-flex flex-wrap gap-2`}>
            {(allAuditPlanSummary[index]?.completed === false ||
              (allAuditPlanSummary[index]?.completed === true &&
                allAuditPlanSummary[index]?.locked === false &&
                (Number(item?.initiatorTLEB) ===
                  Number(user[0]?.userId?.employeeid?.id) ||
                  user[0]?.userId?.employeeid?.userHierarchy === "IAH"))) && (
              <div>
                {item?.editable === false && (
                  <i
                    className="fa fa-edit f-18 cursor-pointer"
                    onClick={() => handleEditEditable(item)}
                  ></i>
                )}
                {item?.editable === true && (
                  <div
                    className={`btn btn-labeled btn-primary shadow ${
                      loading &&
                      Number(currentId) === Number(item?.id) &&
                      "disabled"
                    }`}
                    onClick={() => handleEdit(item)}
                  >
                    {loading && Number(currentId) === Number(item?.id)
                      ? "Loading..."
                      : "Save"}
                  </div>
                )}
              </div>
            )}
            {item?.approved === false && (
              <i
                className="fa fa-trash text-danger f-18 cursor-pointer"
                onClick={() => {
                  setDeletePlanSummaryDialog(true);
                  setCurrentPlanSummaryId(item?.id);
                }}
              ></i>
            )}
            {(allAuditPlanSummary[index]?.submitted === false ||
              allAuditPlanSummary[index]?.completed === false) &&
              allAuditPlanSummary[index]?.priority &&
              allAuditPlanSummary[index]?.priority !== "" &&
              allAuditPlanSummary[index]?.threeYearsAgo !== null &&
              allAuditPlanSummary[index]?.twoYearsAgo !== null &&
              allAuditPlanSummary[index]?.lastYear !== null && (
                <div
                  className={`btn btn-labeled btn-primary shadow ${
                    loading &&
                    Number(currentId) === Number(item?.id) &&
                    "disabled"
                  }`}
                  onClick={() => handleSubmit(item)}
                >
                  {loading && Number(currentId) === Number(item?.id)
                    ? "Loading..."
                    : "Submit"}
                </div>
              )}
            {allAuditPlanSummary[index]?.submitted === true &&
              allAuditPlanSummary[index]?.completed === true &&
              allAuditPlanSummary[index]?.approved === false &&
              allAuditPlanSummary[index]?.locked === false &&
              allAuditPlanSummary[index]?.priority &&
              allAuditPlanSummary[index]?.priority !== "" &&
              allAuditPlanSummary[index]?.threeYearsAgo !== null &&
              allAuditPlanSummary[index]?.twoYearsAgo !== null &&
              allAuditPlanSummary[index]?.lastYear !== null &&
              (Number(item?.initiatorTLEB) ===
                Number(user[0]?.userId?.employeeid?.id) ||
                user[0]?.userId?.employeeid?.userHierarchy === "IAH") && (
                <div
                  className={`btn btn-labeled btn-primary shadow ${
                    loading &&
                    Number(currentId) === Number(item?.id) &&
                    "disabled"
                  }`}
                  onClick={() => handleApprove(item)}
                >
                  {loading && Number(currentId) === Number(item?.id)
                    ? "Loading..."
                    : "Approve"}
                </div>
              )}

            {allAuditPlanSummary[index]?.submitted === true &&
              allAuditPlanSummary[index]?.completed === true &&
              allAuditPlanSummary[index]?.approved === false &&
              allAuditPlanSummary[index]?.locked === false &&
              allAuditPlanSummary[index]?.priority &&
              allAuditPlanSummary[index]?.priority !== "" &&
              allAuditPlanSummary[index]?.threeYearsAgo !== null &&
              allAuditPlanSummary[index]?.twoYearsAgo !== null &&
              allAuditPlanSummary[index]?.lastYear !== null &&
              (Number(item?.initiatorTLEB) ===
                Number(user[0]?.userId?.employeeid?.id) ||
                user[0]?.userId?.employeeid?.userHierarchy === "IAH") && (
                <div
                  className={`btn btn-labeled btn-primary shadow `}
                  onClick={() => {
                    setCurrentPlanSummaryId(item?.id);
                    setFeedBackDialog(true);
                  }}
                >
                  FeedBack
                </div>
              )}
            {item?.feedback && item?.feedback?.id && (
              <div
                className={`btn btn-labeled btn-primary shadow `}
                onClick={() => {
                  setCurrentPlanSummaryId(item?.id);
                  setViewFeedBackDialog(true);
                }}
              >
                View FeedBack
              </div>
            )}
            {item?.approved === true && item?.locked === true && (
              <button className={`btn btn-labeled btn-primary shadow disabled`}>
                Approved
              </button>
            )}
            {item?.approved === false &&
              item?.locked === false &&
              item?.submitted === true &&
              item?.completed === true && (
                <button
                  className={`btn btn-labeled btn-primary shadow disabled`}
                >
                  Submitted
                </button>
              )}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default Table;
