import React from "react";
import { setupUpdateComplianceCheckList } from "../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ComplianceRow from "./components/compliance-row";

const PAGE_SIZE = 10;

const ComplianceCheckListDialog = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  complianceCheckListMainId,
}) => {
  const dispatch = useDispatch();
  const {
    loading,
    auditEngagementObservationAddSuccess,
    singleAuditEngagementObject,
  } = useSelector((state) => state?.auditEngagement);
  const { user } = useSelector((state) => state?.auth);

  const [complianceItem, setComplianceItem] = React.useState({});
  const [currentDeleteFileId, setCurrentDeleteFileId] = React.useState("");
  const [page, setPage] = React.useState(1);

  const handleUpdate = React.useCallback(() => {
    if (!loading) {
      dispatch(
        setupUpdateComplianceCheckList({
          ...complianceItem,
          checklistObservationsList:
            complianceItem?.checklistObservationsList?.map((complianceItem) => ({
              ...complianceItem,
              observationsDataAttachmentsList:
                complianceItem?.observationsDataAttachmentsList?.filter(
                  (file) => file?.id !== currentDeleteFileId
                ),
            })),
        })
      );
    }
  }, [loading, dispatch, complianceItem, currentDeleteFileId]);

  const handleChange = React.useCallback((event, id) => {
    if (!event.target.value) return;

    const { name, value } = event.target;

    setComplianceItem((pre) => ({
      ...pre,
      checklistObservationsList: pre?.checklistObservationsList?.map((item) =>
        Number(item?.id) === Number(id)
          ? { ...item, [name]: value }
          : item
      ),
    }));
  }, []);

  const onContentChange = React.useCallback((id, value) => {
    setComplianceItem((pre) => ({
      ...pre,
      checklistObservationsList: pre?.checklistObservationsList?.map((item) =>
        Number(item?.id) === Number(id)
          ? { ...item, observation: value }
          : item
      ),
    }));
  }, []);

  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      handleUpdate();
    }
  }, [auditEngagementObservationAddSuccess, handleUpdate]);

  React.useEffect(() => {
    const singleComplianceMainItem =
      currentAuditEngagement?.auditStepChecklistList?.find(
        (mainItem) => Number(mainItem?.id) === Number(complianceCheckListMainId)
      );

    const updatedComplianceItem = singleComplianceMainItem || {};
    const updatedRows = updatedComplianceItem?.checklistObservationsList || [];
    const totalPages = Math.max(1, Math.ceil(updatedRows.length / PAGE_SIZE));

    setComplianceItem(updatedComplianceItem);
    setPage((prevPage) => (prevPage > totalPages ? totalPages : prevPage));
  }, [currentAuditEngagement, complianceCheckListMainId]);

  const allowEdit = React.useMemo(() => {
    let allowEdit = false;

    if (complianceItem?.submitted === false) {
      allowEdit = true;
    }

    if (
      complianceItem?.submitted === true &&
      complianceItem?.approved === false &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) ===
        Number(
          singleAuditEngagementObject?.resourceAllocation
            ?.backupHeadOfInternalAudit?.id
        ) ||
        Number(user[0]?.userId?.id) ===
        Number(
          singleAuditEngagementObject?.resourceAllocation?.proposedJobApprover
            ?.id
        ))
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }, [complianceItem, user, singleAuditEngagementObject]);

  const allRows = complianceItem?.checklistObservationsList || [];
  const totalNoOfRecords = allRows.length;

  const paginatedRows = React.useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return allRows.slice(startIndex, startIndex + PAGE_SIZE);
  }, [allRows, page]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="d-flex items-center justify-content-between">
              <div className="heading">Compliance Checklist</div>
              <div className="d-flex items-center gap-4">
                <Chip
                  label={complianceItem?.subLocationDescription}
                  className="float-end"
                />
                <button
                  type="button"
                  className="btn-close f-22"
                  onClick={() => setShowComplianceCheckListDialog(false)}
                ></button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive" style={{ overflowX: "hidden" }}>
                <table className="table table-bordered table-hover rounded equal-columns mb-0">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th className="w-80">Area</th>
                      <th className="w-80">Subject</th>
                      <th className="w-150">Particulars</th>
                      <th className="w-150">Remarks</th>
                      <th>Observation</th>
                      <th className="w-150">File attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.length === 0 ? (
                      <tr>
                        <td colSpan="7">No Observation To Show</td>
                      </tr>
                    ) : (
                      paginatedRows.map((singleItem, index) => (
                        <ComplianceRow
                          key={singleItem?.id || index}
                          index={(page - 1) * PAGE_SIZE + index}
                          singleItem={singleItem}
                          handleChange={handleChange}
                          onContentChange={onContentChange}
                          allowEdit={allowEdit}
                          setCurrentDeleteFileId={setCurrentDeleteFileId}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalNoOfRecords > 10 && (
                <div className="row mt-4 mb-2 align-items-center">
                  <div className="col-lg-6 mb-3 mb-lg-0 d-flex align-items-center">
                    <Pagination
                      count={Math.ceil(totalNoOfRecords / PAGE_SIZE)}
                      page={page}
                      onChange={handlePaginationChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3">
        {allowEdit === true && (
          <button
            className={`btn btn-primary ${loading ? "disabled" : ""}`}
            onClick={handleUpdate}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        )}
        <button
          className="btn btn-danger"
          onClick={() => setShowComplianceCheckListDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ComplianceCheckListDialog;