import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../view-internal-audit-consolidation-report/components/PDFGenerator";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink
} from "../../../../../global-redux/reducers/common/slice"
import {
    handleResetData
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const DownloadDetailedAuditReport = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);
    const { selectedReport } = useSelector((state) => state.consolidationReport);
    const defaultLogoBase64 = user?.[0]?.company?.[0]?.logo?.fileData || "";
    const logoPreview =
        `data:image/jpeg;base64,${defaultLogoBase64}` || ""

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

            <PDFDownloadLink
                document={<MyDocument reportObject={selectedReport} logoPreview={logoPreview} />}
                fileName={`${selectedReport?.reportName}_${moment
                    .utc(selectedReport?.reportDate)
                    .format("YYYY-MM-DD")}.pdf`}
            >
                {({ loading }) =>
                    loading ? (
                        <button className="btn btn-labeled btn-primary px-3 shadow me-3 fitContent" disabled>
                            Generating PDF...
                        </button>
                    ) : (
                        <button className="btn btn-labeled btn-primary px-3 shadow me-3 fitContent cursor-pointer">
                            Download PDF
                        </button>
                    )
                }
            </PDFDownloadLink>
        </div>
    );
};

export default DownloadDetailedAuditReport;
