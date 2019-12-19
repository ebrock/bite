import React from "react";
import Navbar from "react-bootstrap/Navbar";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand className="mb-0 h1">Bite</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
