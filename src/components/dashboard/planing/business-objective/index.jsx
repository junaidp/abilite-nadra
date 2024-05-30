import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import BusinessObjectiveModal from "../../../modals/add-engagement-audit-dialog/index";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {
  setupGetAllEngagements,
  resetAddEngagementSuccess,
} from "../../../../global-redux/reducers/planing/engagement/slice";
import { CircularProgress } from "@mui/material";
import TableRow from "./components/table-row";
import DeleteEngagementDialog from "./components/DeleteDialog";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};
const BusinessObjective = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allEngagements, loading, engagementAddSuccess } = useSelector(
    (state) => state.planingEngagements
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [businessObjectiveDialog, setBusinessObjectiveDialog] =
    React.useState(false);
  const [deleteEngagementDialog, setShowDeleteEngagementDialog] =
    React.useState(false);
  const [currentEngagementId, setCurrentEngagementId] = React.useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };
  function handleClickEngagement(id, name) {
    if (name === "Business Objective") {
      navigate(`/audit/business-objectives-redirect?engagementId=${id}`);
    }
    if (name === "Special Project/Audit") {
      navigate(`/audit/special-project-audit?engagementId=${id}`);
    }
    if (name === "Compliance Checklist") {
      navigate(`/audit/compliance-checklist-card?engagementId=${id}`);
    }
  }

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllEngagements(companyId));
    }
  }, [user, company]);

  React.useEffect(() => {
    if (engagementAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllEngagements(companyId));
        dispatch(resetAddEngagementSuccess());
      }
    }
  }, [engagementAddSuccess]);

  return (
    <div>
      {businessObjectiveDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <BusinessObjectiveModal
              setBusinessObjectiveDialog={setBusinessObjectiveDialog}
            />
          </div>
        </div>
      )}
      {deleteEngagementDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteEngagementDialog
              setShowDeleteEngagementDialog={setShowDeleteEngagementDialog}
              currentEngagementId={currentEngagementId}
            />
          </div>
        </div>
      )}
      <div>
        <section className="faq-section ">
          <div data-aos="fade-up">
            <header className="section-header my-3  text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Business Objective</div>
              <div className="">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow ${
                    loading && "disabled"
                  }`}
                  onClick={() => {
                    !loading && setBusinessObjectiveDialog(true);
                  }}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus-circle"></i>
                  </span>
                  {loading ? "Loading.." : "Add Engagement"}
                </div>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography
                        color="inherit"
                        className="mb-2"
                        style={poppinsStyle}
                      >
                        Click to add a new engagement by selecting an option
                        through
                      </Typography>
                      <ul
                        style={{
                          ...poppinsStyle,
                          paddingLeft: "20px",
                          margin: "0",
                        }}
                      >
                        <li>Business Objective</li>
                        <li>Special project/Audit</li>
                        <li>Compliance Checklist</li>
                      </ul>
                    </React.Fragment>
                  }
                  arrow
                >
                  <i className="fa fa-info-circle ps-3 text-secondary cursor-pointer"></i>
                </Tooltip>
              </div>
            </header>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="w-80">Sr No.</th>
                        <th>Engagement Name</th>
                        <th>Nature Through</th>
                        <th>Initiated By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr className="p-2">
                          <td>
                            <CircularProgress />
                          </td>
                        </tr>
                      ) : allEngagements?.length === 0 ? (
                        <tr>
                          <td className="w-300">No Engagement To Show</td>
                        </tr>
                      ) : (
                        allEngagements
                          ?.slice((page - 1) * 10, page * 10)
                          .map((item, index) => {
                            return (
                              <TableRow
                                key={index}
                                item={item}
                                handleClickEngagement={handleClickEngagement}
                                setShowDeleteEngagementDialog={
                                  setShowDeleteEngagementDialog
                                }
                                setCurrentEngagementId={setCurrentEngagementId}
                              />
                            );
                          })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              count={Math.ceil(allEngagements?.length / 10)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BusinessObjective;
