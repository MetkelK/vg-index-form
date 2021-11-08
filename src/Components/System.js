import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function System({ systems, currentSystem }) {
  const [system, setSystem] = useState("");

  let systemName;

  if (currentSystem && systems.length > 0) {
    systemName = systems.find((system) => {
      return system.id === currentSystem;
    });
  } else {
    systemName = "Choose a system";
  }

  return (
    <Form.Group className="my-2">
      <Form.Label htmlFor="system">System</Form.Label>
      <Form.Select
        id="system"
        value={currentSystem ? currentSystem : system}
        onChange={(e) => setSystem(e.target.value)}
      >
        <option value={currentSystem}>{systemName.name}</option>
        {systems.map((system, i) => (
          <option key={i} value={system.id}>
            {system.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default System;
