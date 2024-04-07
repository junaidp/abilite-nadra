import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteFile } from "../../../../../../global-redux/reducers/settings/supporting-docs/slice";

const DeleteFileDialog = ({ setDeleteFileDialog, currentFileId }) => {
  const dispatch = useDispatch();
  const { loading, fileAddSuccess } = useSelector(
    (state) => state?.settingsDocs
  );

  function handleDeleteFile() {
    if (!loading) {
      dispatch(setupDeleteFile(Number(currentFileId)));
    }
  }

  React.useEffect(() => {
    if (fileAddSuccess) {
      setDeleteFileDialog(false);
    }
  }, [fileAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete this file?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteFile}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setDeleteFileDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFileDialog;
