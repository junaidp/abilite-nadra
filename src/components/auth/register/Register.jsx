import React from "react";
import logo from "../../../assets/light-logo-.png";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { setupGetCompanies } from "../../../global-redux/reducers/company/slice";
import {
  setupRegisterUser,
  changeAuthState,
  resetRegisterSuccess,
} from "../../../global-redux/reducers/auth/slice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { companies } = useSelector((state) => state.company);
  const {
    registerFirstName,
    registerLastName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    loading,
    registerSuccess,
  } = useSelector((state) => state.auth);
  function handleChange(event) {
    dispatch(
      changeAuthState({
        name: event?.target?.name,
        value: event?.target?.value,
      })
    );
  }

  function handleRegister(event) {
    event.preventDefault();
    if (!loading) {
      if (
        registerFirstName === "" ||
        registerLastName === "" ||
        registerEmail === "" ||
        registerPassword === "" ||
        registerConfirmPassword === ""
      ) {
        toast.error("Provide all the fields");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(registerEmail);
      if (!isValid && registerEmail !== "") {
        toast.error("Email is Incorrect");
      }
      if (
        registerPassword !== registerConfirmPassword &&
        registerPassword !== "" &&
        registerConfirmPassword !== ""
      ) {
        toast.error("password and confirm Password must be same");
      }

      if (
        registerFirstName !== "" &&
        registerLastName !== "" &&
        registerEmail !== "" &&
        registerPassword !== "" &&
        registerConfirmPassword !== "" &&
        isValid &&
        registerPassword === registerConfirmPassword
      ) {
        dispatch(
          setupRegisterUser({
            data: {
              firstname: registerFirstName,
              lastname: registerLastName,
              email: registerEmail,
              password: registerPassword,
              roles: ["admin"],
            },
          })
        );
      }
    }
  }

  // React.useEffect(() => {
  //   dispatch(setupGetCompanies());
  // }, []);

  React.useEffect(() => {
    if (registerSuccess) {
      dispatch(resetRegisterSuccess());
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  }, [registerSuccess]);
  return (
    <section className="fxt-template-animation fxt-template-layout31">
      <span className="fxt-shape fxt-animation-active"></span>
      <div className="fxt-content-wrap">
        <div className="fxt-heading-content">
          <div className="fxt-inner-wrap">
            <div className="fxt-transformY-50 fxt-transition-delay-3">
              <a href="login-31.html" className="fxt-logo">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <div className="fxt-transformY-50 fxt-transition-delay-4"></div>
            <div className="fxt-login-option"></div>
          </div>
        </div>
        <div className="fxt-form-content">
          <div className="fxt-page-switcher">
            <h2 className="fxt-page-title mr-3">Register</h2>
            <ul className="fxt-switcher-wrap">
              <li>
                <a
                  className="fxt-switcher-btn  border-0 rounded shadow"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  type="submit"
                  className="fxt-switcher-btn active border-0 rounded shadow"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div className="fxt-main-form">
            <div className="fxt-inner-wrap">
              <form onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="fname"
                        className="form-control"
                        placeholder="First Name"
                        required="required"
                        name="registerFirstName"
                        value={registerFirstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="lname"
                        className="form-control"
                        placeholder="Last Name"
                        required="required"
                        name="registerLastName"
                        value={registerLastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Your email Address"
                        required="required"
                        name="registerEmail"
                        value={registerEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required="required"
                        name="registerPassword"
                        value={registerPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="cpassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        required="required"
                        name="registerConfirmPassword"
                        value={registerConfirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 mb-20">
                    <label>Comapny Name</label>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      {companies?.map((item, i) => {
                        return (
                          <option value="1" key={i}>
                            {item?.companyName}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <div className="col-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        className={`fxt-btn-fill btn ${loading && "disabled"}`}
                        onClick={handleRegister}
                      >
                        {loading ? "Loading" : "Register"}
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

export default Register;
