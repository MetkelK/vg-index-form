import React from "react";
import { useState, useEffect } from "react";

function Form(props) {
  const { systems, title } = props;
  let disc;
  let featureFlags;
  let gameName;
  console.log(title);

  const [gameSystemId, setGameSystemId] = useState("");
  const [discFormat, setDiscFormat] = useState("");
  const [discFormatId, setDiscFormatId] = useState("");
  const [discType, setDiscType] = useState("");
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

  //
  if (discFormat && discFormat.status !== 404) {
    disc = discFormat.map((disc, i) => (
      <option key={i} value={disc.id}>
        {disc.displayName}
      </option>
    ));
  } else {
    disc = <option>Choose a format</option>;
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

  if (props) {
    return (
      <>
        {gameName}
        <form className="">
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
              value={discType}
              onChange={(e) => setDiscType(e.target.value)}
              disabled={discFormat.status === 404 || discFormat.status === 400}
            >
              <option>Choose a type</option>
              <option>Game</option>
              <option>Demo</option>
            </select>
          </div>

          <div className="form-group pb-4">
            <p>Text Language(s)</p>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="English"
                label="English"
                id="textenglish"
              ></input>
              <label htmlFor="textenglish">English</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Spanish"
                label="Spanish"
                id="textspanish"
              ></input>
              <label htmlFor="textspanish">Spanish</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="French"
                label="French"
                id="textfrench"
              ></input>
              <label htmlFor="textfrench">French</label>
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
        </form>
      </>
    );
  } else return null;
}

export default Form;
