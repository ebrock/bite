import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar id="navbar" bg="light">
        <Navbar.Brand className="mb-0 h1">Bite</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nar"></Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Nav.Link href="https://www.ericbrock.net">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button
          id="reset-btn"
          className="m-1"
          variant="danger"
          onClick={this.props.onReset}
        >
          Reset
        </Button>
      </Navbar>
    );
  }
}

export default NavBar;
