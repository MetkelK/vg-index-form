import React from "react";
import Form from "react-bootstrap/Form";

function DisplayNumber(props) {
  const { displayNumber } = props;
  return (
    <Form.Group className="mb-3" controlId="displayNumber">
      <Form.Label>Display Number</Form.Label>
      <Form.Control type="input" placeholder={displayNumber} />
    </Form.Group>
  );
}

export default DisplayNumber;
