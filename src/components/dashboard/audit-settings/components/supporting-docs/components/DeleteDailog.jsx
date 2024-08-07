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
        <p>Are You Sure You Want To Delete File?</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-danger ${loading && "disabled"} `}
          onClick={handleDeleteFile}
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setDeleteFileDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteFileDialog;
