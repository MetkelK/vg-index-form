import "./App.css";
import { useState, useEffect } from "react";
import ChangeRequest from "./Components/ChangeRequest";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [systems, setSystems] = useState([]);
  const [gameTitle, setgameTitle] = useState([]);
  const [languages, setLanguages] = useState([]);

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
    const getLanguages = () => {
      fetch(`https://vgindex-dev.org/api/change-request/languages`)
        .then((res) => res.json())
        .then((res) => {
          setLanguages(() => res);
        })
        .catch((err) => console.log(err));
    };
    getLanguages();
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
    <Router>
      <div className="container">
        <Switch>
          <Route path="/:id">
            <ChangeRequest
              systems={systems}
              discId={discId}
              title={gameTitle.title}
              languages={languages}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
