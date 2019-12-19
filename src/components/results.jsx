import React from "react";
import SuggestionsTable from "./suggestionstable";
import RestaurantTable from "./restaurantstable";
import Container from "react-bootstrap/Container";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedLocations: undefined,
      listOfRestaurants: undefined
    };
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.suggestedLocations !== nextProps.suggestedLocations ||
      this.props.listOfRestaurants !== nextProps.listOfRestaurants
    );
  }

  componentDidUpdate(prevProps) {
    console.log("did update!", prevProps);
  }

  render() {
    //  Declare variables.
    let title;
    let display;

    //  If user clicks a suggested location, then provide the list of restaurants.
    if (this.props.suggestedLocations) {
      display = (
        <SuggestionsTable
          suggestedLocations={this.props.suggestedLocations}
          handleCityClick={this.props.handleCityClick}
        />
      );
    }
    if (this.props.listOfRestaurants) {
      display = (
        <RestaurantTable listOfRestaurants={this.props.listOfRestaurants} />
      );
    }

    return (
      <Container>
        <div>
          <h1 className="border">Results</h1>
        </div>
        {display}
      </Container>
    );
  }
}

export default Results;
