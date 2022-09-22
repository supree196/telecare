import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientLinks = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    document.getElementById("hiddenBtn").click();
    navigate('/')

  }

  return (
    <>
    <LinkContainer to="/appointment">
        <Nav.Link>Appointments</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/doctor-list">
        <Nav.Link>Doctor List</Nav.Link>
      </LinkContainer>
      
      <NavDropdown title={<i className='bi bi-person-circle lead' ></i>} id="navbarScrollingDropdown">
        <LinkContainer to="/patient-profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logout}>Logout<i className="bi bi-box-arrow-in-right"></i></NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default PatientLinks