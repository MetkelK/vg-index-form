import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function ModChipProtection({ modchipprotection }) {
  const [protection, setProtection] = useState(modchipprotection);

  useEffect(() => {
    setProtection(modchipprotection);
  }, [modchipprotection]);

  return (
    <Form.Check
      type="checkbox"
      id="Anti-ModChip"
      label="Anti-ModChip Protection"
      value={protection || false}
      checked={protection || false}
      onChange={() => setProtection(!protection)}
    />
  );
}

export default ModChipProtection;
