import React from "react";
import "./chat.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../environment";

export default class PatientRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chat: [],
      messageContent: "",
      selectedFile: {},
    };

    //this.textInput = React.createRef();
  }

  componentDidMount() {
    this.handleGetData();
  }

  componentDidUpdate() {
    this.handleGetData();
  }

  handleGetData = () => {
    axios
      .get(
        `${BASE_URL}/chat-service/api/v1/chat/${localStorage.getItem(
          "appointmentId"
        )}`
      )
      .then((res) => {
        //console.log("get chats", res.data);
        this.setState({
          ...this.state,
          Chat: res.data.chat,
        });
      });
  };

  // fileChangeHandler = (event) => {
  //   //console.log("selected file", event.target.files[0]);
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state.messageContent)
    let data = new FormData();
    let file = new File([], "");

    axios
      .post(
        `${BASE_URL}/chat-service/api/v1/chat?appointmentId=${localStorage.getItem(
          "appointmentId"
        )}`,
        {
          messageContent: this.state.messageContent,
          senderEmail: localStorage.getItem("loginId"),
          receiverEmail: "doctor@gmail.com",
        }
      )
      .then((response) => {
        // this.handleGetData();
        this.setState({
          messageContent: "",
        });
        this.handleGetData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleReply = (e) => {
    this.setState({
      messageContent: e.target.value,
    });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#F0F6F6",
        }}
      >
        <div className="" style={{ overflowX: "none" }}>
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row m-auto" style={{ backgroundColor: "#D8D6E6" }}>
              <div className="col-lg-10 m-auto">
                <div className="">
                  <div className="ibox-content">
                    <h3>
                      Appointment -
                      {"APT_" + localStorage.getItem("appointmentId")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="d-flex col-lg-2 justify-content-end">
                <div>
                  <div className="ibox-content">
                    <Link className="btn btn-lg" to="/appointment">
                      <i className="bi bi-box-arrow-left h1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-lg-12">
                <div className="ibox chat-view">
                  <div className="ibox-content">
                    <div className="row m-0">
                      <div className="col-md-12 ">
                        <div className="chat-discussion">
                          {this.state.Chat.map((msg, idx) => (
                            <div
                              className={
                                msg.senderEmail ==
                                localStorage.getItem("loginId")
                                  ? "chat-message right d-flex justify-content-end"
                                  : "chat-message left d-flex justify-content-start"
                              }
                            >
                              <div
                                className="message"
                                style={
                                  msg.senderEmail ==
                                  localStorage.getItem("loginId")
                                    ? {
                                        backgroundColor: "#b0d1ff",
                                      }
                                    : { backgroundColor: "#ECECEC" }
                                }
                              >
                                <span className="message-content">
                                  {msg.messageContent}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row m-0">
                      {/* <div className="col-md-10"> */}
                      <div className="input-group ">
                        <textarea
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Type a message"
                          onChange={this.handleReply}
                          value={this.state.messageContent}
                        />
                        <div class="input-group-append" id="button-addon4">
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={this.handleSubmit}
                            disabled={this.state.messageContent === ""}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                      {/* </div> */}
                      {/* <div className="col-md-2">
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={this.fileChangeHandler}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
