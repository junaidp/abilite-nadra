import React from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFGenerator from "./PDFGenerator";
import moment from "moment";
import { useSelector } from "react-redux";


const Header = ({ singleInternalAuditReport }) => {
  let navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const defaultLogoBase64 = user?.[0]?.company?.[0]?.logo?.fileData || "";
  const logoPreview =
    `data:image/jpeg;base64,${defaultLogoBase64}` || ""

  return (
    <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
      <div className="mb-0 heading">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/internal-audit-report")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        View Internal Audit Report
      </div>
      <div className="float-end">
        {singleInternalAuditReport?.submitted === true && (
          <div>
            <PDFDownloadLink
              document={<PDFGenerator reportObject={singleInternalAuditReport} logoPreview={logoPreview} />}
              fileName={`${singleInternalAuditReport?.reportName}_${moment
                .utc(singleInternalAuditReport?.reportDate)
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
        )}

      </div>
    </header>
  );
};

export default Header;
