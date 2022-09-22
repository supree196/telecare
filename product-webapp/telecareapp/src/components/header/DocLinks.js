import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DocLinks = () => {
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
      <NavDropdown title={<i className='bi bi-person-circle lead' ></i>} id="navbarScrollingDropdown" size="lg">
        <LinkContainer to="/doctor-profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logout}>Logout<i className="bi bi-box-arrow-in-right"></i></NavDropdown.Item>
      </NavDropdown>

    </>
  )
}

export default DocLinks