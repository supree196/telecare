import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import { Nav, Col, Row } from "react-bootstrap";
import PastAppointment from "./PastAppointment";
import UpcomingAppointment from "./UpcomingAppointment";
import ApiService from "../Service/ApiService";
import axios from "axios";
import { BASE_URL } from "../environment";

function UpcomingAndPastAppointment() {
  const [patientData, setPatientData] = useState({});

  const getPatientDetails = () => {
    axios
      .get(
        `${BASE_URL}/appointment-service/api/v3/appointment/patient/${localStorage.getItem(
          "loginId"
        )}`
      )
      .then((res) => {
        console.log("appointment-->", res.data);
        setPatientData(res.data);
      });
  };
  const getDoctorDetails = () => {
    axios
      .get(
        `${BASE_URL}/appointment-service/api/v3/appointment/doctor/${localStorage.getItem(
          "loginId"
        )}`
      )
      .then((res) => {
        console.log("appointment-->", res.data);
        setPatientData(res.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userType") === "DOCTOR") {
      getDoctorDetails();
    } else {
      getPatientDetails();
    }
  }, []);

  if (patientData?.length !== undefined) {
    return (
      <div>
        <div className="container mt-3 border shadow">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="first"
            className="mb-3"
          >
            <Row style={{ border: "0.1px solid black" }}>
              <Col sm={16} style={{ border: "1px solid black" }}>
                <Nav
                  variant="pills"
                  className="flex-row"
                  style={{ padding: "0px !important" }}
                >
                  <Nav.Item className="w-50">
                    <Nav.Link eventKey="first">Upcoming Appointment</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="w-50">
                    <Nav.Link eventKey="second">Past Appointment</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={16}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <UpcomingAppointment patientData={patientData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <PastAppointment patientData={patientData} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

export default UpcomingAndPastAppointment;
