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
    console.log("derived state!");
    if (props.cityResults !== state.cityResults) {
      let suggestions = props.cityResults.location_suggestions;
      console.log("returning dervied state", suggestions);
      return { suggestions };
    }
    return null;
  }

  componentWillUpdate(nextProps) {
    console.log("will update!", nextProps);
  }

  componentDidUpdate(prevProps) {
    console.log("did update!", prevProps);
  }

  render() {
    let list;
    if (this.state.suggestions) {
      list = this.state.suggestions.map(c => <li>{c.name}</li>);
    }
    return (
      <div className="container">
        <div>
          <h1 className="border">Results</h1>
        </div>
        <div className="row">
          <div className="col">
            <h2>City</h2>
            <p>{this.props.city}</p>
            <h4>Location Suggestions:</h4>
            <ul>{list}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
