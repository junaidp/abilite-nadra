import React from "react";
import { toast } from "react-toastify";
import { setupUploadAuditStepFile } from "../../../../global-redux/reducers/audit-engagement/slice";
import { useSelector, useDispatch } from "react-redux";

const ObservationFileUpload = ({ item }) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementObservationAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onApiCall = async (file) => {
    if (!loading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupUploadAuditStepFile({ formData: formData, id: item?.id }));
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };
  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      setSelectedFile(null);
      if (fileInputRef?.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [auditEngagementObservationAddSuccess]);
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>

        <div className="row mb-3">
          <div className="col-lg-2">
            <input
              type="file"
              id="fileInpu"
              className="f-10"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="col-lg-2">
            <button
              className={`btn btn-labeled btn-primary  shadow ${
                loading && "disabled"
              }`}
              onClick={handleFileUpload}
            >
              <span className="btn-label me-2">
                <i className="fa fa-save"></i>
              </span>
              {loading ? "Loading..." : "Upload"}
            </button>
          </div>
        </div>

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
  );
};

export default ObservationFileUpload;
