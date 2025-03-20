import React from "react";
import {
  setupGenerateQRCode,
  setupVerifyQRCode,
  resetVerifyCode,
  updateUserTfa,
} from "../../../../../global-redux/reducers/auth/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const EnableTFADialog = ({ setShowEnableTfaDialog, setCheck }) => {
  const dispatch = useDispatch();
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
  React.useEffect(() => {
    if (verifyCodeSuccess) {
      dispatch(resetVerifyCode());
      setCheck(true);
      dispatch(updateUserTfa(true));
      setShowEnableTfaDialog(false);
    }
  }, [verifyCodeSuccess]);

  React.useEffect(() => {
    dispatch(setupGenerateQRCode());
  }, [dispatch]);

  return (
    <div className="px-4 py-4 min-h-70">
      <header className="section-header my-3    text-start d-flex align-items-center justify-content-between">
        <div className="mb-0 heading d-flex align-items-center">
          <h2 className=" heading">
            Two Factor Authentication({user[0]?.email})
          </h2>
        </div>
      </header>
      <div className="wrapper ">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="qr-code">
          {qrCode ? <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" style={{ width: "200px", height: "200px" }} /> : <p>Loading...</p>}
      </div>
        )}
        <div className="formQrCode margin-auto">
          <input
            type="text"
            spellCheck="false"
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
            onClick={() => setShowEnableTfaDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnableTFADialog;
