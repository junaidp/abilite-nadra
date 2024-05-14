import React from "react";
import Button from "@mui/material/Button";
import TFADialog from "./TFADialog";

const TwoFactorAuthentication = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <div
      className="tab-pane fade"
      id="nav-tfa"
      role="tabpanel"
      aria-labelledby="nav-tfa-tab"
    >
      {showDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <TFADialog setShowDialog={setShowDialog} />
          </div>
        </div>
      )}
      <div className="d-flex justify-center">
        <Button variant="outlined" onClick={() => setShowDialog(true)}>
          Generate New QR Code
        </Button>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
