import React from "react";
import Form from "react-bootstrap/Form";

function Version({ version }) {
  return (
    <Form.Group className="mb-3" controlId="version">
      <Form.Label>Version</Form.Label>
      <Form.Control type="input" placeholder={version} />
    </Form.Group>
  );
}

export default Version;
