import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
    let navigate = useNavigate();

    return (
        <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
            <div className="mb-0 heading">
                <a
                    className="text-primary"
                    onClick={() => navigate("/audit/summarized-report")}
                >
                    <i className="fa fa-arrow-left text-primary fs-5 pe-3"></i>
                </a>
                {title}
            </div>
        </header>
    );
};

export default Header;
