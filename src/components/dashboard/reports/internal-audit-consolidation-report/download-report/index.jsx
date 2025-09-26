import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./pdf";
import {
    changeActiveLink,
    InitialLoadSidebarActiveLink
} from "../../../../../global-redux/reducers/common/slice"
import { decryptString } from "../../../../../config/helper";
import {
    handleResetData,
    setupGetSingleInternalAuditReport
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DownloadDetailedAuditReport = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const reportId = decryptString(id);
    const { singleInternalAuditReport, loading: reportLoading } = useSelector((state) => state.consolidationReport);
    const defaultLogoBase64 = user?.[0]?.company?.[0]?.logo?.fileData || "";
    const logoPreview =
        `data:image/jpeg;base64,${defaultLogoBase64}` || ""


    React.useEffect(() => {
        if (user[0]?.token && reportId) {
            dispatch(
                setupGetSingleInternalAuditReport(`?reportId=${Number(reportId)}`)
            );
        }
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(changeActiveLink("li-consolidation-report"));
        dispatch(InitialLoadSidebarActiveLink("li-reports"));
        return () => {
            dispatch(handleResetData());
        };
    }, []);

    return (
        <div>
            {
                reportLoading ? <CircularProgress /> :
                    <>
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
                            document={<MyDocument reportObject={singleInternalAuditReport} logoPreview={logoPreview} />}
                            fileName={`${singleInternalAuditReport?.reportName}_${moment
                                .utc(singleInternalAuditReport?.reportDate)
                                .format("YYYY-MM-DD")}.pdf`}
                        >
                            {({ loading }) =>
                                loading ? (
                                    <div className="d-flex flex-column align-items-start">
                                        <button className="btn btn-labeled btn-primary px-3 shadow me-3 fitContent" disabled>
                                            Generating PDF...
                                        </button>
                                        <small className="text-muted mt-2">
                                            If the observations are large, the PDF file may take up to 3 minutes to generate.
                                            During this time, your screen may appear frozen — please do not refresh the page.
                                            Once the <strong>Download PDF</strong> button becomes active
                                            (visible on hover), you will be able to download your PDF.
                                            <br />
                                            <strong>Note:</strong> The company logo must be added by an admin
                                            in order to generate the PDF correctly.
                                        </small>
                                    </div>
                                ) : (
                                    <button className="btn btn-labeled btn-primary px-3 shadow me-3 fitContent cursor-pointer">
                                        Download PDF
                                    </button>
                                )
                            }
                        </PDFDownloadLink>
                    </>
            }
        </div>
    );
};

export default DownloadDetailedAuditReport;
