import React from "react";

class Results extends React.Component {
  state = {
    cuisines: []
  };

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="border">Results</h1>
        </div>
        <div className="row">
          <div className="col">
            <h2>City</h2>
            <p>{this.props.city}</p>
          </div>
          <div className="col">
            <h2>Geolocation</h2>
            <p>
              <span>Longitude: {this.props.coords.longitude}</span>
              <br />
              <span>Latitude: {this.props.coords.latitude}</span>
              <br />
              <span>
                Accurate by more or less {this.props.coords.accuracy} meters.
              </span>
              <br />
              <span>City id: {this.props.cityId}</span>
              <br />
            </p>
            <span>
              Cuisines nearby:{" "}
              <ul>
                {this.props.cuisines.map(c => (
                  <li>{c}</li>
                ))}
              </ul>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
