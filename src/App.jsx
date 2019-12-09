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
      cuisines: [],
      cityResults: []
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
      .then(data => {
        console.log(data.location_suggestions.map(c => c.name));
        this.setState({ cityResults: data }, () =>
          console.log("state cityResults", this.state.cityResults)
        );
      });
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
          cityResults={this.state.cityResults}
        />
      </div>
    );
  }
}

export default App;
