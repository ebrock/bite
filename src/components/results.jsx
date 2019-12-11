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

  componentDidUpdate(prevProps) {
    console.log("did update!", prevProps);
  }

  render() {
    let title;
    let list;

    if (this.props.suggestedLocations) {
      console.log("ben affleck");
      list = this.props.suggestedLocations.location_suggestions.map(c => (
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
    if (this.props.listOfRestaurants) {
      console.log("obiwan kenobi");
      console.log("list of restaurants", this.props.listOfRestaurants);
      list = this.props.listOfRestaurants.restaurants.map(r => (
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
