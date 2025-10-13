import React from "react";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink
} from "../../../../../global-redux/reducers/common/slice"
import { decryptString } from "../../../../../config/helper";
import {
    handleResetData,
    setupDownloadDetailedAuditReport,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";


const DownloadDetailedAuditReport = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const reportId = decryptString(id);
    const { loading, singleInternalAuditReport } = useSelector((state) => state.consolidationReport);

    function handleDownload() {
        if (loading) return
        const fileName = singleInternalAuditReport?.reportName + "_" + moment
            .utc(singleInternalAuditReport?.reportDate)
            .format("YYYY-MM-DD") + ".pdf"
        dispatch(setupDownloadDetailedAuditReport({ reportId, fileName }))
    }

    React.useEffect(() => {
        dispatch(changeActiveLink("li-consolidation-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, []);

    return (
        <div>

            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between mb-4">
                <div className="mb-0 heading">
                    <a
                        className="text-primary"
                        onClick={() => navigate("/audit/internal-audit-consolidation-report")}
                    >
                        <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
                    </a>
                    Detailed Audit Report
                </div>
            </header>

            <button className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent cursor-pointer ${loading && "disabled"}`} onClick={handleDownload}>
                {loading ? "Downloading..." : "Download PDF"}
            </button>
        </div>
    );
};

export default DownloadDetailedAuditReport;

