import React from "react";

class Results extends React.Component {
  state = {
    suggestedLocations: [],
    listOfRestaurants: []
  };

  shouldComponentUpdate(nextProps) {
    return this.props.suggestedLocations !== nextProps.suggestedLocations;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.suggestedLocations !== state.suggestedLocations) {
      let suggestions = props.suggestedLocations.location_suggestions;
      // return { suggestions };
      return { suggestedLocations: suggestions };
    } else if (props.listOfRestaurants !== state.listOfRestaurants) {
      console.log("hello!");
      let restaurants = props.listOfRestaurants;
      return { restaurants };
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
      list = this.state.suggestedLocations.map(c => (
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
