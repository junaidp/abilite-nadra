import React from "react";
import "./index.css";
// import Pagination from "../../../common/pagination/Pagination";
import EditAuditableUnit from "../../../modals/edit-auditable-unit";
import AuditableUnitRatingDialog from "../../../modals/auditable-unit-rating-dialog/index";
import {
  setupGetAllAuditableUnits,
  resetAuditableUnitSuccess,
} from "../../../../global-redux/reducers/planing/auditable-units/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const AuditableUnits = () => {
  const [auditableUnitRatingDialog, setAuditableUnitRatingDialog] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [selectedAuditableUnitId, setSelectedAuditableUnitId] =
    React.useState("");
  const [selectedAuditableSubUnitId, setSelectedAuditableSubUnitId] =
    React.useState("");
  const dispatch = useDispatch();
  const { loading, allAuditableUnits, auditableUnitAddSuccess } = useSelector(
    (state) => state?.planingAuditableUnit
  );
  const [showEditAuditableUnit, setShowEditAuditableUnit] =
    React.useState(false);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);

  React.useEffect(() => {
    if (auditableUnitAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllAuditableUnits(companyId));
      }
      dispatch(resetAuditableUnitSuccess());
    }
  }, [auditableUnitAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllAuditableUnits(companyId));
    }
  }, [user]);

  return (
    <div>
      {auditableUnitRatingDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <AuditableUnitRatingDialog
              setAuditableUnitRatingDialog={setAuditableUnitRatingDialog}
              selectedAuditableUnitId={selectedAuditableUnitId}
            />
          </div>
        </div>
      )}
      {showEditAuditableUnit && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <EditAuditableUnit
              setShowEditAuditableUnit={setShowEditAuditableUnit}
              selectedAuditableUnitId={selectedAuditableUnitId}
              selectedAuditableSubUnitId={selectedAuditableSubUnitId}
            />
          </div>
        </div>
      )}
      <div>
        <section className="faq-section">
          <div className="container" data-aos="fade-up">
            <header className="section-header my-3 align-items-center  text-start d-flex ">
              <a
                className="text-primary"
                onClick={() => navigate("/audit/business-objective")}
              >
                <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
              </a>
              <h3 className="mb-0 fw-bold">Auditable Units</h3>
            </header>

            <div className="row">
              <div className="col-md-12">
                <div className="accordion" id="accordionFlushExample">
                  {loading ? (
                    <CircularProgress />
                  ) : allAuditableUnits?.length === 0 ? (
                    <h3>No data to show!</h3>
                  ) : (
                    allAuditableUnits
                      ?.slice((page - 1) * 5, page * 5)
                      ?.map((item, index) => {
                        return (
                          <div className="accordion-item" key={index}>
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#flush-collapse${index}`}
                                aria-expanded="false"
                                aria-controls={`flush-collapse${index}`}
                                onClick={() =>
                                  setSelectedAuditableUnitId(item?.id)
                                }
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
                                  onClick={() =>
                                    setAuditableUnitRatingDialog(true)
                                  }
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18"></i>
                                  </span>
                                  {loading ? "Loading.." : "Add Unit"}
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
                                          <td>No Unit To show</td>
                                        </tr>
                                      ) : (
                                        item?.unitList?.map((unit, i) => {
                                          return (
                                            <tr className="h-40" key={i}>
                                              <td>{unit?.id}</td>
                                              <td className="cursor-pointer">
                                                {unit?.reason}
                                              </td>
                                              <td>{unit?.jobType}</td>
                                              <td>
                                                <i
                                                  className="fa fa-edit  px-3 f-18 cursor-pointer"
                                                  onClick={() => {
                                                    setSelectedAuditableSubUnitId(
                                                      unit?.id
                                                    );
                                                    setShowEditAuditableUnit(
                                                      true
                                                    );
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
                      })
                  )}
                </div>
              </div>
              <Pagination
                count={Math.ceil(allAuditableUnits?.length / 5)}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuditableUnits;
