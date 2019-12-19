import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
          right?
        </Popover.Content>
      </Popover>
    );

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
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <li className="list-group-item">
            {r.restaurant.name} - <i>{r.restaurant.cuisines}</i>
          </li>
        </OverlayTrigger>
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
            <ul>{list}</ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Results;
