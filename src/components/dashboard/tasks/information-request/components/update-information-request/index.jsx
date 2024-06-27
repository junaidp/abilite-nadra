import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateTask } from "../../../../../../global-redux/reducers/tasks-management/slice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FileUpload from "./file-upload";
import moment from "moment";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object({
  dueDate: Yup.date().required("Due Date is required"),
  auditEngagementId: Yup.string().required("Job is required"),
  userAssigned: Yup.string().required("Assignee is required"),
  detailedRequirement: Yup.string()
    .required("Detailed Requirement is required")
    .max(400, "Detailed Requirement must be 400 characters or less"),
});

const UpdateInformationRequest = ({
  setShowUpdateInformationRequestDialog,
  updateTaskId,
}) => {
  const dispatch = useDispatch();
  const { users, auditEngagements, loading, taskAddSuccess, allTasks } =
    useSelector((state) => state?.tasksManagement);
  const [fileAttachments, setFileAttachments] = React.useState([]);

  // Initial form values
  const defaultValues = {
    dueDate: "",
    auditEngagementId: "",
    userAssigned: "",
    detailedRequirement: "",
  };

  let [initialValues, setInitialValues] = React.useState(defaultValues);

  const handleSubmit = (values) => {
    if (!loading) {
      let task = allTasks.find((singleTask) => singleTask?.id === updateTaskId);
      dispatch(
        setupUpdateTask({
          id: updateTaskId,
          dueDate: values?.dueDate,
          status: "string",
          auditEngagementId: Number(values?.auditEngagementId),
          createdBy: task?.assignedBy?.id,
          companyId: task?.companyId,
          userAssigned: Number(values?.userAssigned),
          yourResponse: task?.yourResponse,
          fileAttachments: [],
          detailedRequirement: values?.detailedRequirement,
        })
      );
    }
  };

  React.useEffect(() => {
    if (taskAddSuccess) {
      setShowUpdateInformationRequestDialog(false);
    }
  }, [taskAddSuccess]);

  React.useEffect(() => {
    let task = allTasks.find((singleTask) => singleTask?.id === updateTaskId);
    setInitialValues({
      dueDate: task ? moment.utc(task?.dueDate).format("YYYY-MM-DD") : "",
      auditEngagementId: task?.auditEngagement?.id,
      userAssigned: task?.assignee?.id,
      detailedRequirement: task?.detailedRequirement,
    });
  }, [updateTaskId, allTasks]);

  return (
    <div className="px-4 py-4 information-request-dialog-main-wrap">
      <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className="heading">Update Information Request</h2>
        </div>
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="mb-3 col-lg-12">
                <label>Due Date</label>
                <Field
                  type="date"
                  name="dueDate"
                  className="form-control w-100"
                  placeholder="DD/MM/YYYY"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-danger f-14"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-6">
                <label className="me-3">Selected Job</label>
                <Field
                  as="select"
                  name="auditEngagementId"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Select Job</option>
                  {auditEngagements?.map((job, index) => (
                    <option key={index} value={job?.id}>
                      {job?.engagementName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="auditEngagementId"
                  component="div"
                  className="text-danger f-14"
                />
              </div>
              <div className="col-lg-6">
                <label className="me-3">Selected Assignee</label>
                <Field
                  as="select"
                  name="userAssigned"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Select User</option>
                  {users?.map((user, index) => (
                    <option value={user?.id} key={index}>
                      {user?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="userAssigned"
                  component="div"
                  className="text-danger f-14"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label>Detailed Requirement</label>
                <Field
                  as="textarea"
                  name="detailedRequirement"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
                <ErrorMessage
                  name="detailedRequirement"
                  component="div"
                  className="text-danger f-14"
                />
                <label className="word-limit-info label-text">
                  Maximum 400 words
                </label>
              </div>
            </div>

            <FileUpload
              fileAttachments={fileAttachments}
              setFileAttachments={setFileAttachments}
            />

            <div className="row mb-2">
              <div className="col-lg-8 align-self-end">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading && "disabled"}`}
                >
                  {loading ? "Loading.." : "Update"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="row mb-2">
        <div className="col-lg-12 align-self-end">
          <button
            type="submit"
            className="btn btn-danger float-end"
            onClick={() => {
              setShowUpdateInformationRequestDialog(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInformationRequest;
