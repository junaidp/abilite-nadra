import React from "react";

const ComplianceCheckList = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  setComplianceCheckListId,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingeight">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseSeven"
          aria-expanded="false"
          aria-controls="flush-collapseSeven"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {currentAuditEngagement?.auditStepChecklistList !== null &&
                currentAuditEngagement?.auditStepChecklistList?.length !==
                  0 && (
                  <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                )}
              Compliance Checklist
            </div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseSeven"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="f-80">Sr No.</th>
                        <th>Location Name</th>
                        <th>Status</th>
                        <th>Change Request</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAuditEngagement?.auditStepChecklistList?.map(
                        (item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item?.id}</td>
                              <td>
                                <a
                                  className="fw-bold  text-primary  px-3 py-1 f-10"
                                  onClick={() => {
                                    setComplianceCheckListId(item?.id);
                                    setShowComplianceCheckListDialog(true);
                                  }}
                                >
                                  {item?.subLocation?.locationid?.description}
                                </a>
                              </td>
                              <td>null</td>
                              <td>null</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCheckList;
