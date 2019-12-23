import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

class SuggestionsTable extends React.Component {
  render() {
    return (
      <Container>
        <Accordion>
          {this.props.locationsData.location_suggestions.map(c => (
            <Button
              className="list-group-item list-group-item-action"
              key={c.id}
              onClick={e => this.props.handleCityClick(c, e)}
            >
              {c.name}
            </Button>
          ))}
        </Accordion>
      </Container>
    );
  }
}

export default SuggestionsTable;
