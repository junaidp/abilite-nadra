import React from "react";

const TableRow = ({
  mainItem,
  setComplianceCheckListMainId,
  setShowComplianceCheckListDialog,
  checkStaus,
  user,
  loading,
  currentButtonId,
  handleSubmit,
  handleApprove,
  handleDownload,
  setCurrentButtonId,
  currentAuditEngagement,
  index,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <a
          className="fw-bold  text-primary  px-3 py-1 f-10"
          onClick={() => {
            setComplianceCheckListMainId(mainItem?.id);
            setShowComplianceCheckListDialog(true);
          }}
        >
          {mainItem?.subLocationDescription || "No Sub Location Provided"}
        </a>
      </td>
      <td>
        {checkStaus(mainItem) ? (
          <i className="fa fa-check-circle text-success f-18"></i>
        ) : (
          <i className="fa fa-check-circle text-danger  f-18"></i>
        )}
      </td>
      <td>
        <div className="row">
          {mainItem?.submitted === false && (
            <div className="col-lg-4">
              <div
                className={`btn btn-labeled btn-secondary shadow items-center d-flex`}
                onClick={() => handleDownload(mainItem?.id)}
              >
                <span className="btn-label me-2">
                  <i className="bi bi-box-arrow-down f-18"></i>
                </span>
                Download
              </div>
            </div>
          )}

          {mainItem?.approved === true && (
            <div className="col-lg-3">
              <button className={`btn btn-labeled btn-primary shadow disabled`}>
                Approved
              </button>
            </div>
          )}

          {checkStaus(mainItem) && mainItem?.submitted === false && (
            <div className="col-lg-3">
              <button
                className={`btn btn-labeled btn-primary shadow ${
                  loading &&
                  Number(mainItem?.id) === Number(currentButtonId) &&
                  "disabled"
                }`}
                onClick={() => {
                  setCurrentButtonId(mainItem?.id);
                  handleSubmit(mainItem);
                }}
              >
                {loading && Number(mainItem?.id) === Number(currentButtonId)
                  ? "Loading..."
                  : "Submit"}
              </button>
            </div>
          )}
          {checkStaus(mainItem) &&
            mainItem?.submitted === true &&
            mainItem?.approved === false &&
            (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
              Number(user[0]?.userId?.id) ===
                Number(
                  currentAuditEngagement?.resourceAllocation
                    ?.backupHeadOfInternalAudit?.id
                ) ||
              Number(user[0]?.userId?.id) ===
                Number(
                  currentAuditEngagement?.resourceAllocation
                    ?.proposedJobApprover?.id
                )) && (
              <div className="col-lg-3">
                <button
                  className={`btn btn-labeled btn-primary shadow ${
                    loading &&
                    Number(mainItem?.id) === Number(currentButtonId) &&
                    "disabled"
                  }`}
                  onClick={() => {
                    setCurrentButtonId(mainItem?.id);
                    handleApprove(mainItem);
                  }}
                >
                  {loading && Number(mainItem?.id) === Number(currentButtonId)
                    ? "Loading..."
                    : "Approve"}
                </button>
              </div>
            )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
