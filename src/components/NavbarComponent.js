import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home"><strong>Kasir</strong> App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
