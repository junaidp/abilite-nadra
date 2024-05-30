import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/light-logo-.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setupResetPassword,
  resetResetPasswordSuccess,
  changeAuthState
} from "../../../global-redux/reducers/auth/slice";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  let { resetPassword, resetConfirmPassword, resetPasswordSuccess, loading } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  function handleChange(event) {
    dispatch(
      changeAuthState({
        name: event?.target?.name,
        value: event?.target?.value,
      })
    );
  }

  function handleResetPassword(event) {
    event.preventDefault();
    if (!loading) {
      if (resetPassword === "" || resetConfirmPassword === "") {
        toast.error("Please provide all the fields");
      }
      if (resetPassword !== "" && resetConfirmPassword !== "") {
        if (resetPassword !== resetConfirmPassword) {
          toast.error("new password and confirm password must be same");
        }
      }

      if (
        resetPassword !== "" &&
        resetConfirmPassword !== "" &&
        resetPassword === resetConfirmPassword
      ) {
        dispatch(
          setupResetPassword({
            newPassword: resetPassword,
            email: email,
            token: token,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetResetPasswordSuccess());
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  }, [resetPasswordSuccess]);
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
              {/* <li>
                <a
                  type="submit"
                  className="fxt-switcher-btn active shadow border-start-0 border-0 rounded shadow"
                >
                  Register
                </a>
              </li> */}
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
                        name="resetPassword"
                        placeholder="Your New Password"
                        required="required"
                        value={resetPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        name="resetConfirmPassword"
                        placeholder="Confirm Password"
                        required="required"
                        value={resetConfirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className={`fxt-btn-fill ${loading && "disabled"}`}
                        onClick={handleResetPassword}
                      >
                        {loading ? "Loading" : "Submit"}
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
