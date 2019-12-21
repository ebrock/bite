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
          variant="outline-primary"
          onClick={this.props.onNextClick}
          block
        >
          Next
        </Button>
      );
    }
    return (
      <div>
        {cuisines}
        {buttons}
      </div>
    );
  }
}

export default Cuisines;
