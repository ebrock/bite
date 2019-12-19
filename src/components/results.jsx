import React from "react";
import SuggestionsTable from "./suggestionstable";
import RestaurantTable from "./restaurantstable";
import Container from "react-bootstrap/Container";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.locationsData !== nextProps.locationsData ||
      this.props.restaurantsData !== nextProps.restaurantsData
    );
  }

  componentDidUpdate(prevProps) {
    console.log("did update!", prevProps);
  }

  render() {
    //  Declare variables.
    let display;

    //  If user clicks a suggested location, then provide the list of restaurants.
    if (this.props.locationsData && !this.props.cuisineData) {
      display = (
        <SuggestionsTable
          locationsData={this.props.locationsData}
          handleCityClick={this.props.handleCityClick}
        />
      );
    }
    if (this.props.restaurantsData) {
      display = (
        <RestaurantTable restaurantsData={this.props.restaurantsData} />
      );
    }
    if (this.props.locationsData && this.props.cuisineData) {
      display = "";
    }

    return <Container>{display}</Container>;
  }
}

export default Results;
