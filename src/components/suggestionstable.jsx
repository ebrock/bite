import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

class SuggestionsTable extends React.Component {
  render() {
    //  Initialize the list of suggested locations.
    let list = this.props.locationsData.location_suggestions.map(c => (
      <Button
        className="list-group-item list-group-item-action"
        key={c.id}
        onClick={e => this.props.handleCityClick(c, e)}
      >
        {c.name}
      </Button>
    ));

    return (
      <div>
        <Row>
          <Col>
            <h4>Suggested Locations</h4>
            <Accordion>{list}</Accordion>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SuggestionsTable;
