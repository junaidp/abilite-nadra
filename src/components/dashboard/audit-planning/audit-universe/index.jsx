import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Tooltip,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

// ---- Local imports ----
import BusinessObjectiveModal from "../../../modals/add-engagement-audit-dialog";
import DeleteEngagementDialog from "./components/DeleteDialog";
import TableRow from "./components/table-row";
import { encryptAndEncode } from "../../../../config/helper";

// ---- Redux slices ----
import {
  setupGetAllEngagements,
  resetAddEngagementSuccess,
} from "../../../../global-redux/reducers/planing/engagement/slice";

// ---- Local font style for tooltip ----
const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};

/**
 * AuditUniverse Component
 * --------------------------------
 * Displays the "Audit Universe" list.
 * Allows:
 *  - Viewing existing engagements
 *  - Adding new ones (via modal)
 *  - Deleting engagements (via modal)
 *  - Pagination with selectable items per page
 */
const AuditUniverse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---- Redux state selectors ----
  const { allEngagements, loading, engagementAddSuccess, totalNoOfRecords } =
    useSelector((state) => state.planningEngagement);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);

  // ---- Local UI states ----
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [businessObjectiveDialog, setBusinessObjectiveDialog] = React.useState(false);
  const [deleteEngagementDialog, setShowDeleteEngagementDialog] = React.useState(false);
  const [currentEngagementId, setCurrentEngagementId] = React.useState("");

  /**
   * Utility: Extract companyId from user & company name.
   * Prevents repetitive code and ensures clean lookups.
   */
  const getCompanyId = React.useCallback(() => {
    return user?.[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
  }, [user, company]);

  /**
   * Handle engagement click.
   * Navigates user to a route depending on engagement type.
   */
  const handleClickEngagement = (id, type) => {
    const encryptedId = encryptAndEncode(id.toString());
    switch (type) {
      case "Business Objective":
        navigate(`/audit/business-objectives-redirect/${encryptedId}`);
        break;
      case "Special Project/Audit":
        navigate(`/audit/special-project-audit/${encryptedId}`);
        break;
      case "Compliance Checklist":
        navigate(`/audit/compliance-checklist/${encryptedId}`);
        break;
      default:
        break;
    }
  };

  /**
   * Pagination handler: triggered when user changes page.
   */
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  /**
   * Handle change of items per page (5 / 10 / 20 / 30).
   * Automatically resets to page 1 and re-fetches data.
   */
  const handleChangeItemsPerPage = (event) => {
    const companyId = getCompanyId();
    if (companyId) {
      const newLimit = Number(event.target.value);
      setPage(1);
      setItemsPerPage(newLimit);
      dispatch(setupGetAllEngagements({ companyId, page: 1, itemsPerPage: newLimit }));
    }
  };

  /**
   * Re-fetch all engagements when a new one is successfully added.
   * Automatically resets pagination to defaults (page=1, limit=10).
   */
  React.useEffect(() => {
    if (!engagementAddSuccess) return;

    const companyId = getCompanyId();
    if (companyId) {
      setPage(1);
      setItemsPerPage(10);
      dispatch(setupGetAllEngagements({ companyId, page: 1, itemsPerPage: 10 }));
      dispatch(resetAddEngagementSuccess());
    }
  }, [engagementAddSuccess, dispatch, getCompanyId]);

  /**
   * Fetch engagements when:
   *  - Component mounts
   *  - Page or itemsPerPage changes
   */
  React.useEffect(() => {
    const companyId = getCompanyId();
    if (companyId) {
      dispatch(setupGetAllEngagements({ companyId, page, itemsPerPage }));
    }
  }, [dispatch, getCompanyId, page, itemsPerPage]);

  return (
    <div>
      {/* ---- Modals ---- */}
      {businessObjectiveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <BusinessObjectiveModal setBusinessObjectiveDialog={setBusinessObjectiveDialog} />
          </div>
        </div>
      )}

      {deleteEngagementDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <DeleteEngagementDialog
              setShowDeleteEngagementDialog={setShowDeleteEngagementDialog}
              currentEngagementId={currentEngagementId}
            />
          </div>
        </div>
      )}

      {/* ---- Main Section ---- */}
      <section className="faq-section">
        <div data-aos="fade-up">
          {/* ---- Header ---- */}
          <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">Audit Universe</div>
            <div>
              {/* Add button */}
              <div
                className={`btn btn-labeled btn-primary px-3 shadow ${loading && "disabled"}`}
                onClick={() => !loading && setBusinessObjectiveDialog(true)}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-plus-circle"></i>
                </span>
                {loading ? "Loading.." : "Add to Audit Universe"}
              </div>

              {/* Tooltip with helper text */}
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit" className="mb-2" style={poppinsStyle}>
                      Click to add a new engagement by selecting an option through:
                    </Typography>
                    <ul
                      style={{
                        ...poppinsStyle,
                        paddingLeft: "20px",
                        margin: "0",
                      }}
                    >
                      <li>Business Objective</li>
                      <li>Special Project/Audit</li>
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

          {/* ---- Table Section ---- */}
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th className="w-80">Sr No.</th>
                      <th>Audit Universe</th>
                      <th>Identified Through</th>
                      <th>Initiated By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Loader */}
                    {loading ? (
                      <tr className="p-2">
                        <td>
                          <CircularProgress />
                        </td>
                      </tr>
                    ) : allEngagements?.length === 0 ? (
                      // Empty state
                      <tr>
                        <td className="w-300">No Audit Universe To Show.</td>
                      </tr>
                    ) : (
                      // Engagement list
                      allEngagements.map((item, index) => (
                        <TableRow
                          key={index}
                          item={item}
                          handleClickEngagement={handleClickEngagement}
                          setShowDeleteEngagementDialog={setShowDeleteEngagementDialog}
                          setCurrentEngagementId={setCurrentEngagementId}
                          index={index}
                          page={page}
                          itemsPerPage={itemsPerPage}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ---- Pagination Section ---- */}
          {allEngagements?.length > 0 && (
            <div className="row">
              {/* Page controls */}
              <div className="col-lg-6 mb-4">
                <Pagination
                  count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                />
              </div>

              {/* Items per page dropdown */}
              <div className="col-lg-6 mb-4 d-flex justify-content-end">
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">Items Per Page</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Items Per Page"
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AuditUniverse;
