import React from "react";
import logo from "../patient.png";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import UserService from "../Service/UserService";
import { BASE_URL } from "../environment";

export default class Login extends React.Component {
  // navigate=useNavigate()
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      patient: [],
      emailId: "",
      password: "",
      emailErr: "",
      passwordErr: "",
      inValidErr: "",
      emailErrMsg: "",
      userType: "",
    };
  }

  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = false;
    if (this.state.emailId === "") {
      this.setState({
        emailErr: "Please Enter EmailId",
      });
      validationErrors = true;
    }

    if (this.state.password === "") {
      this.setState({
        passwordErr: "Please Enter Password",
      });
      validationErrors = true;
    }

    if (!!validationErrors) {
      return;
    }
    axios
      .get(
        `${BASE_URL}/authentication-service/api/v2/usertype?userId=` +
          this.state.emailId
      )
      .then((userType) => {
        // console.log("state email rajat-->", this.state.emailId)
        // console.log(userType.data)
        localStorage.setItem("userType", userType.data);
      });
    axios
      .post(`${BASE_URL}/authentication-service/api/v2/login`, {
        userEmail: this.state.emailId,
        password: this.state.password,
        // userType: "DOCTOR"
      })
      .then((response) => {
        if (response.data) {
          //console.log(response);
          localStorage.setItem("loginId", this.state.emailId);
          localStorage.setItem("isLoggedIn", response.data.loginStatus);
          localStorage.setItem("token", response.data.jwt);
          UserService.tostSuccess(`Login Successful`);

          this.setState({
            userType: localStorage.getItem("userType"),
          });

          //update the header component
          document.getElementById("hiddenBtn").click();
        } else {
          // this.navigate("/login")
        }
      })
      .catch((error) => {
        UserService.tostErr(`Invalid Credentials`);
      });
    // this.handleAuthenticate()

    // this.handleUser()
  };

  handleEmail = (e) => {
    this.setState({
      emailId: e.target.value,
      emailErr: "",
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordErr: "",
    });
  };

  render() {
    return (
      <div>
        {this.state.userType == "PATIENT" ? (
          <Navigate to="/patient-profile" replace={true} />
        ) : this.state.userType == "DOCTOR" ? (
          <Navigate to="/doctor-profile" replace={true} />
        ) : null}

        <section className="">
          <div className="container pt-5 mw-100">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col col-xl-10">
                <div
                  className="card"
                  style={{ borderRadius: "1rem", background: "white" }}
                >
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src={logo}
                        alt="login form"
                        className="img-fluid"
                        style={{
                          borderRradius: "1rem 0 0 1rem",
                          width: "500 px",
                          height: "100%",
                          backgroundColor: "#936c6c",
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div
                        className="card-body text-black"
                        style={{ padding: "1rem 0rem !important" }}
                      >
                        <form>
                          <div
                            className="d-flex justify-content-center align-items-center mb-3 pb-1 text-center"
                            style={{ flexDirection: "column" }}
                          >
                            <div className="h1 fw-bold mb-0" style={{}}>
                              Telecare
                            </div>
                            <h5
                              className="fw-normal mt-3 pb-3"
                              style={{ letterSpacing: "1px" }}
                            >
                              Login Page
                            </h5>
                          </div>

                          <div style={{ color: "red" }}>
                            {this.state.emailErrMsg}
                          </div>

                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                            style={{ color: "grey" }}
                          >
                            Email address
                          </label>
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              onChange={this.handleEmail}
                              isInvalid={!!this.state.emailErr}
                            />
                            <div style={{ color: "red" }}>
                              {this.state.emailErr}
                            </div>
                          </div>

                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                            style={{ color: "grey" }}
                          >
                            Password
                          </label>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              onChange={this.handlePassword}
                              isInvalid={!!this.state.passwordErr}
                            />
                            <div style={{ color: "red" }}>
                              {this.state.passwordErr}
                            </div>
                          </div>

                          <div className="pt-1 mb-4 text-center">
                            <button
                              style={{
                                padding: "15px",
                                width: "40%",
                                borderRadius: "10px",
                                border: "none",
                                backgroundColor: "#79BBBB",
                              }}
                              type="button"
                              onClick={this.handleSubmit}
                            >
                              Login
                            </button>
                          </div>

                          <p
                            className="mb-5 text-center"
                            style={{ color: "grey", marginTop: "10px" }}
                          >
                            Don't you have an account?{" "}
                            <Link to="/doctor-register" className="primary">
                              Register as Doctor
                            </Link>{" "}
                            ,{" "}
                            <Link className="primary" to="/patient-register">
                              Register as Patient
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
