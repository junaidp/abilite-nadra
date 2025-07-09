import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { handleChangeUserCompany, setupSaveCompany } from "../../../../../global-redux/reducers/auth/slice"

const FiscalDuration = ({ userRole, userCompany }) => {
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    function handleChange(event) {
        dispatch(handleChangeUserCompany(event))
    }

    function handleSave() {
        if (loading) return
        dispatch(setupSaveCompany(userCompany))
    }

    return (
        <div
            className="tab-pane fade"
            id="nav-fiscal"
            role="tabpanel"
            aria-labelledby="nav-fiscal-tab"
        >
            <div className="row">
                <div className="col-lg-12">
                    <div className="sub-heading fw-bold">Fiscal Duration</div>
                    <label className="fw-light">
                        Define the start and end dates of your organization's fiscal year. This will be used across various modules for planning, budgeting, and reporting purposes.
                    </label>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6">
                    <label>Fiscal Year Start Date</label>
                    <input
                        className="form-control"
                        type="date"
                        value={
                            userCompany?.fiscalYearForm
                                ? moment(userCompany.fiscalYearForm).format("YYYY-MM-DD")
                                : ""
                        }
                        name="fiscalYearForm"
                        readOnly={userRole === "ADMIN" ? false : true}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="col-lg-6">
                    <label>Fiscal Year End Date</label>
                    <input
                        className="form-control"
                        type="date"
                        value={
                            userCompany?.fiscalYearTo
                                ? moment(userCompany.fiscalYearTo).format("YYYY-MM-DD")
                                : ""
                        }
                        name="fiscalYearTo"
                        readOnly={userRole === "ADMIN" ? false : true}
                        onChange={(e) => handleChange(e)}

                    />
                </div>
            </div>
            {
                userRole === "ADMIN" &&
                <div>
                    <button className={`btn btn-primary mt-4 ${loading && "disabled"}`} onClick={handleSave}>{loading ? "Loading..." : "Save"}</button>
                </div>
            }
        </div>
    );
};

export default FiscalDuration;
