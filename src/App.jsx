import React from "react";
import "./index.css";
import NavBar from "./components/navbar";
import Search from "./components/search";
import Results from "./components/results";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    // TODO: change selectedCity to citySelectedFromSuggested
    this.state = {
      input: "",
      userInput: "",
      cuisineData: undefined,
      cuisineIds: [],
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
        userInput: this.state.input
      },
      () => {
        //  Returns list of suggested locations.
        this.getCities(this.state.userInput);
      }
    );
  };

  //  Resets state to default values.
  handleReset = event => {
    event.preventDefault();
    console.log("Reset clicked!");
    this.setState({
      userInput: "",
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

  //  Requires cityId and cuisineIds. Returns restaurants object array.
  getRestaurantDetails = () => {
    console.log("getRestaurantDetails!");
    fetch(
      `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.selectedCity.id}&entity_type=city&count=10&radius=25&cuisines=${this.state.cuisineIds}
      `,
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
        this.setState({ listOfRestaurants: data });
      });
  };

  //  Requires cityId. Returns cuisines object.
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

  //  Handles cuisine button selection.
  handleCuisineButtonClick = event => {
    event.preventDefault();
    let cuisineIds = [...this.state.cuisineIds];

    if (event.target.getAttribute("isactive") === "false") {
      event.target.setAttribute("isactive", "true");
      event.target.classList.add("active");
      cuisineIds.push(event.target.getAttribute("id"));
      this.setState({ cuisineIds }, () => {
        console.log(this.state.cuisineIds);
      });
    } else {
      event.target.setAttribute("isactive", "false");
      event.target.classList.remove("active");
      if (cuisineIds.includes(event.target.getAttribute("id"))) {
        cuisineIds = cuisineIds.filter(
          id => id !== event.target.getAttribute("id")
        );
        this.setState({ cuisineIds }, () => {
          console.log(this.state.cuisineIds);
        });
      }
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <Search
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          onCuisineButtonClick={this.handleCuisineButtonClick}
          cuisineData={this.state.cuisineData}
          getRestaurantDetails={this.getRestaurantDetails}
        />
        <Results
          city={this.state.userInput}
          suggestedLocations={this.state.suggestedLocations}
          listOfRestaurants={this.state.listOfRestaurants}
          handleCityClick={this.handleCityClick}
        />
      </div>
    );
  }
}

export default App;
