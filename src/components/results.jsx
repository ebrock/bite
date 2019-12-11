import React from "react";

class Results extends React.Component {
  state = {
    suggestedLocations: undefined,
    listOfRestaurants: undefined
  };

  shouldComponentUpdate(nextProps) {
    return this.props.suggestedLocations !== nextProps.suggestedLocations;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.suggestedLocations !== state.suggestedLocations) {
      let suggestions = props.suggestedLocations;
      return { suggestedLocations: suggestions };
    }
    if (props.listOfRestaurants !== state.listOfRestaurants) {
      console.log("derived list of restaurants...");
      let restaurants = props.listOfRestaurants;
      return { listOfRestaurants: restaurants };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    console.log("did update!", prevProps);
  }

  render() {
    let title;
    let city;
    let list;

    if (this.state.suggestedLocations) {
      console.log("ben affleck");
      list = this.state.suggestedLocations.location_suggestions.map(c => (
        <button
          className="list-group-item list-group-item-action"
          key={c.id}
          onClick={e => this.props.handleCityClick(c, e)}
        >
          {c.name}
        </button>
      ));

      title = "Location Suggestions";
      city = "City";
    } else if (this.state.listOfRestaurants) {
      console.log(
        "obiwan kenobi",
        this.state.listOfRestaurants.map(r => r.restaurant.name)
      );
      list = this.state.listOfRestaurants.map(r => (
        <li>{r.restaurant.name}</li>
      ));
    }
    return (
      <div className="container">
        <div>
          <h1 className="border">Results</h1>
        </div>
        <div className="row">
          <div className="col">
            <h2>{city}</h2>
            <p>{this.props.city}</p>
            <h4>{title}</h4>
            <ul>{list}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
