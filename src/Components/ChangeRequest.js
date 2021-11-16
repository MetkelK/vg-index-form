import React from "react";
import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ChangeRequest({ systems, types, languages, regions, discId, info }) {
  let featureFlags;
  let formatName = "";
  let languageOptions;

  const [discFormat, setDiscFormat] = useState(info.formatId);

  const [flags, setFlags] = useState([]);

  const [values, setValues] = useState(info);

  useEffect(() => {
    setValues(info);
  }, [info]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handlelang = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setValues((prevState) => ({
        ...prevState,
        languageIds: [...prevState.languageIds, value],
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        languageIds: prevState.languageIds.filter((e) => e !== value),
      }));
    }
  };

  // if (discFormat) {
  //   let name = discFormat.filter((f) => f.id === info.formatId);

  //   formatName = name[0].name;

  //   console.log(formatName);
  // }

  useEffect(() => {
    const getFormat = () => {
      fetch(
        `https://vgindex-dev.org/api/change-request/systems/${values.systemId}/disc-formats`
      )
        .then((res) => res.json())
        .then((res) => setDiscFormat(res))
        .catch((err) => console.log(err));
    };
    getFormat();
  }, [values.systemId]);

  useEffect(() => {
    const getFlags = () => {
      fetch(
        `https://vgindex-dev.org/api/change-request/systems/${values.systemId}/feature-flags?discFormatId=${values.formatId}`
      )
        .then((res) => res.json())
        .then((res) => setFlags(res))
        .catch((err) => console.log(err));
    };
    getFlags();
  }, [values.systemId, values.formatId]);

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

  if (languages) {
    languageOptions = languages.map((language) => (
      <Form.Check
        checked={
          values.languageIds ? values.languageIds.includes(language.id) : null
        }
        key={language.id}
        name="languageIds"
        inline
        type="checkbox"
        id={language.name}
        label={language.name}
        value={language.id}
        onChange={handlelang}
      ></Form.Check>
    ));
  } else {
    languageOptions = null;
  }

  return (
    <>
      <h1>Editing Disc {info.title}</h1>
      <Form className="my-4">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <FloatingLabel
            controlId="floatingTitle"
            label={info.title !== "Not Found" ? info.title : "Choose a title"}
          >
            <Form.Control
              type="input"
              placeholder={
                info.title !== "Not Found" ? info.title : "Choose a title"
              }
              name="title"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="version">
          <Form.Label>Version</Form.Label>
          <FloatingLabel controlId="floatingVersion" label={info.version}>
            <Form.Control
              type="input"
              placeholder={info.version}
              name="version"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="displayNumber">
          <Form.Label>Display Number</Form.Label>
          <FloatingLabel
            controlId="floatingDisplayNumber"
            label={info.displayNumber}
          >
            <Form.Control
              type="input"
              placeholder={info.displayNumber}
              name="displayNumber"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label htmlFor="system">System</Form.Label>
          <Form.Select id="system" value={values.systemId} name="systemId">
            {systems.map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label htmlFor="format">Disc Format</Form.Label>
          <FloatingLabel controlId="floatingDiscFormat" label={formatName}>
            <Form.Select
              id="format"
              value={values.formatId}
              name="formatId"
              onChange={handleInputChange}
            >
              {discFormat &&
                discFormat.map((format) => (
                  <option key={format.id} value={format.id}>
                    {format.name}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label htmlFor="type">Disc Type</Form.Label>
          <FloatingLabel
            controlId="floatingDiscType"
            label={info.contentTypeId}
          >
            <Form.Select
              id="type"
              value={values.contentTypeId}
              name="contentTypeId"
              onChange={handleInputChange}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="my-2">
          <p>Language(s)</p>
          {languageOptions}
        </Form.Group>

        <Form.Group className="my-2">{featureFlags}</Form.Group>
        <Button type="submit" variant="outline-primary">
          Submit for Review
        </Button>
      </Form>
    </>
  );
}

export default ChangeRequest;
