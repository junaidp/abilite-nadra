import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/light-logo-.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setupForgetPassword,
  changeAuthState,
} from "../../../global-redux/reducers/auth/slice";

const ForgetPassword = () => {
  let { forgetPasswordEmail, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    dispatch(
      changeAuthState({
        name: event?.target?.name,
        value: event?.target?.value,
      })
    );
  }

  function handleForgetPassword(event) {
    event.preventDefault();
    if (!loading) {
      if (forgetPasswordEmail === "") {
        toast.error("Provide the email");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(forgetPasswordEmail);
      if (!isValid && forgetPasswordEmail !== "") {
        toast.error("Email is Incorrect");
      }

      if (forgetPasswordEmail !== "" && isValid) {
        dispatch(setupForgetPassword({ email: forgetPasswordEmail }));
      }
    }
  }

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
                        name="forgetPasswordEmail"
                        placeholder="Your email Address"
                        required="required"
                        value={forgetPasswordEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        className={`fxt-btn-fill ${loading && "disabled"}`}
                        onClick={handleForgetPassword}
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

export default ForgetPassword;
