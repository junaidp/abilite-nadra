import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  resetAddEngagementSuccess,
  setupGetSingleCheckListObjective,
  setupSaveCheckListObjective,
  setupGetCheckListItems,
  handleCleanUp,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import Pagination from "@mui/material/Pagination";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";

const ComplianceCheckListCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const engagementId = searchParams.get("engagementId");
  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    selectedCheckListItems,
  } = useSelector((state) => state.planingEngagements);
  const { user } = useSelector((state) => state?.auth);
  const [page, setPage] = React.useState(1);
  const [checkListId, setCheckListId] = React.useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };

  function handleSelectCheckList(item) {
    if (!loading) {
      dispatch(setupSaveCheckListObjective(item));
    }
  }

  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      dispatch(setupGetSingleCheckListObjective(engagementId));
    }
  }, [engagementAddSuccess]);

  React.useEffect(() => {
    if (checkListId && checkListId !== "") {
      dispatch(
        setupGetCheckListItems(
          `?userEmailId=${user[0]?.email}&checklistId=${checkListId}`
        )
      );
    }
  }, [checkListId]);

  React.useEffect(() => {
    if (engagementId && user[0]?.token) {
      dispatch(setupGetSingleCheckListObjective(engagementId));
    }
  }, [engagementId, user]);

  React.useEffect(() => {
    if (!engagementId) {
      navigate("/audit/business-objective");
    }
  }, [engagementId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-business-objective"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
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
              <div className="mb-0 heading">Compliance Check List</div>
            </header>
          </div>
          <div className="accordion" id="accordionCheckListExample">
            {Array.isArray(planingEngagementSingleObject) &&
            planingEngagementSingleObject?.length !== 0 ? (
              <div>
                {planingEngagementSingleObject
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
                            onClick={() => setCheckListId(item?.checklist_id)}
                          >
                            <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                              <div className=" d-flex align-items-center">
                                {item?.description || "null"}
                              </div>
                            </div>
                          </button>
                        </h2>
                        <div
                          id={`flush-collapse${index}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionCheckListExample"
                        >
                          <div className="accordion-body">
                            <div className="row mt-3">
                              <div
                                className={`btn btn-labeled btn-primary px-3 shadow col-lg-2 mb-4 ${
                                  loading && "disabled"
                                }`}
                                onClick={() => handleSelectCheckList(item)}
                              >
                                {!loading ? "Select Check List" : "Loading..."}
                              </div>
                              <div className="col-lg-12">
                                <div className="table-responsive">
                                  <table className="table table-bordered  table-hover rounded">
                                    <thead className="bg-secondary text-white">
                                      <tr>
                                        <th className="w-80">Sr No.</th>
                                        <th>Area</th>
                                        <th>Subject</th>
                                        <th>Particulars</th>
                                        <th>Observation</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {loading ? (
                                        <tr>
                                          <td>
                                            <CircularProgress />
                                          </td>
                                        </tr>
                                      ) : selectedCheckListItems ? (
                                        selectedCheckListItems?.map(
                                          (checkItem, i) => {
                                            return (
                                              <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{checkItem?.area}</td>
                                                <td>{checkItem?.subject}</td>
                                                <td>
                                                  {checkItem?.particulars}
                                                </td>
                                                <td>
                                                  {checkItem?.observation}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )
                                      ) : (
                                        <tr>
                                          <td className="w-300">
                                            No CheckListItem to show
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <Pagination
                  count={Math.ceil(planingEngagementSingleObject?.length / 5)}
                  page={page}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseOne`}
                    aria-expanded="false"
                    aria-controls={`flush-collapseOne`}
                    onClick={() =>
                      setCheckListId(
                        planingEngagementSingleObject?.checklist_id
                      )
                    }
                  >
                    <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                      <div className=" d-flex align-items-center">
                        {planingEngagementSingleObject?.description || "null"}
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapseOne`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionCheckListExample"
                >
                  <div className="accordion-body">
                    <div className="row mt-3">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-bordered  table-hover rounded">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="w-80">Sr No.</th>
                                <th>Area</th>
                                <th>Subject</th>
                                <th>Particulars</th>
                                <th>Observation</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td>
                                    <CircularProgress />
                                  </td>
                                </tr>
                              ) : selectedCheckListItems ? (
                                selectedCheckListItems?.map(
                                  (checkItem, ind) => {
                                    return (
                                      <tr key={ind}>
                                        <td>{ind + 1}</td>
                                        <td>{checkItem?.area}</td>
                                        <td>{checkItem?.subject}</td>
                                        <td>{checkItem?.particulars}</td>
                                        <td>{checkItem?.observation}</td>
                                      </tr>
                                    );
                                  }
                                )
                              ) : (
                                <tr>
                                  <td className="w-300">
                                    No CheckListItem to show
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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

export default ComplianceCheckListCard;
