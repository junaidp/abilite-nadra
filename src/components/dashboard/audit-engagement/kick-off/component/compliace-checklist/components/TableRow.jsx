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
}) => {
  return (
    <tr>
      <td>{mainItem?.id}</td>
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
      <td>null</td>
      <td>null</td>
      <td>
        {checkStaus(mainItem) ? (
          <i className="fa fa-check-circle text-success f-18"></i>
        ) : (
          <i className="fa fa-check-circle text-danger  f-18"></i>
        )}
      </td>
      <td>
        {mainItem?.submitted === false && (
          <div className="mb-2">
            <div
              className={`btn btn-labeled btn-secondary px-3  shadow `}
              onClick={() => handleDownload(mainItem?.id)}
            >
              <span className="btn-label me-2">
                <i className="bi bi-box-arrow-down  f-18"></i>
              </span>
              Download
            </div>
          </div>
        )}

        {mainItem?.approved === true && (
          <button
            className={`btn btn-labeled btn-primary px-3  shadow disabled`}
          >
            Approved
          </button>
        )}

        <div className="mb-2">
          {checkStaus(mainItem) && mainItem?.submitted === false && (
            <button
              className={`btn btn-labeled btn-primary px-3  shadow ${
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
          )}
        </div>
        <div className="mb-2">
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
              <button
                className={`btn btn-labeled btn-primary px-3  shadow ${
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
            )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
