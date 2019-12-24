import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

class RestaurantsTable extends React.Component {
  setRatingBadge = (rating, text) => {
    let badgeText;
    if (text === "Not rated") {
      badgeText = "Not rated";
    } else {
      badgeText = rating;
    }
    return badgeText;
  };

  getRatingColor = (rating, text) => {
    let variant;
    rating = parseFloat(rating);
    if (rating >= 3.5) {
      variant = "success";
    } else if (rating >= 3) {
      variant = "warning";
    } else if (rating === 0 && text === "Not rated") {
      variant = "info";
    } else {
      variant = "danger";
    }
    return variant;
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Accordion>
              {this.props.restaurantsData.restaurants.map(r => (
                <Card key={r.restaurant.id}>
                  <Accordion.Toggle as={Card.Header} eventKey={r.restaurant.id}>
                    {r.restaurant.name} -{" "}
                    <i>
                      {r.restaurant.cuisines}{" "}
                      <Badge
                        variant={this.getRatingColor(
                          r.restaurant.user_rating.aggregate_rating,
                          r.restaurant.user_rating.rating_text
                        )}
                      >
                        {this.setRatingBadge(
                          r.restaurant.user_rating.aggregate_rating,
                          r.restaurant.user_rating.rating_text
                        )}
                      </Badge>
                    </i>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={r.restaurant.id}>
                    <Card.Body>
                      <div>
                        <ListGroup>
                          <React.Fragment>
                            <ListGroup.Item>
                              <a href={r.restaurant.url} target="_blank">
                                <b>{r.restaurant.name}</b> on Zomato
                              </a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {r.restaurant.location.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {r.restaurant.location.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <a href={"tel:" + r.restaurant.phone_numbers}>
                                {r.restaurant.phone_numbers}
                              </a>
                            </ListGroup.Item>
                          </React.Fragment>
                        </ListGroup>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RestaurantsTable;
