import React from "react";
import { useSelector } from "react-redux";
import {
  resetResetPasswordSuccess,
  setupResetUserPassword,
} from "../../../../../global-redux/reducers/settings/user-management/slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ResetUserPasswordDialog = ({ setUpdateUserPasswordDialog, userId }) => {
  const dispatch = useDispatch();
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  React.useState(false);
  const { loading, resetPasswordSuccess } = useSelector(
    (state) => state.settingsUserManagement
  );
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state?.common);

  function handleSubmit() {
    if (!loading) {
      if (!password) {
        toast.error("Please Enter Password");
        return;
      }
      dispatch(
        setupResetUserPassword({
          userId: userId,
          companyId: user[0]?.company?.find(
            (item) => item?.companyName === company
          )?.id,
          newPassword: password,
        })
      );
    }
  }

  React.useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetResetPasswordSuccess());
      setUpdateUserPasswordDialog(false);
    }
  }, [resetPasswordSuccess]);

  return (
    <div className="px-4 py-4">
      <div className="row mb-4 flex items-center">
        <div className="col-lg-2 label-text ">New Password:</div>
        <div className="col-lg-8">
          <div className="form-group relative">
            <input
              type={showNewPassword ? "password" : "string"}
              id="newPassword"
              name="newPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "12px",
              }}
            >
              {!showNewPassword && (
                <div
                  onClick={() => setShowNewPassword(true)}
                  className="cursor-pointer"
                >
                  <i className="bi bi-eye-fill"></i>
                </div>
              )}
              {showNewPassword && (
                <div
                  onClick={() => setShowNewPassword(false)}
                  className="cursor-pointer"
                >
                  <i className="bi bi-eye-slash-fill"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className={`btn btn-primary ${loading && "disabled"}`}
        onClick={handleSubmit}
      >
        {loading ? "Loading" : "Reset Password"}
      </button>

      <button
        className="btn btn-danger float-end"
        onClick={() => setUpdateUserPasswordDialog(false)}
      >
        Close
      </button>
    </div>
  );
};

export default ResetUserPasswordDialog;
