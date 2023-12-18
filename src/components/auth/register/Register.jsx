import React from "react";
import logo from "../../../assets/light-logo-.png";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupGetCompanies } from "../../../global-redux/reducers/company/slice";
import {
  setupRegisterUser,
  changeAuthErrorResponse,
  changeUserLoggedIn,
} from "../../../global-redux/reducers/auth/slice";
const Register = () => {
  let { userLoggedIn, authError } = useSelector((state) => state.auth);
  let { companies } = useSelector((state) => state.company);
  let dispatch = useDispatch();
  let [data, setData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (
      data?.firstname === "" ||
      data?.lastname === "" ||
      data?.email === "" ||
      data?.password === "" ||
      data?.confirmPassword === ""
    ) {
      toast.error("Provide all the fields");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(data?.email);
    if (!isValid && data?.email !== "") {
      toast.error("Email is Incorrect");
    }
    if (
      data?.password !== data?.confirmPassword &&
      data?.password !== "" &&
      data?.confirmPassword !== ""
    ) {
      toast.error("password and confirm Password must be same");
    }

    if (
      data?.firstname !== "" &&
      data?.lastname !== "" &&
      data?.email !== "" &&
      data?.password !== "" &&
      data?.confirmPassword !== "" &&
      isValid &&
      data?.password === data?.confirmPassword
    ) {
      dispatch(
        setupRegisterUser({
          data: {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            roles: ["admin"],
          },
        })
      );
    }
  }

  React.useEffect(() => {
    if (userLoggedIn) {
      toast.success("Register Success! Redirecting to the Login page");
      dispatch(changeUserLoggedIn(false));
      setTimeout(() => {
        navigate("/login");
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
    dispatch(setupGetCompanies());
  }, []);
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
                        name="firstname"
                        value={data?.firstname}
                        onChange={(event) => handleChange(event)}
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
                        name="lastname"
                        value={data?.lastname}
                        onChange={(event) => handleChange(event)}
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
                        name="email"
                        value={data?.email}
                        onChange={(event) => handleChange(event)}
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
                        name="password"
                        value={data?.password}
                        onChange={(event) => handleChange(event)}
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
                        name="confirmPassword"
                        value={data?.confirmPassword}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12" style={{ marginBottom: "20px" }}>
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
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        className="fxt-btn-fill btn"
                        onClick={handleRegister}
                      >
                        Register
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
