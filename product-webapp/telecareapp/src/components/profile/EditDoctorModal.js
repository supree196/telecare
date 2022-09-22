import axios from "axios";
import moment from "moment";
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
} from "react-bootstrap";
import UserService from "../../Service/UserService";
import { BASE_URL } from "../../environment";

const EditDoctorModal = (props) => {
  const { handleShow, handleClose, show, setShow, doctorData } = props;
  const [selectedFile, setSelectedFile] = useState({});
  //const [isFilePicked, setIsFilePicked] = useState(false);

  const [formData, setFormData] = useState({
    doctorEmailId: localStorage.getItem("loginId"),
    doctorName: "",
    contactNo: "",
    dob: "",
    gender: "",
    experience: "",
    specialization: "",
    city: "",
  });

  const {
    doctorName,
    contactNo,
    dob,
    gender,
    experience,
    specialization,
    city,
  } = formData;
  const [validated, setValidated] = useState(false);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const fileChangeHandler = (event) => {
    //console.log("selected file", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const updateDoctorProfile = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    let data = new FormData();
    let file = new File([], "");
    data.append("doctor", JSON.stringify(formData));
    //data.append("file", file)
    if ("name" in selectedFile) {
      console.log("file present");
      data.append("file", selectedFile);
    } else {
      console.log("file not present");
      data.append("file", file);
    }

    //console.log("form data", data)
    UserService.updateUserData("/api/v1/doctor/", data)
      .then((response) => {
        handleClose();
        //alert("successfull updation");
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
    updateDoctorProfile(e);
    //setValidated(true);
  };

  useEffect(() => {
    setFormData({
      doctorEmailId: localStorage.getItem("loginId"),
      doctorName: doctorData.doctorName,
      contactNo: doctorData.contactNo,
      dob: doctorData.dob,
      gender: doctorData.gender,
      experience: doctorData.experience,
      specialization: doctorData.specialization,
      city: doctorData.city,
    });
  }, [doctorData]);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton style={{ backgroundColor: "#F5F9F9" }}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#F5F9F9" }}>
          <Form validated={validated} onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. john doe"
                autoFocus
                name="doctorName"
                value={doctorName}
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
              required
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
                type="text"
                placeholder="eg. 9999XXXXXX"
                autoFocus
                name="contactNo"
                value={contactNo}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg . ENT"
                autoFocus
                name="specialization"
                value={specialization}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="number"
                placeholder="eg . 3 Years"
                autoFocus
                name="experience"
                value={experience}
                onChange={(e) => onChange(e)}
                required
                min="0"
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
            {validated ? (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Button variant="primary" type="submit" aria-disabled>
                Submit
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditDoctorModal;
