import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./TimeSlot.css";
import Modal from "react-bootstrap/Modal";
import ReactConfirmAlert from "react-confirm-alert";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";
import UserService from "../Service/UserService";
import { BASE_URL } from "../environment";

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue1: "",
      inputValue2: "00:00:00",
      inputValue3: "00:00:00",
      timeErr: "",
      dateErr: "",
    };
  }

  updateInputValue1 = (evt) => {
    this.setState({
      inputValue1: evt.target.value,
      dateErr: "",
    });
  };
  updateInputValue2 = (evt) => {
    this.setState({
      inputValue2: evt.target.value,
    });
  };
  updateInputValue3 = (evt) => {
    this.setState({
      inputValue3: evt.target.value,
    });
  };

  createStarEndTime = () => {
    let validationErrors = false;
    if (this.state.inputValue3 <= this.state.inputValue2) {
      this.setState({
        timeErr: "Please Select Valid Start and Endtime",
      });
      validationErrors = true;
    }
    if (this.state.inputValue1 === "") {
      this.setState({
        dateErr: "Please Select Valid Date",
      });
      validationErrors = true;
    }
    if (!!validationErrors) {
      return;
    }
    const slotObject = {
      doctorEmail: localStorage.getItem("loginId"),
      slotDate: moment(this.state.inputValue1).format("DD-MM-YYYY"),
      slotStartTime: this.state.inputValue2 + " PM",
      slotEndTime: this.state.inputValue3 + " PM",
      slotAvailable: true,
    };
    //console.log(this.state.inputValue1)

    //console.log("slotObject -->", slotObject)
    axios
      .post(`${BASE_URL}/appointment-service/api/v3/slot`, slotObject)
      .then(() => {
        UserService.tostSuccess("Slot Created");
        this.setState({
          inputValue1: "",
          inputValue2: "00:00:00",
          inputValue3: "00:00:00",
        });
      })
      .catch((err) => {
        console.log(err);
        UserService.tostErr("something went wrong");
      });
    this.props.handleClose();
    return 0;
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Dialog className="main">
          <Modal.Header style={{ backgroundColor: "#F2F2F2" }} closeButton>
            <Modal.Title>Create Appointment slot</Modal.Title>
          </Modal.Header>

          <Modal.Body className="main">
            <Card.Text>
              <Container>
                <Row>
                  <Col xs={12} md={8} className="mb-4 w-100">
                    <div>Appointment Date:</div>
                    <input
                      className="w-75"
                      type="date"
                      placeholder="Select date"
                      value={this.state.inputValue1}
                      onChange={(evt) => this.updateInputValue1(evt)}
                      min={moment().add(1, "days").format("YYYY-MM-DD")}
                    />
                    <div style={{ color: "red" }}>{this.state.dateErr}</div>
                  </Col>

                  <Col xs={12} md={8} className="mb-4 w-100">
                    <div>Start Time :</div>
                    <input
                      className="w-75"
                      type="time"
                      value={this.state.inputValue2}
                      onChange={(evt) => this.updateInputValue2(evt)}
                      step="1"
                    />
                  </Col>
                  <Col xs={12} md={8} className="mb-4 w-100">
                    <div>End Time :</div>
                    <input
                      className="w-75"
                      type="time"
                      value={this.state.inputValue3}
                      onChange={(evt) => this.updateInputValue3(evt)}
                      step="1"
                    />
                    <div style={{ color: "red" }}>{this.state.timeErr}</div>
                  </Col>
                </Row>
              </Container>
            </Card.Text>
            <Button variant="primary" onClick={this.createStarEndTime}>
              Create Slot
            </Button>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    );
  }
}

export default TimeSlot;
