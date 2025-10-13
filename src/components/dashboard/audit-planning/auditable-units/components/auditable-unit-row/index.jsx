import React from "react";
import { useSelector } from "react-redux";

const AuditableUnitRow = ({
  setSelectedAuditableUnitId,
  item,
  setAuditableUnitRatingDialog,
  setSelectedAuditableSubUnitId,
  index,
  loading,
  setCurrentObject,
  setShowSubmitDialog,
  setShowEditAuditableUnit,
  setShowViewDialog,
}) => {
  const { user } = useSelector((state) => state?.auth);
  function handleSubmitAuditableUnit(object) {
    setCurrentObject(object);
    setShowSubmitDialog(true);
  }
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
          {item?.completed && (
            <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          )}
          {item?.jobName}
        </button>
      </h2>
      <div
        id={`flush-collapse${index}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {(item?.completed === false ||
            (item?.completed === true &&
              item?.locked === false &&
              user[0]?.userId?.employeeid?.userHierarchy === "IAH")) && (
            <div
              className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
                loading && "disabled"
              }`}
              onClick={() => setAuditableUnitRatingDialog(true)}
            >
              {loading ? "Loading.." : "Add Audit Job"}
            </div>
          )}
          {item?.completed === false &&
            item?.unitList &&
            item?.unitList?.length > 0 && (
              <div
                className={`btn btn-labeled btn-primary px-3 shadow mx-4  my-4 ${
                  loading && "disabled"
                }`}
                onClick={() => handleSubmitAuditableUnit(item)}
              >
                {loading ? "Loading.." : "Submit Audit Job"}
              </div>
            )}
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr. #</th>
                  <th>Audit Jobs</th>
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
                        <td>{i + 1}</td>
                        <td className="cursor-pointer">{unit?.reason}</td>
                        <td>{unit?.jobType}</td>
                        <td>
                          <i
                            className="fa-eye fa f-18 cursor-pointer"
                            onClick={() => {
                              setSelectedAuditableSubUnitId(unit?.id);
                              setShowViewDialog(true);
                            }}
                          ></i>
                          {(item?.completed === false ||
                            (item?.completed === true &&
                              item?.locked === false &&
                              user[0]?.userId?.employeeid?.userHierarchy ===
                                "IAH")) && (
                            <i
                              className="fa fa-edit px-3 f-18 cursor-pointer"
                              onClick={() => {
                                setSelectedAuditableSubUnitId(unit?.id);
                                setShowEditAuditableUnit(true);
                              }}
                            ></i>
                          )}
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
