import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupUpdateCheckListName } from "../../../global-redux/reducers/settings/check-list/slice";

const EditCheckListDialog = ({ setShowEditCheckListDialog }) => {
  const { user } = useSelector((state) => state.auth);
  const [checkListName, setCheckListName] = React.useState("");
  const { checkListAddSuccess, editLoading, checkList, checkListId } =
    useSelector((state) => state.setttingsCheckList);
  const dispatch = useDispatch();
  function handleSubmit() {
    if (checkListName === "") {
      toast.error("Provide checklist name");
    }
    if (checkListName && !editLoading) {
      const email = user[0]?.email;
      dispatch(
        setupUpdateCheckListName(
          `?userEmailId=${email}&checklistName=${checkListName}&checklistid=${checkListId}`
        )
      );
    }
  }

  React.useEffect(() => {
    if (checkListAddSuccess) {
      setCheckListName("");
      setShowEditCheckListDialog(false);
    }
  }, [checkListAddSuccess]);
  React.useEffect(() => {
    const { description } = checkList.find((item) => item?.id === checkListId);
    setCheckListName(description);
  }, []);
  return (
    <div className="p-4">
      <h4 className="mb-4">Edit Check List</h4>
      <div className="row mb-4 flex items-center">
        <div className="col-lg-2 label-text">Check List Name:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="description"
              id="description"
              name="description"
              className="form-control"
              value={checkListName}
              onChange={(e) => setCheckListName(e?.target?.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 w-100">
          <button
            className={`btn btn-primary ${editLoading && "disabled"}`}
            onClick={handleSubmit}
          >
            {editLoading ? "Loading..." : "Edit"}
          </button>
        </div>
        <div className="mb-4">
          <button
            className="btn btn-danger float-end"
            onClick={() => {
              setShowEditCheckListDialog(false);
              setCheckListName("");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCheckListDialog;
