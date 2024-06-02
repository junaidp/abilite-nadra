import React from "react";
import Button from "@mui/material/Button";
import TFADialog from "./TFADialog";
import EnableTfaDialog from "./EnableTFADialog";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUpdateUser,
  resetTfaDisableAddSucess,
} from "../../../../global-redux/reducers/auth/slice";

const TwoFactorAuthentication = () => {
  const dispatch = useDispatch();
  const { user, disableTfaSuccess, loading } = useSelector(
    (state) => state?.auth
  );
  const [showDialog, setShowDialog] = React.useState(false);
  const [check, setCheck] = React.useState(user[0]?.userId?.tfa || false);
  const [showEnableTfaDialog, setShowEnableTfaDialog] = React.useState(false);

  function handleChangeCheck(event) {
    if (!loading) {
      if (event?.target?.checked === false) {
        dispatch(setupUpdateUser({ ...user[0]?.userId, tfa: false }));
      }
      if (event?.target?.checked === true) {
        setShowEnableTfaDialog(true);
      }
    }
  }

  React.useEffect(() => {
    if (disableTfaSuccess === true) {
      setCheck(false);
      dispatch(resetTfaDisableAddSucess());
    }
  }, [disableTfaSuccess]);

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
      {showEnableTfaDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <EnableTfaDialog
              setShowEnableTfaDialog={setShowEnableTfaDialog}
              setCheck={setCheck}
            />
          </div>
        </div>
      )}
      <div className="d-flex justify-center">
        <Button variant="outlined" onClick={() => setShowDialog(true)}>
          Generate New QR Code
        </Button>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered  table-hover rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Enable/Disable Two Factor Authentication</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={check}
                        onChange={(event) => handleChangeCheck(event)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
