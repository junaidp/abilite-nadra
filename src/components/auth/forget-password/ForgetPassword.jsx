import React from "react";
import "./ForgetPassword";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/light-logo-.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setupForgetPassword,
  changeForgotPasswordResponseSuccess,
  changeAuthErrorResponse,
} from "../../../global-redux/reducers/auth/slice";

const ForgetPassword = () => {
  let dispatch = useDispatch();
  let { forgotPasswordResponseSuccess, authError } = useSelector(
    (state) => state.auth
  );
  let navigate = useNavigate();
  let [email, setEmail] = React.useState("");

  function handleForgetPassword(event) {
    event.preventDefault();
    if (email === "") {
      toast.error("Provide the email");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid && email !== "") {
      toast.error("Email is Incorrect");
    }

    if (email !== "" && isValid) {
      dispatch(setupForgetPassword({ email: email }));
    }
  }
  React.useEffect(() => {
    if (forgotPasswordResponseSuccess) {
      toast.success("Password Reset Link is Send");
    }
    setTimeout(() => {
      dispatch(changeForgotPasswordResponseSuccess(false));
    }, 3000);
  }, [forgotPasswordResponseSuccess]);

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
            <h2 className="fxt-page-title mr-3">Forgot Password</h2>
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
              <form onSubmit={handleForgetPassword}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        placeholder="Your email Address"
                        required="required"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        className="fxt-btn-fill"
                        onClick={handleForgetPassword}
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

export default ForgetPassword;
