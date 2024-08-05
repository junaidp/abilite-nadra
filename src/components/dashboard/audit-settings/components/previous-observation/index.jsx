import React from "react";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setupUploadFile,
  resetPreviousObservationsAddSuccess,
  setupGetAllPreviousObservations,
} from "../../../../../global-redux/reducers/settings/previous-observation/slice";

const PreviousObservation = ({ currentSettingOption }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const { loading, previousObservations, previousObservationAddSuccess } =
    useSelector((state) => state.settingsPreviousObservation);
  const { user } = useSelector((state) => state?.auth);
  const { company } = useSelector((state) => state?.common);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const handleChange = (_, value) => {
    setPage(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      fileInputRef.current.value = "";
    }
  };

  const onApiCall = async (file) => {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      const formData = new FormData();
      formData.append("file", file);
      dispatch(setupUploadFile({ formData, companyId }));
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
    if (previousObservationAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      setSelectedFile(null);
      fileInputRef.current.value = "";
      setPage(1);
      dispatch(resetPreviousObservationsAddSuccess());
      dispatch(setupGetAllPreviousObservations({ companyId: companyId }));
    }
  }, [previousObservationAddSuccess]);

  React.useEffect(() => {
    setPage(1);
    setSelectedFile(null);
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade"
      id="previous-observation"
      role="tabpanel"
      aria-labelledby="previous-observation-tab"
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading mb-4 fw-bold">Previous Observations</div>
        </div>
      </div>

      <div>
        <div className="row position-relative">
          <div className="col-lg-12 ml-4 text-center settings-form">
            <form>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <p className="mb-0">
                Drag your files here or click in this area.
              </p>
            </form>
          </div>
          <p className="my-2">
            {selectedFile?.name ? selectedFile?.name : "Select file"}
          </p>
        </div>
        <div className="row my-3">
          <div className="col-lg-12 text-end">
            <button
              className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${
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
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            {loading ? (
              <CircularProgress />
            ) : previousObservations?.length === 0 || !previousObservations ? (
              <p>No Observations To Show</p>
            ) : (
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="w-80">Sr No.</th>
                    <th>Management Comments</th>
                    <th>Observation</th>
                    <th>Jobs Created</th>
                  </tr>
                </thead>
                <tbody>
                  {previousObservations
                    ?.slice((page - 1) * 15, page * 15)
                    ?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.managementComments}</td>
                          <td>{item?.observation}</td>
                          <td>{item?.jobCreated === false ? "No" : "Yess"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            <Pagination
              count={Math.ceil(previousObservations?.length / 15)}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousObservation;
