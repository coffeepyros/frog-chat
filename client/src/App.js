import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Update from "./components/Update";
import Chatbox from "./components/Chatbox";
import "./App.css";

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <Router>
      <header>
        <h1>
          <span className="icon">🐸</span> Frog Project Manager
        </h1>
        <nav>
          <Link to="/register">Registration</Link>
          <Link to="/login">Login</Link>
          <Link to="/update">Update Profile</Link>
          <Link to="/chatbox">Chatbox</Link>
        </nav>
      </header>
      <main id="content">
        <Switch>
          <Route path="/register">
            {/* Hide Registration after an user has logged in */}
            {userInfo.username ? "" : <Registration />}
          </Route>
          <Route path="/login">
            <Login userInfo={userInfo} setUserInfo={setUserInfo} />
          </Route>
          <Route path="/update">
            <Update userInfo={userInfo} />
          </Route>
          <Route path="/chatbox">
            <Chatbox userFrom="Frog" userTo="Raccoon" />
            <Chatbox userFrom="Raccoon" userTo="Frog" />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
