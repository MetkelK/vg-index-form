import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function EDC({ errorDetection }) {
  const [detection, setDetection] = useState(errorDetection);

  useEffect(() => {
    setDetection(errorDetection);
  }, [errorDetection]);

  return (
    <>
      <Form.Check
        type="checkbox"
        id="edc"
        label="EDC"
        value={detection || false}
        checked={detection || false}
        onChange={() => setDetection(!detection)}
      />
    </>
  );
}

export default EDC;
