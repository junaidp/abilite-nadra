import React from "react";
import "./index.css";
import {
  setupGenerateQRCode,
  setupVerifyQRCode,
  resetVerifyCode,
} from "../../../global-redux/reducers/auth/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCheckListManagementDialog = ({ setShowQRCodeScanner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = React.useState("");
  const { qrCode, user, loading, codeLoading, verifyCodeSuccess } = useSelector(
    (state) => state?.auth
  );
  function handleVerifyCode() {
    if (!codeLoading) {
      if (code === "") {
        toast.error("Please provide the code");
      } else {
        dispatch(setupVerifyQRCode({ code: code }));
      }
    }
  }
  let arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  React.useEffect(() => {
    if (verifyCodeSuccess) {
      dispatch(resetVerifyCode());
      navigate("/audit/dashboard");
    }
  }, [verifyCodeSuccess]);
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
      <div class="wrapper ">
        {loading ? (
          <CircularProgress />
        ) : (
          <div class="qr-code">
            <img
              src={`data:image/JPEG;base64,${arrayBufferToBase64(qrCode)}`}
            />
          </div>
        )}
        <div class="formQrCode margin-auto">
          <input
            type="text"
            spellcheck="false"
            placeholder="Enter code"
            value={code}
            onChange={(event) => setCode(event?.target?.value)}
          />
          <button className="mb-4" onClick={handleVerifyCode}>
            {codeLoading ? "Loading..." : "Verify Code"}
          </button>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-danger float-end"
            onClick={() => setShowQRCodeScanner(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCheckListManagementDialog;
