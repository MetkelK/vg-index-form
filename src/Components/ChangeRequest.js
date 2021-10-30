import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ChangeRequest(props) {
  const { systems, info, languages } = props;

  let gameName;
  let disc;
  let featureFlags;
  let gameType;
  let languageOptions;
  let systemName;
  let formatName;
  let typeName;

  const [gameSystemId, setGameSystemId] = useState("");
  const [discFormat, setDiscFormat] = useState("");
  const [discFormatId, setDiscFormatId] = useState("");
  const [discType, setDiscType] = useState([]);
  const [discTypeId, setDiscTypeId] = useState("");
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const getFormat = () => {
      fetch(
        `https://vgindex-dev.org/api/change-request/systems/${gameSystemId}/disc-formats`
      )
        .then((res) => res.json())
        .then((res) => {
          setDiscFormat(() => res);
        })
        .catch((err) => console.log(err));
    };
    getFormat();
  }, [gameSystemId]);

  useEffect(() => {
    const getType = () => {
      fetch(`https://vgindex-dev.org/api/change-request/disc-content-types`)
        .then((res) => res.json())
        .then((res) => {
          setDiscType(() => res);
        })
        .catch((err) => console.log(err));
    };
    getType();
  }, [discFormat]);

  useEffect(() => {
    const getFlags = () => {
      fetch(
        `https://vgindex-dev.org/api/change-request/systems/${gameSystemId}/feature-flags?discFormatId=${discFormatId}`
      )
        .then((res) => res.json())
        .then((res) => {
          setFlags(() => res);
        })
        .catch((err) => console.log(err));
    };
    getFlags();
  }, [discFormatId, gameSystemId]);

  if (discFormat && discFormat.status !== 404) {
    disc = discFormat.map((disc) => (
      <option key={disc.id} value={disc.id}>
        {disc.name}
      </option>
    ));
  } else {
    disc = <option>Choose a format</option>;
  }

  if (discType && discType.status !== 404 && discType.status !== 400) {
    gameType = discType.sort((a, b) => a.name.localeCompare(b.name));
    gameType = discType.map((type) => (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    ));
  } else {
    gameType = <option>Choose a type</option>;
  }

  if (flags && flags.status !== 404 && flags && flags.status !== 400) {
    featureFlags = flags.map((feature, i) => (
      <FloatingLabel
        key={i}
        controlId={feature}
        label={feature}
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder={feature} />
      </FloatingLabel>
    ));
  } else {
    featureFlags = null;
  }

  if (info.title) {
    gameName = <h1>Editing Disc {info.title}</h1>;
  } else {
    gameName = <h1>Editing Disc</h1>;
  }

  if (languages) {
    languageOptions = languages.map((language) => (
      <Form.Check
        key={language.id}
        className=""
        inline
        type="checkbox"
        id={language.name}
        label={language.name}
        value={language.name}
      ></Form.Check>
    ));
  } else {
    languageOptions = null;
  }

  if (info.length > 0 && systems.length > 0) {
    systemName = systems.find((system) => {
      return system.id === info.systemId;
    });
  } else {
    systemName = "Choose a system";
  }

  if (info.length > 0 && discFormat.length > 0) {
    formatName = discFormat.find((format) => {
      return format.id === info.formatId;
    });
  } else {
    formatName = "Choose a format";
  }

  if (info.length > 0 && discType.length > 0) {
    typeName = discType.find((type) => {
      return type.id === info.contentTypeId;
    });
  } else {
    typeName = "Choose a type";
  }

  if (props) {
    return (
      <>
        {gameName}
        <Form className="my-4">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="input" placeholder={info.title} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="version">
            <Form.Label>Version</Form.Label>
            <Form.Control type="input" placeholder={info.version} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="displayNumber">
            <Form.Label>Display Number</Form.Label>
            <Form.Control type="input" placeholder={info.displayNumber} />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label htmlFor="system">System</Form.Label>
            <Form.Select
              id="system"
              value={gameSystemId}
              onChange={(e) => setGameSystemId(e.target.value)}
            >
              <option value={info.systemId}>{systemName}</option>
              {systems.map((system, i) => (
                <option key={i} value={system.id}>
                  {system.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label htmlFor="format">Disc Format</Form.Label>
            <Form.Select
              id="format"
              value={discFormatId}
              onChange={(e) => setDiscFormatId(e.target.value)}
            >
              <option value={info.formatId}>{formatName}</option>
              {disc}
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label htmlFor="type">Disc Type</Form.Label>
            <Form.Select
              id="type"
              value={discTypeId}
              onChange={(e) => setDiscTypeId(e.target.value)}
            >
              <option value={info.contentTypeId}>{typeName}</option>
              {gameType}
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Check
              type="checkbox"
              id="Anti-ModChip"
              label="Anti-ModChip Protection"
            />
            <Form.Check type="checkbox" id="edc" label="EDC" />
            <Form.Check
              type="checkbox"
              id="libcryptProtection"
              label="Libcrypt Protection"
            />
          </Form.Group>

          <Form.Group className="my-2">
            <p>Text Language(s)</p>
            {languageOptions}
          </Form.Group>
          <Form.Group className="my-2">
            <p>Audio Language(s)</p>
            {languageOptions}
          </Form.Group>

          <Form.Group className="my-2">{featureFlags}</Form.Group>
          <Button type="submit" variant="outline-primary">
            Submit for Review
          </Button>
        </Form>
      </>
    );
  } else return null;
}

export default ChangeRequest;
