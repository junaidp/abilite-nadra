import React from "react";
import "./Login.css";
import logo from "../../../assets/light-logo-.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setupLoginUser,
  changeAuthState,
} from "../../../global-redux/reducers/auth/slice";

const Login = () => {
  const [showpassword, setShowPassword] = React.useState(false);
  const { loginEmail, loginPassword, loading, authSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChange(event) {
    dispatch(
      changeAuthState({ name: event.target.name, value: event.target.value })
    );
  }
  function handleLogin(event) {
    event.preventDefault();
    if (!loading) {
      if (loginEmail === "" || loginPassword === "") {
        toast.error("Provide all values");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(loginEmail);
      if (!isValid && loginEmail !== "") {
        toast.error("Email is Incorrect");
      }
      if (loginEmail !== "" && loginPassword !== "" && isValid) {
        dispatch(
          setupLoginUser({
            data: { password: loginPassword, email: loginEmail },
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (authSuccess) {
      navigate("/audit/dashboard");
    }
  }, [authSuccess]);

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
            <h2 className="fxt-page-title mr-3">Login</h2>
            <ul className="fxt-switcher-wrap"></ul>
          </div>
          <div className="fxt-main-form">
            <div className="fxt-inner-wrap">
              <form onSubmit={handleLogin}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                        name="loginEmail"
                        value={loginEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group relative">
                      <input
                        id="password"
                        type={showpassword ? "password" : "string"}
                        className="form-control"
                        placeholder="********"
                        required="required"
                        name="loginPassword"
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={handleChange}
                      />
                      <div className="t-12 r-12 absolute">
                        {!showpassword && (
                          <div
                            onClick={() => setShowPassword(true)}
                            className="cursor-pointer"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </div>
                        )}
                        {showpassword && (
                          <div
                            onClick={() => setShowPassword(false)}
                            className="cursor-pointer"
                          >
                            <i className="bi bi-eye-slash-fill"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <div className="fxt-checkbox-wrap">
                        <a
                          className="fxt-switcher-text"
                          onClick={() => navigate("/forgot-password")}
                        >
                          Forgot Password
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        className={`btn fxt-btn-fill ${loading && "disabled"}`}
                        onClick={handleLogin}
                      >
                        {loading ? "Loading" : "Log in"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
