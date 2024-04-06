import React from "react";
import { toast } from "react-toastify";
import {
  setupAddCheckList,
  resetAddCheckListSuccess,
  setupGetAllCheckLists,
  setupUpdateCheckListRemarks,
  setupGetAllCheckListItems,
  addCheckListId,
  changeCurrentSubListItem,
} from "../../../../../global-redux/reducers/settings/check-list/slice";
import { useSelector, useDispatch } from "react-redux";
import EditCheckListDialog from "../../../../modals/edit-checklist-dialog";
import EditCheckListItemDialog from "../../../../modals/edit-sub-check-list-dialog";
import ViewCheckListItemsDialog from "../../../../modals/view-checklist-items-dialog";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import AccordionItem from "./components/AccordionItem";
import DeleteCheckListDialog from "./components/DeleteDialog";

const CheckList = ({
  setCheckListManagementDialog,
  userHierarchy,
  userRole,
}) => {
  const dispatch = useDispatch();
  const {
    loading,
    subLoading,
    checkListAddSuccess,
    checkList,
    checkListId,
    checkListItems,
  } = useSelector((state) => state.setttingsCheckList);
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const [description, setDescription] = React.useState("");
  const [defaultRemarks, setDefaultRemarks] = React.useState("");
  const [showEditCheckListDialog, setShowEditCheckListDialog] =
    React.useState(false);
  const [deleteCheckListDialog, setShowDeleteCheckListDialog] =
    React.useState(false);
  const [showViewCheckListDialog, setShowViewCheckListDialog] =
    React.useState(false);
  const [showEditCheckListItemDialog, setShowEditCheckListItemDialog] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  function handleSave() {
    if (!loading) {
      if (description === "") {
        toast.error("Provide description");
      } else {
        dispatch(
          setupAddCheckList({
            checklistName: description,
            company: user[0]?.company.find(
              (all) => all?.companyName === company
            ),
            userEmail: user[0]?.email,
          })
        );
      }
    }
  }

  function handleChangeCurrentCheckListId(id) {
    dispatch(addCheckListId(id));
  }

  function handleChangeCheckListRemarks(event) {
    if (event?.target?.value) {
      setDefaultRemarks(event?.target?.value);
    }
  }

  React.useEffect(() => {
    if (defaultRemarks && defaultRemarks !== "") {
      dispatch(
        setupUpdateCheckListRemarks(
          `?userEmailId=${
            user[0]?.email
          }&checklistid=${checkListId}&checklistName=${Number(defaultRemarks)}`
        )
      );
    }
  }, [defaultRemarks]);

  React.useEffect(() => {
    if (checkListAddSuccess) {
      setDefaultRemarks("");
      dispatch(resetAddCheckListSuccess());
      setDescription("");
      setPage(1);
      let email = user[0]?.email;
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      dispatch(
        setupGetAllCheckLists(`?userEmailId=${email}&companyId=${companyId}`)
      );
    }
  }, [checkListAddSuccess]);

  React.useEffect(() => {
    if (checkListId && checkListId !== "") {
      let email = user[0]?.email;
      if (email) {
        dispatch(
          setupGetAllCheckListItems(
            `?userEmailId=${email}&checklistId=${checkListId}`
          )
        );
      }
    }
  }, [checkListId]);

  return (
    <div
      className="tab-pane fade"
      id="nav-check"
      role="tabpanel"
      aria-labelledby="nav-check-tab"
    >
      {deleteCheckListDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteCheckListDialog
              setShowDeleteCheckListDialog={setShowDeleteCheckListDialog}
            />
          </div>
        </div>
      )}
      {showEditCheckListDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <EditCheckListDialog
              setShowEditCheckListDialog={setShowEditCheckListDialog}
            />
          </div>
        </div>
      )}
      {showEditCheckListItemDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <EditCheckListItemDialog
              setShowEditCheckListItemDialog={setShowEditCheckListItemDialog}
            />
          </div>
        </div>
      )}
      {showViewCheckListDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <ViewCheckListItemsDialog
              setShowViewCheckListDialog={setShowViewCheckListDialog}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Checklist Management</div>
          <label className="fw-light">
            Create and Manage your multiple compliance checklist(s) here
          </label>
        </div>
      </div>
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div className="row mt-3">
          <div className="col-lg-6">
            <label className="w-100">Add CheckList:</label>
            <input
              className="form-control w-100"
              placeholder="Enter"
              type="text"
              value={description}
              onChange={(event) => setDescription(event?.target?.value)}
            />
          </div>
          <div className="col-lg-6 text-end float-end align-self-end">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow ${
                loading && "disabled"
              }`}
              onClick={handleSave}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              {loading ? "Loading..." : "Add"}
            </div>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="accordion" id="accordionCheckListExample">
            {loading ? (
              <CircularProgress />
            ) : checkList?.length === 0 ||
              checkList[0]?.error === "Not Found" ? (
              <p>No Checklist to show!</p>
            ) : (
              checkList?.slice((page - 1) * 5, page * 5)?.map((item, index) => {
                return (
                  <AccordionItem
                    item={item}
                    subLoading={subLoading}
                    dispatch={dispatch}
                    key={index}
                    index={index}
                    handleChangeCurrentCheckListId={
                      handleChangeCurrentCheckListId
                    }
                    setShowEditCheckListDialog={setShowEditCheckListDialog}
                    handleChangeCheckListRemarks={handleChangeCheckListRemarks}
                    setCheckListManagementDialog={setCheckListManagementDialog}
                    checkListItems={checkListItems}
                    setShowEditCheckListItemDialog={
                      setShowEditCheckListItemDialog
                    }
                    changeCurrentSubListItem={changeCurrentSubListItem}
                    userHierarchy={userHierarchy}
                    userRole={userRole}
                    setShowViewCheckListDialog={setShowViewCheckListDialog}
                    setShowDeleteCheckListDialog={setShowDeleteCheckListDialog}
                  />
                );
              })
            )}
          </div>
          <Pagination
            count={Math.ceil(checkList?.length / 5)}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckList;
