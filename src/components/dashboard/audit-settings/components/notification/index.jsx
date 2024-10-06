import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetNotifications,
  setupUpdateNotifications,
} from "../../../../../global-redux/reducers/settings/notification/slice";

const Notifications = ({ currentSettingOption }) => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state?.settingsUserManagement);
  const { notifications, loading } = useSelector(
    (state) => state?.settingsNotification
  );
  const [userId, setUserId] = React.useState("");
  const array = [
    {
      name: "onLogin",
      id: 1,
      emailNotification: true,
      systemNotification: true,
      value: "On Login",
    },
    {
      name: "userCreation",
      id: 2,
      emailNotification: true,
      systemNotification: true,
      value: "User Creation",
    },
    {
      name: "passwordRecovery",
      id: 3,
      emailNotification: true,
      systemNotification: true,
      value: "Password Recovery",
    },
    {
      name: "forgetPassword",
      id: 4,
      emailNotification: true,
      systemNotification: true,
      value: "Forget Password",
    },
    {
      name: "onMeetingRequest",
      id: 5,
      emailNotification: true,
      systemNotification: true,
      value: "On Meeting Request",
    },
    {
      name: "auditPlanSubmittedForApproval",
      id: 6,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Plan Submitted For Approval",
    },
    {
      name: "auditPlanApproved",
      id: 7,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Plan Approved",
    },
    {
      name: "onJobAssignment",
      id: 8,
      emailNotification: true,
      systemNotification: true,
      value: "On Job Assignment",
    },
    {
      name: "jobChangeRequest",
      id: 9,
      emailNotification: true,
      systemNotification: true,
      value: "Job Change Request",
    },
    {
      name: "jobChangeRequestApproved",
      id: 10,
      emailNotification: true,
      systemNotification: true,
      value: "Job Change Request Approved",
    },
    {
      name: "checklistChangeRequest",
      id: 11,
      emailNotification: true,
      systemNotification: true,
      value: "Checklist Change Request",
    },
    {
      name: "checklistChangeRequestApproved",
      id: 12,
      emailNotification: true,
      systemNotification: true,
      value: "Checklist Change Request Approved",
    },
    {
      name: "jobDueForKickOffInAWeek",
      id: 13,
      emailNotification: true,
      systemNotification: true,
      value: "Job Due For Kick-Off In A Week",
    },
    {
      name: "auditNotification",
      id: 14,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Notification",
    },
    {
      name: "onInformationRequest",
      id: 15,
      emailNotification: true,
      systemNotification: true,
      value: "On Information Request",
    },
    {
      name: "riskControlMatrixSubmission",
      id: 16,
      emailNotification: true,
      systemNotification: true,
      value: "Risk Control Matrix Submission",
    },
    {
      name: "riskControlMatrixApproval",
      id: 17,
      emailNotification: true,
      systemNotification: true,
      value: "Risk Control Matrix Approval",
    },
    {
      name: "auditProgramSubmission",
      id: 18,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Program Submission",
    },
    {
      name: "auditProgramApproval",
      id: 19,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Program Approval",
    },
    {
      name: "managementCommentsReceived",
      id: 20,
      emailNotification: true,
      systemNotification: true,
      value: "Management Comments Received",
    },
    {
      name: "managementCommentsSent",
      id: 21,
      emailNotification: true,
      systemNotification: true,
      value: "Management Comments Sent",
    },
    {
      name: "managementCommentsDue",
      id: 22,
      emailNotification: true,
      systemNotification: true,
      value: "Management Comments Due",
    },
    {
      name: "exceptionsDueForImplementation",
      id: 23,
      emailNotification: true,
      systemNotification: true,
      value: "Exceptions Due For Implementation",
    },
    {
      name: "exceptionsImplemented",
      id: 24,
      emailNotification: true,
      systemNotification: true,
      value: "Exceptions Implemented",
    },
    {
      name: "exceptionsDateChangeRequest",
      id: 25,
      emailNotification: true,
      systemNotification: true,
      value: "Exceptions Date Change Request",
    },
    {
      name: "jobComplete",
      id: 26,
      emailNotification: true,
      systemNotification: true,
      value: "Job Complete",
    },
    {
      name: "auditPlanReportDraftReceived",
      id: 27,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Plan Report Draft Received",
    },
    {
      name: "auditPlanReportFeedbackIssued",
      id: 28,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Plan Report Feedback Issued",
    },
    {
      name: "auditPlanReportFeedbackReceived",
      id: 29,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Plan Report Feedback Received",
    },
    {
      name: "auditPlanReportApproved",
      id: 30,
      emailNotification: true,
      systemNotification: true,
      value: "Audit Plan Report Approved",
    },
    {
      name: "internalAuditReportDraftReceived",
      id: 31,
      emailNotification: true,
      systemNotification: true,
      value: "Internal Audit Report Draft Received",
    },
    {
      name: "internalAuditReportFeedbackIssued",
      id: 32,
      emailNotification: true,
      systemNotification: true,
      value: "Internal Audit Report Feedback Issued",
    },
    {
      name: "internalAuditReportFeedbackReceived",
      id: 33,
      emailNotification: true,
      systemNotification: true,
      value: "Internal Audit Report Feedback Received",
    },
    {
      name: "internalAuditReportApproved",
      id: 34,
      emailNotification: true,
      systemNotification: true,
      value: "Internal Audit Report Approved",
    },
    {
      name: "weeklyReminderForJobListInFollowUp",
      id: 35,
      emailNotification: true,
      systemNotification: true,
      value: "Weekly Reminder For Job List In Follow-Up",
    },
    {
      name: "fortnightlyReminderForJobListInFollowUp",
      id: 36,
      emailNotification: true,
      systemNotification: true,
      value: "Fortnightly Reminder For Job List In Follow-Up",
    },
    {
      name: "taskAllocation",
      id: 37,
      emailNotification: true,
      systemNotification: true,
      value: "Task Allocation",
    },
    {
      name: "taskReceived",
      id: 38,
      emailNotification: true,
      systemNotification: true,
      value: "Task Received",
    },
    {
      name: "taskDueDate",
      id: 39,
      emailNotification: true,
      systemNotification: true,
      value: "Task Due Date",
    },
    {
      name: "raiseInformationRequest",
      id: 40,
      emailNotification: true,
      systemNotification: true,
      value: "Raise Information Request",
    },
    {
      name: "receiveInformationRequest",
      id: 41,
      emailNotification: true,
      systemNotification: true,
      value: "Receive Information Request",
    },
    {
      name: "informationRequestDue",
      id: 42,
      emailNotification: true,
      systemNotification: true,
      value: "Information Request Due",
    },
  ];
  const [emailArray, setEmailArray] = React.useState(array);

  function handleChange(event, id, emailType) {
    if (loading) return;
    setEmailArray((pre) =>
      pre?.map((item) =>
        item?.id === id ? { ...item, [emailType]: event.target.checked } : item
      )
    );
    let array;
    array = {
      id: Number(notifications?.id),
      userId: Number(userId),
    };
    let changedEmailArray = emailArray?.map((item) =>
      item?.id === id ? { ...item, [emailType]: event.target.checked } : item
    );
    changedEmailArray?.forEach((singleItem) => {
      if (
        singleItem?.emailNotification === false &&
        singleItem?.systemNotification === false
      ) {
        array = {
          ...array,
          [singleItem?.name]: 0,
        };
      }
      if (
        singleItem?.emailNotification === true &&
        singleItem?.systemNotification === true
      ) {
        array = {
          ...array,
          [singleItem?.name]: 1,
        };
      }
      if (
        singleItem?.emailNotification === false &&
        singleItem?.systemNotification === true
      ) {
        array = {
          ...array,
          [singleItem?.name]: 2,
        };
      }
      if (
        singleItem?.emailNotification === true &&
        singleItem?.systemNotification === false
      ) {
        array = {
          ...array,
          [singleItem?.name]: 3,
        };
      }
    });
    dispatch(setupUpdateNotifications(array));
  }

  React.useEffect(() => {
    if (notifications && Object.keys(notifications)?.length > 0) {
      let object = notifications;
      let newObj = { ...object };
      delete newObj.id;
      delete newObj.userId;

      let valueMap;
      array?.forEach((singleItem) => {
        valueMap = {
          ...valueMap,
          [singleItem?.name]: singleItem?.value,
        };
      });

      const determineNotifications = (num) => {
        switch (num) {
          case 0:
            return { emailNotification: false, systemNotification: false };
          case 1:
            return { emailNotification: true, systemNotification: true };
          case 2:
            return { emailNotification: false, systemNotification: true };
          case 3:
            return { emailNotification: true, systemNotification: false };
          default:
            return { emailNotification: true, systemNotification: true };
        }
      };

      const userArray = Object.entries(newObj).map(([key, value], index) => {
        const notifications = determineNotifications(value);
        return {
          name: key,
          id: index + 1,
          ...notifications,
          value: valueMap[key],
        };
      });
      setEmailArray(userArray);
    }
  }, [notifications]);

  React.useEffect(() => {
    if (userId && userId !== "") {
      dispatch(setupGetNotifications({ userId }));
    }
  }, [userId]);

  React.useEffect(() => {
    setUserId("");
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade"
      id="nav-notification"
      role="tabpanel"
      aria-labelledby="nav-notification-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Notifications</div>
          <label className="fw-light">
            Manage your notifications from here
          </label>
        </div>
      </div>
      <div className="d-flex align-items-center mt-2">
        <select
          className="form-select"
          aria-label="Default select example"
          name="rating"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select One</option>
          {allUsers?.map((user, index) => {
            return (
              <option value={user?.id} key={index}>
                {user?.name}({user?.employeeid?.userHierarchy})
              </option>
            );
          })}
        </select>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th>Notification</th>
                  <th>Email Notification</th>
                  <th>System Notification</th>
                </tr>
              </thead>
              {!userId || userId === "" ? (
                <tbody>
                  <tr>
                    <td className="w-300">
                      Select User To Change Notification
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {emailArray?.map((item, index) => {
                    return (
                      <tr key={item?.id}>
                        <td>{index + 1}</td>
                        <td>{item?.value}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              checked={item?.emailNotification}
                              onChange={(event) =>
                                handleChange(
                                  event,
                                  item?.id,
                                  "emailNotification"
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              checked={item?.systemNotification}
                              onChange={(event) =>
                                handleChange(
                                  event,
                                  item?.id,
                                  "systemNotification"
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
