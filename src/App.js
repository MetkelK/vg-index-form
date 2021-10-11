import "./App.css";
import { useState, useEffect } from "react";
import Form from "./Components/Form";

const App = () => {
  const [systems, setSystems] = useState([]);
  const [gameTitle, setgameTitle] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const discId = queryParams.get("discId");

  useEffect(() => {
    const getSystems = () => {
      fetch(`https://vgindex-dev.org/api/change-request/systems`)
        .then((res) => res.json())
        .then((res) => {
          setSystems(() => res);
        })
        .catch((err) => console.log(err));
    };
    getSystems();
  }, []);

  useEffect(() => {
    const getGameTitle = () => {
      fetch(`https://vgindex-dev.org/api/change-request/discs/${discId}`)
        .then((res) => res.json())
        .then((res) => {
          setgameTitle(() => res);
        })
        .catch((err) => console.log(err));
    };
    getGameTitle();
  }, [discId]);

  return (
    <div className="container">
      <h1>Editing Disc {gameTitle.title}</h1>
      <Form systems={systems} discId={discId} />
    </div>
  );
};

export default App;
