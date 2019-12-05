import React from "react";

class Results extends React.Component {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <h2>Zipcode</h2>
        <p>{this.props.zipcode}</p>
        <h2>Geolocation</h2>
        <p>Longitude: {this.props.coords.longitude}</p>
      </div>
    );
  }
}

export default Results;
