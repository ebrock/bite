import React from "react";
import SuggestionsTable from "./suggestionstable";
import RestaurantsTable from "./restaurantstable";
import Container from "react-bootstrap/Container";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.locationsData !== nextProps.locationsData ||
      this.props.restaurantsData !== nextProps.restaurantsData ||
      this.props.cuisineData !== nextProps.cuisineData
    );
  }

  componentDidUpdate(prevProps) {
    console.log("did update!", prevProps);
  }

  render() {
    let display = (
      <RestaurantsTable restaurantsData={this.props.restaurantsData} />
    );

    return <Container>{display}</Container>;
  }
}

export default Results;
