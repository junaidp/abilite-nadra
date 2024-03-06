import React from "react";
import { setupUpdateComplianceCheckList } from "../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from "./components/TextEditor";

const ComplianceCheckListDialog = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  complianceCheckListMainId,
}) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const [complianceItem, setComplianceItem] = React.useState({});

  function handleUpdate() {
    if (!loading) {
      dispatch(setupUpdateComplianceCheckList(complianceItem));
    }
  }

  function handleChange(event, id) {
    setComplianceItem((pre) => {
      return {
        ...pre,
        checklistObservationsList: pre?.checklistObservationsList?.map((item) =>
          Number(item?.id) === Number(id)
            ? { ...item, [event?.target?.name]: event?.target?.value }
            : item
        ),
      };
    });
  }

  function onContentChange(id, value) {
    setComplianceItem((pre) => {
      return {
        ...pre,
        checklistObservationsList: pre?.checklistObservationsList?.map((item) =>
          Number(item?.id) === Number(id)
            ? { ...item, observation: value }
            : item
        ),
      };
    });
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setShowComplianceCheckListDialog(false);
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    const singleComplianceMainItem =
      currentAuditEngagement?.auditStepChecklistList?.find(
        (mainItem) => Number(mainItem?.id) === Number(complianceCheckListMainId)
      );
    setComplianceItem(singleComplianceMainItem);
  }, [currentAuditEngagement]);

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="heading">Compliance Checklist</div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded equal-columns">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th>Area</th>
                      <th>Subject</th>
                      <th>Particulars</th>
                      <th>Remarks</th>
                      <th>Observation</th>
                      <th>File attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceItem?.checklistObservationsList?.length === 0
                      ? "No Observation To Show"
                      : complianceItem?.checklistObservationsList?.map(
                          (singleItem, index) => {
                            return (
                              <tr key={index}>
                                <td>{singleItem?.id}</td>
                                <td>{singleItem?.area}</td>
                                <td>{singleItem?.subject || "null"}</td>
                                <td>{singleItem?.particulars}</td>
                                <td>
                                  <select
                                    className="form-select mb-2"
                                    aria-label="Default select example"
                                    value={singleItem?.remarks}
                                    name="remarks"
                                    onChange={(event) =>
                                      handleChange(event, singleItem?.id)
                                    }
                                  >
                                    <option value="">Select One</option>
                                    <option value={1}>Yes</option>
                                    <option value={2}>No</option>
                                    <option value={3}>Not Applicable</option>
                                    <option value={4}>
                                      Partially Complied
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  <RichTextEditor
                                    initialValue={singleItem?.observation}
                                    onContentChange={onContentChange}
                                    singleItem={singleItem}
                                  />
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <div className="w-75 d-grid">
                                      <a href="#" className="text-primary">
                                        Attached file Name 1
                                      </a>
                                      <a href="#" className="text-primary">
                                        Attached file Name 2
                                      </a>
                                    </div>
                                    <div className="w-25">
                                      <i className="fa fa-paperclip me-3 text-secondary"></i>
                                      <i className="fa fa-eye text-primary"></i>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-4 px-4">
        <div className="col-lg-6 text-start">
          <button
            className="btn btn-danger float-start"
            onClick={() => setShowComplianceCheckListDialog(false)}
          >
            Close
          </button>
        </div>
        <div className="col-lg-6 text-end">
          <button
            className={`btn btn-primary float-end ${loading && "disabled"}`}
            onClick={handleUpdate}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCheckListDialog;
