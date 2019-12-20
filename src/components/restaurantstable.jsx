import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class RestaurantsTable extends React.Component {
  render() {
    let restaurants;
    //  Initialize list of Cards for Accordion.
    if (this.props.restaurantsData) {
      restaurants = this.props.restaurantsData.restaurants.map(r => (
        <Card key={r.restaurant.id}>
          <Accordion.Toggle as={Card.Header} eventKey={r.restaurant.id}>
            {r.restaurant.name} - <i>{r.restaurant.cuisines}</i>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={r.restaurant.id}>
            <Card.Body>{r.restaurant.location.address}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ));
    }

    //  Set the title. Previously null or "Location Suggestions".
    return (
      <Row>
        <Col>
          <Accordion>{restaurants}</Accordion>
        </Col>
      </Row>
    );
  }
}

export default RestaurantsTable;
