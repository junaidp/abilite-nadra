import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import RiskAssessmentModal from "../../../../components/modals/perform-risk-assessment-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { setupGetAllRiskAssessments } from "../../../../global-redux/reducers/planing/risk-assessment/slice";
import { CircularProgress } from "@mui/material";
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
const RiskAssessments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [performRiskAssessmentModal, setPerformRiskAssessmentModal] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const { allRiskAssessments, loading, totalNoOfRecords } = useSelector(
    (state) => state?.planningRiskAssessment
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleUpdateRiskAssessment(item) {
    navigate(`/audit/risk-factor-approach?riskAssessmentId=${item?.id}`);
  }

  function handleChangeItemsPerPage(event) {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      setPage(1);
      setItemsPerPage(Number(event.target.value));
      dispatch(
        setupGetAllRiskAssessments({
          companyId,
          page: 1,
          itemsPerPage: Number(event.target.value),
        })
      );
    }
  }

  React.useEffect(() => {
    if (user[0]?.token) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllRiskAssessments({ companyId, page, itemsPerPage }));
      }
    }
  }, [dispatch, page]);

  return (
    <div>
      {performRiskAssessmentModal && (
        <div className="modal-objective-assessment">
          <div className="model-wrap-assessment">
            <RiskAssessmentModal
              setPerformRiskAssessmentModal={setPerformRiskAssessmentModal}
            />
          </div>
        </div>
      )}

      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading">Risk Assessment</div>
        <div className="">
          <div
            className="btn btn-labeled btn-primary px-3 shadow"
            onClick={() => navigate("/audit/view-risk-assesment")}
          >
            <span className="btn-label me-2">
              <i className="fa fa-eye"></i>
            </span>
            View Risk Assessment
          </div>
          <Tooltip
            title={
              <React.Fragment>
                <Typography
                  color="inherit"
                  className="mb-2"
                  style={poppinsStyle}
                >
                  Perform risk assessment based on likelihood and impact, then
                  evaluate residual risk post-mitigation.
                </Typography>
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
          <div className="example-header"></div>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr. #</th>
                  <th>Business Objective</th>
                  <th>Risk Approach</th>
                  <th>Risk Rating</th>
                  <th>Perform Risk Assessment</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="p-2">
                    <td>
                      <CircularProgress />
                    </td>
                  </tr>
                ) : allRiskAssessments?.length == 0 ? (
                  <tr>
                    <td className="w-300">No Risk Assessment to show</td>
                  </tr>
                ) : (
                  allRiskAssessments?.map((item, index) => {
                    return (
                      <tr className="h-40" key={index}>
                        <td>{item?.id}</td>
                        <td>
                          {item?.businessObjectiveMapProcess?.description || ""}
                        </td>
                        <td>{item?.riskApproach}</td>
                        <td>{item?.riskRating}</td>
                        <td className="text-center w-200">
                          <div
                            className={`btn btn-outline-light text-primary shadow h-32 w-180 ${
                              loading && "disabled"
                            }`}
                            onClick={() => handleUpdateRiskAssessment(item)}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-play"></i>
                            </span>
                            {item?.locked === true ||
                            (item?.complete === true &&
                              item?.locked === false &&
                              user[0]?.userId?.employeeid?.userHierarchy !==
                                "IAH")
                              ? "View Risk"
                              : "Perform Risk"}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {allRiskAssessments?.length > 0 && (
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
      </div>
    </div>
  );
};

export default RiskAssessments;
