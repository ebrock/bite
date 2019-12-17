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
      cuisineData: undefined,
      suggestedLocations: undefined,
      selectedCity: undefined,
      listOfRestaurants: undefined
    };
  }

  //  Handles the City search text change from user input.
  handleChange = event => {
    event.preventDefault();
    this.setState({
      input: event.target.value
    });
  };

  //  Handles the City search submit button and sets state.
  handleSubmit = event => {
    event.preventDefault();
    console.log("Submit clicked!");
    this.setState(
      {
        city: this.state.input
      },
      () => {
        //  Returns list of suggested locations.
        this.getCities(this.state.city);
      }
    );
  };

  //  Resets state to default values.
  handleReset = event => {
    event.preventDefault();
    console.log("Reset clicked!");
    this.setState({
      city: "",
      cuisineData: undefined,
      suggestedLocations: undefined,
      selectedCity: undefined,
      listOfRestaurants: undefined
    });
  };

  //  Requires enteredCity query. Returns list of suggested locations.
  getCities = enteredCity => {
    fetch(`https://developers.zomato.com/api/v2.1/cities?q=${enteredCity}`, {
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

  //  Requires cityId. Returns list of restaurants.
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

  getCuisinesOfCity = cityId => {
    console.log("getCuisinesOfCity() called!");
    fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`, {
      headers: {
        "Content-Type": "text/json",
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ cuisineData: data });
      });
  };

  //  Handles the return of restaurants when the user clicks a city.
  handleCityClick = (city, event) => {
    event.preventDefault();
    console.log("handleCityClick!");
    console.log(`city: ${city.name}, id: ${city.id}`);
    this.setState({ selectedCity: city }, () => {
      //  Returns a list of restaurants.
      // this.getRestaurantDetails(city.id)
      console.log("getRestaurantDetails() commented out here.");
      this.getCuisinesOfCity(city.id);
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Search
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          cuisineData={this.state.cuisineData}
        />
        <Results
          city={this.state.city}
          suggestedLocations={this.state.suggestedLocations}
          listOfRestaurants={this.state.listOfRestaurants}
          handleCityClick={this.handleCityClick}
        />
      </div>
    );
  }
}

export default App;
