import React from "react";

const AuditableUnitRow = ({
  setSelectedAuditableUnitId,
  item,
  setAuditableUnitRatingDialog,
  setSelectedAuditableSubUnitId,
  setShowEditAuditableUnit,
  index,
  loading
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${index}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${index}`}
          onClick={() => setSelectedAuditableUnitId(item?.id)}
        >
          {item?.jobName}
        </button>
      </h2>
      <div
        id={`flush-collapse${index}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
              loading && "disabled"
            }`}
            onClick={() => setAuditableUnitRatingDialog(true)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {loading ? "Loading.." : "Add Auditable Unit"}
          </div>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr. #</th>
                  <th>Auditable Unit</th>
                  <th>Job Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {item?.unitList?.length === 0 ? (
                  <tr>
                    <td className="w-300">No Unit To show</td>
                  </tr>
                ) : (
                  item?.unitList?.map((unit, i) => {
                    return (
                      <tr className="h-40" key={i}>
                        <td>{unit?.id}</td>
                        <td className="cursor-pointer">{unit?.reason}</td>
                        <td>{unit?.jobType}</td>
                        <td>
                          <i
                            className="fa fa-edit  px-3 f-18 cursor-pointer"
                            onClick={() => {
                              setSelectedAuditableSubUnitId(unit?.id);
                              setShowEditAuditableUnit(true);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditableUnitRow;
