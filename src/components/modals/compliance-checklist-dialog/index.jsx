import React from "react";
import {
  setupGetAuditStepChecklistObservations,
  setupUpdateAuditStepChecklistObservations,
} from "../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import ComplianceRow from "./components/compliance-row";

const ComplianceCheckListDialog = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  complianceCheckListMainId,
}) => {
  const dispatch = useDispatch();
  const { singleAuditEngagementObject } = useSelector(
    (state) => state?.auditEngagement
  );
  const { user } = useSelector((state) => state?.auth);

  const [observations, setObservations] = React.useState([]);
  const [changedRows, setChangedRows] = React.useState({});
  const [currentDeleteFileId, setCurrentDeleteFileId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [totalNoOfRecords, setTotalNoOfRecords] = React.useState(0);
  const [observationsLoading, setObservationsLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const complianceItem = React.useMemo(
    () =>
      currentAuditEngagement?.auditStepChecklistList?.find(
        (mainItem) => Number(mainItem?.id) === Number(complianceCheckListMainId)
      ) || {},
    [currentAuditEngagement, complianceCheckListMainId]
  );

  const buildChangedRow = React.useCallback((row) => ({
    id: row?.id,
    remarks: row?.remarks,
    observation: row?.observation,
    completed: row?.completed === true,
  }), []);

  const fetchObservations = React.useCallback(async () => {
    if (!complianceCheckListMainId) return;

    try {
      setObservationsLoading(true);
      const response = await dispatch(
        setupGetAuditStepChecklistObservations({
          auditStepChecklistId: complianceCheckListMainId,
          page: page - 1,
          size: itemsPerPage,
        })
      ).unwrap();

      setObservations(response?.data?.content || []);
      setTotalNoOfRecords(response?.data?.totalElements || 0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An Error has occurred"
      );
    } finally {
      setObservationsLoading(false);
    }
  }, [complianceCheckListMainId, dispatch, itemsPerPage, page]);

  React.useEffect(() => {
    setChangedRows({});
    setCurrentDeleteFileId("");
  }, [complianceCheckListMainId]);

  React.useEffect(() => {
    fetchObservations();
  }, [fetchObservations]);

  const handleUpdate = React.useCallback(async () => {
    const rowsToSave = Object.values(changedRows);
    if (rowsToSave.length === 0 || saving) return;

    try {
      setSaving(true);
      const response = await dispatch(
        setupUpdateAuditStepChecklistObservations(rowsToSave)
      ).unwrap();
      const savedRows = response?.data || [];

      setObservations((prev) =>
        prev.map((row) => {
          const savedRow = savedRows.find(
            (savedItem) => Number(savedItem?.id) === Number(row?.id)
          );
          return savedRow || row;
        })
      );
      setChangedRows({});
      toast.success("Compliance checklist saved successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An Error has occurred"
      );
    } finally {
      setSaving(false);
    }
  }, [changedRows, dispatch, saving]);

  const handleChange = React.useCallback((event, id) => {
    if (!event.target.value) return;

    const { name, value } = event.target;

    setObservations((prev) =>
      prev.map((item) => {
        if (Number(item?.id) !== Number(id)) return item;

        const updatedRow = { ...item, [name]: value };
        setChangedRows((changed) => ({
          ...changed,
          [id]: buildChangedRow(updatedRow),
        }));
        return updatedRow;
      })
    );
  }, [buildChangedRow]);

  const onContentChange = React.useCallback((id, value) => {
    setObservations((prev) =>
      prev.map((item) => {
        if (Number(item?.id) !== Number(id)) return item;

        const updatedRow = { ...item, observation: value };
        setChangedRows((changed) => ({
          ...changed,
          [id]: buildChangedRow(updatedRow),
        }));
        return updatedRow;
      })
    );
  }, [buildChangedRow]);

  const allowEdit = React.useMemo(() => {
    let allowEdit = false;

    if (complianceItem?.submitted === false) {
      allowEdit = true;
    }

    const resourceAllocation = singleAuditEngagementObject?.resourceAllocation;
    const backupHeadId =
      resourceAllocation?.backupHeadOfInternalAudit?.id ??
      resourceAllocation?.backupHeadOfInternalAudit;
    const proposedApproverId =
      resourceAllocation?.proposedJobApprover?.id ??
      resourceAllocation?.proposedJobApprover;

    if (
      complianceItem?.submitted === true &&
      complianceItem?.approved === false &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) === Number(backupHeadId) ||
        Number(user[0]?.userId?.id) === Number(proposedApproverId))
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }, [complianceItem, user, singleAuditEngagementObject]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleChangeItemsPerPage = (event) => {
    setPage(1);
    setItemsPerPage(Number(event.target.value));
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
                    {observationsLoading ? (
                      <tr>
                        <td colSpan="7">
                          <CircularProgress />
                        </td>
                      </tr>
                    ) : observations.length === 0 ? (
                      <tr>
                        <td colSpan="7">No Observation To Show</td>
                      </tr>
                    ) : (
                      observations.map((singleItem, index) => (
                        <ComplianceRow
                          key={singleItem?.id || index}
                          index={(page - 1) * itemsPerPage + index}
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

              {totalNoOfRecords > 0 && (
                <div className="row mt-4 mb-2 align-items-center">
                  <div className="col-lg-6 mb-3 mb-lg-0 d-flex align-items-center">
                    <Pagination
                      count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                      page={page}
                      onChange={handlePaginationChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-3 mb-lg-0 d-flex justify-content-end">
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel id="checklist-observations-page-size-label">
                        Items Per Page
                      </InputLabel>
                      <Select
                        labelId="checklist-observations-page-size-label"
                        id="checklist-observations-page-size"
                        label="Items Per Page"
                        value={itemsPerPage}
                        onChange={handleChangeItemsPerPage}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                      </Select>
                    </FormControl>
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
            className={`btn btn-primary ${saving ? "disabled" : ""}`}
            onClick={handleUpdate}
          >
            {saving ? "Loading..." : "Save"}
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
