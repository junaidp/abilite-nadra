import { useNavigate } from "react-router-dom";

/**
 * Reusable Header component for Audit pages.
 *
 * @param {Object} props
 * @param {string} props.title - The title to display (e.g., "Internal Audit Report" or "Update Internal Audit Report").
 * @param {string} [props.backPath="/audit/internal-audit-report"] - Optional custom path to navigate back.
 */
const Header = ({ title = "Internal Audit Report", backPath = "/audit/internal-audit-report" }) => {
    const navigate = useNavigate();

    return (
        <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">
                <a
                    className="text-primary cursor-pointer"
                    onClick={() => navigate(backPath)}
                >
                    <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
                </a>
                {title}
            </div>
        </header>
    );
};

export default Header;
