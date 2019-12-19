import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

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
    //  Declare variables.
    let title;
    let list;

    //  If userInput is submitted, then provide a list of locations.
    if (this.props.suggestedLocations) {
      console.log(
        "this.props.suggestedLocations!",
        this.props.suggestedLocations
      );
      //  Initialize the list of suggested locations.
      list = this.props.suggestedLocations.location_suggestions.map(c => (
        <Button
          className="list-group-item list-group-item-action"
          key={c.id}
          onClick={e => this.props.handleCityClick(c, e)}
        >
          {c.name}
        </Button>
      ));

      //  Set the title.
      title = "Location Suggestions";
    }

    //  If user clicks a suggested location, then provide the list of restaurants.
    if (this.props.listOfRestaurants) {
      console.log(
        "this.props.listOfRestaurants!",
        this.props.listOfRestaurants
      );

      //  Initialize list of Cards for Accordion.
      list = this.props.listOfRestaurants.restaurants.map(r => (
        <Card key={r.restaurant.id}>
          <Accordion.Toggle as={Card.Header} eventKey={r.restaurant.id}>
            {r.restaurant.name} - <i>{r.restaurant.cuisines}</i>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={r.restaurant.id}>
            <Card.Body>{r.restaurant.location.address}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ));

      //  Set the title. Previously null or "Location Suggestions".
      title = "Restaurants";
    }
    return (
      <Container>
        <div>
          <h1 className="border">Results</h1>
        </div>
        <Row>
          <Col>
            <p>{this.props.userInput}</p>
            <h4>{title}</h4>
            <Accordion>{list}</Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Results;
