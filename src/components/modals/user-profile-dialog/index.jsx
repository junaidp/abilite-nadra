import React from "react";
import { useSelector } from "react-redux";
import {
  resetInternalResetPasswordSuccess,
  setupInternalResetPassword,
  changeAuthUser
} from "../../../global-redux/reducers/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfileDialog = ({ setUpdateUserDialog }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
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
      // Simple validation
      const newErrors = {};
      if (formData.oldPassword === "") {
        newErrors.oldPassword = "Old Password is required";
      }
      if (formData.newPassword === "") {
        newErrors.newPassword = "New Password is required";
      }
      if (formData.confirmNewPassword === "") {
        newErrors.confirmNewPassword = "Confirm New Password is required";
      } else if (formData.confirmNewPassword !== formData.newPassword) {
        newErrors.confirmNewPassword = "Passwords must match";
      }

      // If there are errors, update the state and prevent form submission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Your form submission logic goes here
      dispatch(
        setupInternalResetPassword({
          email: user[0]?.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        })
      );

      // Optionally, you can clear the form state after submission
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
          <div className="col-lg-2 label-text ">Password:</div>
          <div className="col-lg-8">
            <div className="form-group">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="form-control"
                value={formData.oldPassword}
                onChange={handleChange}
              />
              <div className="error">{errors.oldPassword}</div>
            </div>
          </div>
        </div>

        <div className="row mb-4 flex items-center">
          <div className="col-lg-2 label-text ">New Password:</div>
          <div className="col-lg-8">
            <div className="form-group">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <div className="error">{errors.newPassword}</div>
            </div>
          </div>
        </div>

        <div className="row mb-4 flex items-center">
          <div className="col-lg-2 label-text">Confirm New Password:</div>
          <div className="col-lg-8">
            <div className="form-group">
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="form-control"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
              <div className="error">{errors.confirmNewPassword}</div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading && "disabled"}`}
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </form>

      <div className="row py-3">
        <div className="col-lg-12 text-end">
          <button
            className="btn btn-primary float-end"
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
      </div>
    </div>
  );
};

export default UserProfileDialog;
