import React from "react";
import Form from "react-bootstrap/Form";

function Title(props) {
  const { title } = props;
  return (
    <Form.Group className="mb-3" controlId="title">
      <Form.Label>Title</Form.Label>
      <Form.Control type="input" placeholder={title} />
    </Form.Group>
  );
}

export default Title;
