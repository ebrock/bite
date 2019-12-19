import React from "react";
import Button from "react-bootstrap/Button";

class Search extends React.Component {
  render() {
    let cuisines;
    let buttons;
    if (this.props.cuisineData) {
      cuisines = this.props.cuisineData.cuisines.map(c => (
        <Button
          key={c.cuisine.cuisine_id}
          id={c.cuisine.cuisine_id}
          className="m-1"
          variant="light"
          isactive="false"
          onClick={this.props.onCuisineButtonClick}
        >
          {c.cuisine.cuisine_name}
        </Button>
      ));

      buttons = (
        <Button
          className="m-1"
          variant="secondary"
          onClick={this.props.getRestaurantDetails}
          block
        >
          Next
        </Button>
      );
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
              <Button
                className="m-1"
                variant="primary"
                type="submit"
                city="Submit"
              >
                Submit
              </Button>
              <Button
                className="m-1"
                variant="danger"
                onClick={this.props.onReset}
              >
                Reset
              </Button>
            </form>
          </div>
        </div>
        <div id="cuisine-selection">
          <h2 className="border">Cuisines</h2>
          {cuisines}
          {buttons}
        </div>
      </div>
    );
  }
}

export default Search;
