import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class Search extends React.Component {
  render() {
    return (
      <div className="container">
        <div id="search" className="row">
          <div className="col">
            <form onSubmit={this.props.onSubmit}>
              <input
                type="text"
                name="city"
                title="Enter your city..."
                placeholder="Enter your city..."
                type="search"
                value={this.props.input}
                onChange={this.props.onChange}
                required
              ></input>
              <Button
                className="m-2"
                variant="outline-primary"
                type="submit"
                city="Submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
