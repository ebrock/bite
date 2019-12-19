import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class RestaurantTable extends React.Component {
  render() {
    //  Initialize list of Cards for Accordion.
    let list = this.props.listOfRestaurants.restaurants.map(r => (
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
    return (
      <Row>
        <Col>
          <h4>Restaurants</h4>
          <Accordion>{list}</Accordion>
        </Col>
      </Row>
    );
  }
}

export default RestaurantTable;
