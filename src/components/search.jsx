import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="border">Search</h1>
        <div className="row">
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
              <button
                className="btn btn-primary m-2"
                type="submit"
                city="Submit"
              >
                Submit
              </button>
              <button className="btn btn-danger" onClick={this.props.onReset}>
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
