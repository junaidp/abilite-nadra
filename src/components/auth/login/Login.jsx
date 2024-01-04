import React from "react";
import "./Login.css";
import logo from "../../../assets/light-logo-.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setupLoginUser,
  changeAuthErrorResponse,
} from "../../../global-redux/reducers/auth/slice";

const Login = () => {
  const [showpassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const { userLoggedIn, authError, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    if (data?.email === "" || data?.password === "") {
      toast.error("Provide all values");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(data?.email);
    if (!isValid && data?.email !== "") {
      toast.error("Email is Incorrect");
    }

    if (data?.email !== "" && data?.password !== "" && isValid) {
      dispatch(
        setupLoginUser({
          data: { password: data?.password, email: data?.email },
        })
      );
    }
  }

  React.useEffect(() => {
    if (userLoggedIn) {
      toast.success("Login Success! Redirecting to dashboard");
      setTimeout(() => {
        navigate("/audit/dashboard");
      }, 2000);
    }
  }, [userLoggedIn]);

  React.useEffect(() => {
    if (authError === true) {
      toast.error("An Error Has Accoured");
      setTimeout(() => {
        dispatch(changeAuthErrorResponse(false));
      }, 3000);
    }
  }, [authError]);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

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
            <div className="fxt-login-option">
              {/* <ul>
                <li className="fxt-transformY-50 fxt-transition-delay-6">
                  <a href="#">Sing in with Google</a>
                </li>
                <li className="fxt-transformY-50 fxt-transition-delay-7">
                  <a href="#">Sing in with Facebook</a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
        <div className="fxt-form-content">
          <div className="fxt-page-switcher">
            <h2 className="fxt-page-title mr-3">Login</h2>
            <ul className="fxt-switcher-wrap">
              <li>
                <a className="fxt-switcher-btn active border-0 rounded shadow">
                  Login
                </a>
              </li>
              <li>
                <a
                  className="fxt-switcher-btn border-0 rounded shadow"
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </li>
            </ul>
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
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className="form-group relative"
                    >
                      <input
                        id="password"
                        type={showpassword ? "password" : "string"}
                        className="form-control"
                        placeholder="********"
                        required="required"
                        name="password"
                        value={data?.password}
                        onChange={handleChange}
                      />
                      <div
                        className="t-12 r-12 absolute"
                      >
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
                        <div className="fxt-checkbox-box mr-3">
                          <input id="checkbox1" type="checkbox" />
                          <label className="ps-4">Keep me logged in</label>
                        </div>
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
                        className="btn fxt-btn-fill"
                        onClick={handleLogin}
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="fxt-switcher-description">
                Don't have an account?
                <a
                  className="fxt-switcher-text ms-1"
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
