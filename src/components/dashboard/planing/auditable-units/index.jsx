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
import AuditableUnitRow from "./components/auditable-unit-row";

const AuditableUnits = () => {
  const dispatch = useDispatch();
  const { loading, allAuditableUnits, auditableUnitAddSuccess } = useSelector(
    (state) => state?.planingAuditableUnit
  );
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [auditableUnitRatingDialog, setAuditableUnitRatingDialog] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const [selectedAuditableUnitId, setSelectedAuditableUnitId] =
    React.useState("");
  const [selectedAuditableSubUnitId, setSelectedAuditableSubUnitId] =
    React.useState("");
  const [showEditAuditableUnit, setShowEditAuditableUnit] =
    React.useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

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
              <div className="mb-0 heading">Auditable Units</div>
            </header>

            <div className="row">
              <div className="col-md-12">
                <div className="accordion" id="accordionFlushExample">
                  {loading ? (
                    <CircularProgress />
                  ) : allAuditableUnits?.length === 0 ? (
                    <p>No data to show!</p>
                  ) : (
                    allAuditableUnits
                      ?.slice((page - 1) * 5, page * 5)
                      ?.map((item, index) => {
                        return (
                          <AuditableUnitRow
                            setSelectedAuditableUnitId={
                              setSelectedAuditableUnitId
                            }
                            key={index}
                            item={item}
                            setAuditableUnitRatingDialog={
                              setAuditableUnitRatingDialog
                            }
                            setSelectedAuditableSubUnitId={
                              setSelectedAuditableSubUnitId
                            }
                            setShowEditAuditableUnit={setShowEditAuditableUnit}
                            index={index}
                            loading={loading}
                          />
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
