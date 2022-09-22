import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "react-bootstrap";
import UserService from "../../Service/UserService";
import moment from "moment";

const EditPatientProfile = (props) => {
  const { handleShow, handleClose, show, setShow, patientData } = props;
  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [formData, setFormData] = useState({
    patientEmailId: localStorage.getItem("loginId"),
    patientName: "",
    contactNo: "",
    dob: "",
    gender: "",
    city: "",
  });
  const { patientName, contactNo, dob, gender, city } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const updatePatientProfile = () => {
    let data = new FormData();
    let file = new File([], "");
    data.append("patient", JSON.stringify(formData));
    //data.append("file", file)
    if ("name" in selectedFile) {
      //console.log("file present");
      data.append("file", selectedFile);
    } else {
      console.log("file not present");
      data.append("file", file);
    }
    UserService.updateUserData("/api/v1/patient/", data)
      .then((response) => {
        handleClose();
        //alert("successfull updation", response);
        UserService.tostSuccess(`Profile Updated Successfully`);
      })
      .catch((err) => {
        //console.log("error in edit->", err);
        UserService.tostErr("Something went wrong");
        setValidated(false);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log("formData", formData)
    updatePatientProfile();
    setValidated(true);
  };

  useEffect(() => {
    setFormData({
      patientEmailId: localStorage.getItem("loginId"),
      patientName: patientData.patientName,
      contactNo: patientData.contactNo,
      dob: patientData.dob,
      gender: patientData.gender,
      city: patientData.city,
    });
  }, [patientData]);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton style={{ backgroundColor: "#F5F9F9" }}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#F5F9F9" }}>
          <Form onSubmit={(e) => onSubmit(e)} validated={validated}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. john doe"
                autoFocus
                name="patientName"
                value={patientName}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={moment(dob).format("YYYY-MM-DD")}
                onChange={(e) => onChange(e)}
                required
                max={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>

            <Form.Select
              className="mb-3"
              name="gender"
              onChange={(e) => onChange(e)}
            >
              <option>Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Form.Select>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profile Pic</Form.Label>
              <Form.Control type="file" onChange={fileChangeHandler} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="number"
                placeholder="eg. 9999XXXXXX"
                autoFocus
                name="contactNo"
                value={contactNo}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg . Delhi"
                autoFocus
                name="city"
                value={city}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditPatientProfile;
