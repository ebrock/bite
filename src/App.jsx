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
      city: "",
      coords: {},
      cityId: "",
      cuisines: []
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
        city: this.state.input
      },
      // () => console.log(this.state.city)
      () => {
        this.getCities(this.state.city);
      }
    );
  };

  getCities = city => {
    fetch(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, {
      headers: {
        "Content-Type": "text/json",
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  handleGeoSubmit = event => {
    event.preventDefault();
    let context = this;
    let options = {
      timeout: 5000,
      maximumAge: 0
    };

    function success(position) {
      let coords = position.coords;

      console.log(coords);
      console.log("Your current position is: ");
      console.log(`Latitude: ${coords.latitude}`);
      console.log(`Longitude: ${coords.longitude}`);
      console.log(`More or less ${coords.accuracy} meters.`);

      context.setState({
        coords: coords
      });

      fetch(
        `https://developers.zomato.com/api/v2.1/geocode?lat=${coords.latitude}&lon=${coords.longitude}`,
        {
          headers: {
            "Content-Type": "text/json",
            "user-key": process.env.REACT_APP_ZOMATO_API_KEY
          }
        }
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          context.setState({ cityId: data.location.city_id });
          fetch(
            `https://developers.zomato.com/api/v2.1/cuisines?city_id=${data.location.city_id}`,
            {
              headers: {
                "Content-Type": "text/json",
                "user-key": process.env.REACT_APP_ZOMATO_API_KEY
              }
            }
          )
            .then(res => res.json())
            .then(data => {
              console.log(data);
              let cuisines = data.cuisines.map(d => {
                return d.cuisine.cuisine_name;
              });
              console.log(cuisines);
              context.setState({ cuisines });
            });
        })
        .catch(error => console.warn(error));
    }

    function error(err) {
      console.warn(`ERROR: ${err.code}: ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
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
        <Results
          city={this.state.city}
          coords={this.state.coords}
          cityId={this.state.cityId}
          cuisines={this.state.cuisines}
        />
      </div>
    );
  }
}

export default App;
