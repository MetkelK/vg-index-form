import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "@restart/ui/esm/DropdownToggle";
import DropdownMenu from "@restart/ui/esm/DropdownMenu";

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
    disc = discFormat.map((disc, i) => (
      <option key={i} value={disc.id}>
        {disc.displayName}
      </option>
    ));
  } else {
    disc = <option>Choose a format</option>;
  }

  if (discType && discType.status !== 404 && discType.status !== 400) {
    gameType = discType.map((type, i) => (
      <option key={i} value={type.id}>
        {type.name}
      </option>
    ));
  } else {
    gameType = <option>Choose a type</option>;
  }

  if (flags && flags.status !== 404 && flags && flags.status !== 400) {
    featureFlags = flags.map((feature, i) => (
      <div className="form-group pb-4" key={i}>
        <label htmlFor={feature}>{feature}</label>
        <textarea className="form-control" id={feature} rows="1"></textarea>
      </div>
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
    languageOptions = languages.map((language, i) => (
      <input
        className="form-check-input me-1"
        type="checkbox"
        value={language.name}
        label={language.name}
        id={language.name}
      ></input>
    ));
  } else {
    languageOptions = null;
  }

  if (props) {
    return (
      <>
        {gameName}
        <Form>
          <Form.Group className="form-group pb-2">
            <Form.Label htmlFor="system">System</Form.Label>
            <Form.Select
              className="form-control"
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

          <Form.Group className="form-group pb-2">
            <Form.Label htmlFor="format">Disc Format</Form.Label>
            <Form.Select
              className="form-control"
              id="format"
              value={discFormatId}
              onChange={(e) => setDiscFormatId(e.target.value)}
              disabled={!gameSystemId}
            >
              <option>Choose a format</option>
              {disc}
            </Form.Select>
          </Form.Group>

          <Form.Group className="form-group pb-2">
            <Form.Label htmlFor="type">Disc Type</Form.Label>
            <Form.Select
              className="form-control"
              id="type"
              value={discTypeId}
              onChange={(e) => setDiscTypeId(e.target.value)}
              disabled={!discFormatId}
            >
              <option>Choose a type</option>
              {gameType}
            </Form.Select>
          </Form.Group>

          {featureFlags}
        </Form>

        {/* <form className="">
          <div className="form-group pb-2">
            <label htmlFor="system">System</label>
            <select
              className="form-control"
              id="system"
              onChange={(e) => setGameSystemId(e.target.value)}
              value={gameSystemId}
            >
              <option>Choose a system</option>
              {systems.map((system, i) => (
                <option key={i} value={system.id}>
                  {system.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group pb-2">
            <label htmlFor="format">Disc Format</label>
            <select
              className="form-control"
              id="format"
              value={discFormatId}
              onChange={(e) => setDiscFormatId(e.target.value)}
              disabled={!gameSystemId}
            >
              <option>Choose a format</option>
              {disc}
            </select>
          </div>

          <div className="form-group pb-2">
            <label htmlFor="type">Disc Type</label>
            <select
              className="form-control"
              id="type"
              value={discTypeId}
              onChange={(e) => setDiscTypeId(e.target.value)}
              disabled={!discFormatId}
            >
              <option>Choose a type</option>
              {gameType}
            </select>
          </div>

          <div className="form-group pb-4">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Text Language(s)
              </button>
              <ul
                className="list-group dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {languageOptions}
              </ul>
            </div>

            <div className="form-group pb-4">
              <p>Audio Language(s)</p>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="English"
                  label="English"
                  id="audioenglish"
                ></input>
                <label htmlFor="audioenglish">English</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Spanish"
                  label="Spanish"
                  id="audiospanish"
                ></input>
                <label htmlFor="audiospanish">Spanish</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="French"
                  label="French"
                  id="audiofrench"
                ></input>
                <label htmlFor="audiofrench">French</label>
              </div>
            </div>
          </div>
          {featureFlags}

          <button type="submit" className="btn btn-outline-primary">
            Submit for Review
          </button>
        </form> */}
      </>
    );
  } else return null;
}

export default ChangeRequest;
