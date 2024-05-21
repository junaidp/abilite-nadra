import React from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFGenerator from "./PDFGenerator";

const Header = ({ singleInternalAuditReport }) => {
  let navigate = useNavigate();
  return (
    <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
      <div className="mb-0 heading">
        <a
          className="text-primary"
          onClick={() => navigate("/audit/internal-audit-consolidation-report")}
        >
          <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
        </a>
        View Internal Audit Consolidation Report
      </div>
      <div className="float-end">
        {singleInternalAuditReport?.submitted === true && (
          <div>
            <PDFDownloadLink
              document={
                <PDFGenerator reportObject={singleInternalAuditReport} />
              }
              fileName="consolidation.pdf"
            >
              {() => "Download pdf!"}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
