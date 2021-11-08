import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function Format({ formats, currentFormat }) {
  const [format, setFormat] = useState("");

  let formatName = "";

  //   if (currentFormat && formats.length > 0) {
  //     formatName = formats.find((discformat) => {
  //       return discformat.id === currentFormat;
  //     });
  //   } else {
  //     formatName = "Choose a format";
  //   }

  if (formats) {
    return (
      <Form.Group className="my-2">
        <Form.Label htmlFor="format">Disc Format</Form.Label>
        <Form.Select
          id="format"
          value={currentFormat ? currentFormat : format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value={currentFormat}>{formatName.name}</option>
          {formats.map((discformat, i) => (
            <option key={i} value={discformat.id}>
              {discformat.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    );
  } else {
    return (
      <Form.Group className="my-2">
        <Form.Label htmlFor="format">Disc Format</Form.Label>
        <Form.Select
          id="format"
          value={currentFormat ? currentFormat : format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value={currentFormat}>{currentFormat}</option>
        </Form.Select>
      </Form.Group>
    );
  }
}

export default Format;
