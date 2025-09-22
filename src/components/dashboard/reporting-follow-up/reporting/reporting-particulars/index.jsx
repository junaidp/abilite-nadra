import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

import {
  resetReportingAddSuccess,
  setupGetSingleReport,
  setupUpdateReporting,
  setupGetInitialSingleReport,
  resetReports,
  resetReportingFileUploadAddSuccess,
} from "../../../../../global-redux/reducers/reporting/slice";

import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";

import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";

import AccordianItem from "./component/accordian-item/AccordianItem";
import FirstApproveReportingDialog from "./component/approve-dialogs/FirstApprove";
import SecondApproveReportingDialog from "./component/approve-dialogs/SecondApprove";
import SubmitDialog from "./component/submit-dialog";

import ModalWrapper from "../../../../common/model-wrap";

import FeedBackDialog from "../../components/FeedBackDialog";
import ViewFirstFeedBackDialog from "../../components/FirstFeedBack";
import ViewSecondFeedBackDialog from "../../components/SecondFeedBack";

import { decryptString } from "../../../../../config/helper";

const ReportingParticulars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- Extract and decrypt params ---
  const { id } = useParams();
  const reportingId = decryptString(id);

  // --- Global state ---
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const {
    singleReport,
    loading,
    reportingAddSuccess,
    initialLoading,
    reportingFileUploadSuccess,
    approveAddSuccess
  } = useSelector((state) => state?.reporting);
  const { allUsers } = useSelector((state) => state?.settingsUserManagement);

  // --- Local state ---
  const [report, setReport] = React.useState([]);
  const [deleteFileId, setDeleteFileId] = React.useState("");
  const [currentOpenItem, setCurrentOpenItem] = React.useState({});
  const [viewFeedBackItem, setViewFeedBackItem] = React.useState({});
  const [viewFirstFeedBackDialog, setViewFirstFeedBackDialog] =
    React.useState(false);
  const [viewSecondFeedBackDialog, setViewSecondFeedBackDialog] =
    React.useState(false);
  const [currentApproveItem, setCurrentApproveItem] = React.useState({});
  const [firstApproveDialog, setFirstApproveDialog] = React.useState(false);
  const [secondApproveDialog, setSecondApproveDialog] = React.useState(false);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [currentReportingAndFollowUpId, setCurrentReportingAndFollowUpId] =
    React.useState("");
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [currentSubmittedItem, setShowCurrentSubmittedItem] = React.useState(
    {}
  );


  const managementAuditees = React.useMemo(
    () => allUsers?.filter(u => u?.employeeid?.userHierarchy === "Management_Auditee"),
    [allUsers]
  );


  /**
   * -----------------------------
   * State Update Handlers
   * -----------------------------
   * These handle local state updates (e.g., form changes inside reporting list).
   */
  const handleChange = React.useCallback((event, id) => {
    setReport((prev) => ({
      ...prev,
      reportingList: prev?.reportingList?.map((report) =>
        Number(report?.id) === Number(id)
          ? { ...report, [event.target.name]: event.target.value }
          : report
      ),
    }));
  }, []);

  const handleObservationChange = React.useCallback((id, content) => {
    setReport((prev) => ({
      ...prev,
      reportingList: prev?.reportingList?.map((report) =>
        Number(report?.id) === Number(id)
          ? { ...report, observationName: content }
          : report
      ),
    }));
  }, []);

  const handleManagementCommentsChange = React.useCallback((id, content) => {
    setReport((prev) => ({
      ...prev,
      reportingList: prev?.reportingList?.map((report) =>
        Number(report?.id) === Number(id)
          ? { ...report, managementComments: content }
          : report
      ),
    }));
  }, []);

  /**
   * -----------------------------
   * Save Handlers (Step 1 - Step 4)
   * -----------------------------
   * Each handler is responsible for validating inputs
   * before saving or moving the report to the next step.
   */
  const handleSaveToStep1 = React.useCallback(
    (item) => {
      if (!loading) {
        dispatch(
          setupUpdateReporting({
            ...item,
            stepNo:
              item?.observationTitle &&
                item?.area &&
                item?.observationName &&
                item?.implicationRating &&
                Number(item?.implicationRating) !== 0 &&
                item?.implication &&
                item?.recommendedActionStep &&
                item?.auditee?.name
                ? 1
                : 0,
          })
        );
      }
    },
    [dispatch, loading]
  );

  const handleSaveStep1 = React.useCallback(
    (item) => {
      if (!loading) {
        dispatch(setupUpdateReporting(item));
      }
    },
    [dispatch, loading]
  );

  const handleSaveToStep2 = React.useCallback((item) => {
    if (
      !item?.observationTitle ||
      !item?.observationName ||
      !item?.implicationRating ||
      Number(item?.implicationRating) === 0 ||
      !item?.implication ||
      !item?.recommendedActionStep ||
      !item?.auditee?.name
    ) {
      toast.error(
        "Fields missing. Please fill them first and then approve the observation"
      );
      return;
    }
    setCurrentApproveItem(item);
    setFirstApproveDialog(true);
  }, []);

  const handleSaveStep2 = React.useCallback(
    (item) => {
      if (!loading) {
        dispatch(setupUpdateReporting(item));
      }
    },
    [dispatch, loading]
  );

  const handleSaveToStep4 = React.useCallback((item) => {
    setCurrentApproveItem(item);
    setSecondApproveDialog(true);
  }, []);

  /**
   * -----------------------------
   * Editability Check
   * -----------------------------
   * Determines if the current user is allowed to edit a section.
   */
  const handleAllowEditSection1 = React.useCallback(
    (item) => {
      let allowEdit = false;

      if (Number(item?.stepNo) === 0) {
        allowEdit = true;
      }

      if (
        Number(item?.stepNo) === 1 &&
        (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
          Number(user[0]?.userId?.id) ===
          Number(singleReport?.resourceAllocation?.backupHeadOfInternalAudit?.id) ||
          Number(user[0]?.userId?.id) ===
          Number(singleReport?.resourceAllocation?.proposedJobApprover?.id))
      ) {
        allowEdit = true;
      }

      return allowEdit;
    },
    [singleReport, user]
  );

  /**
   * -----------------------------
   * Effects
   * -----------------------------
   * Handle side effects like fetching reports, handling success states,
   * and resetting redux slices.
   */

  // Refresh report when a new reporting is added
  React.useEffect(() => {
    if (reportingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;

      if (companyId) {
        dispatch(
          setupGetSingleReport(`?reportingAndFollowUpId=${Number(reportingId)}`)
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess, company, dispatch, reportingId, user]);

  React.useEffect(() => {
    if (approveAddSuccess) {
      dispatch(resetReportingAddSuccess());
    }
  }, [approveAddSuccess, company, dispatch, reportingId, user]);

  // Handle file upload success -> update reporting list
  React.useEffect(() => {
    if (reportingFileUploadSuccess === true) {
      if (currentOpenItem && Object.keys(currentOpenItem).length > 0) {
        setTimeout(() => {
          const updatedItem = report?.reportingList?.find(
            (item) => Number(item?.id) === Number(currentOpenItem?.id)
          );
          if (updatedItem) {
            dispatch(
              setupUpdateReporting({
                ...updatedItem,
                reportingFileAttachmentsList:
                  updatedItem?.reportingFileAttachmentsList?.filter(
                    (singleFileItem) => singleFileItem?.id !== deleteFileId
                  ),
              })
            );
          }
        }, 1500);
      }
      setDeleteFileId("");
      dispatch(resetReportingFileUploadAddSuccess());
    }
  }, [
    reportingFileUploadSuccess,
    currentOpenItem,
    deleteFileId,
    dispatch,
    report?.reportingList,
  ]);


  // Sync local state when report data changes
  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleReport).length === 0 &&
      singleReport.constructor === Object;

    if (!isEmptyObject && reportingId) {
      if (user[0]?.userId?.employeeid?.userHierarchy !== "Management_Auditee") {
        setReport(singleReport);
      } else {
        // For management auditee, show only step 2+ reports assigned to them
        setReport({
          ...singleReport,
          reportingList: singleReport?.reportingList?.filter(
            (all) =>
              Number(all?.stepNo) >= 2 &&
              Number(all?.auditee?.id) === user[0]?.id
          ),
        });
      }
    }
  }, [singleReport, reportingId, user]);

  // Initial load -> fetch single report + users
  React.useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;

    if (companyId) {
      dispatch(
        setupGetInitialSingleReport(
          `?reportingAndFollowUpId=${Number(reportingId)}`
        )
      );

      // Delay fetching users slightly (API sequencing)
      setTimeout(() => {
        dispatch(setupGetAllUsers({ shareWith: true }));
      }, 800);
    }
  }, [company, dispatch, reportingId, user]);

  // Redirect if no reportingId
  React.useEffect(() => {
    if (!reportingId) {
      navigate("/audit/reportings");
    }
  }, [reportingId, navigate]);

  // Sidebar active link setup
  React.useEffect(() => {
    dispatch(changeActiveLink("li-reporting"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));

    return () => {
      dispatch(resetReports());
    };
  }, [dispatch]);


  return (
    <div>
      {/* ---------------------------
        Dialog Modals
        --------------------------- */}
      {showSubmitDialog && (
        <ModalWrapper>
          <SubmitDialog
            setShowSubmitDialog={setShowSubmitDialog}
            item={currentSubmittedItem}
          />
        </ModalWrapper>
      )}

      {firstApproveDialog && (
        <ModalWrapper>
          <FirstApproveReportingDialog
            setFirstApproveDialog={setFirstApproveDialog}
            currentApproveItem={currentApproveItem}
          />
        </ModalWrapper>
      )}

      {secondApproveDialog && (
        <ModalWrapper>
          <SecondApproveReportingDialog
            setSecondApproveDialog={setSecondApproveDialog}
            currentApproveItem={currentApproveItem}
          />
        </ModalWrapper>
      )}

      {feedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <FeedBackDialog
              setFeedBackDialog={setFeedBackDialog}
              currentReportingAndFollowUpId={currentReportingAndFollowUpId}
            />
          </div>
        </div>
      )}

      {viewFirstFeedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ViewFirstFeedBackDialog
              setViewFirstFeedBackDialog={setViewFirstFeedBackDialog}
              viewFeedBackItem={viewFeedBackItem}
            />
          </div>
        </div>
      )}

      {viewSecondFeedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ViewSecondFeedBackDialog
              setViewSecondFeedBackDialog={setViewSecondFeedBackDialog}
              viewFeedBackItem={viewFeedBackItem}
            />
          </div>
        </div>
      )}

      {/* ---------------------------
        Loading & Error States
        --------------------------- */}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : !Object.keys(singleReport).length ? (
        "Reporting Not Found"
      ) : (
        <>
          {/* ---------------------------
            Page Header
            --------------------------- */}
          <header className="section-header my-3 align-items-center text-start d-flex">
            <a
              className="text-primary"
              onClick={() =>
                user[0]?.userId?.employeeid?.userHierarchy ===
                  "Management_Auditee"
                  ? navigate("/audit/dashboard")
                  : navigate("/audit/reportings")
              }
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Reporting</div>
          </header>

          {/* ---------------------------
            Report Details
            --------------------------- */}
          <div className="row px-4">
            <div className="col-md-12">
              <hr />
              <div className="mb-0">{report?.title}</div>

              {/* ---------------------------
                Accordion List
                --------------------------- */}
              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="accordion" id="accordionFlushExample">
                    {report?.reportingList?.length === 0
                      ? "No Reporting List Found"
                      : report?.reportingList?.map((item, index) => (
                        <AccordianItem
                          key={index}
                          item={item}
                          handleChange={handleChange}
                          loading={loading}
                          allUsers={managementAuditees}
                          singleReport={singleReport}
                          reportingId={reportingId}
                          setReport={setReport}
                          handleSaveToStep1={handleSaveToStep1}
                          handleSaveToStep2={handleSaveToStep2}
                          handleSaveStep2={handleSaveStep2}
                          handleSaveToStep4={handleSaveToStep4}
                          handleObservationChange={handleObservationChange}
                          handleManagementCommentsChange={
                            handleManagementCommentsChange
                          }
                          setCurrentReportingAndFollowUpId={
                            setCurrentReportingAndFollowUpId
                          }
                          setFeedBackDialog={setFeedBackDialog}
                          setCurrentOpenItem={setCurrentOpenItem}
                          handleAllowEditSection1={handleAllowEditSection1}
                          setViewFirstFeedBackDialog={
                            setViewFirstFeedBackDialog
                          }
                          setViewSecondFeedBackDialog={
                            setViewSecondFeedBackDialog
                          }
                          setViewFeedBackItem={setViewFeedBackItem}
                          handleSaveStep1={handleSaveStep1}
                          setDeleteFileId={setDeleteFileId}
                          setShowSubmitDialog={setShowSubmitDialog}
                          setShowCurrentSubmittedItem={
                            setShowCurrentSubmittedItem
                          }
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

};

export default ReportingParticulars;
