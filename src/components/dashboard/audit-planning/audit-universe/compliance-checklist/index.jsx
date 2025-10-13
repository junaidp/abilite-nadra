import React from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Pagination
} from "@mui/material";
import {
  resetAddEngagementSuccess,
  setupSaveCheckListObjective,
  setupGetCheckListItems,
  handleCleanUp,
  setupGetInitialSingleCheckListObjective,
} from "../../../../../global-redux/reducers/planing/engagement/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { decryptString, groupByAreaAndSubject } from "../../../../../config/helper";

const ITEMS_PER_PAGE = 5;

const ComplianceCheckList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const engagementId = decryptString(id);

  const {
    planingEngagementSingleObject,
    engagementAddSuccess,
    loading,
    selectedCheckListItems,
    initialLoading,
  } = useSelector((state) => state.planningEngagement);
  const { user } = useSelector((state) => state?.auth);

  const [page, setPage] = React.useState(1);
  const [checkListId, setCheckListId] = React.useState("");

  // Flattened grouped items
  const allItems = groupByAreaAndSubject(selectedCheckListItems)?.flatMap(
    (group) => group.items
  );

  const handleChangePage = (_, value) => setPage(value);

  const handleSelectCheckList = (item) => {
    if (!loading) dispatch(setupSaveCheckListObjective(item));
  };

  // Redirect back if engagement added successfully
  React.useEffect(() => {
    if (engagementAddSuccess) {
      dispatch(resetAddEngagementSuccess());
      navigate("/audit/business-objective");
    }
  }, [engagementAddSuccess, dispatch, navigate]);

  // Fetch checklist items when a checklist ID is selected
  React.useEffect(() => {
    if (checkListId) {
      dispatch(
        setupGetCheckListItems(
          `?userEmailId=${user?.[0]?.email}&checklistId=${checkListId}`
        )
      );
    }
  }, [checkListId, dispatch, user]);

  // Initial engagement data
  React.useEffect(() => {
    if (engagementId && user?.[0]?.token) {
      dispatch(setupGetInitialSingleCheckListObjective(engagementId));
    }
  }, [dispatch, engagementId, user]);

  // Redirect if invalid engagement ID
  React.useEffect(() => {
    if (!engagementId) navigate("/audit/business-objective");
  }, [engagementId, navigate]);

  // Sidebar & cleanup
  React.useEffect(() => {
    dispatch(changeActiveLink("li-business-objective"));
    dispatch(InitialLoadSidebarActiveLink("li-audit"));
    return () => dispatch(handleCleanUp());
  }, [dispatch]);

  const renderTableRows = (items) => {
    if (loading) {
      return (
        <tr>
          <td>
            <CircularProgress />
          </td>
        </tr>
      );
    }

    if (!items || items.length === 0) {
      return (
        <tr>
          <td className="w-300">No CheckListItem to show</td>
        </tr>
      );
    }

    return items.map((checkItem, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{checkItem?.area}</td>
        <td>{checkItem?.subject}</td>
        <td>{checkItem?.particulars}</td>
      </tr>
    ));
  };

  const renderAccordionItem = (item, index) => (
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
            <div className="d-flex align-items-center">
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
              className={`btn btn-labeled btn-primary px-3 shadow col-lg-2 mb-4 ${loading && "disabled"
                }`}
              onClick={() => handleSelectCheckList(item)}
            >
              {loading ? "Loading..." : "Select Check List"}
            </div>

            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th className="w-80">Sr No.</th>
                      <th>Area</th>
                      <th>Subject</th>
                      <th>Particulars</th>
                    </tr>
                  </thead>
                  <tbody>{renderTableRows(allItems)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (initialLoading) {
    return (
      <div className="my-3">
        <CircularProgress />
      </div>
    );
  }

  if (planingEngagementSingleObject[0]?.error === "Not Found") {
    return <div>Engagement Not Found</div>;
  }

  const isArray = Array.isArray(planingEngagementSingleObject);
  const itemsToRender = isArray
    ? planingEngagementSingleObject.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    )
    : [planingEngagementSingleObject];

  return (
    <div>
      <section className="faq-section">
        <div className="container" data-aos="fade-up">
          <header className="section-header my-3 align-items-center text-start d-flex">
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
          {itemsToRender.map(renderAccordionItem)}

          {isArray && (
            <Pagination
              count={Math.ceil(planingEngagementSingleObject?.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ComplianceCheckList;
