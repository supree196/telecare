import React from "react";
import logo from "../doctorappointment.png";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import UserService from "../Service/UserService";
import { BASE_URL } from "../environment";

export default class DoctorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorEmailId: "",
      password: "",
      doctorEmailErr: "",
      passwordErr: "",
      confirmPassword: "",
      passwordConfirmErr: "",
      passwordErrMsg: "",
      registerSuccess: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = false;
    if (this.state.doctorEmailId === "") {
      this.setState({
        doctorEmailErr: "Please Enter EmailId",
      });
      validationErrors = true;
    }

    if (this.state.password === "") {
      this.setState({
        passwordErr: "Please Enter Password",
      });
      validationErrors = true;
    }
    if (this.state.confirmPassword === "") {
      this.setState({
        passwordErrMsg: "Please Confirm your password",
      });
    }
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        passwordConfirmErr: "Password mismatched",
      });
      validationErrors = true;
    }

    if (!!validationErrors) {
      return;
    }

    axios
      .post(`${BASE_URL}/user-service/api/v1/doctor`, {
        // id: "40",
        doctorEmailId: this.state.doctorEmailId,
        password: this.state.password,
        doctorName: "",
        contactNo: "",
        dob: "",
        // gender: "",
        experience: "",
        specialization: "",
        city: "",
      })
      .then((response) => {
        console.log("register response", response);
        UserService.tostSuccess(`Doctor Registered Successfully`);

        this.setState({
          registerSuccess: true,
        });
      })
      .catch((error) => {
        //console.log(error);
        UserService.tostErr(`Something went wrong`);
      });
  };

  handleDoctorEmail = (e) => {
    this.setState({
      doctorEmailId: e.target.value,
      doctorEmailErr: "",
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordErr: "",
    });
  };

  handleConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      passwordConfirmErr: "",
      passwordErrMsg: "",
    });
  };

  render() {
    return (
      <section>
        {this.state.registerSuccess == true && (
          <Navigate to="/login" replace={true} />
        )}
        <div className="container pt-5 h-75 mw-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div
                className="card m-0"
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
                          className="d-flex align-items-center mb-1 pb-1"
                          style={{ flexDirection: "column" }}
                        >
                          <span className="h1 fw-bold mb-0">Telecare</span>
                          <h5 className="fw-normal mb-3 pb-3">
                            Doctor Register Page
                          </h5>
                        </div>

                        <label
                          className="form-label"
                          htmlFor="form2Example17"
                          style={{ color: "grey" }}
                        >
                          Email address
                        </label>
                        <div className="form-outline mb-1">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={this.handleDoctorEmail}
                            isInvalid={!!this.state.doctorEmailErr}
                          />
                          <div style={{ color: "red" }}>
                            {this.state.doctorEmailErr}
                          </div>
                        </div>

                        <label
                          className="form-label"
                          htmlFor="form2Example27"
                          style={{ color: "grey" }}
                        >
                          Password
                        </label>
                        <div className="form-outline mb-1">
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

                        <label
                          className="form-label"
                          htmlFor="form2Example27"
                          style={{ color: "grey" }}
                        >
                          Confirm Password
                        </label>
                        <div className="form-outline mb-1">
                          <input
                            type="password"
                            id="form2Example28"
                            className="form-control form-control-lg"
                            onChange={this.handleConfirmPassword}
                            isInvalid={!!this.state.passwordConfirmErr}
                          />
                          <div style={{ color: "red" }}>
                            {this.state.passwordConfirmErr}
                          </div>
                          <div style={{ color: "red" }}>
                            {this.state.passwordErrMsg}
                          </div>
                        </div>

                        <div className="pt-1 mb-1 text-center">
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
                            Register
                          </button>
                        </div>

                        <p
                          className="my-3 text-center"
                          style={{ color: "grey" }}
                        >
                          Already have an account?{" "}
                          <Link to="/login" className="primary">
                            Login Here
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
    );
  }
}
