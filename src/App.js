import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { API_ID } from "./config.js";
import { CometChat } from "@cometchat-pro/chat";
import Login from "./components/Login";
import CreateChannel from "./components/CreateChannel";
import "./App.css";
import Dashboard from "./components/Dashboard";

class App extends Component {
  constructor(props) {
    super(props);

    CometChat.init(API_ID).then(
      hasInitialized => {
        console.log("Initialization completed successfully", hasInitialized);
      },
      error => {
        console.log("Initialization failed with error:", error);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/createchannel" component={CreateChannel} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
