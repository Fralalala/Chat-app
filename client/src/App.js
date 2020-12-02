import React, { Fragment } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layout/Home";
import Login from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

import MessagingState from "./context/messaging/MessagingState";
import AuthState from "./context/authentication/AuthState";

function App() {
  return (
    <AuthState>
      <MessagingState>
        <Router>
          <Fragment>
            <Navbar />
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </MessagingState>
    </AuthState>
  );
}

export default App;
