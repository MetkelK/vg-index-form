import "./App.css";
import { useState, useEffect } from "react";
import ChangeRequest from "./Components/ChangeRequest";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

const App = () => {
  const [systems, setSystems] = useState([]);
  const [types, setTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [gameInfo, setgameInfo] = useState([]);

  // Retrieve discId from url and set to variable
  const queryParams = new URLSearchParams(window.location.search);
  const discId = queryParams.get("discId");

  useEffect(() => {
    const getSystems = () => {
      fetch(`https://vgindex-dev.org/api/change-request/systems`)
        .then((res) => res.json())
        .then((res) => setSystems(res))
        .catch((err) => console.log(err));
    };
    getSystems();
  }, []);

  useEffect(() => {
    const getTypes = () => {
      fetch(`https://vgindex-dev.org/api/change-request/disc-content-types`)
        .then((res) => res.json())
        .then((res) => setTypes(res))
        .catch((err) => console.log(err));
    };
    getTypes();
  }, []);

  useEffect(() => {
    const getLanguages = () => {
      fetch(`https://vgindex-dev.org/api/change-request/languages`)
        .then((res) => res.json())
        .then((res) => setLanguages(res))
        .catch((err) => console.log(err));
    };
    getLanguages();
  }, []);

  useEffect(() => {
    const getRegions = () => {
      fetch(`https://vgindex-dev.org/api/change-request/regions`)
        .then((res) => res.json())
        .then((res) => setRegions(res))
        .catch((err) => console.log(err));
    };
    getRegions();
  }, []);

  useEffect(() => {
    const getGameInfo = () => {
      fetch(`https://vgindex-dev.org/api/change-request/discs/${discId}`)
        .then((res) => res.json())
        .then((res) => setgameInfo(res))
        .catch((err) => console.log(err));
    };
    getGameInfo();
  }, [discId]);

  // Sort systems, languages, and regions alphabetically
  let sortedSystems = systems.sort((a, b) => a.name.localeCompare(b.name));
  let sortedLanguages = languages.sort((a, b) => a.name.localeCompare(b.name));
  let sortedRegions = regions.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/change-requests/:id">
            <ChangeRequest
              systems={sortedSystems}
              types={types}
              languages={sortedLanguages}
              regions={sortedRegions}
              info={gameInfo}
            />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
