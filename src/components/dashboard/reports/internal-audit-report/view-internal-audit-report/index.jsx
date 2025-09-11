import React from "react";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import {
  setupGetSingleInternalAuditReport,
  handleResetData,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportFirstLayout from "./components/FirstLayout";
import RichTextFields from "./components/RichTextElements";
import AuditExtraFields from "./components/AuditExtraFields";
import Header from "./components/Header";
import FollowUpItem from "./components/FollowUpItem";
import FileUpload from "./components/FileUpload";
import { Chip } from "@mui/material";
import { decryptString } from "../../../../../config/helper";
import { useParams } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { groupByArea } from "../../../../../config/helper";

const ViewInternalAuditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = decryptString(id);
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleInternalAuditReport } = useSelector(
    (state) => state?.internalAuditReport
  );

  const sortedObservations = groupByArea(singleInternalAuditReport?.reportingList || [])


  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/internal-audit-report");
    }
  }, [reportId]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleResetData());
    };
  }, []);

  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      dispatch(
        setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`)
      );
    }
  }, [dispatch]);

  return (
    <div className="overflow-y-hidden">
      {loading ? (
        <CircularProgress />
      ) : singleInternalAuditReport[0]?.error === "Not Found" ||
        (Object.keys(singleInternalAuditReport).length === 0 &&
          singleInternalAuditReport.constructor === Object) ? (
        "Interal Audit Report Not Found"
      ) : (
        <div className="mb-4">
          <Header singleInternalAuditReport={singleInternalAuditReport} />
          <ReportFirstLayout
            singleInternalAuditReport={singleInternalAuditReport}
          />

          <RichTextFields
            singleInternalAuditReport={singleInternalAuditReport}
          />
          <div>
            <div className="col-lg-12 mt-4">
              <div className="heading  fw-bold">Main Findings And Recommendations</div>
            </div>
            <div className="mt-3 mb-3">
              {sortedObservations.map((areaGroup, idx) => (
                <div key={idx}>
                  <div>
                    <div>
                      <p className="mb-3 consolidatedTitle">
                        {areaGroup.area}
                      </p>
                    </div>
                    <div className="border rounded px-3 py-2 mb-3">
                      {areaGroup.items.map((observation, oIdx) => (
                        <LazyLoad key={oIdx} height={window.innerHeight * 2} offset={300}>
                          <div>
                            <div className="d-flex items-end justify-content-end">
                              <Chip
                                label={
                                  singleInternalAuditReport?.subLocationList?.find(
                                    (subLocation) => subLocation?.id === observation?.subLocation
                                  )?.description
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
                </div>
              ))}
            </div>
          </div>
          {singleInternalAuditReport?.intAuditExtraFieldsList &&
            singleInternalAuditReport?.intAuditExtraFieldsList?.length > 0 && (
              <AuditExtraFields
                singleInternalAuditReport={singleInternalAuditReport}
              />
            )}
          <div className="mt-4">
            <FileUpload item={singleInternalAuditReport} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInternalAuditReport;
