import React from "react";
import "./index.css";
import NavBar from "./components/navbar";
import Search from "./components/search";
import Cuisines from "./components/cuisines";
import SuggestionsTable from "./components/suggestionstable";
import RestaurantsTable from "./components/restaurantstable";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      userInput: "",
      locationsData: undefined,
      selectedCity: undefined,
      cuisineData: undefined,
      restaurantsData: undefined,
      cuisineIds: []
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
      cuisineIds: [],
      locationsData: undefined,
      selectedCity: undefined,
      restaurantsData: undefined
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
        this.setState({ locationsData: data }, () =>
          console.log("state locationsData", this.state.locationsData)
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
        this.setState({ restaurantsData: data });
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
          getRestaurantDetails={this.getRestaurantDetails}
        />
        <SuggestionsTable
          locationsData={this.state.locationsData}
          handleCityClick={this.handleCityClick}
        />
        <Cuisines
          selectedCity={this.state.selectedCity}
          cuisineData={this.state.cuisineData}
          onCuisineButtonClick={this.handleCuisineButtonClick}
          onNextClick={this.getRestaurantDetails}
        />
        <RestaurantsTable restaurantsData={this.state.restaurantsData} />
      </div>
    );
  }
}

export default App;
