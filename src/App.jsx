import React from "react";
import "./index.css";
import NavBar from "./components/navbar";
import Search from "./components/search";
import Results from "./components/results";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      zipcode: "",
      coords: {}
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      input: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Submit clicked!");
    this.setState(
      {
        zipcode: this.state.input
      },
      () => console.log(this.state.zipcode)
    );
  };

  handleGeoSubmit = event => {
    let coords = {};
    event.preventDefault();
    let options = {
      timeout: 5000,
      maximumAge: 0
    };

    function success(position) {
      coords = position.coords;

      console.log(coords);
      console.log("Your current position is: ");
      console.log(`Latitude: ${coords.latitude}`);
      console.log(`Longitude: ${coords.longitude}`);
      console.log(`More or less ${coords.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR: ${err.code}: ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(
      (success = position => {
        let coords = {};
        event.preventDefault();
        let options = {
          timeout: 5000,
          maximumAge: 0
        };

        coords = position.coords;

        console.log(coords);
        console.log("Your current position is: ");
        console.log(`Latitude: ${coords.latitude}`);
        console.log(`Longitude: ${coords.longitude}`);
        console.log(`More or less ${coords.accuracy} meters.`);

        this.setState({ coords });
      }),
      error,
      options
    );
  };

  render() {
    return (
      <div>
        <NavBar />
        <Search
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onGeoSubmit={this.handleGeoSubmit}
        />
        <Results zipcode={this.state.zipcode} coords={this.state.coords} />
      </div>
    );
  }
}

export default App;
