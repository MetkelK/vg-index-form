import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ChangeRequest(props) {
  const { systems, title, languages } = props;

  let gameName;
  let disc;
  let featureFlags;
  let gameType;
  let languageOptions;

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
        {disc.displayName}
      </option>
    ));
  } else {
    disc = <option>Choose a format</option>;
  }

  if (discType && discType.status !== 404 && discType.status !== 400) {
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

  if (title) {
    gameName = <h1>Editing Disc {title}</h1>;
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

  if (props) {
    return (
      <>
        {gameName}
        <Form className="pb-2">
          <Form.Group className="pb-2">
            <Form.Label htmlFor="system">System</Form.Label>
            <Form.Select
              id="system"
              value={gameSystemId}
              onChange={(e) => setGameSystemId(e.target.value)}
            >
              <option>Choose a system</option>
              {systems.map((system, i) => (
                <option key={i} value={system.id}>
                  {system.displayName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="pb-2">
            <Form.Label htmlFor="format">Disc Format</Form.Label>
            <Form.Select
              id="format"
              value={discFormatId}
              onChange={(e) => setDiscFormatId(e.target.value)}
              disabled={!gameSystemId}
            >
              <option>Choose a format</option>
              {disc}
            </Form.Select>
          </Form.Group>

          <Form.Group className="pb-2">
            <Form.Label htmlFor="type">Disc Type</Form.Label>
            <Form.Select
              id="type"
              value={discTypeId}
              onChange={(e) => setDiscTypeId(e.target.value)}
              disabled={!discFormatId}
            >
              <option>Choose a type</option>
              {gameType}
            </Form.Select>
          </Form.Group>
          <Form.Group className=" pb-2">
            <p>Text Language(s)</p>
            {languageOptions}
          </Form.Group>
          <Form.Group className=" pb-2">
            <p>Audio Language(s)</p>
            {languageOptions}
          </Form.Group>

          {featureFlags}
          <Button type="submit" variant="outline-primary">
            Submit for Review
          </Button>
        </Form>
      </>
    );
  } else return null;
}

export default ChangeRequest;