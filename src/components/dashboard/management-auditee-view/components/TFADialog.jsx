import React from "react";
import { setupGenerateQRCode } from "../../../../global-redux/reducers/auth/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const TFADialog = ({ setShowDialog }) => {
  const dispatch = useDispatch();
  const { qrCode, user, loading } = useSelector((state) => state?.auth);

  React.useEffect(() => {
    dispatch(setupGenerateQRCode());
  }, [user]);

  return (
    <div className="px-4 py-4 min-h-70">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">Two Factor Authentication</h2>
        </div>
      </header>
      <div className="wrapper pb-4 ">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="qr-code mb-4">
      {qrCode ? <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" style={{ width: "200px", height: "200px" }} /> : <p>Loading...</p>}
      </div>
        )}
      </div>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setShowDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TFADialog;
