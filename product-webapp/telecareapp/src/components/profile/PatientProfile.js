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
import { Link } from "react-router-dom";
import EditPatientModal from "./EditPatientModal";
import axios from "axios";
import UserService from "../../Service/UserService";
import moment from "moment";
import { BASE_URL } from "../../environment";

const PatientProfile = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [profileImg, setProfileImg] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);

  const currentDate = moment(new Date()).format("DD-MM-YYYY");

  const handleEditClose = () => {
    getPatientDetails();
    setShowEdit(false);
  };
  const handleEditShow = () => setShowEdit(true);

  const getPatientDetails = () => {
    UserService.getUserData(
      "/api/v1/patient/" + localStorage.getItem("loginId")
    )
      .then((response) => {
        //console.log(response.data);
        setPatientData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const getUpcomingAppointment = () => {
    axios
      .get(
        `${BASE_URL}/appointment-service/api/v3/appointment/patient/${localStorage.getItem(
          "loginId"
        )}`
      )
      .then((res) => {
        console.log("appointment-->", res.data);
        const allAppointment = res.data;
        const filteredAppointment = allAppointment.filter(
          (appointment) => appointment.appointmentDate >= currentDate
        );
        setAppointmentList(filteredAppointment);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPatientDetails();
    getUpcomingAppointment();
  }, []);

  return (
    <div className="dashboard-main py-5" style={{ backgroundColor: "#F0F6F6" }}>
      {/* profile section */}
      <section className="text-dark">
        <Container>
          <h1 className="mb-3">Profile</h1>
          {/* Profile section */}
          <Card
            className="shadow p-3 mb-5 rounded"
            style={{ background: "#FFFFFF" }}
          >
            <Row>
              <Col xs={12} md={3}>
                {/* <Image src="https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_960_720.jpg" alt='user-pic' fluid rounded /> */}
                <Image
                  className="m-auto w-100 h-100"
                  src={
                    patientData?.patientImage
                      ? `data:image/jpeg;base64,${patientData.patientImage}`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="user-pic"
                  fluid
                  rounded
                />
              </Col>
              {Object.keys(patientData).length === 0 ? (
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
                      size="md"
                      onClick={handleEditShow}
                    >
                      Edit &nbsp;<i className="bi bi-pencil"></i>
                    </Button>
                  </Card.Title>
                  <div className="d-md-flex justify-content-between px-5 py-3">
                    <div>
                      <Card.Text>
                        <span className="fw-bold"> Full Name :</span>{" "}
                        {patientData.patientName}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">DOB :</span>{" "}
                        {patientData.dob &&
                          moment(patientData.dob).format("Do MMMM YYYY")}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Email :</span>{" "}
                        {patientData.patientEmailId}
                      </Card.Text>
                      <Card.Text></Card.Text>
                    </div>
                    <div>
                      <Card.Text>
                        <span className="fw-bold">Gender :</span>{" "}
                        {patientData.gender}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">City :</span>{" "}
                        {patientData.city}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">Contact Number :</span>{" "}
                        {patientData.contactNo}
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
          <h4 className="text-center">Upcoming Appointments</h4>

          <Table hover responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Doctor's Name</th>
                <th>Appointment Timing</th>
                <th></th>
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
                    <td>{appointment.doctorEmail}</td>
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
      <EditPatientModal
        show={showEdit}
        setShow={setShowEdit}
        handleClose={handleEditClose}
        handleShow={handleEditShow}
        patientData={patientData}
      />

      {/* Schedule Modal */}
    </div>
  );
};

export default PatientProfile;
