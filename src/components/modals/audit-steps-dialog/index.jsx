import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUpdateAuditSteps,
  setupAddAuditStepObservation,
  setupUpdateAuditStepObservation,
} from "../../../global-redux/reducers/audit-engagement/slice";
import { toast } from "react-toastify";
const AuditStepsDialog = ({
  setShowAuditStepsDialog,
  auditStepId,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const [currentAuditStep, setCurrentAuditStep] = React.useState({});
  const [description, setDescription] = React.useState("");
  React.useState(false);
  const { auditEngagementAddSuccess, loading } = useSelector(
    (state) => state?.auditEngagement
  );

  function handleChange(event) {
    setCurrentAuditStep((pre) => {
      return {
        ...pre,
        [event?.target?.name]: Number(event?.target?.value),
      };
    });
  }

  function handleAddObservation() {
    if (!loading) {
      if (description === "") {
        toast.error("Provide the description");
      } else {
        dispatch(
          setupAddAuditStepObservation({
            description: description,
            stepId: auditStepId,
          })
        );
      }
    }
  }

  function handleSave() {
    if (!loading) {
      if (
        currentAuditStep?.sampling === "" ||
        currentAuditStep?.samplingMethod === "" ||
        currentAuditStep?.controlRisk === "" ||
        currentAuditStep?.frequency === ""
      ) {
        toast.error("Provide all the values");
      } else {
        dispatch(setupUpdateAuditSteps(currentAuditStep));
      }
    }
  }

  function handleChangeDescription(event, id) {
    setCurrentAuditStep((pre) => {
      return {
        ...pre,
        auditStepObservationsList: pre?.auditStepObservationsList?.map((item) =>
          Number(item?.id) === Number(id)
            ? { ...item, description: event?.target?.value }
            : item
        ),
      };
    });
  }

  function handleUpdateObservation(item) {
    dispatch(
      setupUpdateAuditStepObservation({
        id: item?.id,
        description: item?.description,
        observationAttachmentsList: null,
      })
    );
  }

  React.useEffect(() => {
    const step = currentAuditEngagement?.auditStep?.stepList?.find(
      (item) => Number(item?.id) === Number(auditStepId)
    );
    setCurrentAuditStep(step);
  }, [currentAuditEngagement]);

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowAuditStepsDialog(false);
      setDescription("");
    }
  }, [auditEngagementAddSuccess]);
  return (
    <div className="mx-5">
      <header className="section-header mt-3  text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">AUDIT STEP</h2>
        </div>
      </header>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div className="sub-heading">
            {currentAuditStep?.program?.description}
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <div>
            <label className="me-3">Perform Sampling</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={currentAuditStep?.sampling}
              name="sampling"
              onChange={(event) => handleChange(event)}
            >
              <option value="">Select One</option>
              <option value={1}>Yes</option>
              <option value={2}>No</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="me-3">Sampling Method</label>
            <select
              className="form-select"
              onChange={(event) => handleChange(event)}
              aria-label="Default select example"
              value={currentAuditStep?.samplingMethod}
              name="samplingMethod"
            >
              <option value="">Select One</option>
              <option value={1}>Simple Random Sampling</option>
              <option value={2}>Systematic Sampling</option>
              <option value={3}>Cluster Samling</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6">
          <div>
            <label className="me-3">Control Risk</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={currentAuditStep?.controlRisk}
              onChange={(event) => handleChange(event)}
              name="controlRisk"
            >
              <option value="">Select One</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="me-3">Frequency</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={currentAuditStep?.frequency}
              onChange={(event) => handleChange(event)}
              name="frequency"
            >
              <option value="">Select One</option>
              <option value={1}>Annually</option>
              <option value={2}>Bi-annyally</option>
              <option value={3}>Quarterly</option>
              <option value={4}>Monthly</option>
              <option value={5}>Weekly</option>
              <option value={6}>Daily</option>
              <option value={7}>Recurring</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <div>
            <label className="me-3 fw-normal  ">Population size:</label>
            <label className="fw-bolder">50</label>
          </div>
        </div>
        <div className="col-lg-12">
          <div>
            <label className="me-3 fw-normal  ">Sample Size</label>
            <label className="fw-bolder">50</label>
          </div>
        </div>
      </div>
      {/* <div className="row mb-3">
        <div className="col-lg-12">
          <div>
            <label className="form-label me-3 mb-3">Attach files</label>

            <input type="file" id="fileInput" className="f-10 w-180" />
            <a className="form-label label-text underline">View Sample</a>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Uploaded File </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

      {/* <div className="row mb-3">
        <div className="col-lg-12">
          <label className="me-3   ">Audit Procedure Performed</label>
          <textarea
            className="form-control"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            id="exampleFormControlT"
            rows="3"
          ></textarea>
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div> */}

      {/* <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label me-3 mb-3">Attach files</label>

          <input className="f-10" type="file" id="fileInpu" />

          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="sr-col">Sr No.</th>
                  <th>Attach Files </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                  <td className="w-130">
                    <i className="fa fa-eye text-primary f-18"></i>
                    <i className="fa fa-edit mx-3 text-secondary f-18"></i>
                    <i className="fa fa-trash text-danger f-18"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <a href="#">Loram File will be displayed here</a>
                  </td>
                  <td className="w-130">
                    <i className="fa fa-eye text-primary f-18"></i>
                    <i className="fa fa-edit mx-3 text-secondary f-18"></i>
                    <i className="fa fa-trash text-danger f-18"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

      <div className="row mb-3">
        <div className="col-lg-2">
          <button
            className={`btn btn-labeled float-start btn-primary px-3 shadow ${
              loading && "disabled"
            }`}
            onClick={handleAddObservation}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            {!loading ? "Add Observation" : "Loading..."}
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-12">
          <textarea
            className="form-control"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            id="exampleFormControlT"
            rows="3"
            value={description}
            onChange={(event) => setDescription(event?.target?.value)}
          ></textarea>
          <p className="word-limit-info mb-0">Maximum 1500 words</p>
        </div>
      </div>

      <h3>Audit Step Observation List</h3>
      {currentAuditStep?.auditStepObservationsList?.map((item, i) => {
        return (
          <div key={i}>
            <div className="row mb-3">
              <div className="col-lg-12">
                <textarea
                  className="form-control"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  id="exampleFormControlT"
                  rows="3"
                  onChange={(event) => handleChangeDescription(event, item?.id)}
                  value={item?.description}
                ></textarea>
                <div className="row">
                  <div className="col-lg-2">
                    <p className="word-limit-info mb-0">Maximum 1500 words</p>
                  </div>
                  <div className="col-lg-10">
                    <button
                      className={`btn btn-labeled float-end mt-4 btn-primary px-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleUpdateObservation(item)}
                    >
                      {!loading ? "Update Observation" : "Loading..."}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-12">
                <label className="form-label me-3 mb-3">Attach files</label>

                <input type="file" id="fileInpu" className="f-10" />

                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th>Attach Files </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#">Loram File will be displayed here</a>
                        </td>
                        <td className="w-130">
                          <i className="fa fa-eye text-primary f-18"></i>
                          <i className="fa fa-edit mx-3 text-secondary f-18"></i>
                          <i className="fa fa-trash text-danger f-18"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="row">
        <div className="col-lg-6 ">
          <div className="text-end">
            <button
              className="btn btn-danger float-start"
              onClick={() => setShowAuditStepsDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
        <div className=" col-lg-6 ">
          <div className="text-end">
            <button
              className={`btn btn-primary float-end ${loading && "disabled"}`}
              onClick={handleSave}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditStepsDialog;
