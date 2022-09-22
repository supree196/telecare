import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import DocLinks from "./DocLinks";
import PatientLinks from "./PatientLinks";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [userType, setUserType] = useState(null);

  const customStyle = {
    position: "absolute",
    left: "-38px",
    top: "6px",
  };
  useEffect(() => {
    //console.log("Header hi from useEffect")
    setIsUserLoggedIn(localStorage.getItem("isLoggedIn") || null);
    setUserType(localStorage.getItem("userType") || null);

    window.addEventListener("storage", storageEventHandler, false);
  }, []);

  function storageEventHandler() {
    //console.log("hi from storageEventHandler")
    setIsUserLoggedIn(localStorage.getItem("isLoggedIn") || null);
    setUserType(localStorage.getItem("userType") || null);
  }

  function getLocalStorageChanges() {
    //console.log("hi from test function")
    storageEventHandler();
  }

  return (
    <Navbar
      collapseOnSelect
      variant="light"
      expand="lg"
      style={{ backgroundColor: "#D8D6E6" }}
    >
      <button
        style={{ display: "none" }}
        onClick={getLocalStorageChanges}
        id="hiddenBtn"
      >
        Hidden Button
      </button>
      <Container>
        <LinkContainer to="/" style={{ position: "relative" }}>
          <Navbar.Brand className="h1">
            <i
              className="bi bi-heart-pulse h3 d-lg-block d-none"
              style={customStyle}
            >
              {" "}
            </i>{" "}
            TeleCare
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {isUserLoggedIn ? (
              userType === "DOCTOR" ? (
                <DocLinks />
              ) : (
                <PatientLinks />
              )
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/doctor-register">
                  <Nav.Link>Register As Doctor</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/patient-register">
                  <Nav.Link>Register As Patient</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
