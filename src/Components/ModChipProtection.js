import React from "react";
import Form from "react-bootstrap/Form";

function ModChipProtection(props) {
  const { modchipprotection } = props;

  return (
    <Form.Check
      type="checkbox"
      id="Anti-ModChip"
      label="Anti-ModChip Protection"
      value={modchipprotection !== null ? modchipprotection : ""}
    />
  );
}

export default ModChipProtection;
