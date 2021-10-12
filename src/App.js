import "./App.css";
import { useState, useEffect } from "react";
import Form from "./Components/Form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [systems, setSystems] = useState([]);
  const [gameTitle, setgameTitle] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const discId = queryParams.get("discId");
  console.log(discId);

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
    <Router>
      <div className="container">
        <Switch>
          <Route path="/:id">
            <Form systems={systems} discId={discId} title={gameTitle.title} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
