import React from "react";

class Results extends React.Component {
  state = {
    cityResults: [],
    suggestions: []
  };

  shouldComponentUpdate(nextProps) {
    return this.props.cityResults !== nextProps.cityResults;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("will receive props!");
  //   if (this.props.cityResults !== nextProps.cityResults) {
  //     let suggestions = nextProps.cityResults.location_suggestions;
  //     this.setState({ suggestions });
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.cityResults !== state.cityResults) {
      let suggestions = props.cityResults.location_suggestions;
      return { suggestions };
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
    console.log("handleCityClick true?", this.props.handleCityClick);
    if (this.state.suggestions) {
      list = this.state.suggestions.map(c => (
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
