import React from "react";
import Button from "react-bootstrap/Button";

class Search extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="border">Search</h1>
        <div id="city-search" className="row">
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
                className="m-1"
                variant="primary"
                type="submit"
                city="Submit"
              >
                Submit
              </Button>
              <Button
                className="m-1"
                variant="danger"
                onClick={this.props.onReset}
              >
                Reset
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
