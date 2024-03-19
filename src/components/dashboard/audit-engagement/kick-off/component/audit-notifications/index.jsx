import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupSaveAuditNotification } from "../../../../../../global-redux/reducers/audit-engagement/slice";

const AuditNotifications = ({ currentAuditEngagement, auditEngagementId }) => {
  const { loading } = useSelector((state) => state?.auditEngagement);
  const [showSubmitButton, setShowSubmitButton] = React.useState(true);
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    toEmail: "",
    ccEmail: "",
    subject: "",
    body: "",
  });

  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleSend() {
    dispatch(
      setupSaveAuditNotification({
        ...data,
        engagementId: Number(auditEngagementId),
      })
    );
  }

  React.useEffect(() => {
    if (currentAuditEngagement?.auditNotification) {
      setData((pre) => {
        return {
          toEmail: currentAuditEngagement?.auditNotification?.toEmail || "",
          ccEmail: currentAuditEngagement?.auditNotification?.ccEmail || "",
          subject: currentAuditEngagement?.auditNotification?.subject || "",
          body: currentAuditEngagement?.auditNotification?.body || "",
        };
      });
    }
  }, [currentAuditEngagement]);

  React.useEffect(() => {
    if (currentAuditEngagement?.auditNotification) {
      let { body, ccEmail, subject, toEmail } =
        currentAuditEngagement?.auditNotification;
      if (!body || !ccEmail || !subject || !toEmail) {
        setShowSubmitButton(true);
      } else {
        setShowSubmitButton(false);
      }
    }
  }, [currentAuditEngagement]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          {showSubmitButton === false && (
            <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
          )}
          Audit Notification
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container upload-table">
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="d-flex mb-2 align-items-center">
                  <label className="me-3 w-80">To</label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Email"
                    type="text"
                    name="toEmail"
                    value={data?.toEmail}
                    onChange={(event) => handleChange(event)}
                    disabled={showSubmitButton === false ? true : false}
                  />
                </div>
                <div className="d-flex mb-2  align-items-center">
                  <label className="me-3 w-80">CC</label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Email"
                    type="text"
                    name="ccEmail"
                    value={data?.ccEmail}
                    onChange={(event) => handleChange(event)}
                    disabled={showSubmitButton === false ? true : false}
                  />
                </div>
                <div className="d-flex mb-2  align-items-center">
                  <label className="me-3 w-80">Subject</label>
                  <input
                    className="form-control w-100"
                    placeholder="Enter Subject"
                    type="text"
                    name="subject"
                    value={data?.subject}
                    onChange={(event) => handleChange(event)}
                    disabled={showSubmitButton === false ? true : false}
                  />
                </div>
                <div className="d-flex mb-2  align-items-center">
                  <label className="me-3 w-80"></label>
                  <textarea
                    className="form-control"
                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                    id="exampleFormControlT"
                    rows="15"
                    name="body"
                    value={data?.body}
                    onChange={(event) => handleChange(event)}
                    disabled={showSubmitButton === false ? true : false}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-between">
                  {showSubmitButton && (
                    <button
                      className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={handleSend}
                    >
                      {loading ? "Loading" : "Save"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditNotifications;
