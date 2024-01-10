import React from "react";

const EmailManagement = ({ activeEmailTab, setActiveEmailTab }) => {
  return (
    <div
      className="tab-pane fade"
      id="nav-email"
      role="tabpanel"
      aria-labelledby="nav-email-tab"
    >
      <div>
        <div className="card p-3 shadow-sm setting-tab">
          <h2 className="text-center heading p-3">Email Settings</h2>
          <nav className="email-settings-btn">
            <div
              className="nav settings-nav-tabs glass-effect border-0"
              id="nav-tab"
              role="tablist"
            >
              <button
                className={`nav-link active shadow-sm w-300 rounded-0 me-3 ${
                  activeEmailTab === "systemEmail" && "active-settings-btn"
                }`}
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                onClick={() => setActiveEmailTab("systemEmail")}
              >
                Default Notification Email Body
              </button>
              <button
                className={`nav-link active shadow-sm w-300 rounded-0 me-3 ${
                  activeEmailTab === "userEmail" && "active-settings-btn"
                }`}
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                onClick={() => setActiveEmailTab("userEmail")}
              >
                Save Notification Email Body
              </button>
            </div>
          </nav>
          <div
            className="tab-content p-3 mt-4 border bg-light"
            id="nav-tabContent"
          >
            {activeEmailTab === "systemEmail" && (
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sub-heading  fw-bold">Email</div>
                    <label className="fw-light">
                      Default email template here
                    </label>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12">
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                      id="exampleFormControlT"
                      rows="15"
                    ></textarea>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="col-lg-6 text-end float-end align-self-end">
                      <div className="btn btn-labeled btn-primary px-3 shadow">
                        <span className="btn-label me-2">
                          <i className="fa fa-save"></i>
                        </span>
                        Save
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeEmailTab === "userEmail" && (
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sub-heading  fw-bold">Email</div>
                    <label className="fw-light">
                      Editable email template here
                    </label>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12">
                    <textarea
                      className="form-control"
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                      id="exampleFormControlT"
                      rows="15"
                    ></textarea>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="col-lg-6 text-end float-end align-self-end">
                      <div className="btn btn-labeled btn-primary px-3 shadow">
                        <span className="btn-label me-2">
                          <i className="fa fa-save"></i>
                        </span>
                        Save
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailManagement;
