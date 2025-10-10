import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Chip } from "@mui/material";
import LazyLoad from "react-lazyload";

import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

import { decryptString, groupByArea } from "../../../../../config/helper";
import Header from "../components/Header";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import FollowUpItem from "../components/FollowUpItem";
import FileUpload from "./components/FileUpload";

/**
 * ViewInternalAuditReport Component
 * ---------------------------------
 * Displays the complete details of a single Internal Audit Report in read-only mode.
 * Includes:
 * - Basic report metadata
 * - Rich text content (Executive Summary, Findings, Annexure)
 * - Grouped observations and recommendations
 * - Additional fields and attached files
 */
const ViewInternalAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = decryptString(id);

  // Redux state
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.internalAuditReport
  );

  // Group observations by audit area
  const sortedObservations = useMemo(
    () => groupByArea(singleInternalAuditReport?.reportingList || []),
    [singleInternalAuditReport]
  );

  /** ----------------------------
   * Effects
   * ---------------------------- */

  // Redirect if invalid ID
  useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-report");
    }
  }, [reportId, navigate]);

  // Sidebar link activation
  useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => dispatch(handleResetData());
  }, [dispatch]);

  // Fetch report on mount
  useEffect(() => {
    if (user?.[0]?.token && reportId) {
      dispatch(setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`));
    }
  }, [dispatch, user, reportId]);

  /** ----------------------------
   * Render
   * ---------------------------- */

  const reportNotFound =
    singleInternalAuditReport[0]?.error === "Not Found" ||
    (Object.keys(singleInternalAuditReport).length === 0 &&
      singleInternalAuditReport.constructor === Object);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <CircularProgress />
      </div>
    );
  }

  if (reportNotFound) {
    return <div>Internal Audit Report Not Found</div>;
  }

  return (
    <div className="overflow-y-hidden mb-4">
      <Header title="View Internal Audit Report" />

      {/* Report Overview Section */}
      <ReportFirstLayout singleInternalAuditReport={singleInternalAuditReport} />

      {/* Rich Text Fields Section */}
      <RichTextFields singleInternalAuditReport={singleInternalAuditReport} />

      {/* Findings and Recommendations */}
      <div>
        <div className="col-lg-12 mt-4">
          <div className="heading fw-bold">Main Findings and Recommendations</div>
        </div>

        <div className="mt-3 mb-3">
          {sortedObservations.map((areaGroup, idx) => (
            <div key={idx}>
              <p className="mb-3 consolidatedTitle">{areaGroup.area}</p>
              <div className="border rounded px-3 py-2 mb-3">
                {areaGroup.items.map((observation, oIdx) => (
                  <LazyLoad key={oIdx} height={window.innerHeight * 2} offset={300}>
                    <div>
                      <div className="d-flex items-end justify-content-end">
                        <Chip
                          label={
                            singleInternalAuditReport?.subLocationList?.find(
                              (subLocation) =>
                                subLocation?.id === observation?.subLocation
                            )?.description || "Unknown Sub-Location"
                          }
                        />
                      </div>

                      <FollowUpItem
                        item={observation}
                        consolidatedObservationsItem={true}
                      />
                      <hr />
                    </div>
                  </LazyLoad>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Fields */}
      {singleInternalAuditReport?.intAuditExtraFieldsList?.length > 0 && (
        <AuditExtraFields singleInternalAuditReport={singleInternalAuditReport} />
      )}

      {/* Attached Files */}
      <div className="mt-4">
        <FileUpload item={singleInternalAuditReport} />
      </div>
    </div>
  );
};

export default ViewInternalAuditReport;
