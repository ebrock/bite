import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class Cuisines extends React.Component {
  render() {
    return (
      <Container>
        {this.props.cuisineData.cuisines.map(c => (
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
        ))}
        <Button
          className="m-1"
          variant="outline-primary"
          onClick={this.props.onNextClick}
          block
        >
          Next
        </Button>
      </Container>
    );
  }
}

export default Cuisines;
