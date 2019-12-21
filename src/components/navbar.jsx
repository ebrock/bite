import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar id="navbar" bg="light">
        <Navbar.Brand className="mb-0 h1">Bite</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button
            id="reset-btn"
            className="m-1"
            variant="danger"
            onClick={this.props.onReset}
          >
            Reset
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
