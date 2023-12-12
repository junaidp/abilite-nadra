import React from "react";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/light-logo-.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setupResetPassword,
  changeResetPasswordResponseSuccess,
  changeAuthErrorResponse,
} from "../../../global-redux/reducers/auth/slice";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  let dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let email = searchParams.get("email");
  let token = searchParams.get("token");
  let { resetPasswordResponseSuccess, authError } = useSelector(
    (state) => state.auth
  );
  let navigate = useNavigate();
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");

  function handleResetPassword(event) {
    event.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.error("Provide  all fields");
    }
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        toast.error("new password and confirm password must be same");
      }
    }

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      dispatch(
        setupResetPassword({
          newPassword: password,
          email: email,
          token: token,
        })
      );
    }
  }
  React.useEffect(() => {
    if (resetPasswordResponseSuccess) {
      toast.success("Password Reset Successfully");
    }
    setTimeout(() => {
      dispatch(changeResetPasswordResponseSuccess(false));
    }, 3000);
  }, [resetPasswordResponseSuccess]);

  React.useEffect(() => {
    if (authError === true) {
      toast.error("An Error Has Accoured");
      setTimeout(() => {
        dispatch(changeAuthErrorResponse(false));
      }, 3000);
    }
  }, [authError]);

  return (
    <section className="fxt-template-animation fxt-template-layout31">
      <span className="fxt-shape fxt-animation-active"></span>
      <div className="fxt-content-wrap">
        <div className="fxt-heading-content">
          <div className="fxt-inner-wrap">
            <div className="fxt-transformY-50 fxt-transition-delay-3">
              <a className="fxt-logo">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <div className="fxt-transformY-50 fxt-transition-delay-4"></div>
            <div className="fxt-login-option"></div>
          </div>
        </div>
        <div className="fxt-form-content">
          <div className="fxt-page-switcher">
            <h2 className="fxt-page-title mr-3">Reset Password</h2>
            <ul className="fxt-switcher-wrap ">
              <li onClick={() => navigate("/login")}>
                <a className="fxt-switcher-btn border-0 rounded shadow">
                  Login
                </a>
              </li>
              <li>
                <a
                  type="submit"
                  className="fxt-switcher-btn active shadow border-start-0 border-0 rounded shadow"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div className="fxt-main-form">
            <div className="fxt-inner-wrap">
              <form onSubmit={handleResetPassword}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="Your New Password"
                        required="required"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required="required"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="fxt-btn-fill"
                        onClick={handleResetPassword}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="fxt-switcher-description">
                Already a Member?
                <a
                  className="fxt-switcher-text ms-1"
                  onClick={() => navigate("/login")}
                >
                  Go to Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
