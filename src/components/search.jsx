import React from "react";

class Search extends React.Component {
  render() {
    let cuisines;
    if (this.props.cuisineData) {
      cuisines = this.props.cuisineData.cuisines.map(c => (
        <button className="btn btn-outline-primary btn-sm m-1">
          {c.cuisine.cuisine_name}
        </button>
      ));
    }

    return (
      <div className="container">
        <h1 className="border">Search</h1>
        <div id="city-search" className="row">
          <div className="col">
            <form onSubmit={this.props.onSubmit}>
              <input
                type="text"
                name="city"
                title="Enter your city..."
                placeholder="Enter your city..."
                type="search"
                value={this.props.input}
                onChange={this.props.onChange}
                required
              ></input>
              <button
                className="btn btn-primary m-2"
                type="submit"
                city="Submit"
              >
                Submit
              </button>
              <button className="btn btn-danger" onClick={this.props.onReset}>
                Reset
              </button>
            </form>
          </div>
        </div>
        <div id="cuisine-selection">
          <h2 className="border">Cuisines</h2>
          {cuisines}
        </div>
      </div>
    );
  }
}

export default Search;
