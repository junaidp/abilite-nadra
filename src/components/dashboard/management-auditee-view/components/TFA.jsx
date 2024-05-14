import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { setupGenerateQRCode } from "../../../../global-redux/reducers/auth/slice";

const AddCheckListManagementDialog = () => {
  const dispatch = useDispatch();
  const { qrCode, loading, user } = useSelector((state) => state?.auth);
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
    dispatch(setupGenerateQRCode());
  }, [user]);

  return (
    <div
      className="tab-pane fade"
      id="nav-tfa"
      role="tabpanel"
      aria-labelledby="nav-tfa-tab"
    >
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div class="qr-code py-4">
            <img
              src={`data:image/JPEG;base64,${arrayBufferToBase64(qrCode)}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCheckListManagementDialog;
