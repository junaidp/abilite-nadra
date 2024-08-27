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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const poppinsStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: "normal",
};
const BusinessObjective = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allEngagements, loading, engagementAddSuccess, totalNoOfRecords } =
    useSelector((state) => state.planningEngagement);
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [businessObjectiveDialog, setBusinessObjectiveDialog] =
    React.useState(false);
  const [deleteEngagementDialog, setShowDeleteEngagementDialog] =
    React.useState(false);
  const [currentEngagementId, setCurrentEngagementId] = React.useState("");
  const handleChange = (_, value) => {
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

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllEngagements({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
        })
      );
    }
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        setPage(1);
        setItemsPerPage(10);
        dispatch(
          setupGetAllEngagements({ companyId, page: 1, itemsPerPage: 10 })
        );
        dispatch(resetAddEngagementSuccess());
      }
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(setupGetAllEngagements({ companyId, page, itemsPerPage }));
    }
  }, [dispatch, page]);

  return (
    <div>
      {businessObjectiveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <BusinessObjectiveModal
              setBusinessObjectiveDialog={setBusinessObjectiveDialog}
            />
          </div>
        </div>
      )}
      {deleteEngagementDialog && (
        <div className="model-parent">
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
              <div className="mb-0 heading">Audit Universe</div>
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
                  {loading ? "Loading.." : "Add to Audit Universe"}
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
                        <th>Business Objective</th>
                        <th>Identities</th>
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
                          <td className="w-300">No Audit Universe To Show.</td>
                        </tr>
                      ) : (
                        allEngagements.map((item, index) => {
                          return (
                            <TableRow
                              key={index}
                              item={item}
                              handleClickEngagement={handleClickEngagement}
                              setShowDeleteEngagementDialog={
                                setShowDeleteEngagementDialog
                              }
                              setCurrentEngagementId={setCurrentEngagementId}
                              index={index}
                            />
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {allEngagements?.length > 0 && (
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <Pagination
                    count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 mb-4 d-flex justify-content-end">
                  <div>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Items Per Page
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Age"
                        value={itemsPerPage}
                        onChange={(event) => handleChangeItemsPerPage(event)}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BusinessObjective;
