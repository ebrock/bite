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
      cuisines: [],
      suggestedLocations: undefined,
      selectedCity: undefined,
      listOfRestaurants: undefined
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
      () => {
        this.getCities(this.state.city);
      }
    );
  };

  handleReset = event => {
    event.preventDefault();
    console.log("Reset clicked!");
    this.setState({
      city: "",
      cuisines: [],
      suggestedLocations: undefined,
      selectedCity: undefined,
      listOfRestaurants: undefined
    });
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
        this.setState({ suggestedLocations: data }, () =>
          console.log("state suggestedLocations", this.state.suggestedLocations)
        );
      });
  };

  getRestaurantDetails = cityId => {
    console.log("getRestaurantDetails!");
    fetch(
      `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=5`,
      {
        headers: {
          "Content-Type": "text/json",
          "user-key": process.env.REACT_APP_ZOMATO_API_KEY
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.restaurants.map(r => r.restaurant.name));
        this.setState({ listOfRestaurants: data });
      });
  };

  handleCityClick = (city, event) => {
    event.preventDefault();
    console.log("handleCityClick!");
    console.log(`city: ${city.name}, id: ${city.id}`);
    this.setState({ selectedCity: city }, () =>
      this.getRestaurantDetails(city.id)
    );
  };

  render() {
    return (
      <div>
        <NavBar />
        <Search
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        />
        <Results
          city={this.state.city}
          coords={this.state.coords}
          cityId={this.state.cityId}
          cuisines={this.state.cuisines}
          suggestedLocations={this.state.suggestedLocations}
          listOfRestaurants={this.state.listOfRestaurants}
          handleCityClick={this.handleCityClick}
        />
      </div>
    );
  }
}

export default App;
