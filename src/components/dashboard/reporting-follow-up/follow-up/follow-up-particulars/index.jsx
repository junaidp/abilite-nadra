import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { CircularProgress } from "@mui/material";
import AccordianItem from "./components/AccordianItem";
import ApproveDialog from "./components/ApproveDialog";
import FeedBackDialog from "../../components/FeedBackDialog";
import ViewThirdFeedBackDialog from "../../components/ThirdFeedBack";
import SubmitDialog from "./components/SubmitDialog";
import { decryptString } from "../../../../../config/helper";
import { useParams } from "react-router-dom";

const FollowUpParticulars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const followUpId = decryptString(id);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const {
    singleReport,
    loading,
    reportingAddSuccess,
    initialLoading,
    followUpSubmittedAddSuccess,
  } = useSelector((state) => state?.reporting);
  const [report, setReport] = React.useState([]);
  const [currentApproveItem, setCurrentApproveItem] = React.useState({});
  const [approveDialog, setApproveDialog] = React.useState(false);
  const [feedBackDialog, setFeedBackDialog] = React.useState(false);
  const [currentReportingAndFollowUpId, setCurrentReportingAndFollowUpId] =
    React.useState("");
  const [viewFeedBackItem, setViewFeedBackItem] = React.useState({});
  const [viewThirdFeedBackDialog, setViewThirdFeedBackDialog] =
    React.useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [currentSubmittedItem, setShowCurrentSubmittedItem] = React.useState(
    {}
  );
  function handleChange(event, id) {
    setReport((pre) => {
      return {
        ...pre,
        reportingList: pre?.reportingList?.map((singleItem) =>
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
      };
    });
  }

  function handleSave(item) {
    if (!loading) {
      dispatch(
        setupUpdateFollowUp({
          ...item?.followUp,
          recommendationsImplemented:
            item?.followUp?.recommendationsImplemented.toString() === "true"
              ? true
              : false,
          finalComments:
            item?.followUp?.recommendationsImplemented.toString() === "true"
              ? item?.followUp?.finalComments
              : "",
        })
      );
    }
  }

  function handleSaveToStep7(item) {
    if (!loading) {
      dispatch(
        setupUpdateFollowUp({
          ...item?.followUp,
          testInNextYear:
            item?.followUp?.testInNextYear.toString() === "true" ? true : false,
        })
      );
    }

    setTimeout(() => {
      setCurrentApproveItem(item);
      setApproveDialog(true);
    }, 1200);
  }

  // Editibility OF Last Section Starts
  function handleAllowEditLastSection(item) {
    let allowEdit = false;
    if (
      Number(item?.stepNo) === 5 &&
      Number(user[0]?.userId?.id) === Number(item?.auditee?.id)
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }
  // Editibility OF Last Section Ends

  // Test In Next Year
  function handleShowTestInNextYear(item) {
    let allowEdit = false;
    if (
      item?.stepNo === 6 &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) ===
          Number(
            singleReport?.resourceAllocation?.backupHeadOfInternalAudit?.id
          ) ||
        Number(user[0]?.userId?.id) ===
          Number(singleReport?.resourceAllocation?.proposedJobApprover?.id) ||
        singleReport?.resourceAllocation?.resourcesList?.find(
          (singleResource) =>
            Number(singleResource?.id) === Number(user[0]?.userId?.id)
        ))
    ) {
      allowEdit = true;
    }
    return allowEdit;
  }
  // Test In Next Year

  React.useEffect(() => {
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
  }, [reportingAddSuccess]);

  React.useEffect(() => {
    if (followUpSubmittedAddSuccess) {
      dispatch(resetFollowUpSubmittedAddSuccess());
    }
  }, [followUpSubmittedAddSuccess]);

  React.useEffect(() => {
    const isEmptyObject =
      Object.keys(singleReport).length === 0 &&
      singleReport.constructor === Object;
    if (!isEmptyObject && followUpId) {
      if (user[0]?.userId?.employeeid?.userHierarchy !== "Management_Auditee") {
        setReport(singleReport);
      }
      if (user[0]?.userId?.employeeid?.userHierarchy === "Management_Auditee") {
        setReport({
          ...singleReport,
          reportingList: singleReport?.reportingList?.filter(
            (all) => Number(all?.auditee?.id) === user[0]?.id
          ),
        });
      }
    }
  }, [singleReport]);

  React.useEffect(() => {
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
  }, [dispatch]);

  React.useEffect(() => {
    if (!followUpId) {
      navigate("/audit/follow-up");
    }
  }, [followUpId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-followup"));
    dispatch(InitialLoadSidebarActiveLink("li-reporting-and-followup"));
    return () => {
      dispatch(resetReports());
    };
  }, []);

  return (
    <div>
      {showSubmitDialog && (
        <div className="model-parent  d-flex justify-content-between items-center">
          <div className="model-wrap">
            <SubmitDialog
              item={currentSubmittedItem}
              setShowSubmitDialog={setShowSubmitDialog}
            />
          </div>
        </div>
      )}
      {approveDialog && (
        <div className="model-parent  d-flex justify-content-between items-center">
          <div className="model-wrap">
            <ApproveDialog
              setApproveDialog={setApproveDialog}
              currentApproveItem={currentApproveItem}
            />
          </div>
        </div>
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
      ) : singleReport[0]?.error === "Not Found" ? (
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
