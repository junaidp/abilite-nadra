import { useNavigate } from "react-router-dom";

/**
 * Header component for displaying report title and metadata.
 * Includes a back navigation arrow, report name, and year details.
 */
const Header = ({ data, title = "Internal Audit Planning Report" }) => {
    const navigate = useNavigate();

    return (
        <div>
            {/* ===== Page Header ===== */}
            <header className="section-header my-3">
                <div className="row align-items-center mb-4">
                    <div className="col-lg-12 d-flex align-items-center">
                        {/* Back Button */}
                        <i
                            className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
                            onClick={() => navigate("/audit/planning-report")}
                        ></i>

                        {/* Page Title */}
                        <div className="mb-0 heading">{title}</div>
                    </div>
                </div>
            </header>

            {/* ===== Report Name Section ===== */}
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <label className="col-lg-2 label-text w-100 mb-2">Report Name</label>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                type="text"
                                id="reportName"
                                className="form-control h-40"
                                value={data?.reportTitle || ""}
                                disabled
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Year Section ===== */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-6">
                            <label className="form-label">Year</label>
                            <div className="mb-3 d-flex align-items-end">
                                {data?.year || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
