import React from "react";
import { useSelector } from "react-redux";
import {
  resetInternalResetPasswordSuccess,
  setupInternalResetPassword,
  changeAuthUser,
  setupLogoutUser,
} from "../../../global-redux/reducers/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfileDialog = ({ setUpdateUserDialog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  let { user, internalResetPasswordSuccess, loading } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific field error when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const newErrors = {};

      if (formData.oldPassword === "") {
        newErrors.oldPassword = "Old Password is required";
      }
      if (formData.newPassword === "") {
        newErrors.newPassword = "New Password is required";
      } else if (!passwordRegex.test(formData.newPassword)) {
        newErrors.newPassword =
          "Password must be at least 8 characters long and include at least one letter, one number, and one special character.";
      }
      if (formData.confirmNewPassword === "") {
        newErrors.confirmNewPassword = "Confirm New Password is required";
      } else if (formData.confirmNewPassword !== formData.newPassword) {
        newErrors.confirmNewPassword = "Passwords must match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      dispatch(
        setupInternalResetPassword({
          email: user[0]?.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        })
      );
    }
  };

  React.useEffect(() => {
    if (internalResetPasswordSuccess) {
      setTimeout(() => {
        dispatch(resetInternalResetPasswordSuccess());
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        dispatch(setupLogoutUser());
        localStorage.removeItem("user");
        localStorage.removeItem("company");
        localStorage.removeItem("year");
        dispatch(changeAuthUser([]));
        navigate("/login");
      }, 500);
    }
  }, [internalResetPasswordSuccess]);
  return (
    <div className="px-4 py-4">
      <form onSubmit={handleSubmit}>
        <div className="row mb-4 flex items-center">
          <div className="col-lg-2 label-text ">Current Password:</div>
          <div className="col-lg-8">
            <div className="form-group relative">
              <input
                id="oldPassword"
                name="oldPassword"
                className="form-control"
                type={showCurrentPassword ? "password" : "string"}
                value={formData.oldPassword}
                onChange={handleChange}
              />
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "12px",
                }}
              >
                {!showCurrentPassword && (
                  <div
                    onClick={() => setShowCurrentPassword(true)}
                    className="cursor-pointer"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </div>
                )}
                {showCurrentPassword && (
                  <div
                    onClick={() => setShowCurrentPassword(false)}
                    className="cursor-pointer"
                  >
                    <i className="bi bi-eye-slash-fill"></i>
                  </div>
                )}
              </div>
              <div className="error">{errors.oldPassword}</div>
            </div>
          </div>
        </div>

        <div className="row mb-4 flex items-center">
          <div className="col-lg-2 label-text ">New Password:</div>
          <div className="col-lg-8">
            <div className="form-group relative">
              <input
                type={showNewPassword ? "password" : "string"}
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
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
              <div className="error">{errors.newPassword}</div>
            </div>
          </div>
        </div>

        <div className="row mb-4 flex items-center">
          <div className="col-lg-2 label-text">Confirm New Password:</div>
          <div className="col-lg-8">
            <div className="form-group relative">
              <input
                type={showConfirmNewPassword ? "password" : "string"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="form-control"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "12px",
                }}
              >
                {!showConfirmNewPassword && (
                  <div
                    onClick={() => setShowConfirmNewPassword(true)}
                    className="cursor-pointer"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </div>
                )}
                {showConfirmNewPassword && (
                  <div
                    onClick={() => setShowConfirmNewPassword(false)}
                    className="cursor-pointer"
                  >
                    <i className="bi bi-eye-slash-fill"></i>
                  </div>
                )}
              </div>
              <div className="error">{errors.confirmNewPassword}</div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between items-center">
          <button
            type="submit"
            className={`btn btn-primary ${loading && "disabled"}`}
          >
            {loading ? "Loading" : "Change Password"}
          </button>
          <button
            className="btn btn-danger float-end"
            onClick={() => {
              setUpdateUserDialog(false);
              setFormData({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              });
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileDialog;
