import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetReportingAddSuccess,
  setupGetInitialSingleReport,
  setupGetSingleReport,
  setupUpdateFollowUp,
  resetReports,
  resetFollowUpSubmittedAddSuccess,
} from "../../../../../global-redux/reducers/reporting/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { CircularProgress } from "@mui/material";

import AccordianItem from "./components/AccordianItem";
import ApproveDialog from "./components/ApproveDialog";
import FeedBackDialog from "../../components/FeedBackDialog";
import ViewThirdFeedBackDialog from "../../components/ThirdFeedBack";
import SubmitDialog from "./components/SubmitDialog";

import ModalWrapper from "../../../../../components/common/model-wrap/index"

import { decryptString } from "../../../../../config/helper";
import "./index.css";

const FollowUpParticulars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // 🔐 Decrypt route param
  const followUpId = decryptString(id);

  // Redux State
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const {
    singleReport,
    loading,
    reportingAddSuccess,
    initialLoading,
    followUpSubmittedAddSuccess,
    approveAddSuccess
  } = useSelector((state) => state?.reporting);

  // Local State
  const [report, setReport] = useState([]);
  const [currentApproveItem, setCurrentApproveItem] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [feedBackDialog, setFeedBackDialog] = useState(false);
  const [currentReportingAndFollowUpId, setCurrentReportingAndFollowUpId] =
    useState("");
  const [viewFeedBackItem, setViewFeedBackItem] = useState({});
  const [viewThirdFeedBackDialog, setViewThirdFeedBackDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [currentSubmittedItem, setShowCurrentSubmittedItem] = useState({});

  /** ===============================
   * Handlers
   * =============================== */

  // Generic input handler
  const handleChange = useCallback((event, id) => {
    setReport((prev) => ({
      ...prev,
      reportingList: prev?.reportingList?.map((singleItem) =>
        Number(singleItem?.id) === Number(id)
          ? {
            ...singleItem,
            followUp: {
              ...singleItem?.followUp,
              [event?.target?.name]: event?.target?.value,
            },
          }
          : singleItem
      ),
    }));
  }, []);

  // RichText final comments handler
  const handleFinalCommentsChange = useCallback((id, content) => {
    setReport((prev) => ({
      ...prev,
      reportingList: prev?.reportingList?.map((singleItem) =>
        Number(singleItem?.id) === Number(id)
          ? {
            ...singleItem,
            followUp: {
              ...singleItem?.followUp,
              finalComments: content,
            },
          }
          : singleItem
      ),
    }));
  }, []);

  // Save follow-up
  const handleSave = useCallback(
    (item) => {
      if (!loading) {
        dispatch(
          setupUpdateFollowUp({
            ...item?.followUp,
            recommendationsImplemented:
              item?.followUp?.recommendationsImplemented.toString() === "true",
            finalComments:
              item?.followUp?.recommendationsImplemented.toString() === "true"
                ? item?.followUp?.finalComments
                : "",
          })
        );
      }
    },
    [dispatch, loading]
  );

  // Save and proceed to Step 7
  const handleSaveToStep7 = useCallback(
    (item) => {
      if (!loading) {
        dispatch(
          setupUpdateFollowUp({
            ...item?.followUp,
            testInNextYear:
              item?.followUp?.testInNextYear.toString() === "true",
          })
        );
      }

      setTimeout(() => {
        setCurrentApproveItem(item);
        setApproveDialog(true);
      }, 1200);
    },
    [dispatch, loading]
  );

  /** ===============================
   * Permissions / Conditions
   * =============================== */

  // Allow edit of last section
  const handleAllowEditLastSection = useCallback(
    (item) =>
      Number(item?.stepNo) === 5 &&
      Number(user[0]?.userId?.id) === Number(item?.auditee?.id),
    [user]
  );

  // Show "Test in Next Year"
  const handleShowTestInNextYear = useCallback(
    (item) => {
      if (item?.stepNo !== 6) return false;

      const userId = Number(user[0]?.userId?.id);
      const hierarchy = user[0]?.userId?.employeeid?.userHierarchy;

      return (
        hierarchy === "IAH" ||
        userId === Number(singleReport?.resourceAllocation?.backupHeadOfInternalAudit?.id) ||
        userId === Number(singleReport?.resourceAllocation?.proposedJobApprover?.id) ||
        singleReport?.resourceAllocation?.resourcesList?.some(
          (res) => Number(res?.id) === userId
        )
      );
    },
    [user, singleReport]
  );

  /** ===============================
   * Effects
   * =============================== */

  // When follow-up report is updated
  useEffect(() => {
    if (reportingAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetSingleReport(`?reportingAndFollowUpId=${Number(followUpId)}`)
        );
      }
      dispatch(resetReportingAddSuccess());
    }
  }, [reportingAddSuccess, dispatch, company, followUpId, user]);

  // Reset success flag
  useEffect(() => {
    if (followUpSubmittedAddSuccess) {
      dispatch(resetFollowUpSubmittedAddSuccess());
    }
  }, [followUpSubmittedAddSuccess, dispatch]);

  // Set report data from store
  useEffect(() => {
    if (Object.keys(singleReport).length && followUpId) {
      const isAuditee =
        user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee";
      setReport(
        isAuditee
          ? {
            ...singleReport,
            reportingList: singleReport?.reportingList?.filter(
              (all) => Number(all?.auditee?.id) === user[0]?.id
            ),
          }
          : singleReport
      );
    }
  }, [singleReport, followUpId, user]);

  // Initial fetch
  useEffect(() => {
    const companyId = user[0]?.company?.find(
      (item) => item?.companyName === company
    )?.id;
    if (companyId) {
      dispatch(
        setupGetInitialSingleReport(
          `?reportingAndFollowUpId=${Number(followUpId)}`
        )
      );
    }
  }, [dispatch, company, followUpId, user]);

  // Redirect if no follow-up id
  useEffect(() => {
    if (!followUpId) navigate("/audit/follow-up");
  }, [followUpId, navigate]);

  React.useEffect(() => {
    if (approveAddSuccess) {
      dispatch(resetReportingAddSuccess());
    }
  }, [approveAddSuccess, dispatch]);

  // Sidebar active link
  useEffect(() => {
    dispatch(changeActiveLink("li-followup"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));

    return () => {
      dispatch(resetReports());
    };
  }, [dispatch]);

  /** ===============================
   * Render
   * =============================== */


  return (
    <div>
      {showSubmitDialog && (
        <ModalWrapper>
          <SubmitDialog
            item={currentSubmittedItem}
            setShowSubmitDialog={setShowSubmitDialog}
          />
        </ModalWrapper>
      )}

      {approveDialog && (
        <ModalWrapper>
          <ApproveDialog
            setApproveDialog={setApproveDialog}
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
      {viewThirdFeedBackDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ViewThirdFeedBackDialog
              setViewThirdFeedBackDialog={setViewThirdFeedBackDialog}
              viewFeedBackItem={viewFeedBackItem}
            />
          </div>
        </div>
      )}
      {initialLoading ? (
        <div className="my-3">
          <CircularProgress />
        </div>
      ) : !Object.keys(singleReport).length ? (
        "Follow Up Not Found"
      ) : (
        <>
          <header className="section-header my-3 align-items-center  text-start d-flex ">
            <a
              className="text-primary"
              onClick={() =>
                user[0]?.userId?.employeeid?.userHierarchy ===
                  "Management_Auditee"
                  ? navigate("/audit/dashboard")
                  : navigate("/audit/follow-up")
              }
            >
              <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
            </a>
            <div className="mb-0 heading">Follow-Up</div>
          </header>
          <div className="row px-4">
            <div className="col-md-12">
              <div className="sub-heading ps-2 mb-3 fw-bold">
                {report?.title}
              </div>

              <hr />

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="accordion" id="accordionFlushExample">
                    {report?.reportingList?.filter(
                      (singleItem) => singleItem?.stepNo >= 5
                    )?.length === 0
                      ? "No Reporting List Found"
                      : report?.reportingList
                        ?.filter((singleItem) => singleItem?.stepNo >= 5)
                        ?.map((item, index) => {
                          return (
                            <AccordianItem
                              key={index}
                              index={index}
                              handleFinalCommentsChange={handleFinalCommentsChange}
                              item={item}
                              handleChange={handleChange}
                              handleSave={handleSave}
                              handleSaveToStep7={handleSaveToStep7}
                              loading={loading}
                              singleReport={singleReport}
                              followUpId={followUpId}
                              setCurrentReportingAndFollowUpId={
                                setCurrentReportingAndFollowUpId
                              }
                              setFeedBackDialog={setFeedBackDialog}
                              handleAllowEditLastSection={
                                handleAllowEditLastSection
                              }
                              setViewThirdFeedBackDialog={
                                setViewThirdFeedBackDialog
                              }
                              setViewFeedBackItem={setViewFeedBackItem}
                              handleShowTestInNextYear={
                                handleShowTestInNextYear
                              }
                              setShowSubmitDialog={setShowSubmitDialog}
                              setShowCurrentSubmittedItem={
                                setShowCurrentSubmittedItem
                              }
                            />
                          );
                        })}
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

export default FollowUpParticulars;
