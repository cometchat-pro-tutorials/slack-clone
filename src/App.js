import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { API_ID } from "./settings.js";
import { CometChat } from "@cometchat-pro/chat";
import Chatbox from "./components/Chatbox";
import ChatHome from "./components/Dashboard";
import Login from "./components/Login";
import CreateGroup from "./components/CreateGroup";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

  
    CometChat.init(API_ID).then(
      hasInitialized => {
        console.log("Initialization completed successfully", hasInitialized);
        // You can now call login function.
      },
      error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take apppropriate action.
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/chat" component={Chatbox} />
            <Route path="/dashboard" component={ChatHome} />
            <Route path="/creategroup" component={CreateGroup} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
