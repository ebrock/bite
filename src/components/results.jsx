import React from "react";

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
    }
    if (this.state.listOfRestaurants) {
      console.log("obiwan kenobi");
      console.log("list of restaurants", this.state.listOfRestaurants);
      list = this.state.listOfRestaurants.restaurants.map(r => (
        <li className="list-group-item">{r.restaurant.name}</li>
      ));
      title = "5 restaurants";
    }
    return (
      <div className="container">
        <div>
          <h1 className="border">Results</h1>
        </div>
        <div className="row">
          <div className="col">
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
