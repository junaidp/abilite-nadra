import React from "react";
import Headers from "./components/header/index";
import {
  setupGetSingleReport,
  handleCleanUp,
  setupGetResourceDetails
} from "../../../../../global-redux/reducers/reports/planing-report/slice";
import {
  changeActiveLink,
  InitialLoadSidebarActiveLink,
} from "../../../../../global-redux/reducers/common/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Editors from "./components/editors/index";
import HeadingTable from "./components/heading-table";
import ResourcesTables from "../components/resources";
import { useNavigate } from "react-router-dom";
import PlanningReportFileUpload from "./components/file-upload";
import { decryptString } from "../../../../../config/helper";
import { useParams } from "react-router-dom";

const UpdatePlanningReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const reportId = decryptString(id);
  const { user } = useSelector((state) => state?.auth);
  const { loading, singleReportObject, resources } = useSelector(
    (state) => state?.planningReport
  );

  React.useEffect(() => {
    if (!reportId) {
      navigate("/audit/planning-report");
    }
  }, [reportId]);

  React.useEffect(() => {
    if (user[0]?.token && reportId) {
      const fetchDataSequentially = async () => {
        await dispatch(setupGetSingleReport(Number(reportId)));
        await dispatch(setupGetResourceDetails({ reportId: Number(reportId) }));
      };
      fetchDataSequentially();
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(changeActiveLink("li-internal-audit-planing-report"));
    dispatch(InitialLoadSidebarActiveLink("li-reports"));
    return () => {
      dispatch(handleCleanUp());
    };
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Headers data={singleReportObject} />
          <Editors data={singleReportObject} />
          {resources && resources.length > 0 &&
            <ResourcesTables resources={resources} />
          }
          {/* <HeadingTable data={singleReportObject} /> */}
          <PlanningReportFileUpload item={singleReportObject} />
        </>
      )}
    </div>
  );
};

export default UpdatePlanningReport;
