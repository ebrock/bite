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
    let title;
    let list;

    if (this.props.suggestedLocations) {
      console.log("ben affleck");
      list = this.props.suggestedLocations.location_suggestions.map(c => (
        <Button
          className="list-group-item list-group-item-action"
          key={c.id}
          onClick={e => this.props.handleCityClick(c, e)}
        >
          {c.name}
        </Button>
      ));

      title = "Location Suggestions";
    }

    if (this.props.listOfRestaurants) {
      console.log("obiwan kenobi");
      console.log("list of restaurants", this.props.listOfRestaurants);
      list = this.props.listOfRestaurants.restaurants.map(r => (
        <Card key={r.restaurant.id}>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={r.restaurant.id}
            >
              {r.restaurant.name} - <i>{r.restaurant.cuisines}</i>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={r.restaurant.id}>
            <Card.Body>{r.restaurant.location.address}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ));
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
