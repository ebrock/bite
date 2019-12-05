import React from "react";

class Results extends React.Component {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <h2>Zipcode</h2>
        <p>{this.props.zipcode}</p>
        <h2>Geolocation</h2>
        <p>
          <span>Longitude: {this.props.coords.longitude}</span>
          <br />
          <span>Latitude: {this.props.coords.latitude}</span>
          <br />
          <span>
            Accurate by more or less {this.props.coords.accuracy} meters.
          </span>
        </p>
      </div>
    );
  }
}

export default Results;
