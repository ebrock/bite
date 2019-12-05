import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.props.onSubmit}>
          <input
            type="text"
            name="zipcode"
            title="5 digit zipcode"
            pattern="[0-9]{5}"
            placeholder="Enter your zipcode..."
            type="search"
            value={this.props.input}
            onChange={this.props.onChange}
            required
          ></input>
          <button
            className="btn btn-primary m-2"
            type="submit"
            zipcode="Submit"
          >
            Submit
          </button>
        </form>
        <h2>Get Geolocation</h2>
        <form onSubmit={this.props.onGeoSubmit}>
          <button className="btn btn-secondary">Submit geolocation</button>
        </form>
      </div>
    );
  }
}

export default Search;
