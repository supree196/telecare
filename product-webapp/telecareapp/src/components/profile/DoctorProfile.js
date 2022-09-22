import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import EditDoctorModal from "./EditDoctorModal";
import TimeSlot from "../TimeSlot";
import axios from "axios";
import UserService from "../../Service/UserService";
import moment from "moment";
import { BASE_URL } from "../../environment";

const DoctorProfile = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [doctorData, setDoctorData] = useState({});
  const [appointmentList, setAppointmentList] = useState([]);
  const [showSlots, setShowSlots] = useState(false);

  const currentDate = moment(new Date()).format("DD-MM-YYYY");
  //const currentDate = "07-05-2022";
  //console.log("todays date", currentDate);

  const handleSlotsClose = () => {
    setShowSlots(false);
    getDoctorDetails();
  };
  const handleSlotsShow = () => setShowSlots(true);

  const handleEditClose = () => {
    setShowEdit(false);
    getDoctorDetails();
  };
  const handleEditShow = () => setShowEdit(true);

  const getDoctorDetails = () => {
    // UserService.getUserData("/doctor/34")
    UserService.getUserData("/api/v1/doctor/" + localStorage.getItem("loginId"))
      .then((response) => {
        //console.log(response.data);
        setDoctorData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTodaysAppointment = () => {
    axios
      .get(
        `${BASE_URL}/appointment-service/api/v3/appointment/doctor/${localStorage.getItem(
          "loginId"
        )}`
      )
      .then((res) => {
        //console.log("appointment-->", res.data);
        const allAppointment = res.data;
        const filteredAppointment = allAppointment.filter(
          (appointment) => appointment.appointmentDate === currentDate
        );
        setAppointmentList(filteredAppointment);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDoctorDetails();
    getTodaysAppointment();
  }, []);

  return (
    <div className="dashboard-main py-5" style={{ backgroundColor: "#F0F6F6" }}>
      {/* profile section */}
      <section className="text-dark ">
        <Container>
          <h1 className="mb-3">Profile</h1>
          {/* Profile section */}
          <Card
            className="shadow p-3 mb-5 rounded"
            style={{ background: "#FFFFFF" }}
          >
            <Row>
              <Col xs={12} md={3}>
                <Image
                  className="m-auto w-100 h-100"
                  src={
                    doctorData?.doctorImage
                      ? `data:image/jpeg;base64,${doctorData.doctorImage}`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="user-pic"
                  fluid
                  rounded
                />
              </Col>
              {Object.keys(doctorData).length === 0 ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <Col xs={12} md={9}>
                  <h3 className="text-center d-sm-block pt-4">
                    Personal Details{" "}
                  </h3>
                  <Card.Title className="px-5 d-flex flex-row-reverse">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleEditShow}
                    >
                      Edit&nbsp;<i className="bi bi-pencil"></i>
                    </Button>
                  </Card.Title>
                  <div className="d-md-flex justify-content-between px-5 py-3">
                    <div>
                      <Card.Text>
                        <span className="fw-bold"> Full Name :</span>{" "}
                        {doctorData.doctorName}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">DOB :</span>{" "}
                        {doctorData.dob &&
                          moment(doctorData.dob).format("Do MMMM YYYY")}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Email :</span>{" "}
                        {doctorData.doctorEmailId}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Specialization :</span>{" "}
                        {doctorData.specialization}
                      </Card.Text>
                      <Card.Text></Card.Text>
                    </div>
                    <div>
                      <Card.Text>
                        <span className="fw-bold">Experience :</span>{" "}
                        {doctorData.experience}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">City :</span>{" "}
                        {doctorData.city}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Contact Number :</span>{" "}
                        {doctorData.contactNo}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Gender :</span>{" "}
                        {doctorData.gender}
                      </Card.Text>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        </Container>
      </section>

      {/* Appointment section */}
      <section className="text-dark py-5">
        <Container
          className="px-5 py-3 shadow p-3 mb-5 rounded"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Row>
            <Col md={4}>
              <h4>Todays's Appointments</h4>
            </Col>
            <Col
              md={{ span: 4, offset: 4 }}
              className="d-flex flex-row-reverse"
            >
              <Button
                className="text-dark border-0"
                size="sm"
                style={{ backgroundColor: "#E1A697" }}
                onClick={handleSlotsShow}
              >
                Create Slots
              </Button>
            </Col>
          </Row>

          <Table hover responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Appointment Timing</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.length === 0 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td>NO DATA FOUND</td>
                  <td></td>
                </tr>
              ) : (
                appointmentList.map((appointment, idx) => (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.patientEmail}</td>
                    <td>
                      {appointment.appointmentStartTime}
                      {" - " + appointment.appointmentEndTime}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Container>
      </section>

      {/* Edit Profile modal */}
      <EditDoctorModal
        show={showEdit}
        setShow={setShowEdit}
        handleClose={handleEditClose}
        handleShow={handleEditShow}
        doctorData={doctorData}
      />

      <TimeSlot
        show={showSlots}
        setShow={setShowSlots}
        handleClose={handleSlotsClose}
        handleShow={handleSlotsShow}
      />

      {/* Schedule Modal */}
    </div>
  );
};

export default DoctorProfile;
