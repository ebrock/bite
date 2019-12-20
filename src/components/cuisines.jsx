import React from "react";
import Button from "react-bootstrap/Button";

class Cuisines extends React.Component {
  render() {
    //  Initialize the cuisines buttons.
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

      // Initialize the "Next" button.
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
      <div>
        {/* Div for cuisine. Controlled by the conditional logic outside of 'return'. */}
        <h2 className="border">Cuisines in.</h2>
        {cuisines}
        {buttons}
      </div>
    );
  }
}

export default Cuisines;
